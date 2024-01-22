"use server";

import { authOptions } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { categoryFormSchema } from "@/lib/zod-schemas/categoryFormSchema";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export const getCategories = async (options?: {
  where?: Prisma.TransactionCategoryWhereInput;
  orderBy?:
    | Prisma.TransactionCategoryOrderByWithRelationInput
    | Prisma.TransactionCategoryOrderByWithRelationInput[];
  take?: number;
  skip?: number;
}) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/signin");
  }

  try {
    const categories = await prisma.transactionCategory.findMany({
      where: {
        ...options?.where,
        user: {
          id: session.user.id,
        },
      },
      orderBy: options?.orderBy,
      take: options?.take,
      skip: options?.skip,
    });

    return {
      success: true,
      data: categories,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.name === "CustomError"
          ? error.message
          : "An error occurred while fetching categories.",
      data: [],
    };
  }
};

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

    const createdCategory = await prisma.transactionCategory.create({
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

    return {
      success: true,
      message: `Category ${createdCategory.name} created successfully.`,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.name === "CustomError" ? error.message : "Something went wrong",
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

    const updatedCategory = await prisma.transactionCategory.update({
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

    return {
      success: true,
      message: `Category ${updatedCategory.name} updated successfully.`,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.name === "CustomError" ? error.message : "Something went wrong",
    };
  }
};

export const deleteCategory = async (id: string) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/signin");
  }

  try {
    const deletedCategory = await prisma.transactionCategory.delete({
      where: {
        user: {
          id: session.user.id,
        },
        id: id,
      },
    });

    revalidatePath("/categories");

    return {
      success: true,
      message: `Category ${deletedCategory.name} deleted successfully.`,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.name === "CustomError" ? error.message : "Something went wrong",
    };
  }
};
