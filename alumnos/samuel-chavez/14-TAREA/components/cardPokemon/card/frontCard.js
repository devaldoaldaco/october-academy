class FrontCard extends HTMLElement {
  constructor() {
    super();
    this._srcPokemon = "";
    this._titlePokemon = "";
    this._idSpanFront = "";
    this.shadow = this.attachShadow({ mode: "open" });
  }

  setData({ srcPokemon, titlePokemon, idSpanFront }) {
    this._srcPokemon = srcPokemon;
    this._titlePokemon = titlePokemon;
    this._idSpanFront = idSpanFront;
    this.render();
    this.addClickListener();
  }

  addClickListener() {
    const spanFrontField = this.shadow.querySelector("span");
    if (!spanFrontField) return;
    spanFrontField.addEventListener("click", () => {
      const event = new CustomEvent("eventFrontSpan", {
        detail: { id: this._idSpanFront },
        bubbles: true,
        composed: true,
      });
      document.dispatchEvent(event);
    });
  }

  render() {
    this.shadow.innerHTML = `
          <style>
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
              align-items:center;

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
                padding:2px 20px 2px 20px;
                border: none;
            }
            span {
                font-family: 'Material Symbols Outlined';
                font-weight: 300;
                 font-size: 1.5rem;
                cursor: pointer;
            }
          </style>
  
          <section class="cardFace cardFront">
            <img src="${this._srcPokemon}">
            <p>${this._titlePokemon}</p>
            <button>
                <span id=${this.idSpanFront} class="material-symbols-outlined">info</span>
            </button>
        </section>
        `;
  }
}

window.customElements.define("front-card", FrontCard);
