"use client";

import { Suspense, useEffect, useState, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HiDownload } from "react-icons/hi";
import ResumeHTML from "@/components/resume/ResumeHTML";
import { defaultCvType, resumes } from "@/lib/resume/data";

type ViewMode = "web" | "pdf";

// The CV switcher bar is a dev-only tool. In production the visitor sees a
// single CV as a PDF: the `cvType` query param is saved to localStorage and
// then stripped from the URL, so later visits keep showing that CV.
const IS_DEV = process.env.NODE_ENV === "development";
const CV_TYPE_STORAGE_KEY = "cvType";

function readStoredCvType() {
  try {
    const stored = window.localStorage.getItem(CV_TYPE_STORAGE_KEY);
    return stored && resumes[stored] ? stored : null;
  } catch {
    return null;
  }
}

const noopSubscribe = () => () => {};

const cvTypeOptions = Object.keys(resumes).map((id) => ({
  id,
  label: id.charAt(0).toUpperCase() + id.slice(1),
}));

type PdfState = { cvType: string; url: string } | { cvType: string; error: true };

/**
 * Renders the PDF in the browser with the current origin, so project links
 * inside it resolve to whichever host served the page. `@react-pdf/renderer`
 * is loaded on demand to keep it out of the initial bundle.
 */
function useResumePdf(cvType: string | null) {
  const [state, setState] = useState<PdfState | null>(null);

  useEffect(() => {
    if (!cvType) return;
    let cancelled = false;
    let url: string | null = null;

    import("@/components/resume/renderResumePdf")
      .then(({ renderResumePdf }) => renderResumePdf(resumes[cvType], cvType, window.location.origin))
      .then((blob) => {
        if (cancelled) return;
        url = URL.createObjectURL(blob);
        setState({ cvType, url });
      })
      .catch((error: unknown) => {
        console.error("[resume-pdf] Failed to generate PDF", error);
        if (!cancelled) setState({ cvType, error: true });
      });

    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [cvType]);

  // Ignore a result left over from the previous `cvType` while the new one renders.
  return state?.cvType === cvType ? state : null;
}

function PdfFrame({ pdf, cvType }: { pdf: PdfState | null; cvType: string }) {
  const [loading, setLoading] = useState(true);

  if (pdf && "error" in pdf) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-red-400 font-mono">generating_pdf({cvType}) failed — please reload.</p>
      </div>
    );
  }

  return (
    <>
      {(!pdf || loading) && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gray-900/80 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-blue-400 font-mono animate-pulse">generating_pdf({cvType})...</p>
        </div>
      )}
      {pdf && (
        <iframe
          src={`${pdf.url}#toolbar=0&navpanes=0&scrollbar=0`}
          className="w-full h-full border-none"
          title="Resume Preview"
          onLoad={() => setLoading(false)}
        />
      )}
    </>
  );
}

function LoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-900">
      <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

function ResumeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const cvTypeParam = searchParams.get("cvType")?.toLowerCase();
  const validParam = cvTypeParam && resumes[cvTypeParam] ? cvTypeParam : null;
  const [viewMode, setViewMode] = useState<ViewMode>(IS_DEV ? "web" : "pdf");

  // localStorage is unavailable during prerender, so the server snapshot is
  // `null` and production renders a spinner until the client resolves it.
  const storedCvType = useSyncExternalStore(noopSubscribe, readStoredCvType, () => null);
  const isHydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);

  // Remember the latest valid `cvType`, then drop it from the URL. The store
  // snapshot is re-read on the next render, so the CV shown doesn't change.
  useEffect(() => {
    if (IS_DEV || !validParam) return;
    try {
      window.localStorage.setItem(CV_TYPE_STORAGE_KEY, validParam);
    } catch {
      // Storage blocked (e.g. private mode) — keep the query param as the source.
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.delete("cvType");
    const query = params.toString();
    router.replace(query ? `/?${query}` : "/", { scroll: false });
  }, [router, searchParams, validParam]);

  const isReady = IS_DEV || isHydrated;
  const cvType = IS_DEV
    ? (validParam ?? defaultCvType)
    : (validParam ?? storedCvType ?? defaultCvType);

  // Wait until the stored CV is known so we don't render the default one first.
  const pdf = useResumePdf(isReady ? cvType : null);

  if (!isReady) return <LoadingScreen />;

  const currentData = resumes[cvType];
  const downloadFilename = `Resume_${cvType}_${currentData.personal.name.replace(/\s+/g, "_")}.pdf`;

  const handleTypeChange = (typeId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("cvType", typeId);
    router.replace(`/?${params.toString()}`, { scroll: false });
  };

  const pdfUrl = pdf && "url" in pdf ? pdf.url : undefined;
  const downloadLink = (
    <a
      href={pdfUrl}
      download={downloadFilename}
      aria-disabled={!pdfUrl}
      className={`flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-mono text-sm ${
        pdfUrl ? "" : "pointer-events-none opacity-60"
      }`}
    >
      <HiDownload className="w-4 h-4" />
      <span>download_pdf()</span>
    </a>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Resume Navigation Bar (dev only) */}
      {IS_DEV && (
        <nav className="z-10 bg-gray-800 border-b border-gray-700 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-white font-mono text-sm hidden sm:block">
              <span className="text-blue-400">./</span>resume_preview
            </h1>

            {cvTypeOptions.length > 1 && (
              <div className="flex items-center bg-gray-900/50 p-1 rounded-lg border border-gray-700">
                {cvTypeOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleTypeChange(option.id)}
                    className={`px-3 py-1 rounded-md font-mono text-xs transition-all ${
                      cvType === option.id
                        ? "bg-blue-600 text-white font-bold"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center bg-gray-900/50 p-1 rounded-lg border border-gray-700">
              <button
                onClick={() => setViewMode("web")}
                className={`px-3 py-1 rounded-md font-mono text-xs transition-all ${
                  viewMode === "web" ? "bg-blue-600 text-white font-bold" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Web Preview
              </button>
              <button
                onClick={() => setViewMode("pdf")}
                className={`px-3 py-1 rounded-md font-mono text-xs transition-all ${
                  viewMode === "pdf" ? "bg-blue-600 text-white font-bold" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                PDF View
              </button>
            </div>
          </div>

          {downloadLink}
        </nav>
      )}

      {/* Preview Area */}
      <div className="flex-1 relative bg-gray-900 overflow-hidden">
        {viewMode === "web" ? (
          <div className="w-full h-full overflow-y-auto p-4 sm:p-6 bg-gray-900">
            <ResumeHTML data={currentData} />
          </div>
        ) : (
          <PdfFrame key={cvType} pdf={pdf} cvType={cvType} />
        )}

        {/* Production has no nav bar, so float the download button instead. */}
        {!IS_DEV && <div className="absolute bottom-4 right-4 z-10 shadow-lg">{downloadLink}</div>}
      </div>
    </div>
  );
}

export default function ResumePage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ResumeContent />
    </Suspense>
  );
}
