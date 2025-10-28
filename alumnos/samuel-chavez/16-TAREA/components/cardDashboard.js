import { LitElement, html, css } from "lit";
export class CardDashboard extends LitElement {
  static properties = {
    product: { type: Object },
  };

  static styles = css`
    .card {
      width: 300px;
      height: 90%;
      background: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      border-radius: 15px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      transition: 0.3s;
      font-family: "Segoe UI", sans-serif;
      margin: 20px auto;
      padding: 20px 10px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
    }
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }

    .info {
      display: flex;
      min-height: 240px;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }

    .info .info-top {
      display: flex;
      flex-direction: column;
      margin-left: 10px;
    }

    h2 {
      font-size: 20px;
      font-weight: 700;
      margin: 0;
      color: #042e5c;
      font-weight: 800;
    }

    .description {
      font-size: 14px;
      margin: 5px 0;
      color: #042e5c;
      line-height: 1.4;
    }

    img {
      width: 40%;
    }

    .bottom {
      display: flex;
      width: 80%;
      flex-direction: column;
      gap: 20px;
    }
    .btn-first,
    .btn-second {
      padding: 14px 24px;
      border: none;
      border-radius: 4px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
      transition: all 0.3s ease;
    }

    .btn-first {
      color: white;
      background: #0052cc;
    }

    .btn-second {
      color: #042e5c;
      background: rgb(219, 220, 221);
    }

    .btn-first:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 102, 255, 0.3);
    }
    .btn-second:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(7, 7, 7, 0.3);
    }
  `;

  constructor() {
    super();
    this.product = [];
  }

  render() {
    return html` <div class="card">
      <img src="${this.product.imagen}" alt="Premium Laptop" />
      <div class="info">
        <div class="info-top">
          <h2 class="title">${this.product.nombre}</h2>
          <p class="description">${this.product.descripcion}</p>
        </div>
        <div class="bottom">
          ${this.product.nombre === "BBVA T-Cambio"
            ? html`<button class="btn-first"><span>Cotiza Aquí</span></button> `
            : html`<button class="btn-first"><span>Pidela Aquí</span></button>`}
          <button class="btn-second">
            <span @click=${this._redirectPage}>Conoce más</span>
          </button>
        </div>
      </div>
    </div>`;
  }

  _redirectPage(e) {
    e.preventDefault();
    const options = {
      detail: {
        page: "details",
        userId: this.product.id,
      },
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("navigate", options));
  }
}
window.customElements.define("dashboard-card", CardDashboard);
