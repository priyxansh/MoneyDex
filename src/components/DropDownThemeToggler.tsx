"use client"

import { useTheme } from "next-themes";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { useState } from "react";

type DropDownThemeTogglerProps = {};

const DropDownThemeToggler = ({}: DropDownThemeTogglerProps) => {

    const { theme, setTheme } = useTheme();

  const [checked, setChecked] = useState(theme === "dark");

    return(
        <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
            <Label
              htmlFor="dark-mode-switch"
              className="font-normal flex justify-between items-center cursor-pointer"
            >
              <span>Dark Mode</span>
              <Switch
                id="dark-mode-switch"
                checked={checked}
                onCheckedChange={(e) => {
                  setChecked(e);
                  setTheme(e ? "dark" : "light");
                }}
              />
            </Label>
          </DropdownMenuItem>
    )
}

export default DropDownThemeToggler;