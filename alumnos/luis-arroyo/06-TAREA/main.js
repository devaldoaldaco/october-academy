const table = document.getElementById("table");
const correctAudio = new Audio("sounds/correct.mp3");
const errorAudio = new Audio("sounds/error.mp3");

const OPORTUNITIES = 2;
var attempt = 0;
var prevId = 0;
var currentId = 0;
var prevCard;
var prevImg;
var isLocked = false;
const pairs = generateRandomPairs();
const toggleVisibility = (...args) => {
  args.forEach((element) => {
    element.classList.toggle("is-flipped");
  });
};
table.addEventListener("click", (e) => {
  if (isLocked) return;

  const card = e.target.closest(".card");
  if (!card) return;
  const img = card.firstElementChild;
  if (
    card.classList.contains("is-flipped") | img.classList.contains("is-flipped")
  ) {
    return;
  }
  toggleVisibility(card, img);

  attempt += 1;
  if (attempt == 1) {
    prevId = card.id;
    prevCard = card;
    prevImg = img;
  }
  if (attempt == 2) {
    currentId = card.id;
    if (pairs[prevId] == currentId) {
      attempt = 0;
      setTimeout(() => {
        isLocked = false;
        correctAudio.play();
      }, 200);
      setTimeout(() => {
        isGameOver();
      }, 500);
      return;
    }
    isLocked = true;
    setTimeout(() => {
      errorAudio.pause();
      errorAudio.currentTime = 0;
      errorAudio.play();
    }, 200);
    setTimeout(() => {
      toggleVisibility(prevCard, prevImg, card, img);
      isLocked = false;
    }, 1000);

    prevId = 0;
    currentId = 0;
    attempt = 0;
  }
});
function generateRandomPairs(total = 16) {
  const index = Array.from({ length: total }, (_, i) => i + 1);
  const mixin = index.sort(() => Math.random() - 0.5);

  const pairs = {};
  for (let i = 0; i < total; i += 2) {
    const a = mixin[i];
    const b = mixin[i + 1];
    pairs[a] = b;
    pairs[b] = a;
  }

  return pairs;
}
function mixImages() {
  let imageArrays = [
    "images/apple.png",
    "images/banana.png",
    "images/grape.png",
    "images/kiwi.png",
    "images/orange.png",
    "images/pear.png",
    "images/pineapple.png",
    "images/watermelon.png",
  ];
  let pairsCopy = { ...pairs };
  imageArrays = imageArrays.sort(() => Math.random() - 0.5);
  for (const key in pairsCopy) {
    if (!(key in pairsCopy)) continue;

    const partner = pairsCopy[key];
    const image = imageArrays.shift();
    assignImage(image, key, partner);

    delete pairsCopy[key];
    delete pairsCopy[partner];
  }
}
function assignImage(image, ...args) {
  args.forEach((key) => {
    const img = document.getElementById(key).querySelector("img");
    img.src = image;
  });
}
function isGameOver(total = 16) {
  let count = 0;
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    if (!card.classList.contains("is-flipped")) return;
    count += 1;
    console.log(count);
  });
  if (count == total) alert("GAME FINISHED");
}
mixImages();
