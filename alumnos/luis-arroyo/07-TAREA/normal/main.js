const carrouselContainer = document.getElementsByClassName("carrousel")[0];
const carrousel = document.getElementsByClassName("carrousel-track")[0];
let cards = document.querySelectorAll(".card");
const back = document.getElementById("back");
const next = document.getElementById("next");
const total = 5;
console.log(carrousel);

const cardWidth = 280; //width + padding

carrouselContainer.scrollLeft = 0;

const animateCarrousel = (num) => {
  const arr = Array.from(cards);
  const activeIndex = arr.findIndex((card) =>
    card.classList.contains("active")
  );
  const idx = activeIndex + num;
  const newIndex = idx == total ? total-1 : idx == -1 ? 0 : idx;

  //MAXIMO HASTA EL n-2 SE HARA EL TRANSLATE HACIA LA DERECHA
  //MAXIMO HASTA EL 1 SE HARA EL TRANSLATA HACIA LA IZQUIERDA

  arr[activeIndex].classList.toggle("active");
  console.log(activeIndex);
  console.log(newIndex);
  arr[newIndex].classList.toggle("active");

  if ((newIndex != 0 || newIndex != total) && (activeIndex > 1 && activeIndex < total-2)) {
    const offset = -(newIndex * cardWidth - cardWidth);
    carrousel.style.transform = `translateX(${offset}px)`;
  }

};

back.addEventListener("click", () => animateCarrousel(-1));
next.addEventListener("click", () => animateCarrousel(1));
