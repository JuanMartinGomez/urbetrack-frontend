import { useQueries } from '@tanstack/react-query'
import { incidentsQuery } from './useIncidents'
import { assetsQuery } from './useAssets'
import { vehiclesQuery } from './useVehicles'

export function useHomeStats() {
    const [incidents, assets, vehicles] = useQueries({
        queries: [
            incidentsQuery(),
            assetsQuery(),
            vehiclesQuery(),
        ],
    })
    return { incidents, assets, vehicles }
}