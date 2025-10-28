import { LitElement, html, css } from "lit";

class LoginPage extends LitElement {
  static styles = css`
    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background-image: url("https://www.bbva.com/wp-content/uploads/2020/07/BBVA-premio-the-banker-innovacion-Europa-Latam-03082020.jpg");
      background-size: cover;
      background-position: center;
    }
    form {
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 500px;
      backdrop-filter: blur(10px);
    }

    h2 {
      text-align: center;
      color: #ffffffff;
    }

    input {
      padding: 0.6rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 1rem;
      outline: none;
    }
    button {
      padding: 0.8rem;
      background-color: #0056b8ff;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.3s;
    }
    button:hover {
      background-color: #003c81ff;
    }

    img{
      filter: brightness(0) invert(1);
      width: 200px;
      display: block;
      margin: 0 auto 1rem auto;
    }
  `;

  constructor() {
    super();
    this.username = "";
    this.password = "";
  }

  handleInput(e) {
    this[e.target.name] = e.target.value;
  }

  handleSubmit(e) {
    e.preventDefault();
    const validUser = "OscarYalico";
    const validPass = "123456";

    if (
      this.username.trim().toLowerCase() === validUser.trim().toLowerCase() &&
      this.password === validPass
    ) {
      // * Este evento viaja hacia arriba (gracias a bubbles: true, composed: true) y llega al app-root
      this.dispatchEvent(
        new CustomEvent("login", {
          detail: { username: this.username },
          bubbles: true,
          composed: true,
        })
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Error de autenticación",
        text: "Usuario o contraseña incorrectos. Inténtalo de nuevo.",
      });
    }
  }

  render() {
    return html`
      <div class="container">
        <form @submit=${this.handleSubmit}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/BBVA_2019.svg/2560px-BBVA_2019.svg.png"
          />
          <h2>Iniciar Sesión</h2>
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            @input=${this.handleInput}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            @input=${this.handleInput}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    `;
  }
}

customElements.define("login-page", LoginPage);
