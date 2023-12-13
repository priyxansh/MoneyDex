import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import NavLink from "./NavLink";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

type NavBarProps = {
  routes: {
    id: number;
    name: string;
    path: string;
  }[];
};

const NavBar = ({ routes }: NavBarProps) => {
  return (
    <div className="flex w-full items-center">
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"} className="mr-4">
              <HamburgerMenuIcon fontSize={18} />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="flex flex-col justify-center">
            <nav>
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
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div className="mr-auto">
        <Link href={"/"} className="flex items-center">
          <span className="text-lg sm:text-xl font-bold">MoneyDex</span>
        </Link>
      </div>
      <nav className="hidden sm:flex items-center">
        <ul className="flex">
          {routes.map((route) => {
            return (
              <NavLink key={route.id} name={route.name} path={route.path} />
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
