import { html, LitElement } from "lit";

import { ROUTES } from "../../routes";

export class AppRouter extends LitElement {
  static properties = {
    currentView: {
      type: String
    }
  }

  constructor() {
    super();
    this.currentView = 'login';
  }

  async connectedCallback() {
    super.connectedCallback();

    const access = localStorage.getItem('access');

    window.addEventListener('navigate', (event) => {
      this.currentView = event.detail.view;
    });

    if (!access) return;

    const { userId, token } = JSON.parse(access);

    const params = new URLSearchParams({
      userId,
      token
    })
    const response = await fetch(`http://localhost:3000/tokens?${ params }`);

    if (!response.ok) {
      throw new Error('Error en el servidor');
    }
    
    const dbToken = await response.json();
    
    if (!dbToken || dbToken.length === 0) {
      throw new Error('Acceso no autorizado');
    }

    this.currentView = 'dashboard';
  }

  render() {
    const view = ROUTES[this.currentView] ?? ROUTES['login'];

    return html`${ view }`;
  }
}