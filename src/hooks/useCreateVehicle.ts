import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createVehicle } from '../api/vehicles'

export function useCreateVehicle() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createVehicle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vehicles'] })
        },
    })
}