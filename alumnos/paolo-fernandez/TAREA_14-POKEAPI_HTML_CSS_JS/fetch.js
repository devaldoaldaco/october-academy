export const fetchPokemonList = async (limit, page) => {
  const offset = limit * (page - 1);

  const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${ limit }&offset=${ offset }` 

  try {
    const rawResponse = await fetch(apiUrl);

    if (!rawResponse.ok) {
      throw new Error(`Error en la solicitud: ${ rawResponse.status } - ${ rawResponse.statusText }`);
    }

    const response = await rawResponse.json();
  
    const results = response.results;
    const pokemonUrls = results.map(result => result.url);
  
    const pokemonsDetailsPromises = pokemonUrls.map((url) => fetchPokemonDetails(url));
  
    const pokemons = await Promise.all(pokemonsDetailsPromises);
    
    return pokemons;
  } catch (error) {
    console.error('Error en fetchPokemonList:', error);
  }
}

const fetchPokemonDetails = async (url) => {
  const rawResponse = await fetch(url);
  const pokemon = await rawResponse.json();

  const id = pokemon.id.toString().padStart(4, '0');
  const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

  const abilityUrls = pokemon.abilities.map(ability => ability.ability.url);
  const abilitiesPromises = abilityUrls.map((url) => fetchPokemonAbility(url));

  const abilities = await Promise.all(abilitiesPromises);

  return {
    id,
    name,
    types: pokemon.types.map(type => type.type.name),
    abilities,
    weight: pokemon.weight,
    height: pokemon.height,
    baseExperience: pokemon.base_experience,
    sprite: pokemon.sprites.other['official-artwork'].front_default,
    spriteShiny: pokemon.sprites.other['official-artwork'].front_shiny
  }
}

const fetchPokemonAbility = async (url) => {
  const rawResponse = await fetch(url);
  const ability = await rawResponse.json();

  const abilityNames = ability.names;
  const abilityInSpanish = abilityNames.find(name => name.language.name === 'es')

  return abilityInSpanish.name;
}