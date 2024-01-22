import { DataTable } from "../ui/data-table";
import { columns } from "./DataTableColumns";
import { getAccounts } from "@/actions/account-actions";

type UserAccountsDisplayProps = {};

const UserAccountsDisplay = async ({}: UserAccountsDisplayProps) => {
  const { data: accounts } = await getAccounts({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <section className="mt-4 flex flex-col gap-5">
      <DataTable columns={columns} data={accounts} />
    </section>
  );
};

export default UserAccountsDisplay;
