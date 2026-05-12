"use client";
import { useState } from "react";

export default function TabelaDenuncias({ denuncias }) {
	const [pagina, setPagina] = useState(1);

	const porPagina = 5;

	const inicio = (pagina - 1) * porPagina;

	const dados = denuncias.slice(inicio, inicio + porPagina);

	const total = Math.ceil(denuncias.length / porPagina);

	return (
		<div className="bg-white text-black rounded-xl shadow p-4">
			<table className="w-full">
				<thead className="border-b">
					<tr className="text-left">
						<th>Tipo</th>
						{/* <th>Bairro</th> */}
						<th>Data</th>
						<th>Detalhes</th>
					</tr>
				</thead>

				<tbody>
					{dados.map((d) => (
						<tr key={d.id} className="border-b">
							<td>{d.tipo}</td>

							{/* <td>{d.bairro}</td> */}

							<td>{d.data}</td>

							<td>
								<details>
									<summary className="cursor-pointer text-blue-700">
										Ver
									</summary>

									<p>{d.descricao}</p>
								</details>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="flex gap-2 justify-center mt-4">
				{Array.from({ length: total }).map((_, i) => (
					<button
						key={i}
						onClick={() => setPagina(i + 1)}
						className="px-3 py-1 bg-blue-600 text-white rounded"
					>
						{i + 1}
					</button>
				))}
			</div>
		</div>
	);
}
