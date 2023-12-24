import prisma from "../prisma";

export const getUserCategories = async (
  userId: string,
  typeFilter:
    | {
        equals?: undefined;
      }
    | {
        equals: "INCOME" | "EXPENSE";
      }
) => {
  const userCategories = await prisma.transactionCategory.findMany({
    where: {
      user: {
        id: userId,
      },
      type: typeFilter,
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
