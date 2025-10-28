import "./pokemon-card.js";

class PokedexApp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.pokemons = [];
    this.cantidadActual = 0;
    this.maxPokemon = 100;
    this.cargando = false;

    this.container = document.createElement("div");
    this.container.classList.add("container");
  }

  connectedCallback() {
    this.render();
    this.loadMorePokemon();
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

    this.render();
  }

  async fetchPokemon(offset, count) {
    const promises = [];
    for (let i = offset + 1; i <= offset + count && i <= this.maxPokemon; i++) {
      promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(r => r.json()));
    }
    return Promise.all(promises);
  }

  render() {
    const style = `
      <style>
        .container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }
        h1 {
          color: white;
          font-size: 4rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .pokemon-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
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
        }
        .loading {
          color: white;
          margin: 20px 0;
        }
      </style>
    `;

    const pokemonsHTML = this.pokemons.map(
      (p) => `
        <pokemon-card
          name="${p.name}"
          id="${p.id}"
          image="${p.sprites.other['official-artwork'].front_default || p.sprites.front_default}"
          types='${JSON.stringify(p.types.map(t => t.type.name))}'
        ></pokemon-card>
      `
    ).join("");

    const html = `
      ${style}
      <div class="container">
        <h1>Pokédex</h1>
        <div class="pokemon-grid">${pokemonsHTML}</div>
        ${this.cargando ? `<div class="loading">Cargando Pokémon...</div>` : ""}
        <button class="load-more-btn" ${this.cantidadActual >= this.maxPokemon ? "disabled" : ""}>
          ${this.cantidadActual >= this.maxPokemon ? "No hay más Pokémon" : "Cargar más Pokémon"}
        </button>
      </div>
    `;

    this.shadowRoot.innerHTML = html;

    const btn = this.shadowRoot.querySelector(".load-more-btn");
    if (btn) btn.addEventListener("click", () => this.loadMorePokemon());
  }
}

customElements.define("pokedex-app", PokedexApp);
