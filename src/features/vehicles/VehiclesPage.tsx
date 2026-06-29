import { useState } from "react";
import { useVehicles } from "../../hooks/useVehicles";
import Table from "../../components/Table";
import Filters from "../../components/Filters";
import { VehicleColumns } from "./VehicleColumns";
import { VehicleFilters } from "./VehicleFilters";
import type { VehicleFilters as IVehicleFilters } from "../../api/vehicles";

export default function VehiclesPage() {
  const [filters, setFilters] = useState<IVehicleFilters>({});
  const { data: vehicles, isLoading, isError } = useVehicles(filters);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-gray-700">Vehículos</h1>
      <Filters
        config={VehicleFilters}
        values={filters}
        onChange={(v) => setFilters(v as IVehicleFilters)}
      />
      {isLoading && (
        <p className="text-gray-400 text-sm">Cargando vehículos...</p>
      )}
      {isError && (
        <p className="text-red-400 text-sm">Error al cargar vehículos</p>
      )}
      {vehicles && (
        <Table
          data={vehicles}
          keyExtractor={(v) => v.id}
          pageSize={10}
          columns={VehicleColumns}
        />
      )}
    </div>
  );
}
