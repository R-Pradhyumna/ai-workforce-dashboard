"use client";

import ThemeToggle from "@/app/_components/ThemeToggle";

export default function DashboardHeader() {
  return (
    <header className="h-16 border-b border-(--border) flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 rounded-md border border-(--border) bg-transparent text-sm"
        />

        <div className="relative">
          <div className="w-5 h-5 bg-slate-400 rounded-full" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
}
