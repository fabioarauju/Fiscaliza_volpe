"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Correção de ícones para o Next.js
if (typeof window !== "undefined") {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  });
}

export default function MapaDenuncias({ denuncias }) {
  const [isMounted, setIsMounted] = useState(false);

  // Só ativa o mapa após o componente "montar" no navegador
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

  return (
    <MapContainer
      center={[-23.55052, -46.633308]}
      zoom={12}
      className="h-100 w-full rounded-xl z-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {denunciasValidas.map((d) => (
        <Marker key={d.id} position={[d.lat, d.lng]}>
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
