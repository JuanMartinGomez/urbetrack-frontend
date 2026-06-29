import { useQuery } from '@tanstack/react-query'
import { getAssets } from '../api/assets'
import type { AssetFilters } from '../api/assets'

export const assetsQuery = (filters?: AssetFilters) => ({
    queryKey: ['assets', filters],
    queryFn: () => getAssets(filters),
})

export function useAssets(filters?: AssetFilters) {
    return useQuery(assetsQuery(filters))
}