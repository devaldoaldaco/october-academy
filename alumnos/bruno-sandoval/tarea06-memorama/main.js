const cardsData = [
    { id: 1, src: 'img/aries.jpg', name: 'Aries' },
    { id: 2, src: 'img/tauro.jpg', name: 'Tauro' },
    { id: 3, src: 'img/geminis.jpg', name: 'Geminis' },
    { id: 4, src: 'img/cancer.jpg', name: 'Cancer' },
    { id: 5, src: 'img/leo.jpg', name: 'Leo' },
    { id: 6, src: 'img/virgo.jpg', name: 'Virgo' },
    { id: 7, src: 'img/libra.jpg', name: 'Libra' },
    { id: 8, src: 'img/escorpio.jpg', name: 'Escorpio' },
    { id: 9, src: 'img/sagitario.jpg', name: 'Sagitario' },
    { id: 10, src: 'img/capricornio.jpg', name: 'Capricornio' },
    { id: 11, src: 'img/acuario.jpg', name: 'Acuario' },
    { id: 12, src: 'img/piscis.jpg', name: 'Piscis' }
];

const board = document.querySelector('#tablero');
const countPairs = document.querySelector('#found-pairs')

let selectCards = [];
let pairsFound = 0;
let canTurnOver = true;

function shuffle(array) {
    for(let i = array.length -1; i>0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard(){
    const allCards = [...cardsData, ...cardsData];
    const shuffledCards = shuffle(allCards);
    
    //Create card elements
    shuffledCards.forEach(card=>{
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;

        const frontFace = document.createElement('div');
        frontFace.classList.add('front-face');
        const frontImg = document.createElement('img');
        frontImg.src = 'img/posterior.png';
        frontFace.appendChild(frontImg);
    
        const backFace = document.createElement('div');
        backFace.classList.add('back-face');
        const backImg = document.createElement('img');
        backImg.src = card.src;
        backFace.appendChild(backImg);
        
    
        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);
        cardElement.addEventListener('click', turnCard);

        board.appendChild(cardElement);
    });
}

function turnCard(){
    if(!canTurnOver || this.classList.contains('flipped')){
        return;
    }
    this.classList.add('flipped');
    selectCards.push(this);
    if(selectCards.length === 2){
        canTurnOver = false;
        verifyMatch();
    }
}

function verifyMatch(){
    const [firstCard, secondCard] = selectCards;
    const isPair = firstCard.dataset.id === secondCard.dataset.id;
    if(isPair){
        pairsFound++;
        selectCards = [];
        canTurnOver = true;
        countPairs.textContent = pairsFound;
        if(pairsFound === cardsData.length){
            setTimeout(() => alert('¡Felicidades! Has encontrado todas las parejas.'),500);
        }
    }else{
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            selectCards = [];
            canTurnOver = true;
        }, 1000);
    }
}

createBoard();