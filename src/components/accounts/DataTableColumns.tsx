"use client";

import { ColumnDef } from "@tanstack/react-table";
import RowActionMenu from "./RowActionMenu";

export type Account = {
  id: string;
  name: string;
  balance: number;
};

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "name",
    header: "Account Name",
  },
  {
    accessorKey: "balance",
    header: () => {
      return <div className="text-right font-medium">Account Balance</div>;
    },
    cell: ({ row }) => {
      const balance = parseFloat(row.getValue("balance"));

      const formatted = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(balance);

      return (
        <div
          className={`text-right font-medium ${
            balance === 0
              ? ""
              : balance > 0
              ? "text-primary"
              : "text-destructive"
          }`}
        >
          {formatted}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const account = row.original;

      return (
        <RowActionMenu
          accountId={account.id}
          accountName={account.name}
          accountBalance={account.balance}
        />
      );
    },
  },
];
