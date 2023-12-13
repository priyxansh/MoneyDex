import Link from "next/link";
import { Button } from "./ui/button";
import ThemeToggler from "./ThemeToggler";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import NavLink from "./NavLink";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import UserAvatarMenu from "./UserAvatarMenu";

type NavBarProps = {
  routes: {
    id: number;
    name: string;
    path: string;
  }[];
};

const NavBar = async ({ routes }: NavBarProps) => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="flex items-center">
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="mr-4">
              <HamburgerMenuIcon fontSize={18} />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="flex flex-col justify-center">
            <ul className="flex flex-col gap-2">
              {routes.map((route) => {
                return (
                  <NavLink
                    key={route.id}
                    name={route.name}
                    path={route.path}
                    className="flex justify-center"
                  />
                );
              })}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
      <div className="mr-auto">
        <Link href={"/"} className="flex items-center">
          <span className="text-lg sm:text-xl font-bold">MoneyDex</span>
        </Link>
      </div>
      <ul className="hidden sm:flex">
        {routes.map((route) => {
          return <NavLink key={route.id} name={route.name} path={route.path} />;
        })}
      </ul>
      <div className="flex items-center gap-3">
        <ThemeToggler />
        {session && <UserAvatarMenu />}
      </div>
    </nav>
  );
};

export default NavBar;
