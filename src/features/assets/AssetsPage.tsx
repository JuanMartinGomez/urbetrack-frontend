import { useAssets } from "../../hooks/useAssets";
import Table from "../../components/Table";
import { assetColumns } from "./assetColumns";

export default function AssetsPage() {
  const { data: assets, isLoading, isError } = useAssets();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-gray-700">Assets</h1>
      {isLoading && <p className="text-gray-400 text-sm">Cargando assets...</p>}
      {isError && (
        <p className="text-red-400 text-sm">Error al cargar assets</p>
      )}
      {assets && (
        <Table
          data={assets}
          keyExtractor={(a) => a.id}
          pageSize={20}
          columns={assetColumns}
        />
      )}
    </div>
  );
}
