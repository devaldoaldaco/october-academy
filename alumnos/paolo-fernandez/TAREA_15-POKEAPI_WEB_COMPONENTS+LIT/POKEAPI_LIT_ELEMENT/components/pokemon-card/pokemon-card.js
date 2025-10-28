import { css, html, LitElement } from "lit";

export class PokemonCard extends LitElement {
  static properties = {
    pokemon: {
      type: Object,
      state: true
    }
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .pokemon-card {
      perspective: 1000px;
      height: 550px;
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

    pokemon-card-front {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
    }

    pokemon-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      transform: rotateY(180deg);
    }
  `;

  constructor() {
    super();
    this.pokemon = { };
  }

  render() {
    return html`
      <div class="pokemon-card" @flip-card=${ this.handleFlip }>
        <div class="card-inner">
          <pokemon-card-front .pokemon=${ this.pokemon }></pokemon-card-front>
          <pokemon-card-back .pokemon=${ this.pokemon }></pokemon-card-back>
        </div>
      </div>
    `;
  }

  handleFlip = () => {
    const card = this.shadowRoot.querySelector('.pokemon-card');
    if (card) card.classList.toggle('flipped');
  }
}