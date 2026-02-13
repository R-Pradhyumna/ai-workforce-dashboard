import Card from "@/app/_components/ui/Card";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8 p-6">
      {/* KPI Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <div className="animate-pulse space-y-3">
              <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded" />
              <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
          </Card>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <div className="animate-pulse h-75 bg-slate-200 dark:bg-slate-700 rounded" />
          </Card>
        ))}
      </div>

      {/* Ranking Skeleton */}
      <Card>
        <div className="animate-pulse h-75 bg-slate-200 dark:bg-slate-700 rounded" />
      </Card>

      {/* Table Skeleton */}
      <Card>
        <div className="animate-pulse space-y-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-6 bg-slate-200 dark:bg-slate-700 rounded"
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
