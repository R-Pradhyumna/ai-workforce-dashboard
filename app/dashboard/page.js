import {
  getCategoryDistribution,
  getDashboardKpis,
  getEmployeeRanking,
  getUsageTable,
  getUsageTrend,
} from "@/lib/data_services";
import { createSupabaseServerClient } from "@/lib/supabase/server";

import CategoryChart from "@/app/_components/CategoryChart";
import KpiSection from "@/app/_components/KpiSection";
import RankingChart from "@/app/_components/RankingChart";
import TrendChart from "@/app/_components/TrendChart";
import UsageTable from "@/app/_components/UsageTable";

export default async function DashboardPage(props) {
  const searchParams = await props.searchParams;

  const supabase = await createSupabaseServerClient();

  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const sort = searchParams.sort || "created_at";
  const order = searchParams.order || "desc";
  const search = searchParams.search || "";

  const [kpis, trend, ranking, categories, tableData] = await Promise.all([
    getDashboardKpis(supabase, "30d"),
    getUsageTrend(supabase, "30d"),
    getEmployeeRanking(supabase, "30d"),
    getCategoryDistribution(supabase, "30d"),
    getUsageTable(supabase, {
      page,
      limit,
      sort,
      order,
      search,
    }),
  ]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      <KpiSection kpis={kpis} />

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}
      >
        <TrendChart data={trend} />
        <CategoryChart data={categories} />
      </div>

      <RankingChart data={ranking} />

      <UsageTable tableData={tableData} page={page} />
    </div>
  );
}
