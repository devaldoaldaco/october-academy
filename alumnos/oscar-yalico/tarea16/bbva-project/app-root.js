import { LitElement, html, css } from 'lit';
import './login-page.js';
import './dashboard-page.js';

class AppRoot extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  static properties = {
    loggedIn: { type: Boolean },
    user: { type: String },
  };

  constructor() {
    super();
    this.loggedIn = false;
    this.user = '';
  }

  handleLogin(e) {
    this.loggedIn = true;
    this.user = e.detail.username;
  }

  handleLogout() {
    this.loggedIn = false;
    this.user = '';
  }

  render() {
    return html`
      ${this.loggedIn
        ? html`<dashboard-page
            .user=${this.user}
            @logout=${this.handleLogout}
          ></dashboard-page>`
        : html`<login-page @login=${this.handleLogin}></login-page>`}
    `;
  }
}

customElements.define('app-root', AppRoot);
