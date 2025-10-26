class buttonCard extends HTMLElement {
  constructor() {
    super();
    this._dataPokemons = null;
    this._dataPokemons2 = null;
    this.idButton = 0;
    this.shadow = this.attachShadow({ mode: "open" });

    // referencia a los componentes hijos
    this.frontCard = null;
    this.backCard = null;
  }
  connectedCallback() {
    this.render();
  }

  set dataPokemons(value) {
    this._dataPokemons = value;
    this.updateChildren();
  }

  set dataPokemons2(value) {
    this._dataPokemons2 = value;
    this.updateChildren();
  }

  static observedAttributes = ["idButton"];

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "i") {
      this.idButton = Number(newValue);
      this.updateChildren();
    }
  }

  render() {
    this.shadow.innerHTML = `
        <style>
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
            front-card, back-card {
              position: absolute;
              width: 100%;
              height: 100%;
              backface-visibility: hidden;
              transform-style: preserve-3d;
            }
            back-card {
              transform: rotateY(180deg);
            }
        </style>

        <button class="cardPokemon"></button>
      `;
    const button = this.shadow.querySelector("button");

    this.frontCard = document.createElement("front-card");
    this.backCard = document.createElement("back-card");

    button.appendChild(this.frontCard);
    button.appendChild(this.backCard);

    document.addEventListener("eventFrontSpan", (e) => {
      if (e.detail?.id === this.idButton) {
        button.classList.add("rotate");
      }
    });

    document.addEventListener("eventBackSpan", (e) => {
      if (e.detail?.id === this.idButton) {
      button.classList.remove("rotate");
      }
    });

    this.updateChildren();
  }

  updateChildren() {
    if (!this.frontCard || !this.backCard) return;
    if (this._dataPokemons && this._dataPokemons2) {
      //Actualizamos FrontCard usando setData
      this.frontCard.setData({
        srcPokemon: this._dataPokemons.sprites.other.dream_world.front_default,
        titlePokemon: this._dataPokemons.name,
        idSpanFront: this.idButton,
      });

      // Actualiza BackCard usando setData
      this.backCard.setData({
        abilities: this._dataPokemons.abilities.map((a) => a.ability.name),
        description:
          this._dataPokemons2.flavor_text_entries[34]?.flavor_text || "",
        idSpanBack: this.idButton,
      });
    }
  }
}

window.customElements.define("button-card", buttonCard);
