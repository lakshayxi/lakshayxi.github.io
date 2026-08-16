import type { Metadata } from "next";
import { NavBar } from "@/components/nav-bar";
import { AboutSection } from "@/components/about-section";
import { HomeIntro } from "@/components/home-intro";
import { HomeSectionLinks } from "@/components/home-section-links";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  alternates: { canonical: `${siteConfig.basePath}/` },
};

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 py-6 sm:px-7 sm:py-10">
      <NavBar />
      <HomeIntro />
      <HomeSectionLinks />
      <AboutSection />
    </main>
  );
}
