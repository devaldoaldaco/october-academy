import { LitElement, html, css } from "lit";
export class DetailsAcount extends LitElement {
  static properties = {
    productDetails: { type: Object },
  };
  static styles = css`
    :host {
      display: block;
      border-radius: 20px;
      padding: 40px;
      gap: 60px;
      align-items: center;
      max-width: 1200px;
      margin: 100px 20px;
    }

    ul {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      gap: 20px;
      background-color: #042e5c;
      color: white;
      padding: 15px 40px;
      border-radius: 10px;
    }

    .hero-content {
      display: flex;
      flex-direction: row;
      gap: 40px;
      height: fit-content;
      background-color: rgb(255, 255, 255);
      border-radius: 16px;
      padding: 50px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }

    .content-left {
      flex: 1;
    }

    .hero-title {
      font-size: 42px;
      font-weight: 700;
      color: #042e5c;
      line-height: 1.2;
      margin-bottom: 20px;
    }

    .hero-subtitle {
      font-size: 16px;
      color: #666;
      margin-bottom: 30px;
      line-height: 1.5;
    }

    .content-right {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 500px;
    }
    .content-right img {
      object-fit: cover;
      border-radius: 20px;
      height: 350px;
    }
  `;

  constructor() {
    super();
    this.productDetails = {};
  }

  render() {
    return html`
      <div class="hero-content">
        <div class="content-left">
          <h1 class="hero-title">
            ${this.productDetails.banner.textoPromocional}
          </h1>
          <p class="hero-subtitle">
            ${this.productDetails.banner.descripcionBanner}
          </p>
          <ul class="hero-btn">
            ${this.productDetails.beneficios.map((t) => {
              return html`<li>${t}</li>`;
            })}
          </ul>
        </div>
        <div class="content-right">
          <img src="./assets/Ahorro.webp" alt="Cuenta de Ahorro" />
        </div>
      </div>
    `;
  }
}

window.customElements.define("details-acount", DetailsAcount);
