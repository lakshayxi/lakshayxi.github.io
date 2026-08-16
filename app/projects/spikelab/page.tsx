import { ProjectReportContent } from "@/components/project-report-content";
import { getStaticProjectMetadata, getStaticProjectReport } from "@/lib/static-project-page";

export const dynamic = "force-static";
export const metadata = getStaticProjectMetadata("spikelab");

export default function SpikeLabPage() {
  return <ProjectReportContent report={getStaticProjectReport("spikelab")} />;
}
