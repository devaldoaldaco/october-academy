import { LitElement, css, html } from "lit";
class LoginBtn extends LitElement {
  static properties = {};

  static styles = css`
        :host{
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        button {
            border: none;
            margin: 0 auto;
            color: white;
            background-color: #e74c3c;
            padding: 10px;
            justify-content: center;
            border-radius: 7px;
            cursor: pointer;
            width: 40%;
            transition: background-color 0.25s ease;
        }

        button:hover {
            background-color: #c0392b;
        }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
          <button @click=${this.listenLogin}>
            Iniciar Sesión
          </button>
      `;
  }

  listenLogin(){
    const options = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('pokemonlogin', options));
  }

}

customElements.define("login-btn", LoginBtn);
