// The visitor's CV variant is remembered in localStorage. Links from the CV to
// project pages carry it as a `cvType` query param, so a project page opened
// straight from the PDF (a fresh tab, possibly another browser) can store it
// too, and `back_to_resume()` then shows the same CV.
import { resumes } from "./data";

export const CV_TYPE_PARAM = "cvType";
const CV_TYPE_STORAGE_KEY = "cvType";

/** Returns the lowercased `value` if it names a known CV variant. */
export function parseCvType(value: string | null | undefined) {
  const cvType = value?.toLowerCase();
  return cvType && resumes[cvType] ? cvType : null;
}

export function readStoredCvType() {
  try {
    return parseCvType(window.localStorage.getItem(CV_TYPE_STORAGE_KEY));
  } catch {
    return null;
  }
}

/** Returns false when storage is blocked (e.g. private mode). */
export function storeCvType(cvType: string) {
  try {
    window.localStorage.setItem(CV_TYPE_STORAGE_KEY, cvType);
    return true;
  } catch {
    return false;
  }
}

/** Adds `cvType` to an internal (relative) link; external links are returned as-is. */
export function withCvType(url: string, cvType: string | undefined) {
  if (!cvType || !url.startsWith("/")) return url;
  const [path, hash] = url.split("#");
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}${CV_TYPE_PARAM}=${encodeURIComponent(cvType)}${hash !== undefined ? `#${hash}` : ""}`;
}
