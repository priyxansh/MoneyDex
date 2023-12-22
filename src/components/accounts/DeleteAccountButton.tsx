"use client";

import { deleteAccount } from "@/actions/account-actions";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useState } from "react";

type DeleteAccountButtonProps = {
  accountId: string;
  closeDialog: () => void;
};

const DeleteAccountButton = ({
  accountId,
  closeDialog,
}: DeleteAccountButtonProps) => {
  const { toast } = useToast();

  const [pending, setPending] = useState(false);

  const onClick = async () => {
    setPending(true);

    const result = await deleteAccount(accountId);

    if (result?.error) {
      setPending(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error.message,
      });
      return;
    }

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
