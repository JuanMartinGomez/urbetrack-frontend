import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";
import type { Asset, Incident } from "../types";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const incidentIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconRetinaUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface FitBoundsProps {
  assets: Asset[];
  incidents: Incident[];
}

function FitBounds({ assets, incidents }: FitBoundsProps) {
  const map = useMap();

  useEffect(() => {
    const points = [
      ...assets.map((a) => [a.lat, a.lng] as [number, number]),
      ...incidents.map((i) => [i.lat, i.lng] as [number, number]),
    ];
    if (points.length > 0) {
      map.fitBounds(L.latLngBounds(points), { padding: [40, 40] });
    }
  }, [assets, incidents, map]);

  return null;
}

interface ZoneMapProps {
  assets: Asset[];
  incidents: Incident[];
}

export default function ZoneMap({ assets, incidents }: ZoneMapProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <h2 className="text-base font-medium text-gray-600">Mapa</h2>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />{" "}
            Assets
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />{" "}
            Incidentes
          </span>
        </div>
      </div>
      <div
        className="rounded-2xl overflow-hidden shadow-sm"
        style={{ height: "400px" }}
      >
        <MapContainer
          center={[-34.6037, -58.3816]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <FitBounds assets={assets} incidents={incidents} />
          <MarkerClusterGroup>
            {assets.map((asset) => (
              <Marker
                key={`asset-${asset.id}`}
                position={[asset.lat, asset.lng]}
              >
                <Popup>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{asset.type}</span>
                    <span className="text-gray-500 text-xs">
                      {asset.address}
                    </span>
                    <span className="text-xs">{asset.status}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
            {incidents.map((incident) => (
              <Marker
                key={`incident-${incident.id}`}
                position={[incident.lat, incident.lng]}
                icon={incidentIcon}
              >
                <Popup>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{incident.type}</span>
                    <span className="text-gray-500 text-xs">
                      {incident.description}
                    </span>
                    <span className="text-xs">{incident.status}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
}
