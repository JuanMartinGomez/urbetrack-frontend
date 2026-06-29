import { useEffect } from "react";
import { useIncidents } from "../../hooks/useIncidents";
import { useIncidentStore } from "../../store/incidentStore";
import { getIncidentColumns } from "./IncidentColumns";
import Table from "../../components/Table";

export default function IncidentsPage() {
  const { data: incidents, isLoading, isError } = useIncidents();
  const {
    incidents: localIncidents,
    setIncidents,
    updateStatus,
  } = useIncidentStore();

  useEffect(() => {
    if (incidents) setIncidents(incidents);
  }, [incidents, setIncidents]);

  const columns = getIncidentColumns(updateStatus);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-700">Incidentes</h1>
      </div>

      {isLoading && (
        <p className="text-gray-400 text-sm">Cargando incidentes...</p>
      )}
      {isError && (
        <p className="text-red-400 text-sm">Error al cargar incidentes</p>
      )}
      {localIncidents.length > 0 && (
        <Table
          data={localIncidents}
          keyExtractor={(i) => i.id}
          pageSize={20}
          columns={columns}
        />
      )}
    </div>
  );
}
