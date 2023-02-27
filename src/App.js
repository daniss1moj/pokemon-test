import Header from './components/Header';
import PokemonCards from './components/PokemonCards';
import PokemonInfo from './components/PokemonInfo';
import { useState } from 'react';
function App() {
	const [selectedPokemon, setSelectedPokemon] = useState(null);

	return (
		<>
			<Header />
			<section className="flex gap-5 mx-5 lg:mx-auto my-5 max-w-5xl">
				<PokemonCards setSelectedPokemon={setSelectedPokemon} />

				{selectedPokemon && <PokemonInfo selectedPokemon={selectedPokemon} />}
			</section>
		</>
	);
}

export default App;
