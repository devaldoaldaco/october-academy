const arrayImagesCarousel = [
  {
    src: "images/perfil1.jpg",
    name: "Laura Mendoza",
    profession: "Project Manager",
  },
  {
    src: "images/perfil2.jpg",
    name: "Andrés Torres",
    profession: "UI/UX Designer",
  },
  {
    src: "images/perfil3.jpg",
    name: "Carolina Ríos",
    profession: "Data Analyst",
  },
  {
    src: "images/perfil4.jpg",
    name: "José Paredes",
    profession: "Frontend Developer",
  },
  {
    src: "images/perfil5.jpg",
    name: "María López",
    profession: "Backend Developer",
  },
  {
    src: "images/perfil6.jpg",
    name: "Carlos Herrera",
    profession: "DevOps Engineer",
  },
  {
    src: "images/perfil7.jpg",
    name: "Natalia Castro",
    profession: "QA Tester",
  },
  {
    src: "images/perfil8.jpg",
    name: "Diego Ramírez",
    profession: "AI Specialist",
  },
];

const containerCarousel = document.querySelector(".container-carousel");

let cauroselCounter = 0;
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

arrayImagesCarousel.forEach((ic) => {
  const divCarousel = document.createElement("div");
  divCarousel.classList.add("card");
  const imgCarousel = document.createElement("img");
  const titleCarousel = document.createElement("h2");
  titleCarousel.textContent = ic.name;
  const paragraphCarousel = document.createElement("p");
  paragraphCarousel.textContent = ic.profession;
  const buttonCarousel = document.createElement("button");
  buttonCarousel.textContent = "message";
  imgCarousel.src = ic.src;
  divCarousel.append(
    imgCarousel,
    titleCarousel,
    paragraphCarousel,
    buttonCarousel
  );
  containerCarousel.appendChild(divCarousel);
});

function updateCarousel() {
  const cards = document.querySelectorAll(".card");
  const cardWidth = cards[0].offsetWidth;
  const gap = 40;
  const slideDistance = cardWidth + gap;

  containerCarousel.style.transform = `translateX(-${
    cauroselCounter * slideDistance
  }px)`;

  console.log(cauroselCounter);

  if (cauroselCounter === 0) {
    prevBtn.disabled = true;
    nextBtn.disabled = false;
  } else if (cauroselCounter === cards.length - 3) {
    nextBtn.disabled = true;
    prevBtn.disabled = false;
  } else {
    prevBtn.disabled = false;
    nextBtn.disabled = false;
  }
}
nextBtn.addEventListener("click", () => {
  const cards = document.querySelectorAll(".card");
  if (cauroselCounter < cards.length - 3) {
    cauroselCounter++;
    updateCarousel();
  }
});

prevBtn.addEventListener("click", () => {
  if (cauroselCounter > 0) {
    cauroselCounter--;
    updateCarousel();
  }
});

updateCarousel();
