import { useQueries } from '@tanstack/react-query'
import { getAssets } from '../api/assets'

export function useHomeStats() {
    const [assets,] = useQueries({
        queries: [
            { queryKey: ['assets'], queryFn: () => getAssets() },
        ],
    })

    return { assets }
}