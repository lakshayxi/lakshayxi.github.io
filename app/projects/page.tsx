import type { Metadata } from "next";
import { ProjectsPageContent } from "@/components/projects-page-content";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Projects & Reports",
  description: "Project write-ups, technical documentation, validation records, and evaluation reports by Lakshay Saini.",
  alternates: { canonical: `${siteConfig.basePath}/projects/` },
  openGraph: {
    type: "website",
    url: `${siteConfig.basePath}/projects/`,
      siteName: `${siteConfig.fullName} - Portfolio`,
      title: `Projects & Reports - ${siteConfig.fullName}`,
    description: "Project write-ups, technical documentation, validation records, and evaluation reports by Lakshay Saini.",
    images: [{ url: `${siteConfig.basePath}/og.png`, width: 1200, height: 630, alt: `${siteConfig.fullName} - Data science, research, and systems` }],
  },
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
