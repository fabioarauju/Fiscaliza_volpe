"use client";

import Link from "next/link";
import React, { useState } from "react";

const Header = () => {
	const [menuAberto, setMenuAberto] = useState(false);

	return (
		<header className="bg-linear-to-tr from-blue-600 via-blue-500 to-blue-300 text-white">
			<div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
				{/* LOGO */}
				<Link href="/">
					<h1 className="font-bold text-lg">Fiscaliza Volpe</h1>
				</Link>

				{/* MENU DESKTOP */}
				<nav className="hidden md:flex gap-6">
					<Link className="hover:text-orange-300" href="/gestao">
						Despesas Públicas
					</Link>

					<Link className="hover:text-orange-300" href="/projetos">
						Projetos de Lei
					</Link>

					<Link className="hover:text-orange-300" href="/denuncias">
						Denúncias
					</Link>

					<Link className="hover:text-orange-300" href="/sobre">
						Sobre
					</Link>
				</nav>

				{/* BOTÃO LOGIN DESKTOP */}
				<div className="hidden md:block">
					{/* <button className="bg-white text-black py-2 px-4 rounded-xl shadow transition-transform duration-200 hover:scale-105">
						Login
					</button> */}
				</div>

				{/* BOTÃO MENU MOBILE */}
				<button
					className="md:hidden text-2xl"
					onClick={() => setMenuAberto(!menuAberto)}
				>
					☰
				</button>
			</div>

			{/* MENU MOBILE */}
			{menuAberto && (
				<div className="md:hidden bg-blue-500 px-4 pb-4 space-y-3">
					<Link className="block hover:text-orange-300" href="/gestao">
						Despesas Públicas
					</Link>

					<Link className="block hover:text-orange-300" href="/projetos">
						Projetos de Lei
					</Link>

					<Link className="block hover:text-orange-300" href="/denuncias">
						Denúncias
					</Link>

					<Link className="block hover:text-orange-300" href="/sobre">
						Sobre
					</Link>

					{/* <button className="bg-white text-black w-full py-2 rounded-xl shadow">
						Login
					</button> */}
				</div>
			)}
		</header>
	);
};

export default Header;
