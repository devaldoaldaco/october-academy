import { css, html, LitElement } from "lit";

export class Toaster extends LitElement {
  static properties = {
    status: {
      type: String,
    },
  };

  static styles = css`
    :host {
      position: fixed;
      top: 0;
      right: 0;
    }
    .error {
      background-color: red;
    }
    .success {
      background-color: green;
    }
    .warning {
      background-color: yellow;
    }
    .info {
      background-color: #2f79d1;
    }
    .toast-container {
      width: 150px;
      height: 100px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
    }
  `;

  constructor() {
    super();
    this.status = "success";
  }

  render() {
    return html`<div class="toast-container ${this.status}">
      <p>${this.status}</p>
    </div> `;
  }
}
