"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
	iconRetinaUrl:
		"https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
	iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
	shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function MapaDenuncias({ denuncias }) {
	return (
		<MapContainer
			center={[-23.55052, -46.633308]}
			zoom={12}
			className="h-[400px] w-full rounded-xl"
		>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

			{denuncias.map((d) => (
				<Marker key={d.id} position={[d.lat, d.lng]}>
					<Popup>
						<strong>{d.tipo}</strong>

						<p>{d.descricao}</p>

						<p>{d.bairro}</p>
					</Popup>
				</Marker>
			))}
		</MapContainer>
	);
}
