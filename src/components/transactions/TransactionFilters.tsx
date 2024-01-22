import TransactionFilterSheet from "./TransactionFilterSheet";
import TransactionFilterProvider from "@/contexts/TransactionFilterContext";
import { getAccounts } from "@/actions/account-actions";
import { getCategories } from "@/actions/category-actions";

type TransactionFiltersProps = {};

const TransactionFilters = async ({}: TransactionFiltersProps) => {
  const { data: accounts } = await getAccounts({
    orderBy: {
      name: "asc",
    },
  });
  const { data: categories } = await getCategories({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <TransactionFilterProvider
      userAccounts={accounts}
      userTransactionCategories={categories}
    >
      <TransactionFilterSheet />
    </TransactionFilterProvider>
  );
};

export default TransactionFilters;
