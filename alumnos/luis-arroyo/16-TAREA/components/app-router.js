import { css, html, LitElement } from "lit";
import { ROUTES } from "../routes";
export class AppRouter extends LitElement {
  static properties = {
    currentView: {
      type: String,
    },
  };

  constructor() {
    super();
    this.currentView = "login";
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("navigate", (e) => {
      this.currentView = e.detail.view;
    });
  }

  render() {
    const view = ROUTES[this.currentView] ?? ROUTES["login"];
    return html`${view}`;
  }
}
