import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DialogTrigger } from "@/components/ui/dialog";
import DeleteAccountDialog from "./DeleteAccountDialog";

type RowActionMenuProps = {
  accountId: string;
};

const RowActionMenu = ({ accountId }: RowActionMenuProps) => {
  return (
    <DeleteAccountDialog accountId={accountId}>
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
    </DeleteAccountDialog>
  );
};

export default RowActionMenu;
