"use client";

import { useState } from "react";
import { Dialog } from "../ui/dialog";
import DeleteAccountDialogContent from "./DeleteAccountDialogContent";

type DeleteAccountDialogProps = {
  children: React.ReactNode;
  accountId: string;
};

const DeleteAccountDialog = ({
  children,
  accountId,
}: DeleteAccountDialogProps) => {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DeleteAccountDialogContent
        accountId={accountId}
        closeDialog={closeDialog}
      />
    </Dialog>
  );
};

export default DeleteAccountDialog;
