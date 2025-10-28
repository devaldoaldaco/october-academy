import { LitElement, html, css } from "lit";
import "../pages/login";
import "../pages/dashboard";
import "../pages/details";
export class AppRoot extends LitElement {
  static properties = {
    _page: { type: String, state: true },
  };

  static styles = css`
    main {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
  `;
  constructor() {
    super();
    this._page = "dashboard";
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("navigate", this.assignEventDetail.bind(this));
  }

  assignEventDetail(e) {
    this._page = e.detail;
  }

  render() {
    return html` <main>${this.renderPage()}</main> `;
  }

  renderPage() {
    console.log("details en renderPage es", this._page);
    switch (this._page) {
      case "login":
        return html`<view-login></view-login>`;
      case "dashboard":
        return html`<view-dashboard messageProducts="Conoce los productos que puedes contratar online"></view-dashboard>`;
      case "details":
        return html`<view-details idProduct = ""></view-details>`;
      default:
        return html`<view-login></view-login>`;
    }
  }
}

window.customElements.define("view-app", AppRoot);
