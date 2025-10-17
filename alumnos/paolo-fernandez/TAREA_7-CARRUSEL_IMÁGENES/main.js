document.addEventListener('DOMContentLoaded', () => {
  const CAROUSEL_ITEMS = [
    { 
      filename: 'img-1.jpg', 
      imageDescription: 'James Wilson',
      characterName: 'James Wilson',
      characterProfession: 'Software Developer'
    },
    { 
      filename: 'img-2.jpg', 
      imageDescription: 'Sarah Johnson',
      characterName: 'Sarah Johnson',
      characterProfession: 'Graphic Designer'
    },
    { 
      filename: 'img-3.jpg', 
      imageDescription: 'Michael Brown',
      characterName: 'Michael Brown',
      characterProfession: 'Project Manager'
    },
    { 
      filename: 'img-4.jpg', 
      imageDescription: 'Emily Davis',
      characterName: 'Emily Davis',
      characterProfession: 'Marketing Specialist'
    },
    { 
      filename: 'img-5.jpg', 
      imageDescription: 'Christopher Garcia',
      characterName: 'Christopher Garcia',
      characterProfession: 'Data Scientist'
    },
    { 
      filename: 'img-6.jpg', 
      imageDescription: 'Richard Wilson',
      characterName: 'Richard Wilson',
      characterProfession: 'Product Designer'
    }
  ];
  const IMG_FOLDER_PATH = 'assets/img';
  const ITEM_WIDTH = 320;
  const GAP = 40;
  const ITEMS_VISIBLE = 3;
  const TOTAL_ITEMS = CAROUSEL_ITEMS.length;

  let currentIndex = 0;
  const MAX_INDEX = TOTAL_ITEMS - ITEMS_VISIBLE;

  const carouselWrapper = document.getElementById('carouselWrapper');
  const btnPrevious = document.getElementById('btnPrevious');
  const btnNext = document.getElementById('btnNext');

  renderCarousel();

  btnPrevious.addEventListener('click', () => {
    if (currentIndex <= 0) return;
    currentIndex--;
    updateCarousel();
  });

  btnNext.addEventListener('click', () => {
    if (currentIndex >= MAX_INDEX) return;
    currentIndex++;
    updateCarousel();
  });

  function renderCarousel() {
    CAROUSEL_ITEMS.forEach(item => getCarouselItem(item));
    btnPrevious.setAttribute('disabled', '');
  }

  function getCarouselItem(carouselData) {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');

    const carouselItemImg = document.createElement('div');
    carouselItemImg.classList.add('carousel-item-img');

    const carouselImage = document.createElement('img');
    carouselImage.src = `${ IMG_FOLDER_PATH }/${ carouselData.filename }`;

    const carouselItemData = document.createElement('div');
    carouselItemData.classList.add('carousel-item-data');

    const characterName = document.createElement('h3');
    characterName.textContent = carouselData.characterName;

    const characterProfession = document.createElement('h4');
    characterProfession.textContent = carouselData.characterProfession;

    const carouselButton = document.createElement('button');
    carouselButton.textContent = 'Message';

    carouselItemImg.appendChild(carouselImage);

    carouselItemData.appendChild(characterName);
    carouselItemData.appendChild(characterProfession);

    carouselItem.appendChild(carouselItemImg);
    carouselItem.appendChild(carouselItemData);
    carouselItem.appendChild(carouselButton);

    carouselWrapper.appendChild(carouselItem);
  }

  function updateCarousel() {
    const moveDistance = currentIndex * (ITEM_WIDTH + GAP);
    carouselWrapper.style.transform = `translateX(-${ moveDistance }px)`;

    btnPrevious.removeAttribute('disabled');
    btnNext.removeAttribute('disabled');

    if (currentIndex === 0) btnPrevious.setAttribute('disabled', '');
    if (currentIndex === MAX_INDEX) btnNext.setAttribute('disabled', '');
  }
});