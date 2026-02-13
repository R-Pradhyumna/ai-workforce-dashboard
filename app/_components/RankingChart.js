"use client";

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
    <section>
      <h2>Top Employees</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="full_name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total_tokens" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
