const carrouselContainer = document.getElementsByClassName("carrousel")[0];
const carrousel = document.getElementsByClassName("carrousel-track")[0];
let cards = document.querySelectorAll(".card");
const back = document.getElementById("back");
const next = document.getElementById("next");
const total = 7;
console.log(carrousel);
console.log(typeof carrousel.scrollTo);
const cardWidth = 280;
const firstClone = cards[0].cloneNode(true);
firstClone.innerHTML = "INIT";
const lastClone = cards[cards.length - 1].cloneNode(true);
lastClone.innerHTML = "FIN";
firstClone.classList.add("clone");
lastClone.classList.add("clone");
carrousel.appendChild(firstClone);
carrousel.insertBefore(lastClone, cards[0]);
cards = document.querySelectorAll(".card");

carrouselContainer.scrollLeft = cardWidth;

const animateCarrousel = (num) => {
  const arr = Array.from(cards);
  const activeIndex = arr.findIndex((card) =>
    card.classList.contains("active")
  );
  const idx = (activeIndex + num + 7) % 7;
  const newIndex = idx == 6 ? 1 : idx == 0 ? 5 : idx;

  arr[activeIndex].classList.toggle("active");
  console.log(activeIndex);
  console.log(newIndex);
  arr[newIndex].classList.toggle("active");

  if (activeIndex == 5 && newIndex == 1) {
    offset = -(newIndex * cardWidth - 2 * cardWidth);
    carrousel.style.transform = `translateX(${offset}px)`;
    carrousel.style.transition = "none";
    // carrousel.style.transition = "none";

    carrousel.scrollTo({
      left: 280,
      behavior: "auto",
    });

    requestAnimationFrame(() => {
      carrousel.style.transition = "transform 0.6s ease";
    });
    // carrousel.style.transition = "auto";
  } else if (activeIndex == 1 && newIndex == 5) {
    offset = -(newIndex * cardWidth - 2 * cardWidth);
    carrousel.style.transform = `translateX(${offset}px)`;
    carrousel.style.transition = "none";

    console.log(cardWidth);
    carrousel.scrollTo({
      left: 0,
      behavior: "auto",
    });
    requestAnimationFrame(() => {
      carrousel.style.transition = "transform 0.6s ease";
    });
    // carrousel.style.transition = "auto";
  } else {
    console.log("Aquiii");
    // carrousel.style.transition = "none";
    const offset = -(newIndex * cardWidth - 2 * cardWidth);
    carrousel.style.transform = `translateX(${offset}px)`;
  }
};

back.addEventListener("click", () => animateCarrousel(-1));
next.addEventListener("click", () => animateCarrousel(1));
