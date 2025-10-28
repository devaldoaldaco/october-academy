import { POKEMON_TYPES } from "../../../i18n/pokemon-types.js";

export class PokemonCardBack extends HTMLElement {
  static template = null;
  #pokemon = { };

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set pokemon(pokemon) {
    this.#pokemon = pokemon;
  }

  async connectedCallback() {
    await this.loadTemplate();
    this.render();
  }

  async loadTemplate() {
    if (!PokemonCardBack.template) {
      const response = await fetch('./components/pokemon-card/card-back/pokemon-card-back.html');
      PokemonCardBack.template = await response.text();
    }
  }

  render() {
    this.shadowRoot.innerHTML = PokemonCardBack.template;
    this.updateContent();
  }

  updateContent() {
    const pokemonName = this.shadowRoot.querySelector('h3');

    const abilitiesList = this.shadowRoot.querySelector('.abilities-list');

    const infoWeightValue = this.shadowRoot.querySelector('.info-item.weight > .info-value');
    const infoHeightValue = this.shadowRoot.querySelector('.info-item.height > .info-value');
    const infoTypesValue = this.shadowRoot.querySelector('.info-item.types > .info-value');
    const infoBaseExperienceValue = this.shadowRoot.querySelector('.info-item.base-experience > .info-value');

    const shinyImage = this.shadowRoot.querySelector('.shiny-image');

    if (pokemonName) pokemonName.textContent = this.#pokemon.name;

    if (abilitiesList) {
      for (const ability of this.#pokemon.abilities) {
        const abilityItem = document.createElement('li');
        abilityItem.className = 'ability-item';
        abilityItem.textContent = ability;
        abilitiesList.appendChild(abilityItem);
      }
    }

    if (infoWeightValue) {
      const weight = (this.#pokemon.weight / 10).toFixed(1);
      infoWeightValue.textContent = `${ weight } kg`;
    }
    if (infoHeightValue) {
      const height = (this.#pokemon.height / 10).toFixed(1);
      infoHeightValue.textContent = `${ height } m`;
    }
    
    if (infoTypesValue) {
      const types = this.#pokemon.types.map(type => POKEMON_TYPES[type]).join(', ');
      infoTypesValue.textContent = types;
    }

    if (infoBaseExperienceValue) {
      infoBaseExperienceValue.textContent = this.#pokemon.baseExperience;
    }

    if (shinyImage) {
      shinyImage.setAttribute('src', this.#pokemon.spriteShiny);
      shinyImage.setAttribute('alt', `${ this.#pokemon.name } shiny`);
    }
  }
}