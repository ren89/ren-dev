"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative overflow-hidden rounded-full"
    >
      {/* Cross-fade/rotate the two icons. Until mounted, render a stable
          placeholder so server and client markup match. */}
      <Sun
        className={cnIcon(mounted && !isDark)}
        aria-hidden="true"
      />
      <Moon
        className={cnIcon(mounted && isDark)}
        aria-hidden="true"
      />
    </Button>
  );
}

/** Positions one icon; visible + upright only when `active`. */
function cnIcon(active: boolean) {
  return [
    "absolute h-[1.15rem] w-[1.15rem] transition-all duration-300",
    active
      ? "rotate-0 scale-100 opacity-100"
      : "rotate-90 scale-0 opacity-0",
  ].join(" ");
}
