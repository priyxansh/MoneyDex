"use client";

import { deleteAccount } from "@/actions/account-actions";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";

type DeleteAccountButtonProps = {
  accountId: string;
  closeDialog: () => void;
};

const DeleteAccountButton = ({
  accountId,
  closeDialog,
}: DeleteAccountButtonProps) => {
  const [pending, setPending] = useState(false);

  const onClick = async () => {
    setPending(true);

    const result = await deleteAccount(accountId);

    if (!result.success) {
      toast.error(result.message);
      setPending(false);
      return;
    }

    toast.success(result.message);
    setPending(false);
    closeDialog();
  };

  return (
    <Button
      variant="destructive"
      className="w-full sm:w-auto"
      onClick={onClick}
      disabled={pending}
    >
      {pending ? "Deleting Account..." : "Delete Account"}
    </Button>
  );
};

export default DeleteAccountButton;
