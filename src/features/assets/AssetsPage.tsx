import { useState } from "react";
import { useAssets } from "../../hooks/useAssets";
import { useZones } from "../../hooks/useZones";
import Table from "../../components/Table";
import Filters from "../../components/Filters";
import AssetForm from "./AssetForm";
import Modal from "../../components/Modal";
import Toast from "../../components/Toast";
import { getAssetColumns } from "./AssetColumns";
import { AssetFilters } from "./AssetFilters";
import type { AssetFilters as IAssetFilters } from "../../api/assets";

export default function AssetsPage() {
  const [filters, setFilters] = useState<IAssetFilters>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { data: assets, isLoading, isError } = useAssets(filters);
  const { data: zones } = useZones();

  const handleSuccess = () => {
    setIsModalOpen(false);
    setShowToast(true);
  };

  const columns = getAssetColumns(zones);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-700">Assets</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm text-white rounded-lg"
          style={{ backgroundColor: "#9970c2" }}
        >
          + Nuevo asset
        </button>
      </div>
      <Filters
        config={AssetFilters}
        values={filters}
        onChange={(v) => setFilters(v as IAssetFilters)}
      />
      {isLoading && <p className="text-gray-400 text-sm">Cargando assets...</p>}
      {isError && (
        <p className="text-red-400 text-sm">Error al cargar assets</p>
      )}
      {assets && (
        <Table
          data={assets}
          keyExtractor={(a) => a.id}
          pageSize={20}
          columns={columns}
        />
      )}
      {isModalOpen && (
        <Modal title="Nuevo asset" onClose={() => setIsModalOpen(false)}>
          <AssetForm onClose={handleSuccess} />
        </Modal>
      )}
      {showToast && (
        <Toast
          message="Asset creado correctamente"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
