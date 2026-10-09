import type { ReactNode } from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

export type Tone = "neutral" | "blue" | "emerald" | "amber" | "rose" | "cyan" | "red" | "yellow" | "violet";

const NODE_TONES: Record<Tone, string> = {
  neutral: "border-gray-700 bg-gray-900 text-gray-100",
  blue: "border-blue-500/40 bg-blue-500/10 text-blue-100",
  emerald: "border-emerald-500/40 bg-emerald-500/10 text-emerald-100",
  amber: "border-amber-500/40 bg-amber-500/10 text-amber-100",
  rose: "border-rose-500/40 bg-rose-500/10 text-rose-100",
  cyan: "border-cyan-500/40 bg-cyan-500/10 text-cyan-100",
  red: "border-red-500/40 bg-red-500/10 text-red-100",
  yellow: "border-yellow-500/40 bg-yellow-500/10 text-yellow-100",
  violet: "border-violet-500/40 bg-violet-500/10 text-violet-100",
};

const FRAME_TONES: Record<Tone, { box: string; label: string }> = {
  neutral: { box: "border-gray-700", label: "text-gray-400 border-gray-700" },
  blue: { box: "border-blue-500/50 bg-blue-500/[0.03]", label: "text-blue-300 border-blue-500/50" },
  emerald: { box: "border-emerald-500/50", label: "text-emerald-300 border-emerald-500/50" },
  amber: { box: "border-amber-500/50", label: "text-amber-300 border-amber-500/50" },
  rose: { box: "border-rose-500/40 border-dashed bg-rose-500/[0.03]", label: "text-rose-300 border-rose-500/40" },
  cyan: { box: "border-cyan-500/50", label: "text-cyan-300 border-cyan-500/50" },
  red: { box: "border-red-500/50", label: "text-red-300 border-red-500/50" },
  yellow: { box: "border-yellow-500/50", label: "text-yellow-300 border-yellow-500/50" },
  violet: { box: "border-violet-500/50", label: "text-violet-300 border-violet-500/50" },
};

/** Lays a diagram out as a centered column. */
export function Canvas({ children }: { children: ReactNode }) {
  return <div className="p-5 sm:p-8 flex flex-col items-center">{children}</div>;
}

export function Node({
  icon,
  title,
  subtitle,
  tone = "neutral",
  className = "",
}: {
  icon?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-1.5 text-center rounded-lg border px-2 py-2 shadow-sm sm:flex-row sm:gap-2.5 sm:text-left sm:px-3 sm:py-2.5 ${NODE_TONES[tone]} ${className}`}
    >
      {icon && <span className="shrink-0 text-base sm:text-lg opacity-90">{icon}</span>}
      <div className="min-w-0 break-words">
        <div className="text-xs sm:text-sm font-semibold leading-tight">{title}</div>
        {subtitle && <div className="mt-0.5 text-[10px] sm:text-xs font-mono leading-tight opacity-70">{subtitle}</div>}
      </div>
    </div>
  );
}

/** A bordered boundary (a deployable, a host) with a tab label on its top edge. */
export function Frame({
  label,
  tone = "neutral",
  className = "",
  children,
}: {
  label: ReactNode;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  const t = FRAME_TONES[tone];
  return (
    <div className={`relative w-full rounded-xl border-2 px-3 pb-4 pt-9 sm:px-5 sm:pb-5 sm:pt-7 ${t.box} ${className}`}>
      <span
        className={`absolute -top-3 left-4 right-4 w-fit rounded-md border bg-gray-950 px-2 py-0.5 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider ${t.label}`}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

export function Chip({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] sm:text-xs font-mono ${NODE_TONES[tone]}`}>
      {children}
    </span>
  );
}

function ArrowHead({ direction = "down" }: { direction?: "down" | "right" }) {
  return direction === "down" ? (
    <svg className="h-2 w-3 shrink-0 text-gray-500" viewBox="0 0 12 8" aria-hidden>
      <path d="M0 0 L6 8 L12 0 Z" fill="currentColor" />
    </svg>
  ) : (
    <svg className="h-3 w-2 shrink-0 text-gray-500" viewBox="0 0 8 12" aria-hidden>
      <path d="M0 0 L8 6 L0 12 Z" fill="currentColor" />
    </svg>
  );
}

function EdgeLabel({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-gray-800 bg-gray-900 px-2 py-0.5 text-[10px] font-mono text-gray-400 whitespace-nowrap">
      {children}
    </span>
  );
}

export function ArrowDown({ label }: { label?: ReactNode }) {
  return (
    <div className="flex flex-col items-center" aria-hidden={!label}>
      <div className="h-4 w-px bg-gray-600" />
      {label && (
        <>
          <EdgeLabel>{label}</EdgeLabel>
          <div className="h-3 w-px bg-gray-600" />
        </>
      )}
      <ArrowHead />
    </div>
  );
}

export function ArrowUp({ label }: { label?: ReactNode }) {
  return (
    <div className="flex flex-col items-center" aria-hidden={!label}>
      <svg className="h-2 w-3 shrink-0 text-gray-500" viewBox="0 0 12 8" aria-hidden>
        <path d="M0 8 L6 0 L12 8 Z" fill="currentColor" />
      </svg>
      {label && (
        <>
          <div className="h-3 w-px bg-gray-600" />
          <EdgeLabel>{label}</EdgeLabel>
        </>
      )}
      <div className="h-4 w-px bg-gray-600" />
    </div>
  );
}

export function ArrowRight({ label }: { label?: ReactNode }) {
  return (
    <div className="flex items-center">
      <div className="h-px w-3 sm:w-5 bg-gray-600" />
      {label && (
        <>
          <EdgeLabel>{label}</EdgeLabel>
          <div className="h-px w-3 sm:w-5 bg-gray-600" />
        </>
      )}
      <ArrowHead direction="right" />
    </div>
  );
}

/**
 * One source fanning out to `children.length` columns: a stem, a bus line
 * spanning the column centers, then an arrow (optionally labelled) into each column.
 */
export function FanOut({ labels, children }: { labels?: ReactNode[]; children: ReactNode[] }) {
  const n = children.length;
  const columns = { gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` };
  return (
    <div className="w-full">
      <div className="mx-auto h-4 w-px bg-gray-600" />
      <div className="relative grid gap-2 sm:gap-3" style={columns}>
        <div className="absolute top-0 h-px bg-gray-600" style={{ left: `${50 / n}%`, right: `${50 / n}%` }} />
        {children.map((_, i) => (
          <div key={i} className="flex justify-center">
            <ArrowDown label={labels?.[i]} />
          </div>
        ))}
      </div>
      <div className="grid gap-2 sm:gap-3 items-stretch" style={columns}>
        {children}
      </div>
    </div>
  );
}

export function Notes({ kind, items }: { kind: "pro" | "con"; items: string[] }) {
  const Icon = kind === "pro" ? HiCheckCircle : HiXCircle;
  const color = kind === "pro" ? "text-emerald-400" : "text-rose-400";
  return (
    <ul className="mt-6 grid w-full gap-2 sm:grid-cols-3">
      {items.map((item) => (
        <li key={item} className="flex gap-2 rounded-lg border border-gray-800 bg-gray-900/60 p-3 text-xs text-gray-300 leading-relaxed">
          <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${color}`} aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
