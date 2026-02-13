import AnimatedNumber from "@/app/_components/ui/AnimatedNumber";
import Card from "@/app/_components/ui/Card";

export default function KpiSection({ kpis }) {
  const items = [
    {
      label: "Total Tokens",
      rawValue: kpis.total_tokens,
      type: "compact",
      trend: 8.4,
    },
    {
      label: "Total Cost",
      rawValue: kpis.total_cost,
      type: "currency",
      trend: -3.1,
    },
    {
      label: "Avg Tokens / Entry",
      rawValue: Math.round(kpis.avg_tokens_per_entry),
      type: "standard",
      trend: 2.7,
    },
    {
      label: "Active Users",
      rawValue: kpis.active_employees,
      type: "standard",
      trend: 1.9,
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <Card key={item.label}>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-(--text-muted)">{item.label}</span>

            <span className="text-3xl font-bold tracking-tight">
              <AnimatedNumber value={item.rawValue} type={item.type} />
            </span>

            <span
              className={`text-xs font-medium ${
                item.trend >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.trend >= 0 ? "▲" : "▼"} {Math.abs(item.trend)}%{" "}
              <span className="text-(--text-muted) font-normal">
                vs last period
              </span>
            </span>
          </div>
        </Card>
      ))}
    </section>
  );
}
