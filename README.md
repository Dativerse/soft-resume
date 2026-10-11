# harvard-portfolio

A standalone Next.js (App Router) implementation of the resume-display
feature.

## What's here

- **`/` (`app/page.tsx`)** — the resume viewer: a "Web Preview" /
  "PDF View" toggle plus a download button.
- **`components/resume/ResumeHTML.tsx`** — the web-rendered resume
  (plain React + Tailwind, no PDF dependency).
- **`components/resume/ResumePDF.tsx`** — the same resume laid out with
  [`@react-pdf/renderer`](https://react-pdf.org/) primitives.
- **`components/resume/renderResumePdf.tsx`** — renders the PDF **in the
  browser** (`pdf().toBlob()`), loaded on demand from the viewer. It passes
  `window.location.origin`, so relative links in the PDF (e.g. project
  pages) point at whichever host served the page — no site URL to
  configure. The "PDF View" tab and the download button both use the
  resulting blob URL.
- **`lib/resume/data.ts`** — resume content. `resumes` is a
  `Record<cvType, ResumeData>`; add more keys to get more CV variants
  switchable via `?cvType=` and the top-nav tabs.
- **`lib/resume/types.ts`** — the shared `ResumeData` shape.

## Before you ship this

`lib/resume/data.ts` is filled with placeholder content ("Your Name",
`you@example.com`, etc.) — replace it with your real resume data.

## Develop

```bash
npm install
npm run dev
```

## Notes

- `next.config.ts` stubs out `canvas` (an optional native dependency of
  `@react-pdf/renderer` this app doesn't need) for both Webpack and
  Turbopack builds.
