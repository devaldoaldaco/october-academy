class BackCard extends HTMLElement {
  constructor() {
    super();
    this._abilities = [];
    this._idSpanBack = "";
    this._description = "";
    this.shadow = this.attachShadow({ mode: "open" });
  }

  setData({ abilities, description, idSpanBack }) {
    this._abilities = abilities;
    this._description = description;
    this._idSpanBack = idSpanBack;
    this.render();
    this.addClickListener();
  }

  addClickListener() {
    const spanFieldBack = this.shadow.querySelector("span");
    if (!spanFieldBack) return;
    spanFieldBack.addEventListener("click", () => {
      const event = new CustomEvent("eventBackSpan", {
        detail: { id: this._idSpanBack },
        bubbles: true,
        composed: true,
      });
      document.dispatchEvent(event);
    });
  }
  

  render() {
    this.shadow.innerHTML = `
          <style>
            @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap");
             * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            li{
              list-style: none;
            }
            .cardBack {
              height: 100%;
              display: flex;
              flex-direction: column;
              padding: 40px 0px;
              justify-content: space-between;
              align-items:center;
            }
            .ability {
                display: flex;
                padding: 10px;
                text-align: start;
                flex-direction: column;
                gap: 10px;
                align-self: self-start;
            }
            .ability ul {
                font-family: "Orbitron", sans-serif;
                padding: 0 10px;
                display: flex;
                flex-direction: row;
                gap: 10px;
            }

            .description {
                max-width: 85%;
                padding: 10px;
                align-self: center;
            }
            
            .description  p {
                text-align: justify;
            }

            .icon {
                background-color: #ff1c1c;
                width: 100%;
                color: white;
                padding:2px 20px 2px 20px;
                border: none;
            }

            .icon span {
                font-family: 'Material Symbols Outlined';
                font-weight: 400;
                font-size: 1.5rem;
                cursor: pointer;
            }
          </style>
  
          <section class="cardFace cardBack">
            <div class="ability">
                <h4>Habilidades:</h4>
                <ul>
                     ${this._abilities.map(a => `<li>${a}</li>`).join("")}
                </ul>
            </div>
  
            <div class="description">
                <p>${this._description}</p>
            </div>
    
            <div class="icon">
                <span id="description-${this._idSpanBack}" class="material-symbols-outlined">arrow_circle_left</span>
            </div>
        </section>
        `;
  }
}

window.customElements.define("back-card", BackCard);
