"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore, type ReactNode } from "react";
import { siteConfig } from "@/lib/config";

export type Language = "en" | "hi";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  text: (english: string, hindi: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const languageStorageKey = "portfolio-language";
const languageChangeEvent = "portfolio-language-change";

function normalizedPath(path: string) {
  const normalized = path.replace(/\/+$/, "");
  return normalized || "/";
}

function isHomePage() {
  return normalizedPath(window.location.pathname) === normalizedPath(`${siteConfig.basePath}/`);
}

function languageFromUrl(): Language | null {
  const value = new URLSearchParams(window.location.search).get("lang");
  return value === "hi" || value === "en" ? value : null;
}

function getLanguageSnapshot(): Language {
  if (!isHomePage()) return "en";
  const urlLanguage = languageFromUrl();
  if (urlLanguage) return urlLanguage;
  return window.localStorage.getItem(languageStorageKey) === "hi" ? "hi" : "en";
}

function getServerLanguageSnapshot(): Language {
  return "en";
}

function subscribeToLanguage(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === languageStorageKey) onStoreChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(languageChangeEvent, onStoreChange);
  window.addEventListener("popstate", onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(languageChangeEvent, onStoreChange);
    window.removeEventListener("popstate", onStoreChange);
  };
}

function setStoredLanguage(nextLanguage: Language) {
  window.localStorage.setItem(languageStorageKey, nextLanguage);

  if (isHomePage()) {
    const url = new URL(window.location.href);
    if (nextLanguage === "hi") url.searchParams.set("lang", "hi");
    else url.searchParams.delete("lang");
    window.history.replaceState(window.history.state, "", url);
  }

  window.dispatchEvent(new Event(languageChangeEvent));
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(
    subscribeToLanguage,
    getLanguageSnapshot,
    getServerLanguageSnapshot,
  );

  useEffect(() => {
    document.documentElement.lang = language === "hi" ? "hi" : "en";

    const urlLanguage = languageFromUrl();
    if (isHomePage() && urlLanguage) {
      window.localStorage.setItem(languageStorageKey, urlLanguage);
    }
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage: setStoredLanguage, text: (english: string, hindi: string) => language === "hi" ? hindi : english }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
