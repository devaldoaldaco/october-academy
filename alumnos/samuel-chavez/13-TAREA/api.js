const mainContainer = document.querySelector(".mainContainer");
let amount = 5;
let init = 1;
async function getTotalPokemons() {
  for (let i = init; i <= amount; i++) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      const data = await response.json();
      const response2 = await fetch(data.species.url);
      const data2 = await response2.json();
      console.log(data);
      console.log("Esta es la rpta 2", data2);
      createCardsPokemons(data, data2, i);
    } catch (e) {
      console.log(e.message);
    }
  }
}

function createCardsPokemons(data, data2, i) {
  const cardButton = document.createElement("button");
  cardButton.classList.add("cardPokemon");
  cardButton.dataset.id = data.id;

  //Seccion frontal
  const cardFront = document.createElement("section");
  const image = document.createElement("img");
  const name = document.createElement("p");
  image.src = `${data.sprites.other.dream_world.front_default}`;
  name.textContent = `${data.name}`;
  cardFront.classList.add("cardFace", "cardFront");

  //Seccion trasera
  const cardBack = document.createElement("section");
  cardBack.innerHTML += `
  <div class="ability">
    <h4>Habilidades:</h4>
    <ul id="abilities-list-${i}">
    </ul>
  </div>
  <div class="description">
    <p>${data2.flavor_text_entries[34].flavor_text}</p>
  </div>
  <div class="icon"><span id="description-${i}" class="material-symbols-outlined"> arrow_circle_left </span></div>
`;

  cardBack.classList.add("cardFace", "cardBack");

  //AGREGAMOS LOS ELEMENTOS
  mainContainer.appendChild(cardButton);
  //Card parte fFRONT
  cardButton.appendChild(cardFront);
  cardFront.appendChild(image);
  cardFront.appendChild(name);
  cardFront.insertAdjacentHTML(
    "beforeend",
    `<button><span id="info-${i}" class="material-symbols-outlined">info</span></button>`
  );

  //Card parte BACK
  cardButton.appendChild(cardBack);

  // Logica para agregar habilidades
  const abilitiesList = document.getElementById(`abilities-list-${i}`);
  if (data.abilities.length > 0) {
    for (let j = 0; j < data.abilities.length; j++) {
      const ability = document.createElement("li");
      ability.textContent = `${data.abilities[j].ability.name}`;
      abilitiesList.appendChild(ability);
    }
  } else {
    const paragraphaAbility = document.createElement("p");
    paragraphaAbility.textContent = "no cuenta con habilidades";
    abilitiesList.appendChild(paragraphaAbility);
  }

  //Eventos de botones que permiten girar las cards
  const infoGeneral = document.getElementById(`info-${i}`);
  const description = document.getElementById(`description-${i}`);
  infoGeneral.addEventListener("click", () => {
    cardButton.classList.add("rotate");
  });
  description.addEventListener("click", () => {
    cardButton.classList.remove("rotate");
  });
}

getTotalPokemons();

button.addEventListener("click", () => {
  amount += 5;
  init += 5;
  getTotalPokemons();
});
