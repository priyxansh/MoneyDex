"use server";

import { authOptions } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { transactionFormSchema } from "@/lib/zod-schemas/transactionFormSchema";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

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
  } catch (error: any) {
    console.log(error);
    return {
      error: {
        message:
          error.name === "CustomError" ? error.message : "Something went wrong",
      },
    };
  }
};
