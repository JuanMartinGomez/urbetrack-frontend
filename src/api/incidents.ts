import { BASE_URL } from './client'
import type { Incident } from '../types'
import type { IncidentFormData } from '../schemas'

export interface IncidentFilters {
    status?: string
    type?: string
    zoneId?: string
}

export const getIncidents = async (filters?: IncidentFilters): Promise<Incident[]> => {
    const params = new URLSearchParams()
    if (filters?.status) params.append('status', filters.status)
    if (filters?.type) params.append('type', filters.type)
    if (filters?.zoneId) params.append('zoneId', filters.zoneId)

    const res = await fetch(`${BASE_URL}/incidents?${params.toString()}`)
    if (!res.ok) throw new Error('Error al obtener incidentes')
    return res.json()
}

export const getIncidentById = async (id: string): Promise<Incident> => {
    const res = await fetch(`${BASE_URL}/incidents/${id}`)
    if (!res.ok) throw new Error('Incidente no encontrado')
    return res.json()
}

export const createIncident = async (data: IncidentFormData): Promise<Incident> => {
    const res = await fetch(`${BASE_URL}/incidents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Error al crear incidente')
    return res.json()
}