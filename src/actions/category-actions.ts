"use server";

import { authOptions } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { categoryFormSchema } from "@/lib/zod-schemas/categoryFormSchema";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const createCategory = async (
  data: z.infer<typeof categoryFormSchema>
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/signin");
  }

  const { categoryName: name, categoryType: type } = data;

  try {
    categoryFormSchema.parse(data);

    await prisma.transactionCategory.create({
      data: {
        name: name,
        type: type,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    revalidatePath("/categories");
  } catch (error: any) {
    return {
      error: {
        message:
          error.name === "CustomError" ? error.message : "Something went wrong",
      },
    };
  }
};

export const updateCategory = async (
  id: string,
  data: z.infer<typeof categoryFormSchema>
) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/signin");
  }

  const { categoryName: name, categoryType: type } = data;

  try {
    categoryFormSchema.parse(data);

    await prisma.transactionCategory.update({
      where: {
        user: {
          id: session.user.id,
        },
        id: id,
      },
      data: {
        name: name,
        type: type,
      },
    });

    revalidatePath("/categories");
  } catch (error: any) {
    return {
      error: {
        message:
          error.name === "CustomError" ? error.message : "Something went wrong",
      },
    };
  }
};

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
  } catch (error: any) {
    return {
      error: {
        message:
          error.name === "CustomError" ? error.message : "Something went wrong",
      },
    };
  }
};
