import { LitElement, html, css} from "lit";

export class FrontCard extends LitElement {
  static properties = {
    srcPokemon: { type: String },
    titlePokemon: { type: String },
    idSpanFront: { type: String },
  };

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .cardFront {
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 40px 0px;
      justify-content: space-between;
      align-items: center;
    }
    p {
      font-family: "Zen Dots", sans-serif;
      font-weight: 400;
      font-size: x-large;
      top: 0;
    }
    img {
      width: 70%;
      height: 50%;
      object-fit: contain;
    }

    button {
      border-radius: 10px 0 0 10px;
      background-color: #ff1c1c;
      align-self: end;
      color: white;
      padding: 2px 20px 2px 20px;
      border: none;
    }
    span {
      font-family: "Material Symbols Outlined";
      font-weight: 300;
      font-size: 1.5rem;
      cursor: pointer;
    }
  `;

  spanFrontClickListener() {
    const options = {
      detail: { id: Number(this.idSpanFront)},
      bubbles: true,
      composed: true,
    };

    this.dispatchEvent(new CustomEvent("eventFrontSpan", options));
  }

  render() {
    return html`
      <section class="cardFace cardFront">
        <img src="${this.srcPokemon}" />
        <p>${this.titlePokemon}</p>
        <button>
          <span
            @click="${this.spanFrontClickListener}"
            id=${this.idSpanFront}
            class="material-symbols-outlined"
            >info</span
          >
        </button>
      </section>
    `;
  }
}

window.customElements.define("front-card", FrontCard);
