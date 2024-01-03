"use client";

import { undoTransaction } from "@/actions/transaction-actions";
import { ContextMenuItem } from "../ui/context-menu";
import { useToast } from "../ui/use-toast";

type UndoTransactionMenuItemProps = {
  id: string;
};

const UndoTransactionMenuItem = ({ id }: UndoTransactionMenuItemProps) => {
  const { toast } = useToast();

  const onClick = async () => {
    const result = await undoTransaction(id);

    if (result?.error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: result.error.message,
      });
      return;
    }

    toast({
      title: "Success",
      description: "Transaction has been undone.",
    });
  };

  return <ContextMenuItem onClick={onClick}>Undo Transaction</ContextMenuItem>;
};

export default UndoTransactionMenuItem;
