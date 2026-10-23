"use client";

import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import { useCvTypeSync } from "@/lib/resume/useCvTypeSync";

/** Back link to the resume; remembers the CV the visitor came from (see `useCvTypeSync`). */
export default function BackToResumeLink() {
  useCvTypeSync();

  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors font-mono"
    >
      <HiArrowLeft className="w-4 h-4" />
      <span>back_to_resume()</span>
    </Link>
  );
}
