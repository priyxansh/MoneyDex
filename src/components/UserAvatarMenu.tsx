import UserAvatar from "./UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import SignOutButton from "./SignOutButton";

type UserAvatarMenuProps = {};

const UserAvatarMenu = async ({}: UserAvatarMenuProps) => {
  const session = await getServerSession(authOptions);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="rounded-full p-0 w-auto h-auto">
          <UserAvatar />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side={"bottom"} align={"end"}>
        <DropdownMenuLabel className="flex flex-col">
          <span className="font-bold">{session?.user.name}</span>
          <span className="text-gray-500 text-sm">{session?.user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatarMenu;
