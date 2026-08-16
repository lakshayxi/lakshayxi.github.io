"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

export function PopoverButton({ icon, label, panel }: { icon: ReactNode; label: string; panel: ReactNode }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <motion.button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", bounce: 0.6, duration: 0.4 }}
        className="grid h-7 w-7 cursor-pointer place-items-center rounded-full border border-border text-muted transition-colors hover:text-fg"
      >
        {icon}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -6 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.4 }}
            onClick={() => setOpen(false)}
            className="absolute right-0 z-30 mt-2 rounded-xl border border-border bg-bg p-2 shadow-lg"
          >
            {panel}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
