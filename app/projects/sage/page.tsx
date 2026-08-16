import { ProjectReportContent } from "@/components/project-report-content";
import { getStaticProjectMetadata, getStaticProjectReport } from "@/lib/static-project-page";

export const dynamic = "force-static";
export const metadata = getStaticProjectMetadata("sage");

export default function SagePage() {
  return <ProjectReportContent report={getStaticProjectReport("sage")} />;
}
