"use server";

import { z } from "zod";
import { accountFormSchema } from "@/lib/zod-schemas/accountFormSchema";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import { revalidatePath } from "next/cache";

export const createAccount = async (
  data: z.infer<typeof accountFormSchema>
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/signin");
  }

  const { accountName, balance } = data;

  try {
    accountFormSchema.parse(data);

    const createdAccount = await prisma.account.create({
      data: {
        name: accountName,
        balance: balance,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    revalidatePath("/accounts");

    return {
      success: true,
      message: `Account ${createdAccount.name} created successfully.`,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.name === "CustomError"
          ? error.message
          : "An error occurred while creating the account.",
    };
  }
};

export const updateAccount = async (
  id: string,
  data: z.infer<typeof accountFormSchema>
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/signin");
  }

  const { accountName: name, balance } = data;

  try {
    accountFormSchema.parse(data);

    const updatedAccount = await prisma.account.update({
      where: {
        id: id,
        user: {
          id: session.user.id,
        },
      },
      data: {
        name: name,
        balance: balance,
      },
    });

    revalidatePath("/accounts");

    // TODO: Handle user currency

    return {
      success: true,
      message: `Account ${updatedAccount.name} updated successfully. Balance: $${updatedAccount.balance}.`,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.name === "CustomError"
          ? error.message
          : "An error occurred while updating the account.",
    };
  }
};

export const deleteAccount = async (id: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/signin");
  }

  try {
    const accountCount = await prisma.account.count({
      where: {
        user: {
          id: session.user.id,
        },
      },
    });

    if (accountCount === 1) {
      const error = new Error("Cannot delete last account.");
      error.name = "CustomError";
      throw error;
    }

    const deleteTransactionsPromise = prisma.transaction.deleteMany({
      where: {
        OR: [
          {
            fromAccount: {
              id: id,
            },
          },
          {
            toAccount: {
              id: id,
            },
          },
        ],
        user: {
          id: session.user.id,
        },
      },
    });

    const deleteAccountPromise = prisma.account.delete({
      where: {
        id: id,
        user: {
          id: session.user.id,
        },
      },
    });

    const [_, deletedAccount] = await prisma.$transaction([
      deleteTransactionsPromise,
      deleteAccountPromise,
    ]);

    revalidatePath("/accounts");

    return {
      success: true,
      message: `Account ${deletedAccount.name} deleted successfully.`,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.name === "CustomError"
          ? error.message
          : "An error occurred while deleting the account.",
    };
  }
};
