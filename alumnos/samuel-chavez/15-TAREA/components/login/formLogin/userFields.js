import { LitElement, css, html } from "lit";
class UserField extends LitElement {
  static properties = {
    typeInput: { type: String },
    label: { type: String },
    placeholder: { type: String },
    infoInput: { type: String },
  };

  static styles = css`
    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");
    label {
      display: flex;
      flex-direction: column;
      font-family: "Roboto", sans-serif;
      font-size: 12px;
      color: #333;
      margin: 0 auto;
      width: 80%;
    }

    input[type="email"],
    input[type="password"] {
      margin-top: 5px;
      padding: 12px 16px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
      font-size: 12px;
      transition: border-color 0.3s;
    }
  `;

  constructor() {
    super();
    this.typeInput = "";
    this.label = "";
    this.placeholder = "";
    this.infoInput = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("validate-field", this.sendValueFields);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("validate-field", this.sendValueFields);
  }

  render() {
    return html`
      <label for="${this.infoInput}" class="">
        <span> ${this.label} </span>
        <input
          @pokemonlogin=${this.sendValueFields}
          type="${this.typeInput}"
          name="${this.infoInput}"
          id="${this.infoInput}"
          placeholder="${this.placeholder}"
        />
      </label>
    `;
  }

  sendValueFields() {
    const input = this.renderRoot.querySelector(`#${this.infoInput}`);
    const valor = input.value;
    const options = {
      detail: { key: this.infoInput, value: valor },
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent("valuefield", options));
  }
}
window.customElements.define("user-field", UserField);
