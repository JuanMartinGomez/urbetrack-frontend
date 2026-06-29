import { useState } from "react";
import { useAssets } from "../../hooks/useAssets";
import Table from "../../components/Table";
import Filters from "../../components/Filters";
import { assetColumns } from "./assetColumns";
import { assetFilters } from "./AssetFilters";
import type { AssetFilters as IAssetFilters } from "../../api/assets";

export default function AssetsPage() {
  const [filters, setFilters] = useState<IAssetFilters>({});
  const { data: assets, isLoading, isError } = useAssets(filters);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-gray-700">Assets</h1>
      <Filters
        config={assetFilters}
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
          columns={assetColumns}
        />
      )}
    </div>
  );
}
