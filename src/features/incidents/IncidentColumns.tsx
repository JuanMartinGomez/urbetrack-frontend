import type { Column } from "../../components/Table";
import type { Incident, IncidentStatus, IncidentType } from "../../types";

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

const typeLabel: Record<IncidentType, string> = {
  OVERFLOW: "Desbordamiento",
  DAMAGE: "Daño",
  LITTERING: "Basura",
  OTHER: "Otro",
};

const nextStatus: Partial<Record<IncidentStatus, IncidentStatus>> = {
  REPORTED: "IN_PROGRESS",
  IN_PROGRESS: "RESOLVED",
};

const nextStatusLabel: Partial<Record<IncidentStatus, string>> = {
  REPORTED: "Iniciar",
  IN_PROGRESS: "Resolver",
};

export const getIncidentColumns = (
  updateStatus: (id: string, status: IncidentStatus) => void,
): Column<Incident>[] => [
  {
    label: "Tipo",
    sortKey: "type",
    width: "150px",
    sortValue: (i) => typeLabel[i.type],
    render: (i) => <span className="text-gray-700">{typeLabel[i.type]}</span>,
  },
  {
    label: "Descripción",
    width: "300px",
    render: (i) => (
      <span className="text-gray-700 truncate block max-w-xs">
        {i.description}
      </span>
    ),
  },
  {
    label: "Zona",
    sortKey: "zoneId",
    width: "100px",
    render: (i) => <span className="text-gray-500">Zona {i.zoneId}</span>,
  },
  {
    label: "Estado",
    sortKey: "status",
    width: "140px",
    sortValue: (i) => statusLabel[i.status],
    render: (i) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[i.status]}`}
      >
        {statusLabel[i.status]}
      </span>
    ),
  },
  {
    label: "Fecha",
    sortKey: "createdAt",
    width: "120px",
    render: (i) => (
      <span className="text-gray-500">
        {new Date(i.createdAt).toLocaleDateString("es-AR")}
      </span>
    ),
  },
  {
    label: "Acción",
    width: "100px",
    render: (i) =>
      nextStatus[i.status] ? (
        <button
          onClick={() => updateStatus(i.id, nextStatus[i.status]!)}
          className="px-3 py-1 text-xs text-white rounded-lg"
          style={{ backgroundColor: "#9970c2" }}
        >
          {nextStatusLabel[i.status]}
        </button>
      ) : null,
  },
];
