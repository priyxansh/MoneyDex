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
  const { accountName, balance } = data;

  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/signin");
  }

  try {
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
  } catch (error) {
    return {
      error: {
        message: "Something went wrong",
      },
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
      return {
        error: {
          message: "You cannot delete your only account.",
        },
      };
    }

    const deleteTransactionsPromise = prisma.transaction.deleteMany({
      where: {
        fromAccount: {
          id: id,
        },
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
  } catch (error) {
    return {
      error: {
        message: "Something went wrong",
      },
    };
  }
};
