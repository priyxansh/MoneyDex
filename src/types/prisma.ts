import { Prisma } from "@prisma/client";

export type Account = Prisma.AccountGetPayload<{
  include: {
    transactions: true;
  };
}>;

export type Transaction<T extends Prisma.TransactionDefaultArgs> =
  Prisma.TransactionGetPayload<T>;
