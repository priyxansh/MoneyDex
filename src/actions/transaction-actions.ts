"use server";

import { authOptions } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { generateTransactionWhereInput } from "@/lib/utils/generateTransactionWhereInput";
import { handlePageRedirect } from "@/lib/utils/handlePageRedirect";
import { transactionFormSchema } from "@/lib/zod-schemas/transactionFormSchema";
import { TransactionFilter } from "@/types/transaction-filter";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Todo: Separate these functions into separate files

export const getTransactions = async (options?: {
  where?: Prisma.TransactionWhereInput;
  orderBy?:
    | Prisma.TransactionOrderByWithRelationInput
    | Prisma.TransactionOrderByWithRelationInput[];
  include?: Prisma.TransactionInclude;
  take?: number;
  skip?: number;
}) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/signin");
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        ...options?.where,
        user: {
          id: session.user.id,
        },
      },
      include: options?.include,
      orderBy: options?.orderBy,
      take: options?.take,
      skip: options?.skip,
    });

    return {
      success: true,
      data: transactions,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.name === "CustomError"
          ? error.message
          : "An error occurred while getting the transactions.",
      data: [],
    };
  }
};

export const createTransaction = async (
  data: z.infer<typeof transactionFormSchema>
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/signin");
  }

  const { amount, description, type, categoryId, fromAccountId, toAccountId } =
    data;

  try {
    transactionFormSchema.parse(data);

    // Avoid exposing create difference transaction functionality to the user

    if (type === "DIFFERENCE_EXPENSE" || type === "DIFFERENCE_INCOME") {
      const error = new Error("Cannot create a difference transaction.");
      error.name = "CustomError";
      throw error;
    }

    const fromAccount = await prisma.account.findUnique({
      where: {
        id: fromAccountId,
        user: {
          id: session.user.id,
        },
      },
    });

    if (!fromAccount) {
      const error = new Error("Account not found.");
      error.name = "CustomError";
      throw error;
    }

    if (type === "TRANSFER" || type === "EXPENSE") {
      if (fromAccount.balance < amount) {
        const error = new Error("Insufficient funds in account.");
        error.name = "CustomError";
        throw error;
      }
    }

    if (type === "TRANSFER") {
      const toAccount = await prisma.account.findUnique({
        where: {
          id: toAccountId,
          user: {
            id: session.user.id,
          },
        },
      });

      if (!toAccount) {
        const error = new Error("Account not found.");
        error.name = "CustomError";
        throw error;
      }

      if (fromAccount.id === toAccount.id) {
        const error = new Error("Cannot transfer to the same account.");
        error.name = "CustomError";
        throw error;
      }

      const fromUpdatePromise = prisma.account.update({
        where: {
          id: fromAccountId,
          user: {
            id: session.user.id,
          },
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      const toUpdatePromise = prisma.account.update({
        where: {
          id: toAccountId,
          user: {
            id: session.user.id,
          },
        },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

      const newTransactionPromise = prisma.transaction.create({
        data: {
          amount: amount,
          description: description,
          type: type,
          user: {
            connect: {
              id: session.user.id,
            },
          },
          fromAccount: {
            connect: {
              id: fromAccountId,
            },
          },
          toAccount: {
            connect: {
              id: toAccountId,
            },
          },
        },
      });

      await prisma.$transaction([
        fromUpdatePromise,
        toUpdatePromise,
        newTransactionPromise,
      ]);
    } else {
      const balance: {
        increment?: number;
        decrement?: number;
      } = {};

      if (type === "INCOME") {
        balance["increment"] = amount;
      } else if (type === "EXPENSE") {
        balance["decrement"] = amount;
      }

      const balanceUpdatePromise = prisma.account.update({
        where: {
          id: fromAccountId,
          user: {
            id: session.user.id,
          },
        },
        data: {
          balance: balance,
        },
      });

      const category: {
        connect?: {
          id: string;
        };
      } = {};

      if (categoryId) {
        category["connect"] = {
          id: categoryId,
        };
      }

      const newTransactionPromise = prisma.transaction.create({
        data: {
          amount: amount,
          description: description,
          type: type,
          user: {
            connect: {
              id: session.user.id,
            },
          },
          fromAccount: {
            connect: {
              id: fromAccountId,
            },
          },
          category: category,
        },
      });

      await prisma.$transaction([balanceUpdatePromise, newTransactionPromise]);
    }

    revalidatePath("/transactions");
    revalidatePath("/accounts");

    return {
      success: true,
      message: "Transaction logged successfully.",
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        error.name === "CustomError"
          ? error.message
          : "An error occurred while logging the transaction.",
    };
  }
};

export const undoTransaction = async (id: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/signin");
  }

  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: id,
        user: {
          id: session.user.id,
        },
      },
      select: {
        id: true,
        amount: true,
        type: true,
        fromAccount: {
          select: {
            id: true,
            balance: true,
          },
        },
        toAccount: {
          select: {
            id: true,
            balance: true,
          },
        },
      },
    });

    if (!transaction) {
      const error = new Error("Transaction not found.");
      error.name = "CustomError";
      throw error;
    }

    if (transaction.type === "TRANSFER") {
      if (!transaction.toAccount) {
        const error = new Error("Account not found.");
        error.name = "CustomError";
        throw error;
      }

      if (transaction.toAccount.balance < transaction.amount) {
        const error = new Error(
          "Insufficient funds in target account to undo transfer."
        );
        error.name = "CustomError";
        throw error;
      }

      const fromUpdatePromise = prisma.account.update({
        where: {
          id: transaction.fromAccount.id,
          user: {
            id: session.user.id,
          },
        },
        data: {
          balance: {
            increment: transaction.amount,
          },
        },
      });

      const toUpdatePromise = prisma.account.update({
        where: {
          id: transaction.toAccount.id,
          user: {
            id: session.user.id,
          },
        },
        data: {
          balance: {
            decrement: transaction.amount,
          },
        },
      });

      const deleteTransactionPromise = prisma.transaction.delete({
        where: {
          id: transaction.id,
          user: {
            id: session.user.id,
          },
        },
      });

      await prisma.$transaction([
        fromUpdatePromise,
        toUpdatePromise,
        deleteTransactionPromise,
      ]);
    } else {
      const balance: {
        increment?: number;
        decrement?: number;
      } = {};

      if (
        transaction.type === "INCOME" ||
        transaction.type === "DIFFERENCE_INCOME"
      ) {
        if (transaction.fromAccount.balance < transaction.amount) {
          const error = new Error(
            "Insufficient funds in account to undo income."
          );
          error.name = "CustomError";
          throw error;
        }

        balance["decrement"] = transaction.amount;
      } else if (
        transaction.type === "EXPENSE" ||
        transaction.type === "DIFFERENCE_EXPENSE"
      ) {
        balance["increment"] = transaction.amount;
      }

      const balanceUpdatePromise = prisma.account.update({
        where: {
          id: transaction.fromAccount.id,
          user: {
            id: session.user.id,
          },
        },
        data: {
          balance: balance,
        },
      });

      const deleteTransactionPromise = prisma.transaction.delete({
        where: {
          id: transaction.id,
          user: {
            id: session.user.id,
          },
        },
      });

      await prisma.$transaction([
        balanceUpdatePromise,
        deleteTransactionPromise,
      ]);
    }

    revalidatePath("/transactions");
    revalidatePath("/accounts");

    return {
      success: true,
      message: "Transaction undone successfully.",
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        error.name === "CustomError"
          ? error.message
          : "An error occurred while undoing the transaction.",
    };
  }
};

export const getTransactionCount = async ({
  where,
  take,
  skip,
}: {
  where?: Prisma.TransactionWhereInput;
  take?: number;
  skip?: number;
}) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/signin");
  }

  try {
    const whereInput = {
      ...where,
      user: {
        id: session.user.id,
      },
    };

    const count = await prisma.transaction.count({
      where: whereInput,
      take: take,
      skip: skip,
    });

    return {
      success: true,
      count: count,
    };
  } catch (error: any) {
    console.log("Error getting transaction count: ", error);
    return {
      success: false,
      message:
        error.name === "CustomError"
          ? error.message
          : "An error occurred while getting the transaction count.",
    };
  }
};

export const validateTransactionPaginationParams = async ({
  page,
  perPage,
  filter,
}: {
  page: number;
  perPage: number;
  filter?: TransactionFilter;
}) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/signin");
  }

  handlePageRedirect({
    page: page,
    perPage: perPage,
    redirectURL: "/transactions",
  });

  const whereInput = generateTransactionWhereInput(filter);

  const countResult = await getTransactionCount({
    where: whereInput,
  });

  const count = countResult.count ?? 0;

  if (count === 0) {
    return;
  }

  const totalPages = Math.ceil(count / perPage);

  if (page > totalPages) {
    return redirect(`/transactions?page=${totalPages}&perPage=${perPage}`);
  }
};
