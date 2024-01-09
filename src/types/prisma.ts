import { Prisma } from "@prisma/client";

export type Account = Prisma.AccountGetPayload<{
  include: {
    transactions: true;
  };
}>;

export type Transaction = Prisma.TransactionGetPayload<{
  include: {
    category: true;
    fromAccount: true;
    toAccount: true;
  };
}>;
