import { useState } from "react";
import { useIncidentStore } from "../../store/incidentStore";
import type { Incident, IncidentStatus } from "../../types";

interface IncidentTableProps {
  incidents: Incident[];
}

const statusLabel: Record<IncidentStatus, string> = {
  REPORTED: "Reportado",
  IN_PROGRESS: "En progreso",
  RESOLVED: "Resuelto",
};

const statusColors: Record<IncidentStatus, string> = {
  REPORTED: "bg-red-100 text-red-600",
  IN_PROGRESS: "bg-yellow-100 text-yellow-600",
  RESOLVED: "bg-green-100 text-green-600",
};

const nextStatus: Partial<Record<IncidentStatus, IncidentStatus>> = {
  REPORTED: "IN_PROGRESS",
  IN_PROGRESS: "RESOLVED",
};

const nextStatusLabel: Partial<Record<IncidentStatus, string>> = {
  REPORTED: "Iniciar",
  IN_PROGRESS: "Resolver",
};

type SortKey = "type" | "status" | "zoneId" | "createdAt";
type SortDirection = "asc" | "desc";

export default function IncidentTable({ incidents }: IncidentTableProps) {
  const { updateStatus } = useIncidentStore();
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = [...incidents].sort((a, b) => {
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (valA < valB) return sortDir === "asc" ? -1 : 1;
    if (valA > valB) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const sortIcon = (key: SortKey) => {
    if (sortKey !== key) return <span className="text-gray-300 ml-1">↕</span>;
    return (
      <span className="text-brand ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th
              className="text-left px-4 py-3 text-gray-500 font-medium cursor-pointer hover:text-gray-700"
              onClick={() => handleSort("type")}
            >
              Tipo {sortIcon("type")}
            </th>
            <th className="text-left px-4 py-3 text-gray-500 font-medium">
              Descripción
            </th>
            <th
              className="text-left px-4 py-3 text-gray-500 font-medium cursor-pointer hover:text-gray-700"
              onClick={() => handleSort("zoneId")}
            >
              Zona {sortIcon("zoneId")}
            </th>
            <th
              className="text-left px-4 py-3 text-gray-500 font-medium cursor-pointer hover:text-gray-700"
              onClick={() => handleSort("status")}
            >
              Estado {sortIcon("status")}
            </th>
            <th
              className="text-left px-4 py-3 text-gray-500 font-medium cursor-pointer hover:text-gray-700"
              onClick={() => handleSort("createdAt")}
            >
              Fecha {sortIcon("createdAt")}
            </th>
            <th className="text-left px-4 py-3 text-gray-500 font-medium">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((incident) => (
            <tr
              key={incident.id}
              className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-3 text-gray-700">{incident.type}</td>
              <td className="px-4 py-3 text-gray-700 max-w-xs truncate">
                {incident.description}
              </td>
              <td className="px-4 py-3 text-gray-500">
                Zona {incident.zoneId}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[incident.status]}`}
                >
                  {statusLabel[incident.status]}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-500">
                {new Date(incident.createdAt).toLocaleDateString("es-AR")}
              </td>
              <td className="px-4 py-3">
                {nextStatus[incident.status] && (
                  <button
                    onClick={() =>
                      updateStatus(incident.id, nextStatus[incident.status]!)
                    }
                    className="px-3 py-1 text-xs text-white rounded-lg"
                    style={{ backgroundColor: "#9970c2" }}
                  >
                    {nextStatusLabel[incident.status]}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
