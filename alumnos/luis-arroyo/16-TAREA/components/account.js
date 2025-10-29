import { html, css, LitElement } from "lit";
import { Router } from "../router";
export class AccountComponent extends LitElement {
  static properties = {
    accountName: {
      type: String,
    },
    transactions: {
      type: Array,
    },
    balance: { type: Number },
  };
  constructor() {
    super();
  }
  static styles = css`
    .accounts {
      background-color: white;
      padding: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      & span:nth-of-type(1) {
        display: flex;
        justify-content: space-between;
        color: gray;
        font-size: 1rem;
      }
    }
    .account-container {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
    }
    .account-info {
      display: flex;
      flex-direction: column;
      & p:nth-of-type(1) {
        color: var(--blue-text);
      }
      & p:nth-of-type(2) {
        color: black;
      }
    }
    .account-balance {
      color: black;
      display: flex;
      flex-direction: column;
      align-items: end;
    }
  `;

  _showDetails() {
    setTimeout(() => Router.navigate("details"), 2000);
  }

  render() {
    return html`<div class="accounts">
      <span>
        <span>Cuentas</span>
        <span>S/ 20.77</span>
      </span>
      <div class="account-container" @click=${this._showDetails}>
        <div class="account-info">
          <p>Cuenta digital BBVA</p>
          <p>.9265</p>
        </div>
        <div class="account-balance">
          <p>S/ 20.77</p>
          <p>Saldo disponible</p>
        </div>
      </div>
    </div> `;
  }
}
