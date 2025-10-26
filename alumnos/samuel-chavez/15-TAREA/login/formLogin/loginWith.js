import { LitElement, css, html } from "lit";
class LoginWith extends LitElement {
  static properties = {
    logo: {type: String},
    name: {type: String},
  };

  constructor() {
    super();
    this.logo = "";
    this.name = "";
  }

  static styles = css`   
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
        button img{
            width:1.5rem;
        }
        button span{  
            font-weight: 700;
        }
  `;

  render() {
    return html`
        <button>
           <img src="${this.logo}" alt="">
            Login with <span>${this.name}</span>
        </button>
      `;
  }
}

customElements.define("login-with", LoginWith);
