"use client";

import { Account, TransactionCategory } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useReducer } from "react";
import { parseURITransactionFilter } from "@/lib/utils/parseURITransactionFilter";

import {
  FilterTabTrigger,
  TransactionFilter,
  TransactionFilterAction,
  TransactionFilterContextType,
} from "@/types/transaction-filter";

const TransactionFilterContext =
  createContext<TransactionFilterContextType>(null);

type TransactionFilterProviderProps = {
  children: React.ReactNode;
  userAccounts: Account[];
  userTransactionCategories: TransactionCategory[];
};

const TransactionFilterProvider = ({
  children,
  userAccounts,
  userTransactionCategories,
}: TransactionFilterProviderProps) => {
  const searchParams = useSearchParams();

  const URIFilter = searchParams.get("filter");
  const parsedURIFilter = parseURITransactionFilter(URIFilter);

  const resetState: TransactionFilter = {
    sourceAccounts: [],
    targetAccounts: [],
    categories: [],
    types: [],
  };

  const initialState = parsedURIFilter ?? resetState;

  const reducer = (
    state: TransactionFilter,
    action: TransactionFilterAction
  ) => {
    switch (action.type) {
      case "SET_SOURCE_ACCOUNTS":
        return { ...state, sourceAccounts: action.payload };
      case "SET_TARGET_ACCOUNTS":
        return { ...state, targetAccounts: action.payload };
      case "SET_CATEGORIES":
        return { ...state, categories: action.payload };
      case "SET_TYPES":
        return { ...state, types: action.payload };
      case "CANCEL":
        return initialState;
      case "RESET":
        return resetState;
      default:
        return state;
    }
  };

  const filterTabTriggers: FilterTabTrigger[] = [
    {
      id: 1,
      label: "Source Account",
      value: "sourceAccounts",
      actionType: "SET_SOURCE_ACCOUNTS",
      filterList: userAccounts.map((account) => ({
        id: account.id,
        name: account.name,
      })),
    },
    {
      id: 2,
      label: "Target Account",
      value: "targetAccounts",
      actionType: "SET_TARGET_ACCOUNTS",
      filterList: userAccounts.map((account) => ({
        id: account.id,
        name: account.name,
      })),
    },
    {
      id: 3,
      label: "Category",
      value: "categories",
      actionType: "SET_CATEGORIES",
      filterList: userTransactionCategories.map((category) => ({
        id: category.id,
        name: category.name,
      })),
    },
    {
      id: 4,
      label: "Type",
      value: "types",
      actionType: "SET_TYPES",
      filterList: [
        { id: "INCOME", name: "Income" },
        { id: "EXPENSE", name: "Expense" },
        { id: "TRANSFER", name: "Transfer" },
        { id: "DIFFERENCE_INCOME", name: "Difference Income" },
        { id: "DIFFERENCE_EXPENSE", name: "Difference Expense" },
      ],
    },
  ];

  const [filter, dispatch] = useReducer(reducer, initialState);

  return (
    <TransactionFilterContext.Provider
      value={{
        initialFilter: initialState,
        filter,
        updateFilter: dispatch,
        userAccounts,
        userTransactionCategories,
        filterTabTriggers: filterTabTriggers,
      }}
    >
      {children}
    </TransactionFilterContext.Provider>
  );
};

export const useTransactionFilterContext = () => {
  const context = useContext(TransactionFilterContext);

  if (context === null) {
    throw new Error(
      "useTransactionFilter must be used within a TransactionFilterProvider"
    );
  }

  return context;
};

export default TransactionFilterProvider;
