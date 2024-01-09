import prisma from "../prisma";
import { TransactionCategoryType } from "@/types/prisma";

export const getUserCategories = async (
  userId: string,
  type: TransactionCategoryType | "ALL",
  searchQuery?: string
) => {
  const userCategories = await prisma.transactionCategory.findMany({
    where: {
      userId: userId,
      name: {
        contains: searchQuery,
        mode: "insensitive",
      },
      type: type === "ALL" ? undefined : type,
    },
    orderBy: [
      {
        type: "asc",
      },
      {
        name: "asc",
      },
    ],
    select: {
      id: true,
      name: true,
      type: true,
    },
  });

  return userCategories;
};
