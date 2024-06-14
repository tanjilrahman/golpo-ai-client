"use client";

import { Switch } from "@nextui-org/react";
import { FaMoon, FaRegSun } from "react-icons/fa";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <Switch
        color="secondary"
        isSelected={theme === "dark"}
        onValueChange={() =>
          theme === "dark" ? setTheme("light") : setTheme("dark")
        }
        size="sm"
        startContent={<FaRegSun />}
        endContent={<FaMoon />}
      ></Switch>
    </div>
  );
}
