export type AssetType = 'BIN' | 'CONTAINER' | 'BENCH'
export type AssetStatus = 'OK' | 'DAMAGED' | 'FULL' | 'OUT_OF_SERVICE'

export interface Asset {
    id: string
    type: AssetType
    status: AssetStatus
    lat: number
    lng: number
    address: string
    zoneId: string
}

export type IncidentType = 'OVERFLOW' | 'DAMAGE' | 'LITTERING' | 'OTHER'
export type IncidentStatus = 'REPORTED' | 'IN_PROGRESS' | 'RESOLVED'

export interface Incident {
    id: string
    type: IncidentType
    status: IncidentStatus
    description: string
    lat: number
    lng: number
    zoneId: string
    createdAt: string
}

export type VehicleType = 'TRUCK' | 'VAN' | 'PICKUP'
export type VehicleStatus = 'ACTIVE' | 'MAINTENANCE' | 'OUT_OF_SERVICE'

export interface Vehicle {
    id: string
    plate: string
    type: VehicleType
    status: VehicleStatus
    capacity: number
    zoneId: string
}

export interface Zone {
    id: string
    name: string
}