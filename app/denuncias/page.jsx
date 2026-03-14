"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { denunciasExemplo } from "../../data/denunciasExemplo";

import GraficoTiposDenuncia from "../../components/GraficoTiposDenuncia";
import FormDenuncia from "../../components/FormDenuncia";
import TabelaDenuncias from "../../components/TabelaDenuncias";

const MapaDenuncias = dynamic(() => import("../../components/MapaDenuncias"), {
	ssr: false,
});

export default function Page() {
	const [denuncias, setDenuncias] = useState([]);

	useEffect(() => {
		const storage = localStorage.getItem("denuncias");

		if (!storage) {
			localStorage.setItem("denuncias", JSON.stringify(denunciasExemplo));

			setDenuncias(denunciasExemplo);
		} else {
			setDenuncias(JSON.parse(storage));
		}
	}, []);

	const tipos = {};

	denuncias.forEach((d) => {
		tipos[d.tipo] = (tipos[d.tipo] || 0) + 1;
	});

	const dadosGrafico = Object.keys(tipos).map((tipo) => ({
		tipo,
		valor: tipos[tipo],
	}));

	return (
		<div className="bg-blue-100 py-10">
			<div className="max-w-6xl mx-auto px-6 space-y-8">
				<h1 className="text-3xl font-bold text-blue-900">
					Mapa de Denúncias da Cidade
				</h1>

				<MapaDenuncias denuncias={denuncias} />

				<GraficoTiposDenuncia dados={dadosGrafico} />

				<FormDenuncia setDenuncias={setDenuncias} />

				<TabelaDenuncias denuncias={denuncias} />
			</div>
		</div>
	);
}
