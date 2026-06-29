import { useState } from "react";
import { useVehicles } from "../../hooks/useVehicles";
import Table from "../../components/Table";
import Filters from "../../components/Filters";
import VehicleForm from "./VehicleForm";
import Modal from "../../components/Modal";
import Toast from "../../components/Toast";
import { VehicleColumns } from "./VehicleColumns";
import { VehicleFilters } from "./VehicleFilters";
import type { VehicleFilters as IVehicleFilters } from "../../api/vehicles";

export default function VehiclesPage() {
  const [filters, setFilters] = useState<IVehicleFilters>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { data: vehicles, isLoading, isError } = useVehicles(filters);

  const handleSuccess = () => {
    setIsModalOpen(false);
    setShowToast(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-700">Vehículos</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm text-white rounded-lg"
          style={{ backgroundColor: "#9970c2" }}
        >
          + Nuevo vehículo
        </button>
      </div>
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
          pageSize={20}
          columns={VehicleColumns}
        />
      )}
      {isModalOpen && (
        <Modal title="Nuevo vehículo" onClose={() => setIsModalOpen(false)}>
          <VehicleForm onClose={handleSuccess} />
        </Modal>
      )}
      {showToast && (
        <Toast
          message="Vehículo creado correctamente"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
