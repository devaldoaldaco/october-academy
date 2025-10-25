class containerCards extends HTMLElement {
  constructor() {
    super();
    this.init = 1;
    this.amount = 5;
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.getTotalPokemons();
  }

  static observedAttributes = ["init", "amount"];

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "init") this.init = Number(newValue) || 1;
    if (name === "amount") this.amount = Number(newValue) || 5;
    this.render();
    this.setupEventListeners();
    this.getTotalPokemons();
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        .container {
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
      </style>

      <div class="container">
        <div class="main-container"></div>
        <div class="button-container">
          <button id="load">Cargar más Pokemons!</button>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const loadButton = this.shadow.querySelector("#load");
    loadButton.addEventListener("click", () => {
      this.init = this.amount + 1;
      this.amount += 5;
      this.getTotalPokemons();
    });
  }

  async getTotalPokemons() {
    const mainContainer = this.shadow.querySelector(".main-container");
    const loadButton = this.shadow.querySelector("#load");

    loadButton.disabled = true;
    loadButton.textContent = "Cargando...";

    for (let i = this.init; i <= this.amount; i++) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        const data = await response.json();
        const response2 = await fetch(data.species.url);
        const data2 = await response2.json();

        const card = document.createElement("button-card");
        card.dataPokemons = data;
        card.dataPokemons2 = data2;
        card.idButton = i;

        mainContainer.appendChild(card);
      } catch (e) {
        console.log(e.message);
      }
    }

    loadButton.disabled = false;
    loadButton.textContent = "Cargar más Pokemons!";
  }
}

window.customElements.define("container-cards", containerCards);
