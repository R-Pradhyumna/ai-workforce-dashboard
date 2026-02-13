"use client";

import Card from "@/app/_components/ui/Card";
import SectionHeader from "@/app/_components/ui/SectionHeader";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function CategoryChart({ data }) {
  const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#0EA5E9"];

  const coloredData = data.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <Card>
      <SectionHeader title="Category Distribution" />
      <div className="h-75">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={coloredData}
              dataKey="total_tokens"
              nameKey="category"
              outerRadius={100}
            />
            <Tooltip
              formatter={(value) => [
                new Intl.NumberFormat("en-US", {
                  notation: "compact",
                }).format(value),
                "Tokens",
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
