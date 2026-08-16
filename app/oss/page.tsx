import type { Metadata } from "next";
import { OssPageContent } from "@/components/oss-page-content";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Open Source",
  description: "Open source contributions by Lakshay Saini across developer tools, machine learning systems, and research software.",
  alternates: { canonical: `${siteConfig.basePath}/oss/` },
  openGraph: {
    type: "website",
    url: `${siteConfig.basePath}/oss/`,
    siteName: `${siteConfig.fullName} - Portfolio`,
    title: `Open Source - ${siteConfig.fullName}`,
    description: "A concise record of merged, approved, and open source contributions by Lakshay Saini.",
    images: [{ url: `${siteConfig.basePath}/og.png`, width: 1200, height: 630, alt: `${siteConfig.fullName} - Open source contributions` }],
  },
};

export default function OssPage() {
  return <OssPageContent />;
}
