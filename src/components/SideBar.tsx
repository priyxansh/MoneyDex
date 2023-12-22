import UserAvatar from "./UserAvatar";
import ThemeToggler from "./ThemeToggler";
import Link from "next/link";
import { Button } from "./ui/button";
import SideBarLink from "./SideBarLink";
import SideBarSeparator from "./SideBarSeparator";
import { PlusIcon } from "@radix-ui/react-icons";
import SideBarUserProfile from "./SideBarUserProfile";

type SideBarProps = {};

const SideBar = async ({}: SideBarProps) => {
  const sideBarRoutes = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Transactions",
      path: "/transactions",
    },
    {
      id: 3,
      name: "Accounts",
      path: "/accounts",
    },
  ];

  return (
    <aside className="py-4 px-4 bg-background hidden sm:flex flex-col gap-6 rounded-r-xl border-r shadow-md h-screen sticky top-0">
      <div className="w-full flex justify-center items-center relative">
        <ThemeToggler className="mr-auto" />
        <Link
          href={"/"}
          className="flex items-center absolute left-1/2 -translate-x-1/2"
        >
          <h2 className="text-lg sm:text-xl font-bold">MoneyDex</h2>
        </Link>
      </div>
      <div className="w-full flex flex-col items-center gap-3">
        {sideBarRoutes.map((route) => (
          <SideBarLink key={route.id} name={route.name} path={route.path} />
        ))}
        <SideBarSeparator />
        <Button
          variant={"outline"}
          asChild
          className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Link href={"/transactions/new"}>
            <PlusIcon className="w-5 h-5 mr-2" />
            <span>New Transaction</span>
          </Link>
        </Button>
      </div>
      <div className="mt-auto">
        <SideBarSeparator className="my-3" />
        <div className="flex gap-3 items-center justify-center">
          <UserAvatar className="h-8 w-8 mr-auto" />
          <SideBarUserProfile />
        </div>
        <div className="flex items-center justify-center mt-3"></div>
      </div>
    </aside>
  );
};

export default SideBar;
