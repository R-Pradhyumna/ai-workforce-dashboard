import KpiSection from "@/app/_components/KpiSection";
import { getDashboardKpis } from "@/lib/data_services";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function KpiSectionWrapper({ searchParams }) {
  const supabase = await createSupabaseServerClient();
  const params = await searchParams;
  const range = params?.range || "30d";

  const kpis = await getDashboardKpis(supabase, range);

  return <KpiSection kpis={kpis} />;
}
