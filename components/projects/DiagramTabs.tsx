"use client";

import { useId, useState, type ReactNode } from "react";

interface Tab {
  label: string;
  content: ReactNode;
}

/** Tab switcher for pre-rendered (server) diagram groups. A single tab renders without the tab bar. */
export default function DiagramTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);
  const id = useId();

  if (tabs.length === 1) return <>{tabs[0].content}</>;

  return (
    <div className="space-y-6">
      <div role="tablist" className="inline-flex flex-wrap gap-1 rounded-xl border border-gray-800 bg-gray-900 p-1">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            id={`${id}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`${id}-panel-${i}`}
            onClick={() => setActive(i)}
            className={`rounded-lg px-4 py-2 text-xs sm:text-sm font-mono transition-colors ${
              i === active
                ? "bg-blue-500/15 text-blue-300 border border-blue-500/40"
                : "text-gray-400 hover:text-gray-200 border border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={tab.label}
          id={`${id}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${i}`}
          hidden={i !== active}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
