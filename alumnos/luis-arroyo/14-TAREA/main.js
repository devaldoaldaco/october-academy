const POKEMON_TYPE_COLORS = {
  // Tipos de Generación 1
  normal: "#A8A878", // Beige/Gris claro
  fire: "#F08030", // Naranja/Rojo
  water: "#6890F0", // Azul claro/Cielo
  grass: "#78C850", // Verde brillante
  electric: "#F8D030", // Amarillo brillante
  ice: "#98D8D8", // Azul hielo
  fighting: "#C03028", // Marrón rojizo (Lucha)
  poison: "#A040A0", // Púrpura (Veneno)
  ground: "#E0C068", // Arena/Marrón claro (Tierra)
  flying: "#A890F0", // Azul lavanda (Volador)
  psychic: "#F85888", // Magenta/Rosa (Psíquico)
  bug: "#A8B820", // Verde hoja (Bicho)
  rock: "#B8A038", // Gris piedra (Roca)
  ghost: "#705898", // Púrpura oscuro (Fantasma)
  dragon: "#7038F8", // Púrpura oscuro/Violeta (Dragón)

  // Tipos más recientes
  steel: "#B8B8D0", // Gris metálico (Acero)
  dark: "#705848", // Marrón oscuro (Siniestro)
  fairy: "#EE99AC", // Rosa claro (Hada)
};

const load = document.getElementById("load");

const BASE_URL = "https://pokeapi.co/api/v2/pokemon"; //?limit=9&offset=0
const grid = document.querySelector(".grid");
let limit = 20;
let offset = 0;
const createElements = (results) => {
  results.forEach((pokemon) => {
    let card = document.createElement("div");
    let cardFaceFront = document.createElement("div");
    let cardFaceBack = document.createElement("div");
    let cardTopContainer = document.createElement("div");
    let imgContainer = document.createElement("div");
    let img = document.createElement("img");
    let p = document.createElement("p");
    let pokemonId = document.createElement("span");
    let button = document.createElement("button");
    let buttonImg = document.createElement("img");
    let stats = document.createElement("div");
    let pokemonType = document.createElement("div");
    let pokemonTypeParagraph = document.createElement("p");

    //card top container config
    cardTopContainer.classList.add("card__container--top");

    //card back container config
    cardFaceBack.classList.add("card__face--back");
    // cardFaceBack.innerHTML = "asd";

    //card config
    card.classList.add("card");
    // card.style.borderRadius = "8px";
    card.style.border = `2px solid  ${
      POKEMON_TYPE_COLORS[pokemon.types[0].type.name]
    }`;
    // card.style.display = "flex";
    // card.style.justifyContent = "center";
    // card.style.alignItems = "center";
    // card.style.position = "relative";
    // card.style.padding = "6px 10px";
    // card.style.transformStyle = "preserve-3d";
    // card.style.transition = "transform 0.8s";

    //img container config
    imgContainer.classList.add("img__container");
    // imgContainer.style.height = "150px";
    // imgContainer.style.width = "150px";

    //img config
    img.classList.add("img");
    img.src = pokemon.sprites.front_default;
    // img.style.height = "100%";

    //p config
    p.innerHTML = pokemon.species.name;

    //span config
    pokemonId.classList.add("pokemon__id");
    pokemonId.innerHTML = `#${pokemon.id}`;
    // pokemonId.style.alignSelf = "start";

    //button config
    button.classList.add("button");
    // button.style.position = "absolute";
    // button.style.top = "6px";
    // button.style.right = "12px";
    // button.style.cursor = "pointer";

    //button img
    buttonImg.classList.add("button__img");
    buttonImg.src = "flip.png";
    // buttonImg.style.width = "100%";

    //card face front
    cardFaceFront.classList.add("card__face--front");
    // cardFaceFront.style.backfaceVisibility = "hidden";

    //stats config
    stats.classList.add("stats__container");

    //pokemon type
    pokemonType.style.height = "50px";

    let typeText = pokemon.types.map((type) => type.type.name);
    typeText = typeText.join(" / ");
    //     // pokemonType.style.width = "50px";
    // types: Array (2)
    // 0
    // {slot: 1, type: {name: "grass", url: "https://pokeapi.co/api/v2/type/12/"}}
    // 1
    // {slot: 2, type: {name: "poison", url: "https://pokeapi.

    pokemonTypeParagraph.innerHTML = `Type: ${typeText}`;

    pokemon.stats.forEach((stat) => {
      let statDiv = document.createElement("div");
      statDiv.classList.add("stats__spans");
      let span1 = document.createElement("span");
      let span2 = document.createElement("span");
      let rowStat = document.createElement("progress");
      rowStat.setAttribute("min", 0);
      rowStat.setAttribute("max", 100);
      rowStat.value = stat.base_stat;
      let statName = stat.stat.name;
      span1.innerHTML = statName.includes("-")
        ? statName.split("-").join(" ")
        : statName;
      span2.appendChild(rowStat);
      rowStat.innerHTML = stat.base_stat;
      // span2.innerHTML = stat.base_stat;
      statDiv.appendChild(span1);
      statDiv.appendChild(span2);
      stats.appendChild(statDiv);
    });

    button.addEventListener("click", (e) => {
      if (cardFaceBack.classList.contains("is-flipped")) {
        cardFaceBack.classList.toggle("is-flipped");
        cardFaceBack.style.display = "none";
      } else {
        cardFaceBack.style.display = "flex";
        setTimeout(() => {
          cardFaceBack.classList.toggle("is-flipped");
        }, 200);
      }
      card.classList.toggle("is-flipped");
      button.classList.toggle("is-flipped");
      cardTopContainer.classList.toggle("is-flipped");
      cardFaceFront.classList.toggle("is-flipped");
    });

    grid.appendChild(card);
    card.appendChild(cardTopContainer);
    card.appendChild(cardFaceFront);
    card.appendChild(cardFaceBack);
    cardFaceBack.append(stats);

    cardTopContainer.appendChild(pokemonId);
    cardFaceFront.appendChild(imgContainer);
    imgContainer.appendChild(img);
    cardFaceFront.appendChild(p);
    cardFaceFront.appendChild(pokemonType);
    pokemonType.appendChild(pokemonTypeParagraph);
    cardTopContainer.appendChild(button);
    button.appendChild(buttonImg);
  });
};

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

// let results = [];
getPokemons(20, 0)
  //   .then((data) => (results = data))
  .then((results) => createElements(results));

load.addEventListener("click", () => {
  offset += 20;
  getPokemons(20, offset).then((results) => createElements(results));
});
// console.log(results);
// createElements(results);
