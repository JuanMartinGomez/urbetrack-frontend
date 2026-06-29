import { useState, useMemo } from "react";
import Table from "../../components/Table";
import { getAssetColumns } from "../assets/AssetColumns";
import type { Asset, AssetStatus, AssetType } from "../../types";
import type { Zone } from "../../types";

interface ZoneAssetTableProps {
  assets: Asset[];
  zone: Zone;
}

export default function ZoneAssetTable({ assets, zone }: ZoneAssetTableProps) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<AssetType | "">("");
  const [statusFilter, setStatusFilter] = useState<AssetStatus | "">("");

  const filtered = useMemo(() => {
    return assets.filter((a) => {
      const matchSearch =
        !search || a.address.toLowerCase().includes(search.toLowerCase());
      const matchType = !typeFilter || a.type === typeFilter;
      const matchStatus = !statusFilter || a.status === statusFilter;
      return matchSearch && matchType && matchStatus;
    });
  }, [assets, search, typeFilter, statusFilter]);

  const columns = getAssetColumns([zone]);

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-base font-medium text-gray-600">Assets</h2>
      <div className="flex gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Buscar por dirección..."
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as AssetType | "")}
        >
          <option value="">Todos los tipos</option>
          <option value="BIN">Tacho</option>
          <option value="CONTAINER">Contenedor</option>
          <option value="BENCH">Banco</option>
        </select>
        <select
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as AssetStatus | "")}
        >
          <option value="">Todos los estados</option>
          <option value="OK">OK</option>
          <option value="DAMAGED">Dañado</option>
          <option value="FULL">Lleno</option>
          <option value="OUT_OF_SERVICE">Fuera de servicio</option>
        </select>
      </div>
      <Table
        data={filtered}
        keyExtractor={(a) => a.id}
        pageSize={10}
        columns={columns}
      />
    </div>
  );
}
