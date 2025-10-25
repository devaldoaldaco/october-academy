import { LitElement, html, css } from "lit";
import "./pokemon-card.js";

export class PokedexApp extends LitElement {
  static properties = {
    pokemons: { type: Array },
    cantidadActual: { type: Number },
    cargando: { type: Boolean },
    maxPokemon: { type: Number },
  };

  constructor() {
    super();
    this.pokemons = [];
    this.cantidadActual = 0;
    this.cargando = false;
    this.maxPokemon = 100;
  }

  static styles = css`
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      text-align: center;
      color: white;
      margin-bottom: 5rem;
      font-size: 2.5em;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      font-size: 5rem;
    }

    .pokemon-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }

    .load-more-container {
      text-align: center;
      margin: 30px 0;
    }

    .load-more-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 15px 40px;
      font-size: 1.1em;
      font-weight: bold;
      border-radius: 50px;
      cursor: pointer;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
    }

    .load-more-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    }

    .load-more-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .loading {
      text-align: center;
      color: white;
      font-size: 1.2em;
      margin: 20px 0;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.loadMorePokemon(); // Primera carga
  }

  async loadMorePokemon() {
    if (this.cargando) return;
    this.cargando = true;

    const primeraCarga = this.cantidadActual === 0 ? 16 : 4;
    const count = Math.min(primeraCarga, this.maxPokemon - this.cantidadActual);
    const nuevosPokemons = await this.fetchPokemon(this.cantidadActual, count);

    this.pokemons = [...this.pokemons, ...nuevosPokemons];
    this.cantidadActual += count;
    this.cargando = false;
  }

  async fetchPokemon(offset, count) {
    const promises = [];
    for (let i = offset + 1; i <= offset + count && i <= this.maxPokemon; i++) {
      promises.push(
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then((r) => r.json())
      );
    }
    return Promise.all(promises);
  }

  render() {
    return html`
      <div class="container">
        <h1>Pokédex</h1>

        <div class="pokemon-grid">
          ${this.pokemons.map(
            (pokemon) => html`
              <pokemon-card
                name=${pokemon.name}
                id=${pokemon.id}
                image=${pokemon.sprites.other["official-artwork"]
                  .front_default || pokemon.sprites.front_default}
                .types=${pokemon.types.map((t) => t.type.name)}
              ></pokemon-card>
            `
          )}
        </div>

        ${this.cargando
          ? html`<div class="loading">Cargando Pokémon...</div>`
          : null}

        <div class="load-more-container">
          <button
            class="load-more-btn"
            ?disabled=${this.cargando || this.cantidadActual >= this.maxPokemon}
            @click=${this.loadMorePokemon}
          >
            ${this.cantidadActual >= this.maxPokemon
              ? "No hay más Pokémon"
              : "Cargar más Pokémon"}
          </button>
        </div>
      </div>
    `;
  }
}

customElements.define("pokedex-app", PokedexApp);
