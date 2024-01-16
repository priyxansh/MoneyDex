"use client";

import {
  FilterTabTrigger,
  TransactionFilter,
  TransactionFilterAction,
  TransactionFilterContextType,
} from "@/types/transaction-filter";

import { Account, TransactionCategory } from "@prisma/client";
import { createContext, useContext, useReducer } from "react";

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
  const initialState = {
    sourceAccounts: [],
    targetAccounts: [],
    categories: [],
    types: [],
  };

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
      case "RESET":
        return initialState;
      default:
        return state;
    }
  };

  const [filter, dispatch] = useReducer(reducer, initialState);

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

  return (
    <TransactionFilterContext.Provider
      value={{
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
