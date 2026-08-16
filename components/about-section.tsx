"use client";

import { useLanguage } from "./language-provider";
import { hindiUi } from "@/lib/translations";

export function AboutSection() {
  const { language } = useLanguage();
  const hindi = language === "hi";

  return (
    <section className="flex flex-col gap-3 py-3">
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3 text-[13.5px] text-muted">
        <span className="text-[12px]">{hindi ? hindiUi.lastUpdated : "Last updated · 17 Aug 2026"}</span>
      </div>
    </section>
  );
}
