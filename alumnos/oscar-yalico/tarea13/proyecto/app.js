let cantidadActual = 0; // cantidad de Pokémon cargados
const primeraCarga = 16; // 4x4 = 16 cards
const maxPokemon = 100;


const loadMoreBtn = document.getElementById("loadMoreBtn");
loadMoreBtn.addEventListener("click", loadMorePokemon);

loadMorePokemon(); // cargar las primeras 16 cartas al iniciar

async function loadMorePokemon() {
  const loading = document.getElementById("loading");
  const grid = document.getElementById("pokemonGrid");

  loadMoreBtn.disabled = true;
  loading.style.display = "block";

  try {
    const count = cantidadActual === 0 ? primeraCarga : 4;
    const pokemons = await fetchPokemon(cantidadActual, count); // retorna un array de objetos Pokémon

    pokemons.forEach((pokemon) => {
      const card = createPokemonCard(pokemon);
      grid.appendChild(card);
    });

    cantidadActual += count;

    if (cantidadActual >= maxPokemon) {
      loadMoreBtn.textContent = "No hay más Pokémon";
    } else {
      loadMoreBtn.disabled = false;
    }
  } catch (error) {
    console.error("Error al cargar Pokémon:", error);
    alert("Error al cargar los Pokémon. Intenta de nuevo.");
    loadMoreBtn.disabled = false;
  } finally {
    loading.style.display = "none";
  }
}

async function fetchPokemon(cantidadActual, count) {
  const promises = [];
  for (let i = cantidadActual + 1; i <= cantidadActual + count && i <= maxPokemon; i++) {
    promises.push(
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((res) => res.json())
    );
  }
  return Promise.all(promises);
}

function createPokemonCard(pokemon) {
  const card = document.createElement("div");
  card.className = "pokemon-card";

  const types = pokemon.types
    .map(
      (type) =>
        `<span class="type-badge type-${type.type.name}">${type.type.name}</span>`
    )
    .join("");

  card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front"></div>
                    <div class="card-back">
                        <img src="${
                          pokemon.sprites.other["official-artwork"]
                            .front_default || pokemon.sprites.front_default
                        }" 
                             alt="${pokemon.name}"
                             onerror="this.src='${
                               pokemon.sprites.front_default
                             }'">
                        <div class="pokemon-id">#${String(pokemon.id).padStart(
                          3,
                          "0"
                        )}</div>
                        <div class="pokemon-name">${pokemon.name}</div>
                        <div class="pokemon-types">${types}</div>
                    </div>
                </div>
            `;

  card.addEventListener("click", () =>  {
    card.classList.toggle("flipped");
  });

  return card;
}