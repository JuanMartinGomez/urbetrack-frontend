import { useQuery } from '@tanstack/react-query'
import { getIncidents } from '../api/incidents'
import type { IncidentFilters } from '../api/incidents'

export const incidentsQuery = (filters?: IncidentFilters) => ({
    queryKey: ['incidents', filters],
    queryFn: () => getIncidents(filters),
})

export function useIncidents(filters?: IncidentFilters) {
    return useQuery(incidentsQuery(filters))
}