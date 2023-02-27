import { useEffect, useState } from 'react';

const PokemonInfo = ({ selectedPokemon }) => {
	const [pokemon, setPokemon] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				const response = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`,
				);
				const data = await response.json();
				setPokemon(data);
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
		fetchPokemon();
	}, [selectedPokemon]);

	if (error) {
		return <h2>Something went wrong</h2>;
	}

	if (loading) {
		return <h2>Loading...</h2>;
	}

	return (
		<div className="px-4 py-4 text-center hidden lg:block w-[400px] border-rose-600 rounded-3xl border-2 h-max">
			<div className="mx-auto w-[200px]">
				<img
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon}.png`}
					className="w-full"
				/>
			</div>
			<h3 className="text-2xl font-bold text-rose-700">{pokemon.name.toUpperCase()}</h3>
			<table className="mx-auto w-[80%] mt-5">
				<thead>
					<tr>
						<th>Company</th>
						<th>Fire</th>
					</tr>
				</thead>
				<tbody>
					{pokemon.stats.map((stat, i) => {
						return (
							<tr key={i}>
								<th>
									{stat.stat.name[0].toUpperCase() +
										stat.stat.name.slice(1).split('-').join(' ')}
								</th>
								<td>{stat.base_stat}</td>
							</tr>
						);
					})}
					<tr>
						<th>Weight</th>
						<td>{pokemon.weight}</td>
					</tr>
					<tr>
						<th>Total moves</th>
						<td>{pokemon.moves.length}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default PokemonInfo;
