import { useState, useEffect } from "react";
import { useIncidents } from "../../hooks/useIncidents";
import { useIncidentStore } from "../../store/incidentStore";
import { getIncidentColumns } from "./IncidentColumns";
import Table from "../../components/Table";
import Filters from "../../components/Filters";
import IncidentForm from "./IncidentForm";
import Modal from "../../components/Modal";
import Toast from "../../components/Toast";
import { IncidentFilters } from "./IncidentFilters";
import type { IncidentFilters as IIncidentFilters } from "../../api/incidents";

export default function IncidentsPage() {
  const [filters, setFilters] = useState<IIncidentFilters>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { data: incidents, isLoading, isError } = useIncidents(filters);
  const {
    incidents: localIncidents,
    setIncidents,
    updateStatus,
  } = useIncidentStore();

  useEffect(() => {
    if (incidents) setIncidents(incidents);
  }, [incidents, setIncidents]);

  const handleSuccess = () => {
    setIsModalOpen(false);
    setShowToast(true);
  };

  const columns = getIncidentColumns(updateStatus);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-700">Incidentes</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-sm text-white rounded-lg"
          style={{ backgroundColor: "#9970c2" }}
        >
          + Nuevo incidente
        </button>
      </div>

      <Filters
        config={IncidentFilters}
        values={filters}
        onChange={(v) => setFilters(v as IIncidentFilters)}
      />

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
          pageSize={10}
          columns={columns}
        />
      )}

      {isModalOpen && (
        <Modal title="Nuevo incidente" onClose={() => setIsModalOpen(false)}>
          <IncidentForm onClose={handleSuccess} />
        </Modal>
      )}

      {showToast && (
        <Toast
          message="Incidente creado correctamente"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
