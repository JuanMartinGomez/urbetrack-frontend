import { create } from 'zustand'
import type { Incident, IncidentStatus } from '../types'

interface IncidentStore {
    incidents: Incident[]
    setIncidents: (incidents: Incident[]) => void
    updateStatus: (id: string, status: IncidentStatus) => void
}

export const useIncidentStore = create<IncidentStore>((set, get) => ({
    incidents: [],
    setIncidents: (incoming) => {
        const current = get().incidents
        const merged = incoming.map((inc) => {
            const existing = current.find((c) => c.id === inc.id)
            return existing ? { ...inc, status: existing.status } : inc
        })
        set({ incidents: merged })
    },
    updateStatus: (id, status) =>
        set((state) => ({
            incidents: state.incidents.map((inc) =>
                inc.id === id ? { ...inc, status } : inc
            ),
        })),
}))