import { css, html, LitElement } from "lit";
import { Router } from "../router";

export class AppFooter extends LitElement {
  static properties = {
    selected: {
      type: Boolean,
    },
  };
  constructor() {
    super();
    this.selected = "inicio";
  }
  static styles = css`
    :host {
      background-color: #f8f8f8;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 15px 5px;
    }
    footer {
      display: flex;
      justify-content: space-around;
      & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        gap: 5px;
        & > div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          & > svg {
            fill: black;
            z-index: 2;
            cursor: pointer;
          }
        }
        & > p {
          line-height: 0;
          font-size: 0.8rem;
          color: black;
          z-index: 2;
        }

        & .selected > p {
          color: #023e78;
        }
      }
    }
    .selected::before {
      content: "";
      width: 38px;
      height: 38px;
      position: absolute;
      background-color: #023e78;
      border-radius: 50%;
    }
    .selected {
      & svg {
        fill: white;
      }
    }
  `;

  _handleSelected(event) {
    const nuevoElemento = event.currentTarget;
    // console.log(nuevoElemento);
    const contenedorPadre = nuevoElemento.closest(".footer");
    // console.log(contenedorPadre);
    const previoElemento = contenedorPadre.querySelector(".selected");
    // console.log(previoElemento);
    previoElemento.classList.remove("selected");

    const nuevoIcono = nuevoElemento.querySelector("div");
    const p = nuevoElemento.querySelector("p");
    nuevoIcono.classList.add("selected");
    this.selected = nuevoElemento.classList[0];

    setTimeout(() => Router.navigate(p.innerText), 2000);
    console.log(p.innerText);
  }
  render() {
    return html`
      <footer class="footer">
        <div class="home" @click=${this._handleSelected}>
          <div class="selected">
            <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 576 512"
            height="24px"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
            d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"
            ></path>
          </div>
          </svg>
          <p>Inicio</p>
        </div>
        <div class="opera" @click=${this._handleSelected}>
          <div>

            <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="24px"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
            d="m15 12 5-4-5-4v2.999H2v2h13zm7 3H9v-3l-5 4 5 4v-3h13z"
            ></path>
          </svg>
        </div>
          <p>Opera</p>
        </div>
        <div class="para mi" @click=${this._handleSelected}>
          <div>

            <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            height="24px"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
            ></path>
          </svg>
        </div>
          <p>Para mi</p>
        </div>
        <div class="notificaciones" @click=${this._handleSelected}>
          <div>

            <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            height="24px"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
            d="M424 80H88a56.06 56.06 0 0 0-56 56v240a56.06 56.06 0 0 0 56 56h336a56.06 56.06 0 0 0 56-56V136a56.06 56.06 0 0 0-56-56zm-14.18 92.63-144 112a16 16 0 0 1-19.64 0l-144-112a16 16 0 1 1 19.64-25.26L256 251.73l134.18-104.36a16 16 0 0 1 19.64 25.26z"
            ></path>
          </svg>
        </div>
          <p>Notificacio...</p>
        </div>
        <div class="contacto" @click=${this._handleSelected}>
          <div>
            
            <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="24px"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
            d="M22 3H2C.9 3 0 3.9 0 5v14c0 1.1.9 2 2 2h20c1.1 0 1.99-.9 1.99-2L24 5c0-1.1-.9-2-2-2zM9 8c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM2.08 19c1.38-2.39 3.96-4 6.92-4s5.54 1.61 6.92 4H2.08zm18.89-9.15-.75 1.3-1.47-.85V12h-1.5v-1.7l-1.47.85-.75-1.3L16.5 9l-1.47-.85.75-1.3 1.47.85V6h1.5v1.7l1.47-.85.75 1.3L19.5 9l1.47.85z"
            ></path>
          </svg>
        </div>
          <p>Contacto</p>
        </div>
      </footer>
    `;
  }
}
