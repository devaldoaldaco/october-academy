const arrayImagesMemorable = [
  { src: "images/Ed.webp", id: "Ed" },
  { src: "images/Jake.webp", id: "jake" },
  { src: "images/Billy.webp", id: "Billy" },
  { src: "images/Robin.webp", id: "robin" },
  { src: "images/ScoobyDoo.webp", id: "scooby" },
  { src: "images/TomJerry.webp", id: "tomJerry" },
  { src: "images/Robin.webp", id: "robin" },
  { src: "images/gumball.webp", id: "gumball" },
  { src: "images/coraje.webp", id: "coraje" },
  { src: "images/ScoobyDoo.webp", id: "scooby" },
  { src: "images/TomJerry.webp", id: "tomJerry" },
  { src: "images/coraje.webp", id: "coraje" },
  { src: "images/Billy.webp", id: "Billy" },
  { src: "images/Ed.webp", id: "Ed" },
  { src: "images/Jake.webp", id: "jake" },
  { src: "images/gumball.webp", id: "gumball" },
];

const buttonPrincipal = document.querySelector("#buttonPrincipal");
const mensaje = document.querySelector("#mensajeFinal");

//Arreglo de cards incializado
let allCards = [];
// Array que contiene las 2 ultimas cards clickeadas
let arrayCardsMemorableMatchClicked = [];

// Seccion article que contiene las cards
const containerCards = document.querySelector(".cards");

// Contador Total, intentos
let cardsMemorableClickedCounter = 0;
const turnos = document.querySelector("#turnos");
// Contador de Errores
let cardsMemorableMatchErrorClickedCounter = 0;
const errores = document.querySelector("#errores");
// Contador de Cards que han sido clickeadas,
let cardsMemorableMatchClickedCounter = 0;

// Bloqueo por proceso de verificación de  igualdad de cards
let isblocked = false;

arrayImagesMemorable.forEach((c) => {
  //Seccion que contendrá ambos lados
  const cardButton = document.createElement("button");
  cardButton.classList.add("cardMemorama");
  cardButton.dataset.id = c.id;

  //Seccion frontal
  const cardFront = document.createElement("section");
  const frontParagraph = document.createElement("p");
  frontParagraph.textContent = "?";
  cardFront.classList.add("cardFace", "cardFront");

  //Seccion trasera
  const cardBack = document.createElement("section");
  const backImage = document.createElement("img");
  backImage.src = c.src;
  cardBack.classList.add("cardFace", "cardBack");

  //Agregamos las etiquetas correspondientes siguiendo un orden
  containerCards.appendChild(cardButton);
  cardButton.appendChild(cardFront);
  cardFront.appendChild(frontParagraph);
  cardButton.appendChild(cardBack);
  cardBack.appendChild(backImage);

  //Obtener todas las cards
  allCards = document.querySelectorAll(".cardMemorama");

  cardButton.addEventListener("click", () => {
    if (!isblocked) {
      cardButton.classList.add("rotate");
      arrayCardsMemorableMatchClicked.push(cardButton);
      cardsMemorableMatchClickedCounter++;

      if (cardsMemorableMatchClickedCounter === 2) {
        isblocked = true;
        if (
          arrayCardsMemorableMatchClicked[0].dataset.id ===
          arrayCardsMemorableMatchClicked[1].dataset.id
        ) {
          informationCardsMemorableUpdate();
          verifyFinishedGame();
        } else {
          setTimeout(() => {
            arrayCardsMemorableMatchClicked.forEach((cv) => {
              cv.classList.remove("rotate");
            });
            informationCardsMemorableUpdate();
            cardsMemorableMatchErrorClickedCounter++;
            errores.textContent = cardsMemorableMatchErrorClickedCounter;
          }, 1000);
        }
      }
    }
  });
});

function informationCardsMemorableUpdate() {
  arrayCardsMemorableMatchClicked.length = 0;
  cardsMemorableMatchClickedCounter = 0;
  isblocked = false;
  cardsMemorableClickedCounter++;
  turnos.textContent = cardsMemorableClickedCounter;
}

//Verificar si el juego ya terminó
function verifyFinishedGame() {
  let isFinish = true;

  for (const card of allCards) {
    if (!card.classList.contains("rotate")) {
      isFinish = false;
      break;
    }
  }

  if (isFinish) {
    mensaje.style.display = "block";
    buttonPrincipal.disabled = false;
  }
}

buttonPrincipal.addEventListener("click", () => {
  allCards.forEach((ac) => {
    ac.classList.remove("rotate");
  });
  buttonPrincipal.disabled = true;
  mensaje.style.display = "none";
  turnos.textContent = "0";
  cardsMemorableClickedCounter = 0;
  errores.textContent = "0";
  cardsMemorableMatchErrorClickedCounter = 0;
});
