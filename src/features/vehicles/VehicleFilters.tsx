import type { FilterConfig } from "../../components/Filters";

export const VehicleFilters: FilterConfig[] = [
  {
    key: "type",
    label: "Todos los tipos",
    options: [
      { value: "TRUCK", label: "Camión" },
      { value: "VAN", label: "Furgoneta" },
      { value: "PICKUP", label: "Pickup" },
    ],
  },
  {
    key: "status",
    label: "Todos los estados",
    options: [
      { value: "ACTIVE", label: "Activo" },
      { value: "MAINTENANCE", label: "En mantenimiento" },
      { value: "OUT_OF_SERVICE", label: "Fuera de servicio" },
    ],
  },
  {
    key: "zoneId",
    label: "Todas las zonas",
    options: [
      { value: "1", label: "Microcentro" },
      { value: "2", label: "Palermo" },
      { value: "3", label: "Recoleta" },
      { value: "4", label: "Belgrano" },
      { value: "5", label: "Caballito" },
    ],
  },
];
