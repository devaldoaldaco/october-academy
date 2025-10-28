import { LitElement, html, css } from "lit";
import { MOCK_DATA } from "../data/mock-data.js";
import "../components/base/bbva-button.js";
import "../components/base/bbva-input.js";
import "../components/base/bbva-select.js";
import "../components/base/bbva-header.js";

export class LoginPage extends LitElement {
  static properties = {
    documentType: { type: String },
    documentNumber: { type: String },
    password: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
    }
    .login-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 40px 20px;
    }
    @media (max-width: 768px) {
      .login-container {
        grid-template-columns: 1fr;
      }
      .promo-section {
        display: none;
      }
    }
    .login-section {
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #052c5c;
      font-size: 32px;
      margin-bottom: 8px;
    }
    .subtitle {
      color: #666;
      margin-bottom: 32px;
    }
    .checkbox-container {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 16px 0;
    }
    .forgot-password {
      color: #052c5c;
      font-size: 14px;
      margin: 16px 0;
      display: block;
      text-decoration: none;
    }
    .button-group {
      display: flex;
      gap: 12px;
      margin-top: 24px;
    }
    .promo-section {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .promo-card {
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .promo-title {
      font-size: 24px;
      color: #052c5c;
      margin: 20px 0;
    }
    .promo-subtitle {
      color: #666;
      margin-bottom: 20px;
    }
    .promo-image {
      width: 200px;
      height: 120px;
      background: #e3f2fd;
      margin: 0 auto 20px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
    }
    .footer {
      background: #052c5c;
      color: white;
      padding: 40px 20px;
      margin-top: 60px;
    }
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
    }
    .footer-links {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
  `;

  constructor() {
    super();
    this.documentType = "DNI";
    this.documentNumber = "";
    this.password = "";
  }

  _handleLogin(e) {
    e.preventDefault();

    if (
      this.documentNumber === MOCK_DATA.user.documentNumber &&
      this.password === MOCK_DATA.user.password
    ) {
      this.dispatchEvent(
        new CustomEvent("login-success", {
          detail: { user: MOCK_DATA.user },
          bubbles: true,
          composed: true,
        })
      );
    } else {
      alert("Credenciales incorrectas. Usa: DNI: 12345678, Password: demo123");
    }
  }

  render() {
    return html`
      <bbva-header></bbva-header>

      <div class="login-container">
        <div class="login-section">
          <h1>¡Hola!</h1>
          <p class="subtitle">
            Completa tus datos y disfruta de tu Banca por Internet
          </p>

          <form>
            <bbva-select
              label="Tipo de documento"
              .value="${this.documentType}"
              .options="${[
                { value: "DNI", label: "DNI" },
                { value: "CE", label: "Carnet de Extranjería" },
                { value: "PASAPORTE", label: "Pasaporte" },
              ]}"
              @select-change="${(e) => (this.documentType = e.detail.value)}"
            ></bbva-select>

            <bbva-input
              label="Número de documento"
              .value="${this.documentNumber}"
              placeholder="Ingresa tu documento"
              @input-change="${(e) => (this.documentNumber = e.detail.value)}"
            ></bbva-input>

            <div class="checkbox-container">
              <input type="checkbox" id="remember" />
              <label for="remember">Recordar documento</label>
            </div>

            <bbva-input
              label="Contraseña de Banca por Internet"
              type="password"
              .value="${this.password}"
              placeholder="Ingresa tu contraseña"
              @input-change="${(e) => (this.password = e.detail.value)}"
            ></bbva-input>

            <a href="#" class="forgot-password"
              >¿Olvidaste o bloqueaste tu contraseña?</a
            >

            <div class="button-group">
              <bbva-button
                type="submit"
                variant="primary"
                @click="${this._handleLogin}"
                >Ingresar</bbva-button
              >
              <bbva-button type="button" variant="secondary"
                >Afiliate</bbva-button
              >
            </div>
          </form>
        </div>

        <div class="promo-section">
          <div class="promo-card">
            <div class="promo-image">💳</div>
            <h2 class="promo-title">¿Todavía no eres cliente de BBVA?</h2>
            <p class="promo-subtitle">
              Inicia tu camino con nosotros abriendo una cuenta.
            </p>
            <bbva-button variant="primary">Abrir cuenta</bbva-button>
          </div>
        </div>
      </div>

      <div class="footer">
        <div class="footer-content">
          <div class="footer-links">
            <span>Llámanos (01) 595-0000</span>
            <span>Banco BBVA Perú - RUC 2010013020</span>
            <span>Av. República de Panamá 3055, San Isidro</span>
          </div>
          <p>© Banco Bilbao Vizcaya Argentaria S. A.</p>
        </div>
      </div>
    `;
  }
}

customElements.define("login-page", LoginPage);