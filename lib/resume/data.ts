// The `resumes` map holds multiple CV variants (e.g. "fullstack", "backend")
// and switches between them via the `cvType` query param on the resume page.
// Each variant lives in its own file; shared content is in `./common`.
import { backendResume } from "./backend";
import { fullstackResume } from "./fullstack";
import type { ResumeData } from "./types";

export const resumes: Record<string, ResumeData> = {
  fullstack: fullstackResume,
  backend: backendResume,
};

/** CV variant shown when no (or an unknown) `cvType` is requested. */
export const defaultCvType = "backend";

export const resumeData = resumes[defaultCvType];

const PROJECT_URL_PREFIX = "/projects/";

/** Slugs of projects that have a detail page (`url: "/projects/<slug>"`). */
export function projectSlugs() {
  return resumeData.projects
    .map((p) => p.url)
    .filter((url): url is string => Boolean(url?.startsWith(PROJECT_URL_PREFIX)))
    .map((url) => url.slice(PROJECT_URL_PREFIX.length));
}

/** Finds a top-level project by its detail-page slug (e.g. "cashquora"). */
export function findProjectBySlug(slug: string) {
  return resumeData.projects.find((p) => p.url === `${PROJECT_URL_PREFIX}${slug}`) ?? null;
}
