import { authOptions } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { Session, getServerSession } from "next-auth";
import { DataTable } from "../ui/data-table";
import { columns } from "./DataTableColumns";

type UserAccountsDisplayProps = {};

const UserAccountsDisplay = async ({}: UserAccountsDisplayProps) => {
  const { user } = (await getServerSession(authOptions)) as Session;

  const userAccounts = await prisma.account.findMany({
    where: {
      user: {
        id: user.id,
      },
    },
  });

  return (
    <section className="mt-4 flex flex-col gap-5">
      <DataTable columns={columns} data={userAccounts} />
    </section>
  );
};

export default UserAccountsDisplay;
