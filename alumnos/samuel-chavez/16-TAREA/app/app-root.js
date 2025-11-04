import { LitElement, html, css } from "lit";
import "../pages/login";
import "../pages/dashboard";
import "../pages/details";
export class AppRoot extends LitElement {
  static properties = {
    _page: { type: Object, state: true },
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
    this._page = { routeName: "dashboard" };
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("navigate", this.assignEventDetail.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener("navigate", this.assignEventDetail.bind(this));
    super.disconnectedCallback();
  }

  assignEventDetail(e) {
    this._page = e.detail;
  }

  render() {
    return html`
      ${this._page.routeName === "dashboard" || this._page.routeName === "details"
        ? html`<dashboard-nav></dashboard-nav>`
        : null}
      <main>${this.renderPage()}</main>
    `;
  }

  renderPage() {
    switch (this._page.routeName) {
      case "login":
        return html`<view-login></view-login>`;
      case "dashboard":
        return html`<view-dashboard
          messageProducts="Conoce los productos que puedes contratar online"
        ></view-dashboard>`;
      case "details":
        return html`<view-details
          idProduct="${this._page.productId}"
        ></view-details>`;
      default:
        return html`<view-login></view-login>`;
    }
  }
}

window.customElements.define("app-root", AppRoot);
