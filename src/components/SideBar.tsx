import { Session, getServerSession } from "next-auth";
import UserAvatar from "./UserAvatar";
import { authOptions } from "@/lib/next-auth";
import ThemeToggler from "./ThemeToggler";
import Link from "next/link";
import { Button } from "./ui/button";
import SideBarLink from "./SideBarLink";
import SideBarSeparator from "./SideBarSeparator";
import { PlusIcon } from "@radix-ui/react-icons";

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

  const session = (await getServerSession(authOptions)) as Session;

  return (
    <aside className="dark:bg-black/20 bg-white/20 py-4 px-3 hidden sm:flex flex-col gap-6 rounded-r-xl border-r shadow-md w-full">
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
        <SideBarSeparator className="my-3"/>
        <div className="flex gap-3 items-center justify-center">
          <UserAvatar className="h-8 w-8" />
          <div>
            <p className="font-medium text-base">{session.user.name}</p>
            <p className="text-sm text-gray-500 break-all">
              {session.user.email}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center mt-3"></div>
      </div>
    </aside>
  );
};

export default SideBar;
