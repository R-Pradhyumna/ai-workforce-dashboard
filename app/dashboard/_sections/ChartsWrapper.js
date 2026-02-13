import CategoryChart from "@/app/_components/CategoryChart";
import RankingChart from "@/app/_components/RankingChart";
import TrendChart from "@/app/_components/TrendChart";
import {
  getCategoryDistribution,
  getEmployeeRanking,
  getUsageTrend,
} from "@/lib/data_services";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ChartsWrapper({ searchParams }) {
  const supabase = await createSupabaseServerClient();
  const params = await searchParams;
  const range = params?.range || "30d";

  const [trend, categories, ranking] = await Promise.all([
    getUsageTrend(supabase, range),
    getCategoryDistribution(supabase, range),
    getEmployeeRanking(supabase, range),
  ]);

  return (
    <>
      <section id="trend">
        <TrendChart data={trend} />
      </section>
      <section id="category">
        <CategoryChart data={categories} />
      </section>
      <section id="ranking">
        <RankingChart data={ranking} />
      </section>
    </>
  );
}
