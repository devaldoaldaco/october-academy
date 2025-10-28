import { LitElement, html, css } from "lit";
export class Toast extends LitElement {
  static properties = {
    
  };

  static styles = css`
    .hero-section {
      background: linear-gradient(135deg, #7b68ee 0%, #9b88ee 100%);
      border-radius: 20px;
      padding: 60px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      position: relative;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(123, 104, 238, 0.3);
    }

    .hero-content {
      background: white;
      border-radius: 16px;
      padding: 50px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }
  `;

  constructor() {
    super();
    this.color = "";
  }

  render() {
    return html`
      <div class="hero-content">
        <h1 class="hero-title">
          ¡Obtén tu Tarjeta de Crédito con CERO costo de membresía!
        </h1>
        <p class="hero-subtitle">En 3 minutos y sin papeleos.</p>
        <button class="hero-btn">Obtén tu tarjeta aquí</button>
      </div>
    `;
  }
}

window.customElements.define("view-toast", Toast);
