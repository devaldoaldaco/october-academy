import { LitElement, html, css } from "lit";
export class Nav extends LitElement {
  static properties = {};

  static styles = css`
    :host {
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      box-sizing: borer-box;d
    }

    .navbar {
        position: fixed;
        top: 0;
        left: 0;                
        width: 100%;            
        z-index: 10;    
    }

    .nav-container {
     padding: 0 30px;
     margin: 20px;
     border-radius:15px;
     background-color: white;
     box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
     display: flex;
     justify-content: space-around;
     align-items: center;
     height: 70px;
    }

    img {
      width: 30%;
    }
    
    .nav-links {
      display: flex;
      list-style: none;
      gap: 30px;
      align-items: center;
    }

    .nav-links a {
      text-decoration: none;
      color:rgb(61, 110, 189);
      font-weight: 500;
      font-size: 15px;
      transition: color 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nav-links a:hover {
      color: #042E5C;
    }

    .nav-links .card-icon {
      width: 20px;
      height: 14px;
      border: 2px solid currentColor;
      border-radius: 3px;
    }

    .nav-right {
      display: flex;
      flex-direction: row;
      gap:30px;
    }

    .nav-right .nav-buttons {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap:5px;
    }

    .btn-nav {
      display:flex;
      justify-content: center;
      align-items: center;
      height: 80%;
      padding: 0 20px;
      background:rgb(61, 110, 189);
      color: white;
      border-radius: 5px;
      padding-bottom: 2px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-nav:hover {
      background: #003d7a;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 71, 187, 0.3);
    }

    .icon-btn {
      background: none;
      border: none;
      cursor: pointer;
    }

    .nav-info-user{
      display:flex;
      align-items:center;
      flex-direction:row-reverse;
      gap:10px;
    }

    .nav-info-user svg,p{
      cursor:pointer;
    }
    .nav-info-user .log{
      display:flex;
      font-weight: 600;
      font-size: 15px;
      cursor:pointer;
      background-color:rgb(255, 255, 255);
      color:rgb(61, 110, 189);
      border-radius:30px;
      justify-content:center;
      align-items:center;
      border: 2px solid #003d7a;
      padding:10px;
      transition: background-color 0.3s ease;
    }

    .nav-info-user .log:hover{
      color: white;
      background-color:rgb(61, 110, 189);
    }

  `;

  constructor() {
    super();
  }

  _isLoggedIn() {
    const session = JSON.parse(localStorage.getItem("userCredentials")) || null;
    if (session !== null) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return html`
      <header>
        <nav class="navbar">
          <div class="nav-container">
            <a href="#" class="logo" @click=${this._redirectHome}
              ><img
                src="https://www.bbva.pe/content/dam/library/logos/logo-bbva.svg"
                alt="logo-bbva"
            /></a>

            <div class="nav-right">
              <ul class="nav-links">
                <li><a href="#">Productos</a></li>
                <li><a href="#">Empresas</a></li>
              </ul>

              <div class="nav-buttons">
                <a href="#" class="btn-nav">Banca por Internet</a>
                <button class="icon-btn" aria-label="Buscar">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 48 48"
                  >
                    <g
                      fill="none"
                      stroke="#0047bb"
                      stroke-linejoin="round"
                      stroke-width="4"
                    >
                      <path
                        d="M21 38c9.389 0 17-7.611 17-17S30.389 4 21 4S4 11.611 4 21s7.611 17 17 17Z"
                      />
                      <path
                        stroke-linecap="round"
                        d="M26.657 14.343A7.98 7.98 0 0 0 21 12a7.98 7.98 0 0 0-5.657 2.343m17.879 18.879l8.485 8.485"
                      />
                    </g>
                  </svg>
                </button>
              </div>
            </div>
            <div class="nav-info-user">
              ${this._isLoggedIn()
                ? html` <button class="log" @click=${this._logOut}>
                      Cerrar sesion
                    </button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#042e5c"
                        d="M16 10c0 2.21-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4s4 1.79 4 4"
                      />
                      <path
                        fill="#042e5c"
                        fill-rule="evenodd"
                        d="M12 24c6.63 0 12-5.37 12-12S18.63 0 12 0S0 5.37 0 12s5.37 12 12 12m6.27-2.96C21.13 19.05 23 15.75 23 12c0-6.08-4.92-11-11-11S1 5.92 1 12c0 3.75 1.87 7.05 4.73 9.04C6.435 19.72 8.71 16 12 16s5.56 3.72 6.27 5.04"
                        clip-rule="evenodd"
                      />
                    </svg>`
                : html`<button @click=${() => this._logOut(true)} class="log">
                    Iniciar Sesion
                  </button>`}
            </div>
          </div>
        </nav>
      </header>
    `;
  }

  _logOut(isclearStorage) {
    if (isclearStorage) {
      localStorage.clear();
    }

    const options = {
      detail: { routeName: "login" },
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("navigate", options));
  }

  _redirectHome() {
    const options = {
      detail: { routeName: "dashboard" },
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("navigate", options));
  }
}
window.customElements.define("dashboard-nav", Nav);
