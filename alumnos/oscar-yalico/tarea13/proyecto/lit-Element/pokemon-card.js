import { LitElement, html, css } from "lit";

export class PokemonCard extends LitElement {
  static properties = {
    name: { type: String },
    id: { type: Number },
    image: { type: String },
    types: { type: Array },
    flipped: { type: Boolean },
  };

  constructor() {
    super();
    this.name = "";
    this.id = 0;
    this.image = "";
    this.types = [];
    this.flipped = false;
  }

  static styles = css`
    .pokemon-card {
      background: transparent;
      perspective: 1000px;
      height: 400px;
      cursor: pointer;
    }

    .card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transition: transform 0.6s;
      transform-style: preserve-3d;
    }

    .pokemon-card.flipped .card-inner {
      transform: rotateY(180deg);
    }

    .card-front,
    .card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 15px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    .card-front {
      background-image: url(https://i.ebayimg.com/images/g/S0kAAOSwcw9mAcYY/s-l1200.jpg);
      background-position: center center;
      background-size: cover;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .card-back {
      background: #d9ceff;
      transform: rotateY(180deg);
      display: flex;
      flex-direction: column;
      align-items: center;
      border: #333 2px solid;
      justify-content: center;
    }

    .pokemon-card img {
      width: 100%;
      height: 120px;
      object-fit: contain;
      margin-bottom: 10px;
    }

    .pokemon-id {
      color: #999;
      font-size: 0.9em;
      font-weight: bold;
    }

    .pokemon-name {
      font-size: 1.3em;
      font-weight: bold;
      color: #333;
      text-transform: capitalize;
      margin: 10px 0;
    }

    .pokemon-types {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
    }

    .type-badge {
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 0.8em;
      font-weight: bold;
      color: white;
      text-transform: uppercase;
    }

    .type-normal {
      background: #a8a878;
    }
    .type-fire {
      background: #f08030;
    }
    .type-water {
      background: #6890f0;
    }
    .type-electric {
      background: #f8d030;
    }
    .type-grass {
      background: #78c850;
    }
    .type-ice {
      background: #98d8d8;
    }
    .type-fighting {
      background: #c03028;
    }
    .type-poison {
      background: #a040a0;
    }
    .type-ground {
      background: #e0c068;
    }
    .type-flying {
      background: #a890f0;
    }
    .type-psychic {
      background: #f85888;
    }
    .type-bug {
      background: #a8b820;
    }
    .type-rock {
      background: #b8a038;
    }
    .type-ghost {
      background: #705898;
    }
    .type-dragon {
      background: #7038f8;
    }
    .type-dark {
      background: #705848;
    }
    .type-steel {
      background: #b8b8d0;
    }
    .type-fairy {
      background: #ee99ac;
    }
  `;

  toggleFlip() {
    this.flipped = !this.flipped;
  }

  render() {
    return html`
      <div
        class="pokemon-card ${this.flipped ? "flipped" : ""}"
        @click=${this.toggleFlip}
      >
        <div class="card-inner">
          <div class="card-front"></div>
          <div class="card-back">
            <img src=${this.image} alt=${this.name} />
            <div class="pokemon-id">#${String(this.id).padStart(3, "0")}</div>
            <div class="pokemon-name">${this.name}</div>
            <div class="pokemon-types">
              ${this.types.map(
                (t) => html`<span class="type-badge type-${t}">${t}</span>`
              )}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define("pokemon-card", PokemonCard);
