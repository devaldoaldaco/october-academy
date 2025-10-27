import { LitElement, html, css } from "lit";

export class LoginView extends LitElement {
  static properties = {
    _isAuthenticated: { state: true },
    _message: { state: true },
    _messageClass: { state: true },
  };

  static VALID_USER = "admin";
  static VALID_PASS = "admin";

  constructor() {
    super();
    this._isAuthenticated = false;
    this._message = "";
    this._messageClass = "message";
  }

  static styles = css`
    .login-container {
      display: flex;
      flex-direction: column;
      gap: 15px;
      padding: 20px;
      width: 300px;
      border: 1px solid #ccc;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      background-color: #f9f9f9;
      margin: 50px auto; 
    }
    h3 {
      text-align: center;
      color: #333;
      margin: 0 0 10px;
    }
    input {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    button:hover {
      background-color: #0056b3;
    }
    .message {
      text-align: center;
      font-weight: bold;
      padding: 5px;
      min-height: 20px;
    }
    .success {
      color: green;
    }
    .error {
      color: red;
    }
  `;

  render() {
    return html`
      <div class="login-container">
        <h3>Acceso al Sistema</h3>

        <input type="text" id="username" placeholder="Usuario" />
        <input type="password" id="password" placeholder="Contraseña" />

        <div id="message" class="${this._messageClass}">${this._message}</div>

        <button @click=${this._handleLogin}>Iniciar Sesión</button>
      </div>
    `;
  }

  _handleLogin() {
    const usernameInput = this.shadowRoot.querySelector("#username");
    const passwordInput = this.shadowRoot.querySelector("#password");

    const user = usernameInput.value.trim();
    const pass = passwordInput.value;

    this._message = "";
    this._messageClass = "message";

    if (user === LoginView.VALID_USER && pass === LoginView.VALID_PASS) {
      this._message = "¡Acceso concedido!";
      this._messageClass = "message success";
      this._isAuthenticated = true;
      this.dispatchEvent(
        new CustomEvent("loginSuccess", {
          detail: { user },
          bubbles: true,
          composed: true,
        })
      );
    } else {
      this._message = "Usuario o contraseña incorrectos.";
      this._messageClass = "message error";
      this._isAuthenticated = false;
    }

  }
}

customElements.define("login-view", LoginView);
