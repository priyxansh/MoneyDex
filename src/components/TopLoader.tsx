"use client";

import { useTheme } from "next-themes";
import NextTopLoader from "nextjs-toploader";

type TopLoaderProps = {};

const TopLoader = ({}: TopLoaderProps) => {
  const { theme } = useTheme();
  return (
    <NextTopLoader
      color={theme === "dark" ? "hsl(227 44% 71%)" : "hsl(225 60% 30%)"}
    />
  );
};

export default TopLoader;
