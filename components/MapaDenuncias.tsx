"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

interface Denuncia {
  id: number | string;
  lat: number;
  lng: number;
  categoria: string;
  descricao: string;
  bairro: string;
}

function HeatmapLayer({ points }: { points: [number, number, number][] }) {
  const map = useMap();
  const layerRef = useRef<L.Layer | null>(null);

  useEffect(() => {
    if (points.length === 0) return;

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const heat = require("leaflet.heat");
    void heat;

    if (layerRef.current) {
      map.removeLayer(layerRef.current);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const heatLayer = (L as any).heatLayer(points, {
      radius: 30,
      blur: 20,
      maxZoom: 15,
      max: 1.0,
      gradient: {
        0.2: "#2196f3",
        0.4: "#4caf50",
        0.6: "#ffeb3b",
        0.8: "#ff9800",
        1.0: "#f44336",
      },
    });

    heatLayer.addTo(map);
    layerRef.current = heatLayer;

    return () => {
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
      }
    };
  }, [map, points]);

  return null;
}

export default function MapaDenuncias({
  denuncias,
  mostrarCalor = true,
}: {
  denuncias: Denuncia[];
  mostrarCalor?: boolean;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-100 w-full bg-gray-200 animate-pulse rounded-xl flex items-center justify-center text-gray-700 font-bold">
        Carregando mapa...
      </div>
    );
  }

  const denunciasValidas = (denuncias || []).filter(
    (d) => typeof d.lat === "number" && typeof d.lng === "number",
  );

  const heatPoints: [number, number, number][] = denunciasValidas.map((d) => [d.lat, d.lng, 0.8]);

  return (
    <MapContainer
      center={[-23.55052, -46.633308]}
      zoom={12}
      className="h-100 w-full rounded-xl z-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {mostrarCalor && heatPoints.length > 0 && (
        <HeatmapLayer points={heatPoints} />
      )}

      {denunciasValidas.map((d) => (
        <Marker key={String(d.id)} position={[d.lat, d.lng]}>
          <Popup>
            <div className="text-black">
              <strong className="block text-blue-700">{d.categoria}</strong>
              <p className="my-1 text-sm">{d.descricao}</p>
              <p className="text-xs text-gray-500 font-semibold">{d.bairro}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
