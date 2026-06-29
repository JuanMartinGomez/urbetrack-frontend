import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getZones } from "../../api/zones";
import { useCreateIncident } from "../../hooks/useCreateIncident";
import type { IncidentFormData } from "../../schemas";

interface IncidentFormProps {
  onClose: () => void;
}

export default function IncidentForm({ onClose }: IncidentFormProps) {
  const { mutate, isPending } = useCreateIncident();
  const { data: zones } = useQuery({ queryKey: ["zones"], queryFn: getZones });

  const [form, setForm] = useState<IncidentFormData>({
    type: "OVERFLOW",
    status: "REPORTED",
    description: "",
    lat: 0,
    lng: 0,
    zoneId: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof IncidentFormData, string>>
  >({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof IncidentFormData, string>> = {};
    if (!form.description)
      newErrors.description = "La descripción es requerida";
    if (!form.zoneId) newErrors.zoneId = "La zona es requerida";
    if (!form.lat) newErrors.lat = "La latitud es requerida";
    if (!form.lng) newErrors.lng = "La longitud es requerida";
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
        <label className="text-sm text-gray-600">Tipo</label>
        <select
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value as IncidentFormData["type"],
            })
          }
        >
          <option value="OVERFLOW">Desbordamiento</option>
          <option value="DAMAGE">Daño</option>
          <option value="LITTERING">Basura</option>
          <option value="OTHER">Otro</option>
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
        <label className="text-sm text-gray-600">Descripción</label>
        <textarea
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        {errors.description && (
          <span className="text-red-400 text-xs">{errors.description}</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Latitud</label>
          <input
            type="number"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={form.lat}
            onChange={(e) =>
              setForm({ ...form, lat: parseFloat(e.target.value) })
            }
          />
          {errors.lat && (
            <span className="text-red-400 text-xs">{errors.lat}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600">Longitud</label>
          <input
            type="number"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
            value={form.lng}
            onChange={(e) =>
              setForm({ ...form, lng: parseFloat(e.target.value) })
            }
          />
          {errors.lng && (
            <span className="text-red-400 text-xs">{errors.lng}</span>
          )}
        </div>
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
          {isPending ? "Guardando..." : "Crear incidente"}
        </button>
      </div>
    </div>
  );
}
