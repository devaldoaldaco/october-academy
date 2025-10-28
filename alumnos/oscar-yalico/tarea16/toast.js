import { LitElement, html, css } from "lit";

export class MyToast extends LitElement {
  static properties = {
    message: { type: String, reflect: true },
    icon: { type: String, reflect: true },
    type: { type: String, reflect: true },
    visible: { type: Boolean, reflect: true },
    duration: { type: Number },
  };

  constructor() {
    super();
    this.message = "";
    this.type = "info";
    this.visible = false;
    this.duration = 3000;
  }

  static styles = css`
    :host {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      display: block;
    }

    .toast {
      min-width: 220px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }

    .toast.success {
      background: #28a745;
    }

    .toast.error {
      background: #dc3545;
    }

    .toast.info {
      background: #007bff;
    }
  `;

  render() {
    return html`
      <div class="toast ${this.type} ${this.visible ? "show" : ""}">
        <span>
          ${this.icon}</span
        >
        <span>${this.message}</span>
      </div>
    `;
  }

  show(message, type = "info") {
    this.message = message;
    this.type = type;
    switch (type) {
        case "success":
            this.icon = "✔️";
            break;
        case "error":
            this.icon = "❌";
            break;
        case "info":
            this.icon = "ℹ️";
            break;
        default:
            this.icon = "";
    }
    this.visible = true;

    clearTimeout(this._timeout);
    this._timeout = setTimeout(() => {
      this.visible = false;
    }, this.duration);
  }
}

customElements.define("my-toast", MyToast);
