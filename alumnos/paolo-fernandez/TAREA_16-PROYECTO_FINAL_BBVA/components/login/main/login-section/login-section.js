import { css, html, LitElement } from "lit";

export class LoginSection extends LitElement {
  static properties = {

  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .login-box {
      background: rgba(30, 30, 45, 0.9);
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    h1 {
      color: #FFFFFF;
      font-size: 32px;
      margin-bottom: 10px;
    }

    .subtitle {
      color: #A0A0B0;
      margin-bottom: 30px;
      font-size: 14px;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <section class="login-box">
        <h1>Hola</h1>

        <p class="subtitle">
          Completa tus datos y disfruta de tu Banca por Internet
        </p>

        <login-form></login-form>
      </section>
    `;
  }
}