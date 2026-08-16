"use client";

import { useLanguage } from "./language-provider";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const hindi = language === "hi";

  return (
    <div
      role="group"
      aria-label="Choose language"
      className="grid h-8 grid-cols-2 overflow-hidden rounded-full border border-border bg-bg p-0.5 text-[11.5px] font-medium"
    >
      <button
        type="button"
        lang="en"
        aria-label="Read in English"
        aria-pressed={!hindi}
        onClick={() => setLanguage("en")}
        className={`min-w-9 rounded-full px-2 transition-colors ${!hindi ? "bg-accent text-fg" : "text-muted hover:text-fg"}`}
      >
        EN
      </button>
      <button
        type="button"
        lang="hi"
        aria-label="हिंदी में पढ़ें"
        aria-pressed={hindi}
        onClick={() => setLanguage("hi")}
        className={`min-w-12 rounded-full px-2 transition-colors ${hindi ? "bg-accent text-fg" : "text-muted hover:text-fg"}`}
      >
        हिंदी
      </button>
    </div>
  );
}
