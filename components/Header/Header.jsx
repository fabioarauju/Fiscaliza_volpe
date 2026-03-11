import Link from "next/link";
import React from "react";

const Header = () => {
	return (
		<header className="bg-linear-to-tr from-blue-600 via-blue-500 to-blue-300 text-white">
			<div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
				<h1 className="font-bold">Fiscaliza Volpe</h1>
				<nav className="flex gap-6">
					<Link className="hover:text-orange-300" href="/">
						Despesas Publicas
					</Link>
					<Link className="hover:text-orange-300" href="/">
						Projetos de Lei
					</Link>
					<Link className="hover:text-orange-300" href="/">
						Denúncias
					</Link>
					<Link className="hover:text-orange-300" href="/">
						Sobre
					</Link>
				</nav>
				<div className="">
					<button className="bg-white text-black py-2 px-4 cursor-pointe rounded-xl shadow-2xl transition-transform duration-200 hover:scale-105">
						Login
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
