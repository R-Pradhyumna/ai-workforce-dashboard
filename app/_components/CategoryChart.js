"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function CategoryChart({ data }) {
  return (
    <section>
      <h2>Category Distribution</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="total_tokens"
              nameKey="category"
              outerRadius={100}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
