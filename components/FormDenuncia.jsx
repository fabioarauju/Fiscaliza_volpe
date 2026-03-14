"use client";
import { useState } from "react";

export default function FormDenuncia({ setDenuncias }) {
	const [form, setForm] = useState({
		tipo: "",
		descricao: "",
		bairro: "",
		lat: "",
		lng: "",
	});

	function enviar(e) {
		e.preventDefault();

		const storage = JSON.parse(localStorage.getItem("denuncias"));

		const nova = {
			id: Date.now(),
			data: new Date().toISOString().slice(0, 10),
			...form,
		};

		const atual = [...storage, nova];

		localStorage.setItem("denuncias", JSON.stringify(atual));

		setDenuncias(atual);

		setForm({ tipo: "", descricao: "", bairro: "", lat: "", lng: "" });
	}

	return (
		<form
			onSubmit={enviar}
			className="bg-white text-black p-6 rounded-xl shadow space-y-4"
		>
			<h3 className="font-bold text-lg text-blue-900">Nova denúncia</h3>

			<input
				placeholder="Tipo"
				className="w-full border p-2 rounded"
				value={form.tipo}
				onChange={(e) => setForm({ ...form, tipo: e.target.value })}
			/>

			<input
				placeholder="Bairro"
				className="w-full border p-2 rounded"
				value={form.bairro}
				onChange={(e) => setForm({ ...form, bairro: e.target.value })}
			/>

			<textarea
				placeholder="Descrição"
				className="w-full border p-2 rounded"
				value={form.descricao}
				onChange={(e) => setForm({ ...form, descricao: e.target.value })}
			/>

			<div className="grid grid-cols-2 gap-2">
				<input
					placeholder="Latitude"
					className="border p-2 rounded"
					value={form.lat}
					onChange={(e) => setForm({ ...form, lat: e.target.value })}
				/>

				<input
					placeholder="Longitude"
					className="border p-2 rounded"
					value={form.lng}
					onChange={(e) => setForm({ ...form, lng: e.target.value })}
				/>
			</div>

			<button className="bg-blue-700 text-white px-4 py-2 rounded hover:scale-105 transition">
				Enviar denúncia
			</button>
		</form>
	);
}
