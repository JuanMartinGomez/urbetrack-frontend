import type { Column } from "../../components/Table";
import type { Asset, AssetStatus, AssetType } from "../../types";
import type { Zone } from "../../types";

const typeLabel: Record<AssetType, string> = {
  BIN: "Tacho",
  CONTAINER: "Contenedor",
  BENCH: "Banco",
};

const statusLabel: Record<AssetStatus, string> = {
  OK: "OK",
  DAMAGED: "Dañado",
  FULL: "Lleno",
  OUT_OF_SERVICE: "Fuera de servicio",
};

const statusColors: Record<AssetStatus, string> = {
  OK: "bg-green-100 text-green-600",
  DAMAGED: "bg-red-100 text-red-600",
  FULL: "bg-yellow-100 text-yellow-600",
  OUT_OF_SERVICE: "bg-gray-100 text-gray-600",
};

export const getAssetColumns = (zones: Zone[] = []): Column<Asset>[] => [
  {
    label: "Tipo",
    sortKey: "type",
    width: "120px",
    sortValue: (a) => typeLabel[a.type],
    render: (a) => <span className="text-gray-700">{typeLabel[a.type]}</span>,
  },
  {
    label: "Dirección",
    width: "300px",
    render: (a) => <span className="text-gray-700">{a.address}</span>,
  },
  {
    label: "Zona",
    sortKey: "zoneId",
    width: "120px",
    sortValue: (a) => zones.find((z) => z.id === a.zoneId)?.name ?? a.zoneId,
    render: (a) => (
      <span className="text-gray-500">
        {zones.find((z) => z.id === a.zoneId)?.name ?? `Zona ${a.zoneId}`}
      </span>
    ),
  },
  {
    label: "Estado",
    sortKey: "status",
    width: "160px",
    sortValue: (a) => statusLabel[a.status],
    render: (a) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[a.status]}`}
      >
        {statusLabel[a.status]}
      </span>
    ),
  },
];
