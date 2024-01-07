"use client";

import { Button } from "../ui/button";
import UndoTransactionButton from "./UndoTransactionButton";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type UndoTransactionDialogContentProps = {
  closeDialog: () => void;
  transactionId: string;
};

const UndoTransactionDialogContent = ({
  closeDialog,
  transactionId,
}: UndoTransactionDialogContentProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>This will undo this transaction.</DialogDescription>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center sm:justify-end mt-2">
          <DialogClose asChild>
            <Button variant="secondary" className="w-full sm:w-auto">
              Cancel
            </Button>
          </DialogClose>
          <UndoTransactionButton
            closeDialog={closeDialog}
            transactionId={transactionId}
          />
        </div>
      </DialogHeader>
    </DialogContent>
  );
};

export default UndoTransactionDialogContent;
