import { css, html, LitElement } from "lit";

export class SignupSection extends LitElement {
  static properties = {

  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .signup-box {
      background: linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%);
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      height: 100%;
    }

    .signup-box h2 {
      font-size: 28px;
      margin-bottom: 15px;
    }

    .signup-box p {
      margin-bottom: 30px;
      font-size: 15px;
      opacity: 0.9;
    }

    .btn-signup {
      background-color: white;
      color: #1E40AF;
      padding: 14px 40px;
      border: none;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-signup:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 20px rgba(255, 255, 255, 0.3);
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <section class="signup-box">
        <img src="assets/icons/bbva_card.svg" alt="Ícono de tarjeta BBVA">
        <h2>¿Todavía no eres cliente de BBVA?</h2>
        <p>Inicia tu camino con nosotros abriendo una cuenta</p>
        <div class="btn-signup">Abrir cuenta</div>
      </section>
    `;
  }
}