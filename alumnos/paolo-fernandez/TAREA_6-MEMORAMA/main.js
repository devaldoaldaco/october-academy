document.addEventListener('DOMContentLoaded', () => {
  const IMAGES = [
    { filename: 'faraon.jpg', description: 'Faraón Love Shady' },
    { filename: 'padre_domingo.jpg', description: 'Padre Domingo' },
    { filename: 'chupetin.jpg', description: 'Chupetin Trujillo' },
    { filename: 'sideral.jpg', description: 'La Beba Sideral' },
    { filename: 'tilin.webp', description: 'Tilín' },
    { filename: 'chilindrina_huachana.jpg', description: 'La Chilindrina Huachana' }
  ]
  const ROWS = 4;
  const COLUMNS = 3;
  const IMG_FOLDER_PATH = 'assets/img';
  const SHOW_IMG_CLASS = 'show-img';
  const MATCHED_CLASS = 'matched';
  const TILE_CLASS = 'tile';

  let imagesPositions;
  let imageCount;

  const main = document.getElementById('memoryGame');
  initGame();
  const tiles = document.querySelectorAll('.tile');
  const btnReset = document.getElementById('btnReset');

  let lockBoard = false;
  let firstTile = null;
  let secondTile = null;

  function initGame() {
    renderBoard();
    initVariables()
  }

  tiles.forEach(tile => tile.addEventListener('click', handleTileClick));
  btnReset.addEventListener('click', handleBtnResetClick);

  function initVariables() {
    imagesPositions = Array.from(
      { length: ROWS }, 
      () => Array(COLUMNS).fill(null)
    );
    
    imageCount = Object.fromEntries(
      IMAGES.map(img => [ img.filename, 0 ])
    );
  }

  function renderBoard() {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        const div = document.createElement('div');       
        div.classList.add('tile')
        div.dataset.row = i;
        div.dataset.column = j;

        main.appendChild(div);
      }
    }
  }

  function handleTileClick(event) {
    const tile = event.currentTarget;

    if (lockBoard) return;
    if (tile.classList.contains(MATCHED_CLASS)) return;
    if (tile === firstTile) return;

    if (!firstTile) {
      firstTile = tile;
      renderTileImage(firstTile);
      return;
    }

    secondTile = tile;
    renderTileImage(secondTile);
    lockBoard = true;

    checkForMatch();
  }

  function handleBtnResetClick() {
    const confirmReset = confirm('¿Estás seguro que deseas reiniciar el juego?');

    if (!confirmReset) return;
    
    tiles.forEach(tile => {
      tile.className = TILE_CLASS;
      const tileImage = tile.querySelector('img');
      if (tileImage) tileImage.remove();
    });

    initVariables();
    resetBoard();
  }

  function renderTileImage(tile) {
    const row = Number(tile.dataset.row);
    const column = Number(tile.dataset.column);

    let image = imagesPositions[row][column];

    if (image === null) {
      image = getAvailableImage();
      imagesPositions[row][column] = image;
    }

    const img = document.createElement('img');
    img.src = `${ IMG_FOLDER_PATH }/${ image.filename }`;
    img.alt = image.description;
    tile.appendChild(img);

    tile.classList.add(SHOW_IMG_CLASS);
  }

  function checkForMatch() {
    const firstTileImage = firstTile.querySelector('img');
    const secondTileImage = secondTile.querySelector('img');

    if (firstTileImage.src === secondTileImage.src) {
      firstTile.classList.add(MATCHED_CLASS)
      secondTile.classList.add(MATCHED_CLASS)
      resetBoard();
      checkWin();
      return;
    }

    setTimeout(() => {
      firstTile.classList.remove(SHOW_IMG_CLASS);
      secondTile.classList.remove(SHOW_IMG_CLASS);

      firstTileImage.remove();
      secondTileImage.remove();

      resetBoard();
    }, 1000);
  }

  function checkWin() {
    const allMatched = document.querySelectorAll(`div.${ MATCHED_CLASS }`).length;

    if (allMatched === ROWS * COLUMNS) {
      setTimeout(() => {
        alert('¡Ganaste! 🎉');
      }, 500);
    }
  }

  function getAvailableImage() {
    const availableImages = IMAGES.filter(img => imageCount[img.filename] < 2);

    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const available = availableImages[randomIndex];

    imageCount[available.filename] += 1;

    return available;
  }

  function resetBoard() {
    lockBoard = false;
    firstTile = null;
    secondTile = null;
  }
});