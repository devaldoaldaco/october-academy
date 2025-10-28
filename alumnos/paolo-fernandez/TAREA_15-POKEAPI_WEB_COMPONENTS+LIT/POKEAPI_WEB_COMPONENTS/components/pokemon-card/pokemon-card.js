export class PokemonCard extends HTMLElement {
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

    this.setupListeners();
  }

  async loadTemplate() {
    if (!PokemonCard.template) {
      const response = await fetch('./components/pokemon-card/pokemon-card.html');
      const template = document.createElement('template');
      
      template.innerHTML = await response.text();
      PokemonCard.template = template.content;
    }
  }

  render() {
    this.shadowRoot.appendChild(PokemonCard.template.cloneNode(true));
    this.updateContent();
  }

  updateContent() {
    const cardFront = this.shadowRoot.querySelector('pokemon-card-front');
    const cardBack = this.shadowRoot.querySelector('pokemon-card-back');

    if (cardFront) cardFront.pokemon = { ...this.#pokemon };
    if (cardBack) cardBack.pokemon = { ...this.#pokemon };
  }

  setupListeners() {
    this.shadowRoot.addEventListener('flip-card', () => {
      const card = this.shadowRoot.querySelector('.pokemon-card');
      if (card) card.classList.toggle('flipped');
    });
  }
}