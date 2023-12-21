"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

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

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const account = row.original;

      return (
        <DropdownMenu>
          <div className="w-full flex justify-end">
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon height={16} width={16} />
              </Button>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link
                href={`/accounts/${account.id}`}
                className="w-full cursor-pointer"
              >
                Edit Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete Account</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
