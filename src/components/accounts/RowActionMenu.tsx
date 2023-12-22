"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteAccountButton from "./DeleteAccountButton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

type RowActionMenuProps = {
  accountId: string;
};

const RowActionMenu = ({ accountId }: RowActionMenuProps) => {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <DialogTrigger asChild>
            <DropdownMenuItem>Delete Account</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
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
    </Dialog>
  );
};

export default RowActionMenu;
