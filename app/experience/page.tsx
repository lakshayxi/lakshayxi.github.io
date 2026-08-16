import type { Metadata } from "next";
import { ExperiencePageContent } from "@/components/experience-page-content";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Experience",
  description: "Research, engineering, and quantitative work by Lakshay Saini.",
  alternates: { canonical: `${siteConfig.basePath}/experience/` },
  openGraph: {
    type: "website",
    url: `${siteConfig.basePath}/experience/`,
    siteName: `${siteConfig.fullName} - Portfolio`,
    title: `Experience - ${siteConfig.fullName}`,
    description: "Research, engineering, and quantitative work by Lakshay Saini.",
    images: [
      {
        url: `${siteConfig.basePath}/og.png`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.fullName} - Experience`,
      },
    ],
  },
};

export default function ExperiencePage() {
  return <ExperiencePageContent />;
}
