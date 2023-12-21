"use server";

import { z } from "zod";
import { accountFormSchema } from "@/lib/zod-schemas/accountFormSchema";
import { RedirectType, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";

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
  } catch (error) {
    return {
      error: {
        message: "Something went wrong",
      },
    };
  }
};
