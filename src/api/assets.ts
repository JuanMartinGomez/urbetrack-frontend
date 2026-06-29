import { BASE_URL } from './client'
import type { Asset } from '../types'
import type { AssetFormData } from '../schemas'

export interface AssetFilters extends Record<string, string | undefined> {
    status?: string
    type?: string
}

export const getAssets = async (filters?: AssetFilters): Promise<Asset[]> => {
    const params = new URLSearchParams()
    if (filters?.status) params.append('status', filters.status)
    if (filters?.type) params.append('type', filters.type)

    const res = await fetch(`${BASE_URL}/assets?${params.toString()}`)
    if (!res.ok) throw new Error('Error al obtener assets')
    return res.json()
}

export const createAsset = async (data: AssetFormData): Promise<Asset> => {
    const res = await fetch(`${BASE_URL}/assets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Error al crear asset')
    return res.json()
}