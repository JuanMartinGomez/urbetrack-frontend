import { useQueries } from '@tanstack/react-query'
import { incidentsQuery } from './useIncidents'
import { assetsQuery } from './useAssets'
import { vehiclesQuery } from './useVehicles'
import { zonesQuery } from './useZones'

export function useHomeStats() {
    const [incidents, assets, vehicles, zones] = useQueries({
        queries: [
            incidentsQuery(),
            assetsQuery(),
            vehiclesQuery(),
            zonesQuery(),
        ],
    })
    return { incidents, assets, vehicles, zones }
}