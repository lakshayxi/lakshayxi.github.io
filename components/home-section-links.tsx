"use client";

import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { hindiUi } from "@/lib/translations";
import { useLanguage } from "./language-provider";

export function HomeSectionLinks() {
  const { language } = useLanguage();
  const hindi = language === "hi";
  const links = [
    { label: hindi ? hindiUi.experience : "Experience", href: `${siteConfig.basePath}/experience/`, description: hindi ? "काम और research" : "Work and research" },
    { label: hindi ? hindiUi.projects : "Projects", href: `${siteConfig.basePath}/projects/`, description: hindi ? "बनाए गए tools और reports" : "Tools and reports" },
  ];

  return (
    <nav aria-label={hindi ? "मुख्य sections" : "Main sections"} className="py-3">
      <div className="border-t border-border">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="group flex items-center justify-between gap-4 border-b border-border px-2 py-4 transition-colors hover:bg-accent"
          >
            <span>
              <span className="block text-[15px] font-medium">{link.label}</span>
              <span className="mt-1 block text-[13px] text-muted">{link.description}</span>
            </span>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" strokeWidth={1.75} />
          </a>
        ))}
      </div>
    </nav>
  );
}
