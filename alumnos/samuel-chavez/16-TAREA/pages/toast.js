import { LitElement, html, css } from "lit";
export class Toast extends LitElement {
  static properties = {
    color: { type: String, reflect: true },
    contentToast: { type: String },
  };

  static styles = css`
    div {
      padding: 10px;
      border-radius: 10px;
    }
  `;

  constructor() {
    super();
    this.color = "";
    this.contentToast = "";
  }


  //filra icons segun texto que regrese
  render() {
    return html`
      <div style="background-color: ${this.color}">
        <span>Sign In</span>
        <p>Enter your credentials to continue</p>
      </div>
    `;
  }
}

window.customElements.define("view-toast", Toast);
