import type { Column } from "../../components/Table";
import type { Vehicle, VehicleStatus, VehicleType } from "../../types";

const typeLabel: Record<VehicleType, string> = {
  TRUCK: "Camión",
  VAN: "Furgoneta",
  PICKUP: "Pickup",
};

const statusLabel: Record<VehicleStatus, string> = {
  ACTIVE: "Activo",
  MAINTENANCE: "En mantenimiento",
  OUT_OF_SERVICE: "Fuera de servicio",
};

const statusColors: Record<VehicleStatus, string> = {
  ACTIVE: "bg-green-100 text-green-600",
  MAINTENANCE: "bg-yellow-100 text-yellow-600",
  OUT_OF_SERVICE: "bg-gray-100 text-gray-600",
};

export const VehicleColumns: Column<Vehicle>[] = [
  {
    label: "Patente",
    sortKey: "plate",
    width: "120px",
    render: (v) => <span className="text-gray-700 font-medium">{v.plate}</span>,
  },
  {
    label: "Tipo",
    sortKey: "type",
    width: "120px",
    sortValue: (v) => typeLabel[v.type],
    render: (v) => <span className="text-gray-700">{typeLabel[v.type]}</span>,
  },
  {
    label: "Capacidad",
    sortKey: "capacity",
    width: "120px",
    render: (v) => <span className="text-gray-500">{v.capacity} kg</span>,
  },
  {
    label: "Zona",
    sortKey: "zoneId",
    width: "100px",
    render: (v) => <span className="text-gray-500">Zona {v.zoneId}</span>,
  },
  {
    label: "Estado",
    sortKey: "status",
    width: "160px",
    sortValue: (v) => statusLabel[v.status],
    render: (v) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[v.status]}`}
      >
        {statusLabel[v.status]}
      </span>
    ),
  },
];
