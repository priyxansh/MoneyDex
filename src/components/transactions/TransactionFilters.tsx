import { getUserAccounts } from "@/lib/utils/getUserAccounts";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import { getUserCategories } from "@/lib/utils/getUserCategories";
import TransactionFilterSheet from "./TransactionFilterSheet";
import TransactionFilterProvider from "@/contexts/TransactionFilterContext";

type TransactionFiltersProps = {};

const TransactionFilters = async ({}: TransactionFiltersProps) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const session = (await getServerSession(authOptions)) as Session;

  const userAccounts = await getUserAccounts(session.user.id);
  const userTransactionCategories = await getUserCategories(
    session.user.id,
    "ALL"
  );

  return (
    <TransactionFilterProvider
      userAccounts={userAccounts}
      userTransactionCategories={userTransactionCategories}
    >
      <TransactionFilterSheet />
    </TransactionFilterProvider>
  );
};

export default TransactionFilters;
