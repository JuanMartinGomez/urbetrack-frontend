import { BASE_URL } from './client'
import type { Zone } from '../types'

export const getZones = async (): Promise<Zone[]> => {
    const res = await fetch(`${BASE_URL}/zones`)
    if (!res.ok) throw new Error('Error al obtener zonas')
    return res.json()
}

export const getZoneById = async (id: string): Promise<Zone> => {
    const res = await fetch(`${BASE_URL}/zones/${id}`)
    if (!res.ok) throw new Error('Zona no encontrada')
    return res.json()
}