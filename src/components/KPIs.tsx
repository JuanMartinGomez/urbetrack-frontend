import { useMemo } from "react";
import type { Asset, Incident } from "../types";

interface ZoneKPIsProps {
  assets: Asset[];
  incidents: Incident[];
}

interface KPICard {
  label: string;
  value: number;
  color: string;
}

export default function KPIs({ assets, incidents }: ZoneKPIsProps) {
  const kpis = useMemo<KPICard[]>(
    () => [
      { label: "Total Assets", value: assets.length, color: "text-brand" },
      {
        label: "Assets OK",
        value: assets.filter((a) => a.status === "OK").length,
        color: "text-green-500",
      },
      {
        label: "Assets Llenos",
        value: assets.filter((a) => a.status === "FULL").length,
        color: "text-yellow-500",
      },
      {
        label: "Assets Dañados",
        value: assets.filter((a) => a.status === "DAMAGED").length,
        color: "text-red-500",
      },
      {
        label: "Total Incidentes",
        value: incidents.length,
        color: "text-brand",
      },
      {
        label: "Incidentes Abiertos",
        value: incidents.filter(
          (i) => i.status === "REPORTED" || i.status === "IN_PROGRESS",
        ).length,
        color: "text-red-500",
      },
      {
        label: "Incidentes Resueltos",
        value: incidents.filter((i) => i.status === "RESOLVED").length,
        color: "text-green-500",
      },
    ],
    [assets, incidents],
  );

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="bg-white rounded-2xl shadow-sm px-4 py-4 flex flex-col gap-1"
        >
          <span className="text-xs text-gray-400">{kpi.label}</span>
          <span className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</span>
        </div>
      ))}
    </div>
  );
}
