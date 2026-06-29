import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getZoneById } from "../../api/zones";
import { getAssets } from "../../api/assets";
import { getIncidents } from "../../api/incidents";
import { getIncidentColumns } from "../incidents/IncidentColumns";
import { useIncidentStore } from "../../store/incidentStore";
import Table from "../../components/Table";
import ZoneKPIs from "../../components/KPIs";
import ZoneMap from "../../components/Map";
import ZoneCharts from "../../components/Charts";
import ZoneAssetTable from "./ZoneAssetTable";

export default function ZoneDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateStatus } = useIncidentStore();

  const { data: zone } = useQuery({
    queryKey: ["zones", id],
    queryFn: () => getZoneById(id!),
  });

  const { data: allAssets, isLoading: loadingAssets } = useQuery({
    queryKey: ["assets"],
    queryFn: () => getAssets(),
  });

  const { data: incidents, isLoading: loadingIncidents } = useQuery({
    queryKey: ["incidents", { zoneId: id }],
    queryFn: () => getIncidents({ zoneId: id }),
  });

  const assets = useMemo(
    () => allAssets?.filter((a) => a.zoneId === id) ?? [],
    [allAssets, id],
  );

  const incidentColumns = getIncidentColumns(updateStatus);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/zones")}
          className="text-gray-400 hover:text-gray-600 text-sm"
        >
          ← Zonas
        </button>
        <h1 className="text-xl font-semibold text-gray-700">{zone?.name}</h1>
      </div>

      {!loadingAssets && !loadingIncidents && (
        <ZoneKPIs assets={assets} incidents={incidents ?? []} />
      )}

      {assets.length > 0 && incidents && (
        <ZoneMap assets={assets} incidents={incidents} />
      )}

      {assets.length > 0 && incidents && (
        <ZoneCharts assets={assets} incidents={incidents} />
      )}

      <div className="flex flex-col gap-3">
        <h2 className="text-base font-medium text-gray-600">Incidentes</h2>
        {loadingIncidents && (
          <p className="text-gray-400 text-sm">Cargando incidentes...</p>
        )}
        {incidents && (
          <Table
            data={incidents}
            keyExtractor={(i) => i.id}
            pageSize={10}
            columns={incidentColumns}
          />
        )}
      </div>

      {loadingAssets && (
        <p className="text-gray-400 text-sm">Cargando assets...</p>
      )}
      {zone && assets.length > 0 && (
        <ZoneAssetTable assets={assets} zone={zone} />
      )}
    </div>
  );
}
