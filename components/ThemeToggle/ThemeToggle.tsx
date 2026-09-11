"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { MoonStar, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type ThemeToggleProps = {
  size?: "default" | "lg";
};

export default function ThemeToggle({ size = "default" }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  const isLight = useMemo(() => resolvedTheme === "light", [resolvedTheme]);

  useEffect(() => {
    function handleSetMounted() {
      setMounted(true);
    }

    handleSetMounted();
  }, []);

  const handleThemeToggle = () => {
    if (isLight) {
      setTheme("dark");
      return;
    }

    setTheme("light");
  };

  if (!mounted) {
    return null;
  }

  return (
    <Button
      className={cn(
        "rounded-full",
        "text-muted-foreground",
        "hover:bg-transparent!",
        "hover:text-primary",
      )}
      onClick={handleThemeToggle}
      size="icon"
      variant="ghost"
    >
      {isLight ? (
        <MoonStar
          data-size={size}
          className="data-[size=default]:size-5 data-[size=lg]:size-7"
          aria-label="Switch to dark mode"
        />
      ) : (
        <Sun
          data-size={size}
          className="data-[size=default]:size-5 data-[size=lg]:size-7"
          aria-label="Switch to light mode"
        />
      )}
    </Button>
  );
}
