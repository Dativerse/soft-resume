"use client";

import { useEffect } from "react";
import { CV_TYPE_PARAM, parseCvType, storeCvType } from "./cvType";

/**
 * Saves the `cvType` query param (added to project links in the CV) to
 * localStorage, then strips it from the URL, so the resume page shows the CV
 * the visitor came from. Reads `window.location` directly to avoid a
 * `useSearchParams` Suspense boundary on statically exported pages.
 */
export function useCvTypeSync() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const cvType = parseCvType(url.searchParams.get(CV_TYPE_PARAM));
    if (!cvType || !storeCvType(cvType)) return;
    url.searchParams.delete(CV_TYPE_PARAM);
    window.history.replaceState(window.history.state, "", url);
  }, []);
}
