"use client";

import { ArrowLeft } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { WorkSection } from "./work-section";
import { siteConfig } from "@/lib/config";

export function ExperiencePageContent() {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-2xl px-5 py-8 sm:px-7 sm:py-12">
      <header className="flex items-start justify-between gap-4 border-b border-border pb-6">
        <div>
          <a href={`${siteConfig.basePath}/`} className="mb-7 inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-fg">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
            Home
          </a>
          <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">Experience</h1>
        </div>
        <ThemeSwitcher />
      </header>

      <WorkSection showHeading={false} />

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6 text-[12px] text-muted">
        <a href={`${siteConfig.basePath}/projects/`} className="underline decoration-border underline-offset-4 hover:text-fg hover:decoration-fg">
          Projects →
        </a>
        <a href={`mailto:${siteConfig.email}`} className="underline decoration-border underline-offset-4 hover:text-fg hover:decoration-fg">{siteConfig.email}</a>
      </footer>
    </main>
  );
}
