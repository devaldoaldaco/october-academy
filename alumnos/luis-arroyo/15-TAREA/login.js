class Login extends HTMLElement {
  static VALID_USER = "admin";
  static VALID_PASS = "admin";

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._isAuthenticated = false;
    this._handleLogin = this._handleLogin.bind(this);
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
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
                }
                h3 {
                    text-align: center;
                    color: #333;
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
                }
                .success { color: green; }
                .error { color: red; }
            </style>
            
            <div class="login-container">
                <h3>Acceso al Sistema</h3>
                
                <input type="text" id="username" placeholder="Usuario">
                <input type="password" id="password" placeholder="Contraseña">
                
                <div id="message" class="message"></div>
                
                <button id="login-button">Iniciar Sesión</button>
            </div>
        `;

    this.shadowRoot
      .getElementById("login-button")
      .addEventListener("click", this._handleLogin);
  }

  connectedCallback() {
    if (!this.shadowRoot.hasChildNodes()) {
      this.render();
    }
  }

  _handleLogin() {
    const usernameInput = this.shadowRoot.getElementById("username");
    const passwordInput = this.shadowRoot.getElementById("password");
    const messageDisplay = this.shadowRoot.getElementById("message");

    const user = usernameInput.value.trim();
    const pass = passwordInput.value;

    messageDisplay.textContent = "";
    messageDisplay.className = "message";

    if (user === Login.VALID_USER && pass === Login.VALID_PASS) {
      messageDisplay.textContent = "¡Acceso concedido!";
      messageDisplay.classList.add("success");
      this._isAuthenticated = true;

      this.dispatchEvent(
        new CustomEvent("loginSuccess", {
          detail: { user },
          bubbles: true,
          composed: true,
        })
      );
    } else {
      messageDisplay.textContent = "Usuario o contraseña incorrectos.";
      messageDisplay.classList.add("error");
      this._isAuthenticated = false;
    }
  }
}

customElements.define("login-view", Login);
