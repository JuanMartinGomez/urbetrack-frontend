import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getZones } from "../../api/zones";
import { useCreateVehicle } from "../../hooks/useCreateVehicle";
import type { VehicleFormData } from "../../schemas";

interface VehicleFormProps {
  onClose: () => void;
}

export default function VehicleForm({ onClose }: VehicleFormProps) {
  const { mutate, isPending } = useCreateVehicle();
  const { data: zones } = useQuery({ queryKey: ["zones"], queryFn: getZones });

  const [form, setForm] = useState<VehicleFormData>({
    plate: "",
    type: "TRUCK",
    status: "ACTIVE",
    capacity: 0,
    zoneId: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof VehicleFormData, string>>
  >({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof VehicleFormData, string>> = {};
    if (!form.plate) newErrors.plate = "La patente es requerida";
    if (!form.zoneId) newErrors.zoneId = "La zona es requerida";
    if (!form.capacity || form.capacity <= 0)
      newErrors.capacity = "La capacidad debe ser mayor a 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    mutate(form, { onSuccess: onClose });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Patente</label>
        <input
          type="text"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={form.plate}
          onChange={(e) => setForm({ ...form, plate: e.target.value })}
        />
        {errors.plate && (
          <span className="text-red-400 text-xs">{errors.plate}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Tipo</label>
        <select
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value as VehicleFormData["type"],
            })
          }
        >
          <option value="TRUCK">Camión</option>
          <option value="VAN">Furgoneta</option>
          <option value="PICKUP">Pickup</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Estado</label>
        <select
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value as VehicleFormData["status"],
            })
          }
        >
          <option value="ACTIVE">Activo</option>
          <option value="MAINTENANCE">En mantenimiento</option>
          <option value="OUT_OF_SERVICE">Fuera de servicio</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Zona</label>
        <select
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={form.zoneId}
          onChange={(e) => setForm({ ...form, zoneId: e.target.value })}
        >
          <option value="">Seleccioná una zona</option>
          {zones?.map((z) => (
            <option key={z.id} value={z.id}>
              {z.name}
            </option>
          ))}
        </select>
        {errors.zoneId && (
          <span className="text-red-400 text-xs">{errors.zoneId}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-600">Capacidad (kg)</label>
        <input
          type="number"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={form.capacity}
          onChange={(e) =>
            setForm({ ...form, capacity: parseFloat(e.target.value) })
          }
        />
        {errors.capacity && (
          <span className="text-red-400 text-xs">{errors.capacity}</span>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="px-4 py-2 text-sm text-white rounded-lg disabled:opacity-50"
          style={{ backgroundColor: "#9970c2" }}
        >
          {isPending ? "Guardando..." : "Crear vehículo"}
        </button>
      </div>
    </div>
  );
}
