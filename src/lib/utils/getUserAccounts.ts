import prisma from "../prisma";

export const getUserAccounts = async (userId: string) => {
  const userAccounts = await prisma.account.findMany({
    where: {
      user: {
        id: userId,
      },
    },
  });

  return userAccounts;
};
