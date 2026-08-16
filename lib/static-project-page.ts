import type { Metadata } from "next";
import { getProjectReport } from "@/lib/project-reports";
import { siteConfig } from "@/lib/config";

export function getStaticProjectReport(slug: string) {
  const report = getProjectReport(slug);
  if (!report) throw new Error(`Unknown project report: ${slug}`);
  return report;
}

export function getStaticProjectMetadata(slug: string): Metadata {
  const report = getStaticProjectReport(slug);

  return {
    title: `${report.name} - Project Report`,
    description: report.answer,
    alternates: { canonical: `${siteConfig.basePath}/projects/${report.slug}/` },
    openGraph: {
      type: "article",
      url: `${siteConfig.basePath}/projects/${report.slug}/`,
      siteName: `${siteConfig.fullName} - Portfolio`,
      title: `${report.name} - Project Report`,
      description: report.answer,
      images: [
        {
          url: `${siteConfig.basePath}/og.png`,
          width: 1200,
          height: 630,
          alt: `${siteConfig.fullName} - Data science, research, and systems`,
        },
      ],
    },
  };
}
