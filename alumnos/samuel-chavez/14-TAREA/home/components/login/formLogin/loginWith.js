class LoginWith extends HTMLElement {
  constructor() {
    super();
    this.logo = "";
    this.name = "";
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }

  static observedAttributes = ["logo", "name"];

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
        button {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            font-family: 'Roboto', sans-serif;
            gap: 7px;
            height: 100%;
            padding: 10px 10px;
            background: white;
            border: 1px solid #dadce0;
            border-radius: 6px;
            color: #3c4043;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        button:hover {
            background: #f8f9fa;
            border-color: #d2d4d8;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        img{
            width:1.5rem;
            object-fit: contain;
        }
        span{  
            font-weight: 700;
        }
        </style>
  
        <button>
           <img src="${this.logo}" alt="">
            Login with <span>${this.name}</span>
        </button>
      `;
  }
}

window.customElements.define("login-with", LoginWith);
