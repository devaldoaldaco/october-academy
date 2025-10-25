class UserField extends HTMLElement {
  constructor() {
    super();
    this.type = "";
    this.label = "";
    this.placeholder = "";
    this.idInput = "";
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }

  static observedAttributes = ["type", "label", "placeholder", "idInput"];

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    this.render();
  }

  get value() {
    return this.shadow.querySelector("input").value.trim();
  }

  render() {
    this.shadow.innerHTML = `
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
      label {
          display: flex;
          flex-direction:column;
          font-family: 'Roboto', sans-serif;
          font-size:12px;
          color: #333;
          margin: 0 auto;
          width: 80%;
      }

      input[type="text"],
      input[type="email"],
      input[type="password"] {
          margin-top:5px;
          padding: 12px 16px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          font-size:12px;
          transition: border-color 0.3s;
      }
      </style>

      <label for="${this.idInput}" class="">
         <span> ${this.label} </span>
         <input type="${this.type}" name="${this.idInput}" id="${this.idInput}" placeholder="${this.placeholder}">
      </label>
    `;
  }
}
window.customElements.define("user-field", UserField);
