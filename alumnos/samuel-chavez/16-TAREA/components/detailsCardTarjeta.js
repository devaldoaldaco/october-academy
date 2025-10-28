import { LitElement, html, css } from "lit";
export class DetailsTarget extends LitElement {
  static properties = {
    productDetails: { type: Object },
  };
  static styles = css`
    :host {
      background-image: url("https://www.bbva.pe/content/dam/public-web/peru/photos/marquees/marquee-TCPHmarquee-light.im1628635275113im.jpg?imwidth=768");
      border-radius: 20px;
      padding: 40px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
      max-width: 1200px;
      margin: 100px 20px;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(128, 108, 241, 0.3);
    }

    ul {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      gap: 20px;
      background-color: #663399;
      color: white;
      padding: 20px;
      border-radius: 10px;
    }

    li {
      list-style: none;
      cursor: pointer;
    }

    .hero-content {
      background-color: rgb(255, 255, 255);
      border-radius: 16px;
      padding: 50px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
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
  `;

  constructor() {
    super();
    this.productDetails = {};
  }

  render() {
    return html`
      <div class="hero-content">
        <h1 class="hero-title">${this.productDetails.resumen.lineaMaxima}</h1>
        <p class="hero-subtitle">${this.productDetails.resumen.tasaInteres}</p>
        <ul class="hero-btn">
          ${this.productDetails.resumen.tipoTarjeta.map((t) => {
            return html`<li>${t}</li>`;
          })}
        </ul>
      </div>
    `;
  }
}

window.customElements.define("details-target", DetailsTarget);
