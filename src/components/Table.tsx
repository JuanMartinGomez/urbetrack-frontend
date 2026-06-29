import { useState } from "react";

export interface Column<T> {
  label: string;
  render: (row: T) => React.ReactNode;
  width?: string;
  sortKey?: keyof T;
  sortValue?: (row: T) => string | number;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  pageSize?: number;
  maxPagesAtOnce?: number;
}

type SortDirection = "asc" | "desc";

export default function Table<T>({
  columns,
  data,
  keyExtractor,
  pageSize = 10,
  maxPagesAtOnce = 5,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>("asc");
  const [page, setPage] = useState(1);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const sorted = sortKey
    ? [...data].sort((a, b) => {
        const col = columns.find((c) => c.sortKey === sortKey);
        const valA = col?.sortValue ? col.sortValue(a) : a[sortKey];
        const valB = col?.sortValue ? col.sortValue(b) : b[sortKey];

        if (typeof valA === "string" && typeof valB === "string") {
          return sortDir === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
        if (typeof valA === "number" && typeof valB === "number") {
          return sortDir === "asc" ? valA - valB : valB - valA;
        }
        return 0;
      })
    : data;

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const sortIcon = (key?: keyof T) => {
    if (!key) return null;
    if (sortKey !== key) return <span className="text-gray-300 ml-1">↕</span>;
    return (
      <span className="text-brand ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>
    );
  };

  const getPageRange = () => {
    const halfPages = Math.floor(maxPagesAtOnce / 2);
    let fromPage = Math.max(1, page - halfPages);
    let toPage = Math.min(totalPages, fromPage + maxPagesAtOnce - 1);
    if (toPage - fromPage + 1 < maxPagesAtOnce) {
      fromPage = Math.max(1, toPage - maxPagesAtOnce + 1);
    }
    return Array.from(
      { length: toPage - fromPage + 1 },
      (_, i) => fromPage + i,
    );
  };

  const pages = getPageRange();

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm table-fixed min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100">
              {columns.map((col, i) => (
                <th
                  key={i}
                  className={`text-left px-4 py-3 text-gray-500 font-medium ${col.sortKey ? "cursor-pointer hover:text-gray-700" : ""}`}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={() => col.sortKey && handleSort(col.sortKey)}
                >
                  {col.label} {sortIcon(col.sortKey)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((row) => (
              <tr
                key={keyExtractor(row)}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                {columns.map((col, i) => (
                  <td key={i} className="px-4 py-3">
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-gray-400 text-sm"
                >
                  No hay resultados para mostrar
                </td>
              </tr>
            )}
            {data.length > 0 && page === totalPages && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-gray-300 text-xs"
                >
                  — Fin de la lista —
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between px-1">
          <span className="text-xs text-gray-400">
            Mostrando {(page - 1) * pageSize + 1}–
            {Math.min(page * pageSize, sorted.length)} de {sorted.length}
          </span>
          <div className="flex gap-1 items-center">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="px-3 py-1 text-xs rounded-lg border border-gray-200 text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ←
            </button>

            {pages[0] > 1 && (
              <>
                <button
                  onClick={() => setPage(1)}
                  className="px-3 py-1 text-xs rounded-lg border border-gray-200 text-gray-500 hover:text-gray-700"
                >
                  1
                </button>
                {pages[0] > 2 && (
                  <span className="text-gray-400 text-xs px-1">...</span>
                )}
              </>
            )}

            {pages.map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-1 text-xs rounded-lg border ${
                  p === page
                    ? "border-brand text-white bg-brand"
                    : "border-gray-200 text-gray-500 hover:text-gray-700"
                }`}
              >
                {p}
              </button>
            ))}

            {pages[pages.length - 1] < totalPages && (
              <>
                {pages[pages.length - 1] < totalPages - 1 && (
                  <span className="text-gray-400 text-xs px-1">...</span>
                )}
                <button
                  onClick={() => setPage(totalPages)}
                  className="px-3 py-1 text-xs rounded-lg border border-gray-200 text-gray-500 hover:text-gray-700"
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 text-xs rounded-lg border border-gray-200 text-gray-500 hover:text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
