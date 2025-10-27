import { LitElement, html, css } from "lit";
import "./backCard";
import "./frontCard";
export class buttonCard extends LitElement {
  static properties = {
    dataPokemons: { type: Object },
    dataPokemons2: { type: Object },
    idButton: { type: Number },
  };

  static styles = css`
    .cardPokemon {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      width: 200px;
      height: 20rem;
      border-radius: 16px;
      border: 2px solid #ff1c1c;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.6s ease-in-out;
      font-weight: bold;
      position: relative;
      transform-style: preserve-3d;
    }
    .rotate {
      transform: rotateY(180deg);
    }
    front-card,
    back-card {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      transform-style: preserve-3d;
    }
    back-card {
      transform: rotateY(180deg);
    }
  `;

  constructor() {
    super();
    this.dataPokemons = {};
    this.dataPokemons2 = {};
    this.idButton = 0;
  }



  render() {
    return html`
      <button
        @eventFrontSpan=${this.listenEventsFront}
        @eventBackSpan=${this.listenEventsBack}
        id="buttonCard"
        class="cardPokemon"
      >
        <front-card
          srcPokemon=${this.dataPokemons.sprites.other.dream_world
            .front_default}
          titlePokemon=${this.dataPokemons.name}
          idSpanFront=${this.idButton}
        ></front-card>
        <back-card
          .abilities=${this.dataPokemons.abilities.map((a) => a.ability.name)}
          description=${this.dataPokemons2.flavor_text_entries[34]
            ?.flavor_text || ""}
          idSpanBack=${this.idButton}
        ></back-card>
      </button>
    `;
  }

  listenEventsFront(e) {
    const button = this.renderRoot.querySelector("button");
    if (e.detail?.id === this.idButton) {
      button.classList.add("rotate");
    }
  }

  listenEventsBack(e) {
    const button = this.renderRoot.querySelector("button");
    if (e.detail?.id === this.idButton) {
      button.classList.remove("rotate");
    }
  }
}

window.customElements.define("button-card", buttonCard);
