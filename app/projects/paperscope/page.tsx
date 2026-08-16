import { ProjectReportContent } from "@/components/project-report-content";
import { getStaticProjectMetadata, getStaticProjectReport } from "@/lib/static-project-page";

export const dynamic = "force-static";
export const metadata = getStaticProjectMetadata("paperscope");

export default function PaperScopePage() {
  return <ProjectReportContent report={getStaticProjectReport("paperscope")} />;
}
