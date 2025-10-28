import { css, html, LitElement } from "lit";

export class LoginMain extends LitElement {
  static properties = {

  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    main {
      display: flex;
      max-width: 1200px;
      margin: 50px auto;
      gap: 40px;
      padding: 0 20px;
    }

    login-section,
    signup-section {
      flex: 1;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <main>
        <login-section></login-section>
        <signup-section></signup-section>
      </main>
    `;
  }
}