"use client";

import Card from "@/app/_components/ui/Card";
import SectionHeader from "@/app/_components/ui/SectionHeader";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function TrendChart({ data }) {
  const formattedData = data.map((item) => ({
    ...item,
    day: new Date(item.day).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <Card>
      <SectionHeader title="Usage Trend" />

      <div className="h-75">
        <ResponsiveContainer>
          <LineChart data={formattedData}>
            <CartesianGrid
              stroke="rgba(148,163,184,0.2)"
              strokeDasharray="3 3"
            />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="total_tokens"
              stroke="#6366F1"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
