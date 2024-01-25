import { getAccounts } from "@/actions/account-actions";
import DashboardElementHeading from "./DashboardElementHeading";
import AccountsOverviewTable from "./AccountsOverviewTable";

type AccountsOverviewProps = {};

const AccountsOverview = async ({}: AccountsOverviewProps) => {
  const { success, data: accounts } = await getAccounts({
    orderBy: {
      balance: "desc",
    },
    take: 5,
  });

  return (
    <section className="flex flex-col gap-2">
      <DashboardElementHeading title="Accounts Overview" />
      <div className="rounded-lg border-2 overflow-hidden">
        <AccountsOverviewTable accounts={accounts} />
      </div>
    </section>
  );
};

export default AccountsOverview;
