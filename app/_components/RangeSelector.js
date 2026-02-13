"use client";

import { useRouter, useSearchParams } from "next/navigation";

const ranges = ["7d", "30d", "90d", "1y"];

export default function RangeSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current = searchParams.get("range") || "30d";

  function updateRange(range) {
    const params = new URLSearchParams(searchParams);
    params.set("range", range);
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="inline-flex rounded-lg border border-(--border) bg-(--surface) overflow-hidden">
      {ranges.map((r) => (
        <button
          key={r}
          onClick={() => updateRange(r)}
          className={`px-4 py-1.5 text-sm transition-colors ${
            current === r
              ? "bg-indigo-600 text-white"
              : "hover:bg-slate-100 dark:hover:bg-slate-700"
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
