const cards = [
    {
        id:1,
        name: 'John Doe',
        job: 'Web Developer',
        img: 'img/img-1.jpg'
    },
    {
        id:2,
        name: 'Jane Smith',
        job: 'Graphic Designer',
        img: 'img/img-2.jpg'
    },
    {
        id:3,
        name: 'Michael Johnson',
        job: 'Product Manager',
        img: 'img/img-3.jpg'
    },
    {
        id:4,
        name: 'Emily Davis',
        job: 'UX Designer',
        img: 'img/img-4.jpg'
    },
    {
        id:5,
        name: 'David Wilson',
        job: 'Data Scientist',
        img: 'img/img-5.jpg'
    }
]

const cardsContainer = document.querySelector('.container');
const prevBtn = document.querySelector('#btn-prev');
const nextBtn = document.querySelector('#btn-next');

let currentIndex = 0;
const visibleCards = 3;

function crearCards(){
    const existingCards = document.querySelectorAll('.card');
    existingCards.forEach(card => card.remove());

    for(let i = currentIndex; i < currentIndex + visibleCards; i++){
        const card = cards[i];
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <img src="${card.img}" alt="foto-perfil">
            <div class="card-container">
                <h2 class="name">${card.name}</h2>
                <p class="work">${card.job}</p>
            </div>
            <button>Message</button>
        `;
        cardsContainer.insertBefore(cardElement, cardsContainer.querySelector('.container-buttons'));
    }
}

nextBtn.addEventListener('click', () => {
    if(currentIndex + visibleCards < cards.length){
        currentIndex++;
        crearCards();
    }
})

prevBtn.addEventListener('click', () => {
    if(currentIndex > 0){
        currentIndex--;
        crearCards();
    }
})

crearCards();