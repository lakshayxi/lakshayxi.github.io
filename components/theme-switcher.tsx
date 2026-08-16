"use client";

import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeSwitcher() {
  const { theme, setThemeId } = useTheme();
  const dark = theme.id === "ink";

  return (
    <motion.button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={!dark}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setThemeId(dark ? "paper" : "ink")}
      whileHover={{ rotate: dark ? 18 : -18, scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", bounce: 0.5, duration: 0.4 }}
      className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-border text-muted transition-colors hover:text-fg"
    >
      {dark ? <Sun className="h-3.5 w-3.5" strokeWidth={1.75} /> : <Moon className="h-3.5 w-3.5" strokeWidth={1.75} />}
    </motion.button>
  );
}
