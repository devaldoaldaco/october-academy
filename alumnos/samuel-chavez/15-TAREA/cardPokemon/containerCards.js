import { LitElement, html, css } from "lit";
import "./card/buttonCard"
export class ContainerCards extends LitElement {
  static properties = {
    init: { type: Number },
    amount: { type: Number },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .main-container {
      margin: 0 auto;
      width: 80%;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      row-gap: 20px;
    }

    .button-container {
      display: flex;
      justify-content: center;
      padding: 20px;
    }

    #load {
      margin: 0 auto;
      display: flex;
      min-width: 120px;
      max-width: 480px;
      cursor: pointer;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border-radius: 0.5rem;
      height: 3rem;
      padding: 0 1.25rem;
      background-color: #ff1c1c;
      font-size: 1rem;
      font-weight: 700;
      color: white;
      transition: background-color 200ms ease-in-out;
      border: none;
    }

    #load:hover {
      background-color: #e01414;
    }

    #load:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `;

  constructor() {
    super();
    this.init = 0;
    this.amount = 0;
    this.pokemons = [];  
  }

  connectedCallback() {
    super.connectedCallback();
    this.getTotalPokemons();
  }

  async getTotalPokemons() {
    const loadButton = this.renderRoot?.querySelector(`#load`);
    if (loadButton) {
      loadButton.disabled = true;
      loadButton.textContent = "Cargando...";
    }

    try {
      const promises = [];
      for (let i = this.init; i < this.init + this.amount; i++) {
        promises.push(
          (async () => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
            const data = await res.json();
            const res2 = await fetch(data.species.url);
            const data2 = await res2.json();
            return { data, data2 };
          })()
        );
      }

      const newPokemons = await Promise.all(promises);
      this.pokemons = [...this.pokemons, ...newPokemons];
      this.init += this.amount;
    } catch (e) {
      console.error("Error cargando Pokémon:", e);
    }

    if (loadButton) {
      loadButton.disabled = false;
      loadButton.textContent = "Cargar más Pokemons!";
    }
  }

  render() {
    return html`
       <div class="main-container">
        ${this.pokemons.map(
          (p, index) => html`
            <button-card
              .dataPokemons=${p.data}
              .dataPokemons2=${p.data2}
              .idButton=${index}
            ></button-card>
          `
        )}
      </div>
      <div class="button-container">
        <button @click="${this.getTotalPokemons}" id="load">Cargar más Pokemons!</button>
      </div>
    `;
  }

}

window.customElements.define("container-cards", ContainerCards);
