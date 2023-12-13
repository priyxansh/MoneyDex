"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

type ThemeTogglerProps = {};

const ThemeToggler = ({}: ThemeTogglerProps) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button onClick={toggleTheme} variant={"ghost"} size={"icon"}>
      {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
    </Button>
  );
};

export default ThemeToggler;
