import { useVehicles } from "../../hooks/useVehicles";
import Table from "../../components/Table";
import { VehicleColumns } from "./VehicleColumns";

export default function VehiclesPage() {
  const { data: vehicles, isLoading, isError } = useVehicles();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-gray-700">Vehículos</h1>
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
