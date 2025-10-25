import { fetchPokemonList } from './fetch.js';
import { renderPokemonCard } from './pokemon-card.js';

const LIMIT = 10;

document.addEventListener('DOMContentLoaded', () => {
  let page = 1;

  const pokemonSection = document.getElementById('pokemonSection');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  const loadPokemons = async () => {
    loadMoreBtn.setAttribute('disabled', '');

    const pokemons = await fetchPokemonList(LIMIT, page);

    for (const pokemon of pokemons) {
      renderPokemonCard(pokemon, pokemonSection);
    }

    loadMoreBtn.removeAttribute('disabled');
  }

  const loadMorePokemons = async () => {
    page++;
    await loadPokemons();
  }

  loadPokemons();

  loadMoreBtn.addEventListener('click', loadMorePokemons);
});