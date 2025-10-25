import { flipCard } from './listeners.js';
import { TYPES } from './i18n.js';
import * as Classes from './css_classes.js';

export const renderPokemonCard = (pokemon, target) => {
  const pokemonCard = document.createElement('div');
  pokemonCard.className = Classes.POKEMON_CARD_CLASS;

  const cardInner = document.createElement('div');
  cardInner.className = Classes.CARD_INNER_CLASS;

  const cardFront = buildCardFront(pokemon);
  const cardBack = buildCardBack(pokemon);
  
  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);

  pokemonCard.appendChild(cardInner);

  target.appendChild(pokemonCard);
}

const buildCardFront = (pokemon) => {
  const cardFront = document.createElement('div');
  cardFront.className = Classes.CARD_FRONT_CLASS;
  
  const cardHeader = buildCardFrontHeader(pokemon.id);

  const pokemonName = document.createElement('h2');
  pokemonName.className = Classes.POKEMON_NAME_CLASS;
  pokemonName.textContent = pokemon.name;

  const pokemonImageContainer = document.createElement('div');
  pokemonImageContainer.className = Classes.POKEMON_IMAGE_CONTAINER_CLASS;

  const pokemonImage = document.createElement('img');
  pokemonImage.setAttribute('src', pokemon.sprite);
  pokemonImage.setAttribute('alt', pokemon.name);
  pokemonImage.className = Classes.POKEMON_IMAGE_CLASS;

  pokemonImageContainer.appendChild(pokemonImage);

  const pokemonTypes = buildPokemonTypeBadges(pokemon.types);

  const flipButton = buildFlipButton('Ver detalles');

  cardFront.appendChild(cardHeader);
  cardFront.appendChild(pokemonName);
  cardFront.appendChild(pokemonImageContainer);
  cardFront.appendChild(pokemonTypes);
  cardFront.appendChild(flipButton);

  return cardFront;
}

const buildCardFrontHeader = (pokemonId) => {
  const cardHeader = document.createElement('div');
  cardHeader.className = Classes.CARD_HEADER_CLASS;

  const pokemonNumber = document.createElement('span');
  pokemonNumber.className = Classes.POKEMON_NUMBER_CLASS;
  pokemonNumber.textContent = `#${ pokemonId }`;

  cardHeader.appendChild(pokemonNumber);

  return cardHeader;
}

const buildPokemonTypeBadges = (types) => {
  const pokemonTypes = document.createElement('div');
  pokemonTypes.className = Classes.POKEMON_TYPES_CLASS;

  const typeBadges = types.map(type => {
    const typeBadge = document.createElement('span');
    const typeClass = `type-${ type }`;
    typeBadge.classList.add(Classes.TYPE_BADGE_CLASS, typeClass);
    typeBadge.textContent = TYPES[type];

    return typeBadge;
  });

  for (const badge of typeBadges) { 
    pokemonTypes.appendChild(badge);
  }

  return pokemonTypes;
}

const buildCardBack = (pokemon) => {
  const cardBack = document.createElement('div');
  cardBack.className = Classes.CARD_BACK_CLASS;

  const h3Name = document.createElement('h3');
  h3Name.textContent = pokemon.name;

  const abilitiesSection = buildAbilitiesSection(pokemon.abilities);

  const characteristicsSection = buildCharacteristicsSection(pokemon);

  const shinyContainer = buildShinyContainer(pokemon.spriteShiny, pokemon.name);

  const flipButton = buildFlipButton('Volver');

  cardBack.appendChild(h3Name);
  cardBack.appendChild(abilitiesSection);
  cardBack.appendChild(characteristicsSection);
  cardBack.appendChild(shinyContainer);
  cardBack.appendChild(flipButton);

  return cardBack;
}

const buildAbilitiesSection = (abilities) => {
  const abilitiesSection = document.createElement('div');
  abilitiesSection.className = Classes.DETAIL_SECTION_CLASS;

  const h4Abilities = document.createElement('h4');
  h4Abilities.textContent = 'Habilidades';

  const abilitiesList = document.createElement('ul');
  abilitiesList.className = Classes.ABILITIES_LIST_CLASS;

  const abilityItems = abilities.map(ability => {
    const abilityItem = document.createElement('li');
    abilityItem.className = Classes.ABILITY_ITEM_CLASS;
    abilityItem.textContent = ability;

    return abilityItem;
  });

  for (const abilityItem of abilityItems) {
    abilitiesList.appendChild(abilityItem);
  }

  abilitiesSection.appendChild(h4Abilities);
  abilitiesSection.appendChild(abilitiesList);
  
  return abilitiesSection;
}

const buildCharacteristicsSection = (pokemon) => {
  const weight = (pokemon.weight / 10).toFixed(1);
  const height = (pokemon.height / 10).toFixed(1);

  const characteristicsSection = document.createElement('div');
  characteristicsSection.className = Classes.DETAIL_SECTION_CLASS;

  const h4Characteristics = document.createElement('h4');
  h4Characteristics.textContent = 'Características';

  const infoGrid = document.createElement('div');
  infoGrid.className = Classes.INFO_GRID_CLASS;

  const infoItemWeight = buildInfoItem('Peso', `${ weight } kg`);
  const infoItemHeight = buildInfoItem('Altura', `${ height } m`);

  const joinedTypes = pokemon.types.map(type => TYPES[type]).join(', ');
  const infoItemTypes = buildInfoItem('Tipos', joinedTypes);

  const infoItemBaseExperience = buildInfoItem('Experiencia base', pokemon.baseExperience);
  
  infoGrid.appendChild(infoItemWeight);
  infoGrid.appendChild(infoItemHeight);
  infoGrid.appendChild(infoItemTypes);
  infoGrid.appendChild(infoItemBaseExperience);

  characteristicsSection.appendChild(h4Characteristics);
  characteristicsSection.appendChild(infoGrid);

  return characteristicsSection;
}

const buildShinyContainer = (spriteShiny, name) => {
  const shinyContainer = document.createElement('div');
  shinyContainer.className = Classes.SHINY_CONTAINER_CLASS;

  const innerDiv = document.createElement('div');
  
  const shinyLabel = document.createElement('div');
  shinyLabel.className = Classes.SHINY_LABEL_CLASS;
  shinyLabel.textContent = 'Versión Shiny';

  innerDiv.appendChild(shinyLabel);

  const shinyImage = document.createElement('img');
  shinyImage.setAttribute('src', spriteShiny);
  shinyImage.setAttribute('alt', `${ name } shiny`);
  shinyImage.className = Classes.SHINY_IMAGE_CLASS;

  shinyContainer.appendChild(innerDiv);
  shinyContainer.appendChild(shinyImage);

  return shinyContainer;
}

const buildInfoItem = (label, value) => {
  const infoItem = document.createElement('div');
  infoItem.className = Classes.INFO_ITEM_CLASS;

  const infoLabel = document.createElement('span');
  infoLabel.className = Classes.INFO_LABEL_CLASS;
  infoLabel.textContent = label;
  
  const infoValue = document.createElement('span');
  infoValue.className = Classes.INFO_VALUE_CLASS;
  infoValue.textContent = value;

  infoItem.appendChild(infoLabel);
  infoItem.appendChild(infoValue);

  return infoItem;
}

const buildFlipButton = (label) => {
  const flipButton = document.createElement('button');
  flipButton.className = Classes.FLIP_BUTTON_CLASS;
  flipButton.textContent = label;
  flipButton.addEventListener('click', flipCard);

  return flipButton;
}