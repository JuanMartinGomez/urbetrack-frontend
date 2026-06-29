import { useZones } from "../../hooks/useZones";

export default function ZonesPage() {
  const { data: zones, isLoading, isError } = useZones();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-gray-700">Zonas</h1>
      {isLoading && <p className="text-gray-400 text-sm">Cargando zonas...</p>}
      {isError && <p className="text-red-400 text-sm">Error al cargar zonas</p>}
      {zones && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {zones.map((zone) => (
            <div
              key={zone.id}
              className="bg-white rounded-2xl shadow-sm px-6 py-4   transition-shadow flex items-center justify-between"
            >
              <span className="text-gray-700 font-medium">{zone.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
