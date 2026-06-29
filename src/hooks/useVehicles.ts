import { useQuery } from '@tanstack/react-query'
import { getVehicles } from '../api/vehicles'
import type { VehicleFilters } from '../api/vehicles'

export const vehiclesQuery = (filters?: VehicleFilters) => ({
    queryKey: ['vehicles', filters],
    queryFn: () => getVehicles(filters),
})

export function useVehicles(filters?: VehicleFilters) {
    return useQuery(vehiclesQuery(filters))
}