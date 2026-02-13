"use client";

import LogoutButton from "@/app/_components/LogoutButton";
import { useEffect, useState } from "react";

const sections = [
  {
    title: "Analytics",
    items: [
      { label: "Overview", id: "overview" },
      { label: "Trend Analysis", id: "trend" },
      { label: "Category Distribution", id: "category" },
    ],
  },
  {
    title: "Data",
    items: [
      { label: "Top Employees", id: "ranking" },
      { label: "Usage Table", id: "table" },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      sections.forEach((group) => {
        group.items.forEach((item) => {
          const section = document.getElementById(item.id);
          if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
              setActive(item.id);
            }
          }
        });
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside
      className={`flex flex-col border-r border-[var(--border)] bg-[var(--surface)] transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
        {!collapsed && (
          <h2 className="text-lg font-semibold tracking-tight">Dashboard</h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-sm text-[var(--text-muted)] hover:text-white transition-colors"
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>

      {/* Navigation */}
      <div className="p-4 space-y-6">
        {sections.map((group) => (
          <div key={group.title}>
            {!collapsed && (
              <p className="text-xs uppercase tracking-wide text-[var(--text-muted)] mb-3">
                {group.title}
              </p>
            )}

            <div className="flex flex-col gap-3">
              {group.items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`px-3 py-2 rounded-md text-sm transition-colors ${
                    active === item.id
                      ? "bg-indigo-600/20 text-indigo-400 font-medium"
                      : "text-[var(--text-muted)] hover:bg-indigo-600/10"
                  }`}
                >
                  {!collapsed ? item.label : item.label[0]}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="mt-8 p-4 border-t border-[var(--border)]">
        {!collapsed && <LogoutButton />}
      </div>
    </aside>
  );
}
