"use client";

import Card from "@/app/_components/ui/Card";
import SectionHeader from "@/app/_components/ui/SectionHeader";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function RankingChart({ data }) {
  return (
    <Card>
      <SectionHeader title="Top Employees" />
      <div className="h-75">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid
              stroke="rgba(148,163,184,0.2)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="full_name"
              stroke="#94A3B8"
              tick={{ fontSize: 12 }}
              angle={-15}
              textAnchor="end"
            />
            <YAxis stroke="#94A3B8" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#94A3B8" }}
            />
            <Bar dataKey="total_tokens" fill="#6366F1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
