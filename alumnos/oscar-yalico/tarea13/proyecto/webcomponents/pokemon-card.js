class PokemonCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.flipped = false;
  }

  static get observedAttributes() {
    return ["name", "id", "image", "types"];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  toggleFlip() {
    this.flipped = !this.flipped;
    this.render();
  }

  render() {
    const name = this.getAttribute("name") || "";
    const id = this.getAttribute("id") || "";
    const image = this.getAttribute("image") || "";
    const types = JSON.parse(this.getAttribute("types") || "[]");

    const style = `
      <style>
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
        .card-front, .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 15px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        .card-front {
          background-image: url(https://i.ebayimg.com/images/g/S0kAAOSwcw9mAcYY/s-l1200.jpg);
          background-size: cover;
        }
        .card-back {
          background: #d9ceff;
          transform: rotateY(180deg);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: #333 2px solid;
        }
        img {
          width: 100%;
          height: 120px;
          object-fit: contain;
        }
        .pokemon-name {
          font-weight: bold;
          font-size: 1.3em;
          margin: 10px 0;
          text-transform: capitalize;
        }
        .type-badge {
          border-radius: 20px;
          padding: 5px 10px;
          margin: 3px;
          color: white;
          font-size: 0.8em;
          text-transform: uppercase;
        }
        .type-fire { background: #f08030; }
        .type-water { background: #6890f0; }
        .type-grass { background: #78c850; }
        .type-electric { background: #f8d030; }
        .type-bug { background: #a8b820; }
        .type-normal { background: #a8a878; }
        .type-poison { background: #a040a0; }
        .type-fighting { background: #c03028; }
        .type-ground { background: #e0c068; }
        .type-flying { background: #a890f0; }
        .type-psychic { background: #f85888; }
        .type-rock { background: #b8a038; }
        .type-ghost { background: #705898; }
        .type-dragon { background: #7038f8; }
        .type-dark { background: #705848; }
        .type-steel { background: #b8b8d0; }
        .type-fairy { background: #ee99ac; }
      </style>
    `;

    const html = `
      ${style}
      <div class="pokemon-card ${this.flipped ? "flipped" : ""}">
        <div class="card-inner">
          <div class="card-front"></div>
          <div class="card-back">
            <img src="${image}" alt="${name}" />
            <div class="pokemon-id">#${String(id).padStart(3, "0")}</div>
            <div class="pokemon-name">${name}</div>
            <div class="pokemon-types">
              ${types.map(t => `<span class="type-badge type-${t}">${t}</span>`).join("")}
            </div>
          </div>
        </div>
      </div>
    `;

    this.shadowRoot.innerHTML = html;
    this.shadowRoot.querySelector(".pokemon-card").addEventListener("click", () => this.toggleFlip());
  }
}

customElements.define("pokemon-card", PokemonCard);
