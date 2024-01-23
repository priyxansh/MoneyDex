import AccountsOverview from "@/components/dashboard/AccountsOverview";
import CategoryChart from "@/components/dashboard/CategoryChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import TransactionChart from "@/components/dashboard/TransactionChart";

type DashboardProps = {};

const Dashboard = ({}: DashboardProps) => {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      <section className="mt-2 grid grid-cols-2 grid-rows-2">
        <AccountsOverview />
        <TransactionChart />
        <CategoryChart />
        <RecentTransactions />
      </section>
    </div>
  );
};

export default Dashboard;
