import { useHomeStats } from "../../hooks/useHomeStats";
import StatCard from "../../components/StatCard";

export default function HomePage() {
  const { assets, incidents, vehicles, zones } = useHomeStats();

  const damagedAssets =
    assets.data?.filter((a) => a.status === "DAMAGED" || a.status === "FULL")
      .length ?? 0;

  const openIncidents =
    incidents.data?.filter(
      (i) => i.status === "REPORTED" || i.status === "IN_PROGRESS",
    ).length ?? 0;

  const activeVehicles =
    vehicles.data?.filter((v) => v.status === "ACTIVE").length ?? 0;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold text-gray-700">Resumen operativo</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <StatCard
          title="Assets"
          total={assets.data?.length ?? 0}
          detail={`${damagedAssets} con problemas`}
          icon="🗑"
          to="/assets"
          isLoading={assets.isLoading}
          isError={assets.isError}
        />
        <StatCard
          title="Incidentes"
          total={incidents.data?.length ?? 0}
          detail={`${openIncidents} abiertos`}
          icon="⚠"
          to="/incidents"
          isLoading={incidents.isLoading}
          isError={incidents.isError}
        />
        <StatCard
          title="Vehículos"
          total={vehicles.data?.length ?? 0}
          detail={`${activeVehicles} activos`}
          icon="🚛"
          to="/vehicles"
          isLoading={vehicles.isLoading}
          isError={vehicles.isError}
        />
        <StatCard
          title="Zonas"
          total={zones.data?.length ?? 0}
          detail="zonas registradas"
          icon="📍"
          to="/zones"
          isLoading={zones.isLoading}
          isError={zones.isError}
        />
      </div>
    </div>
  );
}
