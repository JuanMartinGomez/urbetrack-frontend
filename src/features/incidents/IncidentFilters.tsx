import type { FilterConfig } from "../../components/Filters";

export const IncidentFilters: FilterConfig[] = [
  {
    key: "status",
    label: "Todos los estados",
    options: [
      { value: "REPORTED", label: "Reportado" },
      { value: "IN_PROGRESS", label: "En progreso" },
      { value: "RESOLVED", label: "Resuelto" },
    ],
  },
  {
    key: "type",
    label: "Todos los tipos",
    options: [
      { value: "OVERFLOW", label: "Desbordamiento" },
      { value: "DAMAGE", label: "Daño" },
      { value: "LITTERING", label: "Basura" },
      { value: "OTHER", label: "Otro" },
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
