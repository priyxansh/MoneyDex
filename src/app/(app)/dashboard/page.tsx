import AccountsOverview from "@/components/dashboard/AccountsOverview";
import CategoryChart from "@/components/dashboard/CategoryChart";
import MonthlyOverview from "@/components/dashboard/MonthlyOverview";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

type DashboardProps = {};

const Dashboard = ({}: DashboardProps) => {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      {/* Todo: Wrap in suspense */}
      <section className="mt-4 flex flex-col gap-6 flex-grow">
        <MonthlyOverview />
        <AccountsOverview />
        <RecentTransactions />
        <CategoryChart />
      </section>
    </div>
  );
};

export default Dashboard;
