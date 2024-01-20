import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import SignOutButton from "./SignOutButton";
import DropDownThemeToggler from "./DropDownThemeToggler";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import BottomBarUserProfile from "./BottomBarUserProfile";

type BottomBarMenuProps = {};

const BottomBarMenu = ({}: BottomBarMenuProps) => {
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
          <Suspense fallback={<Skeleton className="w-56 h-10" />}>
            <BottomBarUserProfile />
          </Suspense>
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
