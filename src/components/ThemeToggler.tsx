"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

type ThemeTogglerProps = {
  className?: string;
};

const ThemeToggler = ({ className }: ThemeTogglerProps) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      variant={"ghost"}
      size={"icon"}
      className={className}
    >
      <MoonIcon className="hidden dark:block h-[18px] w-[18px]" />
      <SunIcon className="dark:hidden h-[18px] w-[18px]" />
    </Button>
  );
};

export default ThemeToggler;
