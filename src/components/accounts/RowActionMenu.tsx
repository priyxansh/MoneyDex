"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import DeleteAccountDialogContent from "./DeleteAccountDialogContent";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

type RowActionMenuProps = {
  accountId: string;
};

const RowActionMenu = ({ accountId }: RowActionMenuProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
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
          <DropdownMenuItem asChild>
            <Link
              href={`/accounts/${accountId}`}
              className="w-full cursor-pointer"
            >
              Edit Account
            </Link>
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
    </>
  );
};

export default RowActionMenu;
