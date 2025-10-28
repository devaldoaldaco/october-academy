import { css, html, LitElement } from "lit";

import { Router } from "../../../router";

export class DashboardHeader extends LitElement {
  static properties = {
    user: {
      type: Object,
      state: true
    },
    backButton: {
      type: Boolean
    },
    previousRoute: {
      type: String
    }
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    header {
      background-color: #0f1419;
      padding: 15px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .back-button {
      color: #00d4ff;
      text-decoration: none;
      font-size: 24px;
      transition: transform 0.3s;
    }

    .back-button:hover {
      transform: translateX(-5px);
    }

    .logo {
      color: #00d4ff;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 2px;
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .user-name {
      color: #a0a0b0;
      font-size: 14px;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
  `;

  constructor() {
    super();
    this.user = { };
    this.backButton = false;
  }

  render() {
    return html`
      <header>
        <div class="header-left">
          ${
            this.backButton 
              ? html`<a href="#" class="back-button" @click=${ this.navigateToPreviousRoute }>←</a>` 
              : html``
          }
          <div class="logo">
            <img src="assets/icons/bbva_logo_white.svg" alt="Logo de BBVA con letras blancas">
          </div>
        </div>
        <div class="user-menu">
          <span class="user-name">Hola, ${ this.user.name }</span>
          <div class="user-avatar">
            ${ this.user.name?.charAt(0) ?? '' }${ this.user.lastname?.charAt(0) ?? '' }
          </div>
        </div>
      </header>
    `;
  }

  navigateToPreviousRoute() {
    if (this.backButton) Router.navigate(this.previousRoute ?? 'login');
  }
}