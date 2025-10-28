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
     justify-content: space-between;
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
      gap:5px;
    }

    .btn-primary {
      background:rgb(61, 110, 189);
      color: white;
      padding: 12px ;
      border-radius: 5px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-primary:hover {
      background: #003d7a;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 71, 187, 0.3);
    }

    .icon-btn {
      background: none;
      border: none;
      cursor: pointer;
    }

    /* Contenido de ejemplo */
    .content {
      max-width: 1200px;
      margin: 40px auto;
      padding: 0 20px;
    }

    .content h1 {
      color: #333;
      margin-bottom: 20px;
    }

    .content p {
      color: #666;
      line-height: 1.6;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <header>
        <nav class="navbar">
          <div class="nav-container">
            <a href="#" class="logo"
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
                <a href="#" class="btn-primary">Banca por Internet</a>
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
          </div>
        </nav>
      </header>
    `;
  }
}

window.customElements.define("dashboard-nav", Nav);
