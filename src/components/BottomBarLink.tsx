"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

type BottomBarLinkProps = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

const BottomBarLink = ({ name, path, icon }: BottomBarLinkProps) => {
  const pathName = usePathname();

  return (
    <Button
      variant={"ghost"}
      asChild
      className={`flex-grow flex flex-col h-auto justify-center items-center py-2 px-2 ${pathName===path ? "text-primary bg-accent hover:text-primary":""}`}
    >
      <Link href={path}>
        {icon}
        <span className="text-[8px] leading-normal">{name}</span>
      </Link>
    </Button>
  );
};

export default BottomBarLink;
