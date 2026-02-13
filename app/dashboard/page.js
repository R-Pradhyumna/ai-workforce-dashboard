import RangeSelector from "@/app/_components/RangeSelector";
import { Suspense } from "react";
import ChartsWrapper from "./_sections/ChartsWrapper";
import KpiSectionWrapper from "./_sections/KpiSectionWrapper";
import TableWrapper from "./_sections/TableWrapper";
export default function DashboardPage({ searchParams }) {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2>Overview</h2>
        <RangeSelector />
      </div>

      <div className="flex flex-col gap-8">
        <Suspense
          fallback={
            <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          }
        >
          <section id="overview">
            <KpiSectionWrapper searchParams={searchParams} />
          </section>
        </Suspense>

        <Suspense
          fallback={
            <div className="h-100 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          }
        >
          <ChartsWrapper searchParams={searchParams} />
        </Suspense>

        <Suspense
          fallback={
            <div className="h-125 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
          }
        >
          <section id="table">
            <TableWrapper searchParams={searchParams} />
          </section>
        </Suspense>
      </div>
    </>
  );
}
