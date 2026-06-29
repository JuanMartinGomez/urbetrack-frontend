import { useQuery } from '@tanstack/react-query'
import { getZones } from '../api/zones'

export const zonesQuery = () => ({
    queryKey: ['zones'],
    queryFn: () => getZones(),
})

export function useZones() {
    return useQuery(zonesQuery())
}