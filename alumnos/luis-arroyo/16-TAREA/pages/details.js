import { css, html, LitElement } from "lit";

import { Router } from "../../router.js";

export class DetailsPage extends LitElement {
  static properties = {
    transactions: {
      type: Array,
    },
  };
  constructor() {
    super();
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
    console.log(this.transactions);
  }
  static styles = css`
    .transaction-container {
      display: flex;
      justify-content: space-between;
    }
    .transactions {
      padding: 10px;
    }
    .transaction-detail {
      color: var(--blue-text);
    }
  `;

  render() {
    return html`
      <div class="transactions">
        <p>Ultimos movimientos</p>
        ${this.transactions.map((transaction) => {
          return html`
            <div class="transaction-container">
              <div class="transaction-detail">
                <p>${transaction.detail}</p>
              </div>
              <div class="transaction-amount">
                <p>S/ ${transaction.amount}</p>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  handleLoginFormSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;

    if (email !== "luisarroyo@gmail.com" || password !== "admin") {
      alert("Credenciales incorrectas");
      return;
    }

    sessionStorage.setItem("isLogged", true);
    sessionStorage.setItem(
      "personalInfo",
      JSON.stringify({
        name: "Luis",
        lastName: "Arroyo",
      })
    );
    setTimeout(() => Router.navigate("home"), 2000);
  };
}
