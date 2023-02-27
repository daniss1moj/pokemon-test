import React from 'react';
import { useEffect, useState } from 'react';

const PokemonSingleCard = ({ url, name, number, setSelectedPokemon }) => {
	const [categories, setCategories] = useState(null);
	useEffect(() => {
		const fetchTypes = async () => {
			const response = await fetch(`${url}`);
			const data = await response.json();
			setCategories(data.types.map(({ type }) => type.name));
		};
		fetchTypes();
	}, []);

	return (
		<div className="card" onClick={setSelectedPokemon}>
			<div className="h-[150px] ">
				<img
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`}
					alt="pokemon"
					className="object-contain h-full"
				/>
			</div>
			<h3 className="text-center font-bold text-rose-500">{name && name.toUpperCase()}</h3>
			<div className="flex items-center gap-2 w-full">
				{categories &&
					categories.map((category, i) => (
						<div
							className={`flex-1 text-center text-white font-bold ${category} rounded-2xl`}
							key={i}>
							{category}
						</div>
					))}
			</div>
		</div>
	);
};

export default PokemonSingleCard;
