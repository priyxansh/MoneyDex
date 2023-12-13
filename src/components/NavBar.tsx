import Link from "next/link";
import { Button } from "./ui/button";
import ThemeToggler from "./ThemeToggler";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import NavLink from "./NavLink";

type NavBarProps = {
  routes: {
    id: number;
    name: string;
    path: string;
  }[];
};

const NavBar = ({ routes }: NavBarProps) => {
  return (
    <nav className="flex items-center">
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="mr-4">
              <Menu size={18} />
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
      <div className="flex items-center">
        <ThemeToggler />
      </div>
    </nav>
  );
};

export default NavBar;
