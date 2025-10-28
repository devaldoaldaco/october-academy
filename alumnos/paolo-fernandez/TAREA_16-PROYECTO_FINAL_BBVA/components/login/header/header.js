import { css, html, LitElement } from "lit";

export class LoginHeader extends LitElement {
  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    header {
      background-color: #0F1419;
      padding: 20px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    }

    .logo {
      color: #00D4FF;
      font-size: 32px;
      font-weight: bold;
      letter-spacing: 2px;
    }

    .link {
      color: #00D4FF;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s;
    }

    .link:hover {
      color: #00A8CC;
    }
  `;

  render() {
    return html`
      <header>
        <div class="logo">
          <img src="assets/icons/bbva_logo_white.svg" alt="Logo de BBVA con letras blancas">
        </div>
        <a href="#" class="link">Ir a BBVA Perú</a>
      </header>
    `;
  }
}