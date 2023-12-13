"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  name: string;
  path: string;
  className?: string;
};

const NavLink = ({ name, path, className }: NavLinkProps) => {
  const pathname = usePathname();

  return (
    <li className={className}>
      <Button asChild variant={"link"}>
        <Link href={path} className={`${pathname === path ? "underline" : ""}`}>
          {name}
        </Link>
      </Button>
    </li>
  );
};

export default NavLink;
