class LoginBtn extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
        <style>

          div{
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
        </style>
  
        <div> 
        <button>
          Iniciar Sesión
        </button>
        </div> 
      `;

      const btn = this.shadow.querySelector("button");
      console.log(btn);
      btn.addEventListener("click", () => {
        this.dispatchEvent(
          new CustomEvent("login-event", {
            bubbles: true,
            composed: true,
          })
        );
      });
  }
}

window.customElements.define("login-btn", LoginBtn);
