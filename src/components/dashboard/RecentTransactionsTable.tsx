import { getTransactionCategoryName } from "@/lib/utils/getTransactionCategoryName";
import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from "@/types/prisma";

type RecentTransactionsTableProps = {
  transactions: Transaction<{
    include: {
      fromAccount: true;
      toAccount: true;
      category: true;
    };
  }>[];
};

const RecentTransactionsTable = ({
  transactions,
}: RecentTransactionsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Account</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className="text-right w-[100px]">Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>
              <p
                className={`font-medium ${
                  transaction.type === "EXPENSE" ||
                  transaction.type === "DIFFERENCE_EXPENSE"
                    ? "text-destructive"
                    : "text-primary"
                }`}
              >
                {transaction.fromAccount.name}
              </p>
              <p className="text-[12px] text-gray-500">
                {getTransactionCategoryName(transaction)}
              </p>
            </TableCell>
            <TableCell
              className={`font-semibold ${
                transaction.type === "EXPENSE" ||
                transaction.type === "DIFFERENCE_EXPENSE"
                  ? "text-destructive"
                  : "text-primary"
              }`}
            >
              ${transaction.amount}
            </TableCell>
            <TableCell className="text-right">
              <p className="text-[12px] text-gray-500">
                {new Date(transaction.createdAt).toTimeString().slice(0, 5)}
              </p>
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell
            className="text-center font-medium cursor-pointer py-0"
            colSpan={3}
          >
            <Link
              href="/transactions"
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

export default RecentTransactionsTable;
