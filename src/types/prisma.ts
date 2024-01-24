import { Prisma } from "@prisma/client";

export type Account<T extends Prisma.AccountDefaultArgs> =
  Prisma.AccountGetPayload<T>;

export type Transaction<T extends Prisma.TransactionDefaultArgs> =
  Prisma.TransactionGetPayload<T>;
