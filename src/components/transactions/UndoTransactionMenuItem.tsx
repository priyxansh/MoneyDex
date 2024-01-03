"use client";

import { undoTransaction } from "@/actions/transaction-actions";
import { ContextMenuItem } from "../ui/context-menu";
import { toast } from "sonner";

type UndoTransactionMenuItemProps = {
  id: string;
};

const UndoTransactionMenuItem = ({ id }: UndoTransactionMenuItemProps) => {
  const onClick = async () => {
    const result = await undoTransaction(id);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
  };

  return <ContextMenuItem onClick={onClick}>Undo Transaction</ContextMenuItem>;
};

export default UndoTransactionMenuItem;
