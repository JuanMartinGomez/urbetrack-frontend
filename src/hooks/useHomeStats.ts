import { useQueries } from '@tanstack/react-query'
import { getAssets } from '../api/assets'
import { getIncidents } from '../api/incidents'
import { getVehicles } from '../api/vehicles'
import { getZones } from '../api/zones'

export function useHomeStats() {
    const [assets, incidents, vehicles, zones] = useQueries({
        queries: [
            { queryKey: ['assets'], queryFn: () => getAssets() },
            { queryKey: ['incidents'], queryFn: () => getIncidents() },
            { queryKey: ['vehicles'], queryFn: () => getVehicles() },
            { queryKey: ['zones'], queryFn: () => getZones() },
        ],
    })

    return { assets, incidents, vehicles, zones }
}