import { LitElement, html, css } from "lit";
import "../components/card-dashboard";
import "../components/navigation";
import { productosBBVA } from "../productsBBVA";
export class Dashboard extends LitElement {
  static properties = {
    _data: { type: Array },
    messageProducts: { type: String },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-top: 110px;
      align-items: center;
      justify-content: center;
    }

    .message-products {
      background-color: white;
      border-radius: 5px;
      width: 80%;
      font-size: 2.25rem;
      color: #042e5c;
      font-weight: 600;
      line-height: 1.2;
      text-align: center;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.03);
    }
    .cards {
      display: flex;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      width: 80%;
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
      background-color: #14549c;
      font-size: 1rem;
      font-weight: 700;
      color: white;
      transition: background-color 200ms ease-in-out;
      border: none;
    }

    #load:hover {
      background-color: #042e5c;
    }

    #load:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `;

  constructor() {
    super();
    this._data = productosBBVA;
    this.messageProducts = "";
  }

  render() {
    return html`
      ${this.messageProducts
        ? html`<div class="message-products">
            <p>${this.messageProducts}</p>
          </div>`
        : null}
      <section class="cards">
        ${this._data.map((array) => {
          return html`<card-dashboard .product=${array}></card-dashboard>`;
        })}
      </section>
    `;
  }
}

window.customElements.define("view-dashboard", Dashboard);
