import prisma from "../prisma";

export const getUserAccounts = async (userId: string) => {
  // TODO: Add error handling, select and orderby arguements and handle user session here instead of receiving userId as an arguement

  const userAccounts = await prisma.account.findMany({
    where: {
      user: {
        id: userId,
      },
    },
  });

  return userAccounts;
};
