import { useQueries } from '@tanstack/react-query'
import { getAssets } from '../api/assets'
import { getIncidents } from '../api/incidents'

export function useHomeStats() {
    const [assets, incidents] = useQueries({
        queries: [
            { queryKey: ['assets'], queryFn: () => getAssets() },
            { queryKey: ['incidents'], queryFn: () => getIncidents() },
        ],
    })

    return { assets, incidents }
}