import { LitElement, css, html } from "lit";
import { routes } from "./../../../routes";
import "./loginBtn";
import "./loginWith";
import "./userFields";
export class FormLoginPokemon extends LitElement {
  static properties = {};

  static styles = css`
    :host {
      flex: 1;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin: 40px 0;
      justify-content: space-around;
      padding: 0 40px;
    }

    form h1 {
      line-height: 1;
      text-align: center;
      margin-bottom: 20px;
    }
    form span {
      font-size: small;
      font-weight: 300;
      color: gray;
    }
    form .form-footer {
      display: flex;
      flex-direction: row;
      margin-top: 10px;
      gap: 20px;
    }
    hr {
      border-top: 1px solid #ccc;
      margin: 0px 0;
    }
  `;

  constructor() {
    super();
    this.userData = {};
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("valuefield", (e) => {
      const { key, value } = e.detail;
      this.userData = { ...this.userData, [key]: value };
    });

    this.addEventListener("pokemonlogin", (e) => {
      this.validateAllFields();
    });
  }

  render() {
    return html` <form action="../index.html">
      <section class="form-header">
        <h1>EMPECEMOS LA BUSQUEDA!</h1>
        <span>Por favor registra tu cuenta a continuación</span>
      </section>
      <user-field
        typeInput="email"
        label="Email"
        placeholder="Ejm:chavezzsam@gmail.com"
        infoInput="emailUser"
      ></user-field>
      <user-field
        typeInput="password"
        label="Contraseña"
        placeholder="Max. 8 carácteres"
        infoInput="passwordUser"
      ></user-field>
      <login-btn></login-btn>
      <hr />
      <section class="form-footer">
        <login-with logo="src/google.png" name="GOOGLE"></login-with>
        <login-with logo="src/apple.png" name="APPLE"></login-with>
      </section>
    </form>`;
  }

  validateAllFields() {
    this.userData = {};
    const fields = this.renderRoot.querySelectorAll("user-field");

    fields.forEach((f) => {
      const validateEvent = new CustomEvent("validate-field", {
        bubbles: true,
        composed: true,
      });
      f.dispatchEvent(validateEvent);
    });

    this.Validate();
  }

  Validate() {
    const { emailUser, passwordUser } = this.userData;

    if (!emailUser?.trim() || !passwordUser?.trim()) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailUser)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (passwordUser.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    const userDefault = {
      email: "chavezzsam@gmail.com",
      password: "12345678",
    };

    if (
      emailUser === userDefault.email &&
      passwordUser === userDefault.password
    ) {
      window.location.href = routes.HOME;
    } else {
      alert(" El usuario o contraseña son incorrectos");
    }
  }
}

customElements.define("form-login", FormLoginPokemon);
