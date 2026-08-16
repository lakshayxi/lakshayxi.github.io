import { ProjectReportContent } from "@/components/project-report-content";
import { getStaticProjectMetadata, getStaticProjectReport } from "@/lib/static-project-page";

export const dynamic = "force-static";
export const metadata = getStaticProjectMetadata("glimpse");

export default function GlimpsePage() {
  return <ProjectReportContent report={getStaticProjectReport("glimpse")} />;
}
