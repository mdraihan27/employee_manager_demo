"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="relative p-2 rounded-lg bg-white/5 text-gray-400 overflow-hidden cursor-pointer">
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative p-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-foreground transition-colors overflow-hidden cursor-pointer"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          scale: resolvedTheme === "dark" ? 1 : 0,
          rotate: resolvedTheme === "dark" ? 0 : 90,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Moon size={20} />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: resolvedTheme === "light" ? 1 : 0,
          rotate: resolvedTheme === "light" ? 0 : -90,
        }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        <Sun size={20} />
      </motion.div>
    </button>
  );
}
