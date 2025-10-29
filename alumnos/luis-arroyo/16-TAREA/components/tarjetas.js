import { html, css, LitElement } from "lit";
import { Router } from "../router";
export class TarjetaComponent extends LitElement {
  static properties = {};
  constructor() {
    super();
  }
  static styles = css`
    .tarjetas {
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
    .tarjeta-container {
      display: flex;
      /* justify-content: space-between; */
      line-height: 0;
      cursor: pointer;
    }
    .tarjeta-info {
      display: flex;
      flex-direction: column;
      & p:nth-of-type(1) {
        color: var(--blue-text);
      }
      & p:nth-of-type(2) {
        font-size: 2rem;
      }

      & p:nth-of-type(3) {
        color: black;
      }
    }
    .tarjeta-balance {
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
    return html`<div class="tarjetas">
      <span>
        <span>Tarjetas</span>
      </span>
      <div class="tarjeta-container" @click=${this._showDetails}>
        <div class="tarjeta-info">
          <p>Visa Compras</p>
          <p>💳</p>
          <p>.9265</p>
        </div>
      </div>
    </div> `;
  }
}
