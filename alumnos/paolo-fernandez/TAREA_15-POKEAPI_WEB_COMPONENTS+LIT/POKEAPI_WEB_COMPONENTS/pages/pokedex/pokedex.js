import { fetchPokemonList } from "./fetch.js";
import { logout } from "./listeners.js";

export class PokedexPage extends HTMLElement {
  static template = null;

  constructor() {
    super();
    this.limit = 20;
    this.page = 1;
    this.isLoading = false;
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    await this.loadTemplate();
    this.render();

    await this.loadPokemons();
    this.setupListeners();
  }

  async loadTemplate() {
    if (!PokedexPage.template) {
      const response = await fetch('./pages/pokedex/pokedex.html');
      const template = document.createElement('template');
      
      template.innerHTML = await response.text();
      PokedexPage.template = template.content;
    }
  }

  render() {
    this.shadowRoot.appendChild(PokedexPage.template.cloneNode(true));
  }

  renderPokemonCards(pokemons) {
    const pokemonSection = this.shadowRoot.querySelector('#pokemonSection');

    for (const pokemon of pokemons) {
      const pokemonCard = document.createElement('pokemon-card');
      pokemonSection.appendChild(pokemonCard);
      pokemonCard.pokemon = pokemon;
    }
  }

  async loadPokemons() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.toggleLoadMoreBtnStatus();

    try {
      const pokemons = await fetchPokemonList(this.limit, this.page);
      this.renderPokemonCards(pokemons);
      this.page++;
    } catch (error) {
      console.error('Error cargando pokemones:', error);
    } finally {
      this.isLoading = false;
      this.toggleLoadMoreBtnStatus();
    }
  }

  setupListeners() {
    const loadMoreBtn = this.shadowRoot.querySelector('#loadMoreBtn');
    const logoutBtn = this.shadowRoot.querySelector('#logoutBtn');

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', this.loadPokemons.bind(this));
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', logout);
    }
  }

  toggleLoadMoreBtnStatus() {
    const loadMoreBtn = this.shadowRoot.querySelector('#loadMoreBtn');

    if (!loadMoreBtn) return;

    loadMoreBtn.removeAttribute('disabled');

    if (this.isLoading) loadMoreBtn.setAttribute('disabled', '');
  }
}