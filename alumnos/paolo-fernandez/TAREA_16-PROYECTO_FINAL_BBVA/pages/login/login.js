import { css, html, LitElement } from "lit";

export class LoginPage extends LitElement {
  static properties = {

  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :host {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    login-header {
      height: 85px;
    }

    login-main {
      flex: 1;
    }

    login-footer {
      height: 130px;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <login-header></login-header>
      <login-main></login-main>
      <login-footer></login-footer>
    `;
  }
}