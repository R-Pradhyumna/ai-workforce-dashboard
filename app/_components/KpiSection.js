export default function KpiSection({ kpis }) {
  return (
    <section>
      <h2>Overview</h2>
      <div style={{ display: "flex", gap: "2rem" }}>
        <div>Total Tokens: {kpis.total_tokens}</div>
        <div>Total Cost: ${kpis.total_cost}</div>
        <div>Avg Tokens: {Math.round(kpis.avg_tokens_per_entry)}</div>
        <div>Active Employees: {kpis.active_employees}</div>
      </div>
    </section>
  );
}
