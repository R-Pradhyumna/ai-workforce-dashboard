import CategoryChart from "@/app/_components/CategoryChart";
import KpiSection from "@/app/_components/KpiSection";
import RangeSelector from "@/app/_components/RangeSelector";
import RankingChart from "@/app/_components/RankingChart";
import TrendChart from "@/app/_components/TrendChart";
import UsageTable from "@/app/_components/UsageTable";
import InsightCard from "@/app/_components/ui/InsightCard";
import {
  getCategoryDistribution,
  getDashboardKpis,
  getEmployeeRanking,
  getUsageTable,
  getUsageTrend,
} from "@/lib/data_services";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage(props) {
  const searchParams = await props.searchParams;

  const supabase = await createSupabaseServerClient();

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const sort = searchParams.sort || "created_at";
  const order = searchParams.order || "desc";
  const search = searchParams.search || "";
  const range = searchParams.range || "30d";

  const [kpis, trend, ranking, categories, tableData] = await Promise.all([
    getDashboardKpis(supabase, range),
    getUsageTrend(supabase, range),
    getEmployeeRanking(supabase, range),
    getCategoryDistribution(supabase, range),
    getUsageTable(supabase, {
      page,
      limit,
      sort,
      order,
      search,
    }),
  ]);

  // ---- Trend Insights ----
  const peakDay = trend?.length
    ? trend.reduce((max, item) =>
        item.total_tokens > max.total_tokens ? item : max,
      )
    : null;

  const avgUsage =
    trend.reduce((sum, item) => sum + item.total_tokens, 0) / trend.length;

  const firstValue = trend[0]?.total_tokens ?? 0;
  const lastValue = trend[trend.length - 1]?.total_tokens ?? 0;

  let trendDirection = "stable";

  if (lastValue > firstValue) trendDirection = "increasing";
  if (lastValue < firstValue) trendDirection = "decreasing";

  // ---- Category Insights ----
  const sortedCategories = [...categories].sort(
    (a, b) => b.total_tokens - a.total_tokens,
  );

  const topCategory = sortedCategories?.[0] ?? null;

  const totalCategoryTokens = categories.reduce(
    (sum, item) => sum + item.total_tokens,
    0,
  );

  const topCategoryPercent = (
    (topCategory.total_tokens / totalCategoryTokens) *
    100
  ).toFixed(1);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          <section id="overview">Overview</section>
        </h2>
        <RangeSelector />
      </div>

      <KpiSection kpis={kpis} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <section id="trend">
          <TrendChart data={trend} />
        </section>

        <InsightCard title="Trend Summary">
          <p>
            Average daily usage is{" "}
            <strong>
              {new Intl.NumberFormat("en-US", {
                notation: "compact",
              }).format(avgUsage)}
            </strong>
            .
          </p>

          <p className="mt-2">
            Peak usage occurred on{" "}
            <strong>
              {new Date(peakDay.day).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </strong>{" "}
            with{" "}
            <strong>
              {new Intl.NumberFormat("en-US", {
                notation: "compact",
              }).format(peakDay.total_tokens)}
            </strong>{" "}
            tokens.
          </p>

          <p className="mt-2">
            Overall trend appears{" "}
            <strong
              className={
                trendDirection === "increasing"
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {trendDirection}
            </strong>{" "}
            across the selected period.
          </p>
        </InsightCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <InsightCard title="Category Insights">
          <p>
            <strong>{topCategory.category}</strong> contributes the highest
            share at <strong>{topCategoryPercent}%</strong> of total usage.
          </p>

          <p className="mt-2">
            Usage is distributed across <strong>{categories.length}</strong>{" "}
            categories.
          </p>
        </InsightCard>
        <section id="category">
          <CategoryChart data={categories} />
        </section>
      </div>

      <section id="ranking">
        <RankingChart data={ranking} />
      </section>

      <section id="table">
        <UsageTable tableData={tableData} page={page} />
      </section>
    </div>
  );
}
