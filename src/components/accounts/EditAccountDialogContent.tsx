"use client";

import EditAccountForm from "./EditAccountForm";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type EditAccountDialogContentProps = {
  accountId: string;
  accountName: string;
  accountBalance: number;
  closeDialog: () => void;
};

const EditAccountDialogContent = ({
  accountId,
  accountName,
  accountBalance,
  closeDialog,
}: EditAccountDialogContentProps) => {
  return (
    <DialogContent className="max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Edit Account</DialogTitle>
        <DialogDescription>
          Edit <span className="font-semibold text-primary">{accountName}</span>{" "}
          Account here. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <EditAccountForm
        accountId={accountId}
        accountName={accountName}
        accountBalance={accountBalance}
        closeDialog={closeDialog}
      />
    </DialogContent>
  );
};

export default EditAccountDialogContent;
