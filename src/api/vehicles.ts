import { BASE_URL } from './client'
import type { Vehicle } from '../types'
import type { VehicleFormData } from '../schemas'

export interface VehicleFilters {
    status?: string
    type?: string
    zoneId?: string
}

export const getVehicles = async (filters?: VehicleFilters): Promise<Vehicle[]> => {
    const params = new URLSearchParams()
    if (filters?.status) params.append('status', filters.status)
    if (filters?.type) params.append('type', filters.type)
    if (filters?.zoneId) params.append('zoneId', filters.zoneId)

    const res = await fetch(`${BASE_URL}/vehicles?${params.toString()}`)
    if (!res.ok) throw new Error('Error al obtener vehículos')
    return res.json()
}

export const getVehicleById = async (id: string): Promise<Vehicle> => {
    const res = await fetch(`${BASE_URL}/vehicles/${id}`)
    if (!res.ok) throw new Error('Vehículo no encontrado')
    return res.json()
}

export const createVehicle = async (data: VehicleFormData): Promise<Vehicle> => {
    const res = await fetch(`${BASE_URL}/vehicles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Error al crear vehículo')
    return res.json()
}