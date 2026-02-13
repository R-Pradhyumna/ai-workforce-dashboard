"use client";

import Card from "@/app/_components/ui/Card";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export default function UsageTable({ tableData, page }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [columnSizing, setColumnSizing] = useState({});
  const data = tableData?.rows ?? [];

  const currentSort = searchParams.get("sort");
  const currentOrder = searchParams.get("order") || "desc";

  function buildUrl(updates) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    return `${pathname}?${params.toString()}`;
  }

  const columns = useMemo(
    () => [
      {
        id: "select",
        enableSorting: false,
        enableResizing: false,
        size: 50,
        header: ({ table }) => (
          <div className="text-center">
            <input
              type="checkbox"
              checked={table.getIsAllPageRowsSelected()}
              onChange={table.getToggleAllPageRowsSelectedHandler()}
              className="accent-indigo-600"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="text-center">
            <input
              type="checkbox"
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
              className="accent-indigo-600"
            />
          </div>
        ),
      },
      {
        accessorKey: "full_name",
        header: "Employee",
        enableResizing: true,
        cell: ({ row }) => {
          const name = row.original.full_name || "";
          return name
            .split(" ")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" ");
        },
      },
      {
        accessorKey: "tokens_used",
        header: "Tokens",
        enableResizing: true,
        cell: ({ row }) =>
          new Intl.NumberFormat("en-US", {
            notation: "compact",
          }).format(row.original.tokens_used),
      },
      {
        accessorKey: "cost_usd",
        header: "Cost",
        enableResizing: true,
        cell: ({ row }) =>
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          }).format(row.original.cost_usd),
      },
      {
        accessorKey: "category",
        header: "Category",
        enableResizing: true,
      },
      {
        accessorKey: "created_at",
        header: "Date",
        enableResizing: true,
        cell: ({ row }) =>
          new Date(row.original.created_at).toISOString().split("T")[0],
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    state: { columnSizing },
    onColumnSizingChange: setColumnSizing,
    columnResizeMode: "onEnd",
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    enableRowSelection: true,
  });

  function updatePage(newPage) {
    router.push(buildUrl({ page: newPage }), {
      scroll: false,
    });
  }

  function updateSort(columnId) {
    let newOrder = "asc";

    if (currentSort === columnId && currentOrder === "asc") {
      newOrder = "desc";
    }

    router.push(
      buildUrl({
        sort: columnId,
        order: newOrder,
        page: 1,
      }),
      { scroll: false },
    );
  }

  if (!tableData) {
    return (
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
    );
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Usage Table</h2>
        <span className="text-sm text-(--text-muted)">
          Page {page} of {tableData.totalPages}
        </span>
      </div>

      <div className="overflow-x-auto w-full">
        <div style={{ width: table.getTotalSize() }}>
          <table className="border-collapse table-fixed w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-(--border)">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className="relative py-2 px-4 text-xs uppercase tracking-wide text-(--text-muted) text-left select-none whitespace-nowrap"
                    >
                      <div
                        onClick={() => {
                          if (header.column.columnDef.accessorKey) {
                            updateSort(header.column.columnDef.accessorKey);
                          }
                        }}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {currentSort === header.column.id && (
                          <span>{currentOrder === "asc" ? "▲" : "▼"}</span>
                        )}
                      </div>

                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            header.getResizeHandler()(e);
                          }}
                          onTouchStart={(e) => {
                            e.stopPropagation();
                            header.getResizeHandler()(e);
                          }}
                          className="absolute right-0 top-0 h-full w-4 cursor-col-resize select-none group"
                        >
                          <div
                            className={`
        absolute right-0 top-0 h-full w-0.5
        bg-white/20
        group-hover:bg-white/60
        ${header.column.getIsResizing() ? "bg-white w-0.75" : ""}
        transition-all duration-150
      `}
                          />
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-10 text-(--text-muted)"
                  >
                    No results found.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`border-b border-(--border) transition-colors ${
                      row.getIsSelected()
                        ? "bg-indigo-600/20"
                        : "hover:bg-indigo-600/10"
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="py-2 px-4 text-sm whitespace-nowrap text-left"
                      >
                        {flexRender(
                          cell.column.columnDef.cell ?? cell.getValue(),
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {table.getSelectedRowModel().rows.length > 0 && (
        <div className="mt-4 p-3 border border-(--border) rounded-lg bg-(--surface) flex items-center justify-between">
          <span className="text-sm">
            {table.getSelectedRowModel().rows.length} selected
          </span>

          <button
            onClick={() => table.resetRowSelection()}
            className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-colors"
          >
            Clear Selection
          </button>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-(--border) pt-4 mt-6">
        <button
          disabled={page <= 1}
          onClick={() => updatePage(page - 1)}
          className="px-4 py-2 rounded-md border border-(--border) hover:bg-indigo-600/10 disabled:opacity-40 transition-colors"
        >
          Previous
        </button>

        <button
          disabled={page >= tableData.totalPages}
          onClick={() => updatePage(page + 1)}
          className="px-4 py-2 rounded-md border border-(--border) hover:bg-indigo-600/10 disabled:opacity-40 transition-colors"
        >
          Next
        </button>
      </div>
    </Card>
  );
}
