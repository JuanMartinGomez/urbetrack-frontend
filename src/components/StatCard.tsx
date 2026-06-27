import { useNavigate } from "react-router-dom";

interface StatCardProps {
  title: string;
  total: number;
  detail: string;
  icon: string;
  to: string;
  isLoading: boolean;
  isError: boolean;
}

export default function StatCard({
  title,
  total,
  detail,
  icon,
  to,
  isLoading,
  isError,
}: StatCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(to)}
      className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <span className="text-2xl">{icon}</span>
      </div>

      {isLoading && <p className="text-gray-400 text-sm">Cargando...</p>}

      {isError && <p className="text-red-400 text-sm">Error al cargar datos</p>}

      {!isLoading && !isError && (
        <>
          <span className="text-4xl font-bold text-brand">{total}</span>
          <span className="text-sm text-gray-400">{detail}</span>
        </>
      )}
    </div>
  );
}
