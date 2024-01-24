import { Transaction } from "@/types/prisma";

export const getTransactionCategoryName = ({
  fromAccount,
  toAccount,
  type,
  category,
}: Transaction<{
  include: {
    fromAccount: true;
    toAccount: true;
    category: true;
  };
}>) => {
  if (type === "TRANSFER") {
    return `${fromAccount.name} -> ${toAccount?.name}`;
  }

  if (type === "DIFFERENCE_EXPENSE" || type === "DIFFERENCE_INCOME") {
    return `Difference`;
  }

  return category ? category.name : `General`;
};
