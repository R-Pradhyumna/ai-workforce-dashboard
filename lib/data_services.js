function getRangeDays(range) {
  const map = {
    "7d": 7,
    "30d": 30,
    "90d": 90,
    "1y": 365,
  };

  return map[range] || 30;
}

export async function getDashboardKpis(supabase, range = "30d") {
  const rangeDays = getRangeDays(range);

  const { data, error } = await supabase.rpc("get_dashboard_kpis", {
    range_days: rangeDays,
  });

  if (error) {
    console.error("KPI fetch error:", error);
    throw new Error("Failed to fetch dashboard KPIs");
  }

  return data?.[0] || null;
}

export async function getUsageTrend(supabase, range = "30d") {
  const rangeDays = getRangeDays(range);

  const { data, error } = await supabase.rpc("get_usage_trend", {
    range_days: rangeDays,
  });

  if (error) {
    console.error("Trend fetch error:", error);
    throw new Error("Failed to fetch usage trend");
  }

  return data || [];
}

export async function getEmployeeRanking(supabase, range = "30d") {
  const rangeDays = getRangeDays(range);

  const { data, error } = await supabase.rpc("get_employee_ranking", {
    range_days: rangeDays,
  });

  if (error) {
    console.error("Ranking fetch error:", error);
    throw new Error("Failed to fetch employee ranking");
  }

  return data || [];
}

export async function getCategoryDistribution(supabase, range = "30d") {
  const rangeDays = getRangeDays(range);

  const { data, error } = await supabase.rpc("get_category_distribution", {
    range_days: rangeDays,
  });

  if (error) {
    console.error("Category fetch error:", error);
    throw new Error("Failed to fetch category distribution");
  }

  return data || [];
}

export async function getUsageTable(
  supabase,
  { page = 1, limit = 10, sort = "created_at", order = "desc", search = "" },
) {
  const { data, error } = await supabase.rpc("get_usage_table", {
    p_page: page,
    p_limit: limit,
    p_sort: sort,
    p_order: order,
    p_search: search,
  });

  if (error) {
    console.error("Table fetch error:", error);
    throw new Error("Failed to fetch usage table");
  }

  const totalCount = data.length ? Number(data[0].total_count) : 0;

  return {
    rows: data || [],
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
  };
}
