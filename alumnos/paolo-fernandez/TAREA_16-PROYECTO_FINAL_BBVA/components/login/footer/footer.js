import { css, html, LitElement } from "lit";

export class LoginFooter extends LitElement {
  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    footer {
      background-color: #0f1419;
      padding: 30px 40px;
      color: #a0a0b0;
      text-align: center;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 30px;
    }

    .footer-content > div:first-of-type {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .footer-content > div:first-of-type > img {
      width: 108px;
      height: 32px;
    }

    .footer-info {
      font-size: 13px;
    }

    .social-icons {
      display: flex;
      gap: 15px;
    }

    .social-icon {
      width: 24px;
      height: 24px;

      &:hover {
        transform: scale(1.2);
      }
    }
  `;

  render() {
    return html`
      <footer>
        <div class="footer-content">
          <div>
            <img src="assets/icons/bbva_logo_white.svg" alt="Logo de BBVA con letras blancas">
            <div class="footer-info">
              Llámanos (01) 595-0000 | Banco BBVA Perú - RUC 20100130204 | Av. República de Panamá 3055, San Isidro
            </div>
          </div>


          <div class="social-icons">
            <a href="#" class="social-icon">
              <img src="assets/icons/facebook.svg" alt="Ícono de Facebook">
            </a>
            <a href="#" class="social-icon">
              <img src="assets/icons/x.svg" alt="Ícono de X (antes Twitter)">
            </a>
            <a href="#" class="social-icon">
              <img src="assets/icons/instagram.svg" alt="Ícono de Instagram">
            </a>
            <a href="#" class="social-icon">
              <img src="assets/icons/linkedin.svg" alt="Ícono de LinkedIn">
            </a>
            <a href="#" class="social-icon">
              <img src="assets/icons/youtube.svg" alt="Ícono de YouTube">
            </a>
          </div>
        </div>
      </footer>
    `;
  }
}