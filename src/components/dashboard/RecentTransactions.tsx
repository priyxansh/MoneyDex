import { Transaction } from "@/types/prisma";
import { getTransactions } from "@/actions/transaction-actions";
import DashboardElementHeading from "./DashboardElementHeading";
import RecentTransactionsTable from "./RecentTransactionsTable";

type RecentTransactionsProps = {};

const RecentTransactions = async ({}: RecentTransactionsProps) => {
  // Todo handle error response
  const { success, data } = await getTransactions({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      fromAccount: true,
      toAccount: true,
      category: true,
    },
    take: 3,
  });

  const transactions = data as Transaction<{
    include: {
      fromAccount: true;
      toAccount: true;
      category: true;
    };
  }>[];

  return (
    <section className="flex flex-col gap-2">
      <DashboardElementHeading title="Recent Transactions" />
      <div className="rounded-lg border-2 overflow-hidden">
        <RecentTransactionsTable transactions={transactions} />
      </div>
    </section>
  );
};

export default RecentTransactions;
