import { z } from 'zod'

// Asset
export const assetSchema = z.object({
    type: z.enum(['BIN', 'CONTAINER', 'BENCH']),
    status: z.enum(['OK', 'DAMAGED', 'FULL', 'OUT_OF_SERVICE']),
    lat: z.number(),
    lng: z.number(),
    address: z.string().min(1, 'La dirección es requerida'),
    zoneId: z.string().min(1, 'La zona es requerida'),
})

export type AssetFormData = z.infer<typeof assetSchema>

// Incident
export const incidentSchema = z.object({
    type: z.enum(['OVERFLOW', 'DAMAGE', 'LITTERING', 'OTHER']),
    status: z.enum(['REPORTED', 'IN_PROGRESS', 'RESOLVED']).default('REPORTED'),
    description: z.string().min(1, 'La descripción es requerida'),
    lat: z.number(),
    lng: z.number(),
    zoneId: z.string().min(1, 'La zona es requerida'),
})

export type IncidentFormData = z.infer<typeof incidentSchema>

// Vehicle
export const vehicleSchema = z.object({
    plate: z.string().min(1, 'La patente es requerida'),
    type: z.enum(['TRUCK', 'VAN', 'PICKUP']),
    status: z.enum(['ACTIVE', 'MAINTENANCE', 'OUT_OF_SERVICE']).default('ACTIVE'),
    capacity: z.number().positive('La capacidad debe ser mayor a 0'),
    zoneId: z.string().min(1, 'La zona es requerida'),
})

export type VehicleFormData = z.infer<typeof vehicleSchema>