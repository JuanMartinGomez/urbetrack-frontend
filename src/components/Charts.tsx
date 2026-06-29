import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Asset, Incident } from "../types";

interface ZoneChartsProps {
  assets: Asset[];
  incidents: Incident[];
}

const ASSET_STATUS_COLORS = {
  OK: "#22c55e",
  DAMAGED: "#ef4444",
  FULL: "#eab308",
  OUT_OF_SERVICE: "#9ca3af",
};

const INCIDENT_STATUS_COLORS = {
  REPORTED: "#ef4444",
  IN_PROGRESS: "#eab308",
  RESOLVED: "#22c55e",
};

const assetStatusLabel: Record<string, string> = {
  OK: "OK",
  DAMAGED: "Dañado",
  FULL: "Lleno",
  OUT_OF_SERVICE: "Fuera de servicio",
};

const incidentStatusLabel: Record<string, string> = {
  REPORTED: "Reportado",
  IN_PROGRESS: "En progreso",
  RESOLVED: "Resuelto",
};

export default function ZoneCharts({ assets, incidents }: ZoneChartsProps) {
  const assetData = useMemo(() => {
    const counts: Record<string, number> = {};
    assets.forEach((a) => {
      counts[a.status] = (counts[a.status] ?? 0) + 1;
    });
    return Object.entries(counts).map(([status, value]) => ({
      name: assetStatusLabel[status],
      value,
      color: ASSET_STATUS_COLORS[status as keyof typeof ASSET_STATUS_COLORS],
    }));
  }, [assets]);

  const incidentData = useMemo(() => {
    const counts: Record<string, number> = {};
    incidents.forEach((i) => {
      counts[i.status] = (counts[i.status] ?? 0) + 1;
    });
    return Object.entries(counts).map(([status, value]) => ({
      name: incidentStatusLabel[status],
      value,
      color:
        INCIDENT_STATUS_COLORS[status as keyof typeof INCIDENT_STATUS_COLORS],
    }));
  }, [incidents]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-600 mb-4">
          Assets por estado
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={assetData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
            >
              {assetData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-sm font-medium text-gray-600 mb-4">
          Incidentes por estado
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={incidentData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
            >
              {incidentData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
