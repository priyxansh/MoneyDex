import prisma from "../prisma";
import { TransactionCategoryType } from "@prisma/client";

export const getUserCategories = async (
  userId: string,
  type: TransactionCategoryType | "ALL",
  searchQuery?: string
) => {
  // TODO: Add error handling, select and orderby arguements and handle user session here instead of receiving userId as an arguement

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
  });

  return userCategories;
};
