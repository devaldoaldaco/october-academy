import { css, html, LitElement } from "lit";

import { Router } from "../../router.js";

export class LoginPage extends LitElement {
  static properties = {
    // toasterStatus: {
    //   type: String,
    // },
  };

  constructor() {
    super();
    let isLogged = sessionStorage.getItem("isLogged");
    if (isLogged) {
      Router.navigate("home");
    }
  }

  static styles = css`
    :host {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
      background-image: url("./images/bg.jpg");
    }

    .login-container {
      width: 100%;
      max-width: 420px;
      background: var(--white-bg);
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }

    .login-header {
      text-align: center;
      margin-bottom: 35px;
    }

    .login-header h1 {
      font-size: 2.5rem;
      color: var(--blue-text);
      margin-bottom: 10px;
    }

    .login-header p {
      color: var(--blue-text);
      font-size: 0.95rem;
    }

    .form-group {
      margin-bottom: 25px;
    }

    .form-label {
      display: block;
      color: var(--blue-text);
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .form-input {
      width: 100%;
      padding: 14px 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      color: var(--blue-text);
      font-size: 1rem;
      transition: all 0.3s ease;
      outline: none;
    }

    .form-input:focus {
      background: rgba(255, 255, 255, 0.08);
      border-color: var(--blue-bg);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .form-input::placeholder {
      color: #64748b;
    }

    .login-button {
      width: 100%;
      padding: 15px;
      border: none;
      border-radius: 10px;
      background: var(--blue-bg);
      color: var(--white-text);
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
    }
  `;

  render() {
    return html`
      <div class="login-container">
        <div class="login-header">
          <h1>BBVA</h1>
        </div>
        <form id="loginForm" @submit=${this.handleLoginFormSubmit}>
          <div class="form-group">
            <label class="form-label" for="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              class="form-input"
              placeholder="ejemplo@email.com"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              class="form-input"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" class="login-button">Ingresar</button>
        </form>
      </div>
    `;
  }

  handleLoginFormSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;

    if (email !== "luisarroyo@gmail.com" || password !== "admin") {
      alert("Credenciales incorrectas");
      return;
    }

    sessionStorage.setItem("isLogged", true);
    sessionStorage.setItem(
      "personalInfo",
      JSON.stringify({
        name: "Luis",
        lastName: "Arroyo",
      })
    );
    setTimeout(() => Router.navigate("home"), 2000);
  };
}
