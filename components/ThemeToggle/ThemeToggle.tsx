"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { MoonStar, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function ThemeToggle() {
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
      className={cn("rounded-full", "text-muted-foreground")}
      onClick={handleThemeToggle}
      size="icon"
      variant="ghost"
    >
      {isLight ? (
        <MoonStar className="size-5" aria-label="Switch to dark mode" />
      ) : (
        <Sun className="size-5" aria-label="Switch to light mode" />
      )}
    </Button>
  );
}
