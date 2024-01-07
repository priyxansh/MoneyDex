"use client";

import { useState } from "react";
import { Dialog } from "../ui/dialog";
import UndoTransactionDialogContent from "./UndoTransactionDialogContent";

type UndoTransactionDialogProps = {
  children: React.ReactNode;
  transactionId: string;
};

const UndoTransactionDialog = ({
  children,
  transactionId,
}: UndoTransactionDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <UndoTransactionDialogContent
        closeDialog={closeDialog}
        transactionId={transactionId}
      />
    </Dialog>
  );
};

export default UndoTransactionDialog;
