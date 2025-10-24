const load = document.getElementById("load");
const BASE_URL = "https://pokeapi.co/api/v2/pokemon"; //?limit=9&offset=0
const grid = document.querySelector(".grid");
let limit = 20;
let offset = 0;


const getPokemons = async (limit, offset) => {
  const result = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
  const data = await result.json();
  const promisesArray = data.results.map((item) => {
    return getPokemon(item.url);
  });

  const results = await Promise.all(promisesArray);

  console.log(results);

  return results;
};

const getPokemon = async (url) => {
  const result = await fetch(url);
  const data = await result.json();
  return data;
};


getPokemons(20, 0).then((results) => {
  grid.pokemons = results;
  console.log(grid.pokemons);
});

load.addEventListener("click", () => {
  offset += 20;
  getPokemons(20, offset).then(
    (results) => (grid.pokemons = [...grid.pokemons, ...results])
  );
});
