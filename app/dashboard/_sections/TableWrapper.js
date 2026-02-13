import UsageTable from "@/app/_components/UsageTable";
import { getUsageTable } from "@/lib/data_services";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function TableWrapper({ searchParams }) {
  const supabase = await createSupabaseServerClient();

  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;
  const sort = params?.sort || "created_at";
  const order = params?.order || "desc";
  const search = params?.search || "";

  const tableData = await getUsageTable(supabase, {
    page,
    limit,
    sort,
    order,
    search,
  });

  return <UsageTable tableData={tableData} page={page} />;
}
