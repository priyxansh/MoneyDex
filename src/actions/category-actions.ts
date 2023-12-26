"use server";

import { authOptions } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteCategory = async (id: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/signin");
  }

  try {
    await prisma.transactionCategory.delete({
      where: {
        user: {
          id: session.user.id,
        },
        id: id,
      },
    });

    revalidatePath("/categories");
  } catch (error) {
    return {
      error: {
        message: "Something went wrong",
      },
    };
  }
};
