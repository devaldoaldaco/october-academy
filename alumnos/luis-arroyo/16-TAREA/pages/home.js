import { LitElement, css, html } from "lit";
const actions = [
  {
    name: "Transferir",
    icon: "/images/transferencia.png",
  },
  {
    name: "Plin",
    icon: "/images/plin.png",
  },
  { name: "T-cambio", icon: "/images/cambio.png" },
  { name: "Más", icon: "/images/mas.png" },
];

export class HomeComponent extends LitElement {
  static properties = {
    transactions: {
      type: Array,
    },
  };

  constructor() {
    super();
    let personalInfo = JSON.parse(sessionStorage.getItem("personalInfo"));
    this.userName = personalInfo.name;
    this.userLastName = personalInfo.lastName;
    this.fullName = `${this.userName} ${this.userLastName}`;
  }

  connectedCallback() {
    super.connectedCallback();
    this._loadTransactions();
  }
  async _loadTransactions() {
    try {
      const response = await fetch("./../transactions.json");
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      this.transactions = data.transactions;
    } catch (error) {
      console.error("Fallo al cargar mock-transactions.json:", error);
      return [];
    }
  }
  static styles = css`
    :host {
      box-sizing: border-box;
      display: flex;
      min-height: 100vh;
      padding: 20px;
      /* filter: grayscale(30%); */
      background: linear-gradient(135deg, transparent 50%, #f0f0f0 50%),
        linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
        url("/images/bg2.jpeg");
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .home-container {
      width: 100%;
      color: var(--white-text);
      display: flex;
      flex-direction: column;
      gap: 20px;
      & > span {
        display: block;
        text-align: center;
      }
    }
    .actions {
      display: flex;
      justify-content: space-between;
      text-align: center;
      & div img {
        width: 24px;
      }
    }
  `;

  render() {
    return html`
      <div class="home-container">
        <span>Hola, ${this.fullName}</span>
        <resume-component .transactions=${this.transactions}></resume-component>
        <div class="actions">
          ${actions.map((a) => {
            return html` <div>
                <img src=${a.icon}></img>
                <p>${a.name}</p>
            </div> `;
          })}
        </div>
        <account-component
          .transactions=${this.transactions}
        ></account-component>
        <tarjeta-component></tarjeta-component>
        <app-footer></app-footer>
      </div>
    `;
  }
}
