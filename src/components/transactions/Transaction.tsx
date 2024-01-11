import Link from "next/link";
import { Button } from "../ui/button";
import { DialogTrigger } from "../ui/dialog";
import UndoTransactionDialog from "./UndoTransactionDialog";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";

import { Transaction } from "@/types/prisma";

type TransactionProps = {
  transaction: Transaction;
};

const returnCategoryName = ({
  fromAccount,
  toAccount,
  type,
  category,
}: Transaction) => {
  if (type === "TRANSFER") {
    return `${fromAccount.name} -> ${toAccount?.name}`;
  }

  if (type === "DIFFERENCE_EXPENSE" || type === "DIFFERENCE_INCOME") {
    return `Difference`;
  }

  return category ? category.name : `General`;
};

const Transaction = ({ transaction }: TransactionProps) => {
  const { id, fromAccount, type, amount, createdAt } = transaction;

  return (
    <UndoTransactionDialog transactionId={id}>
      <ContextMenu>
        <ContextMenuTrigger>
          <Button
            variant={"ghost"}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 py-2 sm:py-4 whitespace-normal h-full"
            asChild
          >
            <Link href={`/transactions/${fromAccount.id}`}>
              <div className="flex flex-col sm:grid grid-cols-2 sm:col-span-2">
                <span className="text-sm text-left text-primary">
                  {fromAccount.name}
                </span>
                <span className="sm:text-sm text-[12px] text-gray-500 line-clamp-2 break-words">
                  {returnCategoryName(transaction)}
                </span>
              </div>
              <span
                className={`text-sm font-semibold text-center sm:text-right ${
                  type === "EXPENSE" || type === "DIFFERENCE_EXPENSE"
                    ? "text-destructive"
                    : "text-primary"
                }`}
              >
                {type === "EXPENSE" || type === "DIFFERENCE_EXPENSE" ? "-" : ""}
                ${amount}
              </span>
              <span className="text-sm text-right text-gray-500">
                {new Date(createdAt).toTimeString().slice(0, 5)}
              </span>
            </Link>
          </Button>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <DialogTrigger asChild>
            <ContextMenuItem>Undo Transaction</ContextMenuItem>
          </DialogTrigger>
        </ContextMenuContent>
      </ContextMenu>
    </UndoTransactionDialog>
  );
};

export default Transaction;
