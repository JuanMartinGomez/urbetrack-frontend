import type { FilterConfig } from "../../components/Filters";

export const AssetFilters: FilterConfig[] = [
  {
    key: "type",
    label: "Todos los tipos",
    options: [
      { value: "BIN", label: "Tacho" },
      { value: "CONTAINER", label: "Contenedor" },
      { value: "BENCH", label: "Banco" },
    ],
  },
  {
    key: "status",
    label: "Todos los estados",
    options: [
      { value: "OK", label: "OK" },
      { value: "DAMAGED", label: "Dañado" },
      { value: "FULL", label: "Lleno" },
      { value: "OUT_OF_SERVICE", label: "Fuera de servicio" },
    ],
  },
];
