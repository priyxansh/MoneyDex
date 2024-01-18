import { TransactionType } from "@prisma/client";
import { z } from "zod";

export const transactionFilterSchema = z.object({
  sourceAccounts: z.array(z.string()),
  targetAccounts: z.array(z.string()),
  categories: z.array(z.string()),
  types: z.array(z.nativeEnum(TransactionType)),
}).optional()
