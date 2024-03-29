import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Account } from "@/types/prisma";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type AccountsOverviewTableProps = {
  accounts: Account<{}>[];
};

const AccountsOverviewTable = ({ accounts }: AccountsOverviewTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Account</TableHead>
          <TableHead className="text-right">Balance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {accounts.map((account) => (
          <TableRow key={account.id}>
            <TableCell className="font-medium">{account.name}</TableCell>
            <TableCell className="text-right text-primary font-semibold">
              ${account.balance}
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell
            className="text-center font-medium cursor-pointer py-0"
            colSpan={2}
          >
            <Link
              href="/accounts"
              className="w-full py-4 flex gap-2 items-center justify-center text-primary font-medium"
            >
              <span>View All</span>
              <span>
                <ArrowRightIcon className="w-4 h-4" />
              </span>
            </Link>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default AccountsOverviewTable;
