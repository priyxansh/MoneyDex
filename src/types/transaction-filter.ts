import { Account, TransactionCategory } from "@prisma/client";

export type TransactionFilter = {
  sourceAccounts: string[];
  targetAccounts: string[];
  categories: string[];
  types: string[];
};

export type FilterTabTrigger = {
  id: number;
  label: string;
  value: string;
  actionType: TransactionFilterAction["type"];
  filterList: { id: string; name: string }[];
};

export type TransactionFilterAction =
  | { type: "SET_SOURCE_ACCOUNTS"; payload: string[] }
  | { type: "SET_TARGET_ACCOUNTS"; payload: string[] }
  | { type: "SET_CATEGORIES"; payload: string[] }
  | { type: "SET_TYPES"; payload: string[] }
  | { type: "RESET" };

export type TransactionFilterContextType = {
  filter: TransactionFilter;
  updateFilter: React.Dispatch<TransactionFilterAction>;
  userAccounts: Account[];
  userTransactionCategories: TransactionCategory[];
  filterTabTriggers: FilterTabTrigger[];
} | null;
