"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DeleteAccountDialogContent from "./DeleteAccountDialogContent";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Dialog } from "@/components/ui/dialog";
import EditAccountDialogContent from "./EditAccountDialogContent";

type RowActionMenuProps = {
  accountId: string;
  accountName: string;
  accountBalance: number;
};

const RowActionMenu = ({
  accountId,
  accountName,
  accountBalance,
}: RowActionMenuProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <div className="w-full flex justify-end">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon height={16} width={16} />
            </Button>
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
            Edit Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setDeleteDialogOpen(true)}>
            Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DeleteAccountDialogContent
          accountId={accountId}
          closeDialog={closeDeleteDialog}
        />
      </Dialog>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <EditAccountDialogContent
          accountId={accountId}
          accountName={accountName}
          accountBalance={accountBalance}
          closeDialog={closeEditDialog}
        />
      </Dialog>
    </>
  );
};

export default RowActionMenu;
