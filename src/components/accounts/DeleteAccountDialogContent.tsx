"use client";

import { Button } from "../ui/button";
import DeleteAccountButton from "./DeleteAccountButton";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type DeleteAccountDialogContentProps = {
  accountId: string;
  closeDialog: () => void;
};

const DeleteAccountDialogContent = ({
  accountId,
  closeDialog,
}: DeleteAccountDialogContentProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          This will also delete all transactions related to this account.
        </DialogDescription>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center sm:justify-end mt-2">
          <DialogClose asChild>
            <Button variant="secondary" className="w-full sm:w-auto">
              Cancel
            </Button>
          </DialogClose>
          <DeleteAccountButton
            accountId={accountId}
            closeDialog={closeDialog}
          />
        </div>
      </DialogHeader>
    </DialogContent>
  );
};

export default DeleteAccountDialogContent;
