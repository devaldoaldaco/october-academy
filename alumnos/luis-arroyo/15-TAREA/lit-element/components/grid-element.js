import { LitElement, html, css } from "lit";

class GridElement extends LitElement {
  static properties = {
    pokemons: { type: Array },
  };

  constructor() {
    super();
    this.pokemons = [];
  }

  static styles = css`
    :host {
      display: block;
      padding: 20px 0;
      margin: 0 auto;
    }
    .pokemon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 16px;
    }
  `;

  render() {
    console.log(this.pokemons);
    if (!this.pokemons || this.pokemons.length === 0) {
      return html`<p id="card-grid">Cargando Pokémon o lista vacía...</p>`;
    }

    return html`
      <div class="pokemon-grid" id="card-grid">
        ${this.pokemons.map(
          (pokemon) => html`
            <pokemon-card .pokemonData=${pokemon}></pokemon-card>
          `
        )}
      </div>
    `;
  }
}
customElements.define("grid-element", GridElement);
