import { useEffect, useState } from 'react';
import PokemonSingleCard from './PokemonSingleCard';

const PokemonCards = ({ setSelectedPokemon }) => {
	const [pokemons, setPokemons] = useState(null);
	const [types, setTypes] = useState(null);
	const [limit, setLimit] = useState(12);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPokemons = async () => {
			try {
				const [pokemons, types] = await Promise.all([
					fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`).then((res) =>
						res.json(),
					),
					fetch(`https://pokeapi.co/api/v2/type?limit=${limit}`).then((res) =>
						res.json(),
					),
				]);
				setPokemons(pokemons.results);
				setTypes(types.results);
			} catch (err) {
				if (err.message) {
					setError(err.message);
				} else {
					setError('Something went wrong');
				}
			} finally {
				setLoading(false);
			}
		};
		fetchPokemons();
	}, [limit]);

	const loadItems = () => {
		setLimit((prev) => prev + 12);
	};

	return (
		<div className="flex-auto">
			<div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
				{loading && <h2>Loading....</h2>}
				{error && <h2>{error}</h2>}
				{!loading &&
					!error &&
					pokemons.map((pokemon, i) => {
						return (
							<PokemonSingleCard
								key={pokemon.url}
								{...pokemon}
								number={i + 1}
								setSelectedPokemon={() => setSelectedPokemon(i + 1)}
							/>
						);
					})}
			</div>
			<button
				className="mx-auto rounded-xl border border-red-800 text-white font-bold bg-rose-600 w-full py-2 mt-5"
				onClick={loadItems}>
				{loading ? 'Loading...' : 'Load More'}
			</button>
		</div>
	);
};

export default PokemonCards;
