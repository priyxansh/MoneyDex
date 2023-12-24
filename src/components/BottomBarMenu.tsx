"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import SignOutButton from "./SignOutButton";
import DropDownThemeToggler from "./DropDownThemeToggler";
import Link from "next/link";

type BottomBarMenuProps = {};

const BottomBarMenu = ({}: BottomBarMenuProps) => {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex-grow flex flex-col h-auto justify-center items-center py-2 px-2 "
        >
          <DotsHorizontalIcon />
          <span className="text-[8px] leading-normal">More</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-[250px]">
        <DropdownMenuLabel className="flex items-center gap-4">
          <UserAvatar className="h-8 w-8" />
          <div className="flex flex-col">
            <span className="font-medium">{session?.user.name}</span>
            <span className="text-gray-500 text-sm break-all">
              {session?.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/categories"}>Categories</Link>
          </DropdownMenuItem>
          <DropDownThemeToggler />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BottomBarMenu;
