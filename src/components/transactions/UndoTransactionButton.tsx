"use client";

import { undoTransaction } from "@/actions/transaction-actions";
import { Button } from "../ui/button";
import { toast } from "sonner";

type UndoTransactionButtonProps = {
  transactionId: string;
  closeDialog: () => void;
};

const UndoTransactionButton = ({
  transactionId,
  closeDialog,
}: UndoTransactionButtonProps) => {
  const onClick = async () => {
    const result = await undoTransaction(transactionId);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    closeDialog();
  };

  return (
    <Button
      variant={"destructive"}
      className="w-full sm:w-auto"
      onClick={onClick}
    >
      Confirm
    </Button>
  );
};

export default UndoTransactionButton;
