import { LitElement, html, css } from "lit";

const POKEMON_TYPE_COLORS = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  steel: "#B8B8D0",
  dark: "#705848",
  fairy: "#EE99AC",
};

class PokemonCard extends LitElement {
  static properties = {
    pokemonData: { type: Object },
    _isFlipped: { state: true, type: Boolean },
  };

  constructor() {
    super();
    this.pokemonData = null;
    this._isFlipped = false;
  }

  static styles = css`
    .button__img {
      width: 20px;
      height: 20px;
    }
    .card > button {
      width: 20px;
      height: 20px;
      transition: transform 0.8s;
      background: transparent;
      border: none;
      padding: 0;
      margin: 0;
    }

    .card p {
      text-transform: capitalize;
    }
    .is-flipped {
      transform: rotateY(-180deg);
    }
    .img__container {
      text-align: center;
      height: "150px";
      width: "150px";
    }

    .img {
      height: 100%;
    }
    .pokemon__id {
      align-self: start;
    }
    .card__face--front {
      backface-visibility: hidden;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      & p {
        text-align: center;
      }
      &.is-flipped {
        display: none;
      }
    }

    .card__face--back {
      display: none;
      transform: rotateY(-180deg);
      opacity: 0;
      transition: opacity 1s;
      visibility: hidden;
    }
    .card__face--back.is-flipped {
      display: flex;
      opacity: 1;
      visibility: visible;
    }

    .card {
      min-height: 275px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px;
      transform-style: preserve-3d;
      transition: transform 0.8s;
      border-radius: 8px;
    }

    .card__container--top {
      display: flex;
      justify-content: space-between;
      width: 100%;
      position: relative;
      flex-direction: row;
      align-items: unset;
      &.is-flipped {
        transform: rotateY(-180deg);
      }
    }
    .stats__container {
      display: flex;
      flex-direction: column;
      /* gap: 12px; */
    }
    .stats__spans {
      display: flex;
      flex-direction: column;
      /* gap: 10px; */
      & span:nth-child(2) {
        /* border: 1px solid black; */
        text-align: center;
        /* & progress{
      background-color: red;
    } */
        /* background-color: green; */
      }
    }
  `;

  render() {
    if (!this.pokemonData) return html``;

    const pokemon = this.pokemonData;
    const primaryType = pokemon.types[0].type.name;
    const color = POKEMON_TYPE_COLORS[primaryType] || "#ccc";
    const isFlippedClass = this._isFlipped ? "is-flipped" : "";

    return html`
      <div class="card ${isFlippedClass}" style="border: 2px solid ${color};">
        <div class="card__container--top ${isFlippedClass}">
          <span class="pokemon__id">#${pokemon.id}</span>
          <button class="flip-button" @click=${this._handleFlip}>
            <img class="button__img" src="/flip.png" alt="Flip" />
          </button>
        </div>

        <div class="card__face card__face--front ${isFlippedClass}">
          <div class="img__container">
            <img
              class="img"
              src="${pokemon.sprites.front_default}"
              alt="${pokemon.species.name}"
            />
          </div>
          <p>${pokemon.species.name}</p>
          <div style="color: ${color};">
            <p>Type: ${pokemon.types.map((t) => t.type.name).join(" / ")}</p>
          </div>
        </div>

        <div class="card__face card__face--back ${isFlippedClass}">
          <div class="stats__container">
            ${pokemon.stats.map((stat) => {
              const statName = stat.stat.name.replace("-", " ");
              return html`
                <div class="stats__spans">
                  <span>${statName}</span>
                  <span>
                    <progress
                      min="0"
                      max="100"
                      value="${stat.base_stat}"
                    ></progress>
                  </span>
                </div>
              `;
            })}
          </div>
        </div>
      </div>
    `;
  }

  _handleFlip() {
    this._isFlipped = !this._isFlipped;
  }
}

customElements.define("pokemon-card", PokemonCard);
