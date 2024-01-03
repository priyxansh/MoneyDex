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

    await prisma.account.create({
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
  } catch (error: any) {
    return {
      error: {
        message:
          error.name === "CustomError" ? error.message : "Something went wrong",
      },
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

    await prisma.account.update({
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
  } catch (error: any) {
    return {
      error: {
        message:
          error.name === "CustomError" ? error.message : "Something went wrong",
      },
    };
  }
};

export const deleteAccount = async (id: string) => {
  // TODO: Use undoTransaction to undo all transactions associated with this account
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

    await prisma.$transaction([
      deleteTransactionsPromise,
      deleteAccountPromise,
    ]);

    revalidatePath("/accounts");
  } catch (error: any) {
    return {
      error: {
        message:
          error.name === "CustomError" ? error.message : "Something went wrong",
      },
    };
  }
};
