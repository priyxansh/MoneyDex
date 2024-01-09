"use client";

import { useState } from "react";
import { Dialog } from "../ui/dialog";
import EditCategoryDialogContent from "./EditCategoryDialogContent";

import { TransactionCategoryType } from "@/types/prisma";

type EditCategoryDialogProps = {
  children: React.ReactNode;
  id: string;
  name: string;
  type: TransactionCategoryType;
};

const EditCategoryDialog = ({
  children,
  id,
  name,
  type,
}: EditCategoryDialogProps) => {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <EditCategoryDialogContent
        id={id}
        name={name}
        type={type}
        closeDialog={closeDialog}
      />
    </Dialog>
  );
};

export default EditCategoryDialog;
