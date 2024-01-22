import { TransactionFilter } from "@/types/transaction-filter";
import { Prisma } from "@prisma/client";

export const generateTransactionWhereInput = (filter?: TransactionFilter) => {
  if (!filter) {
    return {};
  }

  const whereInput: Prisma.TransactionWhereInput = {
    fromAccountId:
      filter?.sourceAccounts.length ?? 0 > 0
        ? { in: filter?.sourceAccounts }
        : undefined,
    toAccountId:
      filter?.targetAccounts.length ?? 0 > 0
        ? { in: filter?.targetAccounts }
        : undefined,
    categoryId:
      filter?.categories.length ?? 0 > 0
        ? { in: filter?.categories }
        : undefined,
    type: filter?.types.length ?? 0 > 0 ? { in: filter?.types } : undefined,
  };

  return whereInput;
};
