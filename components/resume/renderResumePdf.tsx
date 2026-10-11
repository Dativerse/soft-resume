import { pdf } from "@react-pdf/renderer";
import ResumePDF from "@/components/resume/ResumePDF";
import type { ResumeData } from "@/lib/resume/types";

/**
 * Renders the resume PDF in the browser. `origin` is the page's own origin,
 * so relative links (e.g. project pages) inside the PDF point back at
 * whichever host served it — no build-time site URL needed.
 */
export async function renderResumePdf(data: ResumeData, cvType: string, origin: string): Promise<Blob> {
  return pdf(<ResumePDF data={data} type={cvType} origin={origin} />).toBlob();
}
