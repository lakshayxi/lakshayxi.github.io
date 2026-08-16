"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import { Check, Copy } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { hindiUi } from "@/lib/translations";
import { useLanguage } from "./language-provider";
import { ThemeSwitcher } from "./theme-switcher";
import { LanguageSwitcher } from "./language-switcher";

export function NavBar() {
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();
  const hindi = language === "hi";

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <header className="flex flex-col gap-4 pt-8 pb-4 sm:pt-10">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <span className="text-lg font-medium tracking-tighter">{siteConfig.fullName}</span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
      <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {siteConfig.social.map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="group relative cursor-pointer text-[13.5px] text-muted"
            whileHover="hover"
            initial="rest"
          >
            <motion.span className="relative z-10" variants={{ rest: { color: "var(--muted)" }, hover: { color: "var(--fg)" } }}>
              {link.label}
            </motion.span>
            <motion.span
              className="absolute -bottom-0.5 left-0 h-px bg-fg"
              variants={{ rest: { width: 0 }, hover: { width: "100%" } }}
              transition={{ type: "spring", bounce: 0.35, duration: 0.4 }}
            />
          </motion.a>
        ))}
        <motion.button
          type="button"
          onClick={copyEmail}
          title={siteConfig.email}
          className="group flex cursor-pointer items-center gap-1.5 text-[13.5px] text-muted"
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.4 }}
        >
          <span className="relative grid h-3.5 w-3.5 place-items-center">
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span key="check" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }} className="absolute inset-0 grid place-items-center text-emerald-500">
                  <Check size={16} strokeWidth={2} />
                </motion.span>
              ) : (
                <motion.span key="copy" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }} className="absolute inset-0 grid place-items-center text-muted group-hover:text-fg">
                  <Copy size={12} strokeWidth={2} />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
          <span className="underline decoration-border underline-offset-4 group-hover:decoration-fg">{copied ? (hindi ? hindiUi.copied : "Copied!") : (hindi ? hindiUi.copyEmail : "Copy email")}</span>
        </motion.button>
      </nav>
    </header>
  );
}
