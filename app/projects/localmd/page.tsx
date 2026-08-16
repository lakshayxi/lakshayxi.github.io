import { ProjectReportContent } from "@/components/project-report-content";
import { getStaticProjectMetadata, getStaticProjectReport } from "@/lib/static-project-page";

export const dynamic = "force-static";
export const metadata = getStaticProjectMetadata("localmd");

export default function LocalMDPage() {
  return <ProjectReportContent report={getStaticProjectReport("localmd")} />;
}
