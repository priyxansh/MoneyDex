/**
 * Parses a stringified JSON object into a TransactionFilter object.
 * @returns Parsed object of type TransactionFilter or undefined.
 */

import { TransactionFilter } from "@/types/transaction-filter";
import { transactionFilterSchema } from "../zod-schemas/transactionFilterSchema";

export const parseURITransactionFilter = (
  filter: string | null | undefined
): TransactionFilter | undefined => {
  if (!filter) return undefined;

  try {
    const parsedJSON = JSON.parse(filter);
    const parsedFilter = transactionFilterSchema.parse(
      parsedJSON
    ) as TransactionFilter;

    return parsedFilter;
  } catch (error) {
    return undefined;
  }
};
