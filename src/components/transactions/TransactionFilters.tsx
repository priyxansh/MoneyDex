import { getUserAccounts } from "@/lib/utils/getUserAccounts";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import { getUserCategories } from "@/lib/utils/getUserCategories";
import TransactionFilterSheet from "./TransactionFilterSheet";
import TransactionFilterProvider from "@/contexts/TransactionFilterContext";

type TransactionFiltersProps = {};

const TransactionFilters = async ({}: TransactionFiltersProps) => {
  const session = (await getServerSession(authOptions)) as Session;

  const userAccounts = await getUserAccounts(session.user.id);
  const userTransactionCategories = await getUserCategories(
    session.user.id,
    "ALL"
  );

  return (
    <section className="mt-4 flex gap-2 flex-wrap">
      <TransactionFilterProvider
        userAccounts={userAccounts}
        userTransactionCategories={userTransactionCategories}
      >
        <TransactionFilterSheet />
      </TransactionFilterProvider>
    </section>
  );
};

export default TransactionFilters;
