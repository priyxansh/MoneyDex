"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";

type SideBarLinkProps = {
  name: string;
  path: string;
};

const SideBarLink = ({ name, path }: SideBarLinkProps) => {
  const pathName = usePathname();

  return (
    <Button
      asChild
      variant={`${pathName === path ? "default" : "ghost"}`}
      className="w-full"
    >
      <Link href={path}>{name}</Link>
    </Button>
  );
};

export default SideBarLink;
