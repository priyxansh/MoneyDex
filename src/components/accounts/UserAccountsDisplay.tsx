import { authOptions } from "@/lib/next-auth";
import { Session, getServerSession } from "next-auth";
import { DataTable } from "../ui/data-table";
import { columns } from "./DataTableColumns";
import { getUserAccounts } from "@/lib/utils/getUserAccounts";

type UserAccountsDisplayProps = {};

const UserAccountsDisplay = async ({}: UserAccountsDisplayProps) => {
  const { user } = (await getServerSession(authOptions)) as Session;

  const userAccounts = await getUserAccounts(user.id);

  return (
    <section className="mt-4 flex flex-col gap-5">
      <DataTable columns={columns} data={userAccounts} />
    </section>
  );
};

export default UserAccountsDisplay;
