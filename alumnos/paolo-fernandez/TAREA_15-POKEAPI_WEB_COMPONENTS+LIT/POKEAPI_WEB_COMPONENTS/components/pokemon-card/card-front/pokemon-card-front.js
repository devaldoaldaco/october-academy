export class PokemonCardFront extends HTMLElement {
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
    if (!PokemonCardFront.template) {
      const response = await fetch('./components/pokemon-card/card-front/pokemon-card-front.html');
      PokemonCardFront.template = await response.text();
    }
  }

  render() {
    this.shadowRoot.innerHTML = PokemonCardFront.template;
    this.updateContent();
  }

  updateContent() {
    const pokemonNumber = this.shadowRoot.querySelector('.pokemon-number');
    const pokemonName = this.shadowRoot.querySelector('.pokemon-name');
    const pokemonImage = this.shadowRoot.querySelector('.pokemon-image');
    const pokemonTypes = this.shadowRoot.querySelector('.pokemon-types');

    if (pokemonNumber) pokemonNumber.textContent = this.#pokemon.id;
    if (pokemonName) pokemonName.textContent = this.#pokemon.name;

    if (pokemonImage) {
      pokemonImage.setAttribute('src', this.#pokemon.sprite);
      pokemonImage.setAttribute('alt', this.#pokemon.name);
    }

    if (pokemonTypes) {
      for (const type of this.#pokemon.types) {
        const typeBadge = document.createElement('type-badge');
        pokemonTypes.appendChild(typeBadge);
        typeBadge.setAttribute('type', type);
      }
    }
  }
}