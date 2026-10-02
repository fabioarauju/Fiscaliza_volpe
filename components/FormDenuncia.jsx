"use client";
import { useState } from "react";
import { criarDenuncia } from "../services/api";
import { buscarCep } from "../services/viacep";

export default function FormDenuncia({ setDenuncias }) {
  const [form, setForm] = useState({
    tipo: "",
    descricao: "",
    localizacao: "",
    lat: "",
    lng: "",
  });
  const [cep, setCep] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);

  async function handleCep(e) {
    const valor = e.target.value;
    setCep(valor);
    if (valor.replace(/\D/g, "").length === 8) {
      setLoadingCep(true);
      const endereco = await buscarCep(valor);
      if (endereco) {
        setForm((f) => ({
          ...f,
          localizacao: `${endereco.logradouro}, ${endereco.bairro}, ${endereco.localidade} - ${endereco.uf}`,
        }));
      }
      setLoadingCep(false);
    }
  }

  async function enviar(e) {
    e.preventDefault();
    const nova = await criarDenuncia({ ...form, id: String(Date.now()) });
    setDenuncias((prev) => [...prev, nova]);
    setForm({ tipo: "", descricao: "", localizacao: "", lat: "", lng: "" });
    setCep("");
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

      <div>
        <input
          placeholder="CEP (ex: 39400148)"
          className="w-full border p-2 rounded"
          value={cep}
          onChange={handleCep}
          maxLength={9}
        />
        {loadingCep && (
          <p className="text-sm text-gray-500 mt-1">Buscando endereço...</p>
        )}
      </div>

      <input
        placeholder="Localização"
        className="w-full border p-2 rounded"
        value={form.localizacao}
        onChange={(e) => setForm({ ...form, localizacao: e.target.value })}
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
