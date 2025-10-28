import { css, html, LitElement } from "lit";

import { Router } from "../../router";

export class DashboardPage extends LitElement {
  static properties = {
    user: {
      type: Object,
      state: true
    }
  }

  static styles = css`

  `;

  constructor() {
    super();
    this.user = { };
  }

  async connectedCallback() {
    super.connectedCallback();

    const access = localStorage.getItem('access');
    
    if (!access) {
      Router.navigate('login');
      throw new Error('Acceso no autorizado');
    }
    
    const { userId, token } = JSON.parse(access);
    
    if (!userId || !token) {
      Router.navigate('login');
      throw new Error('Acceso no autorizado');  
    }

    const params = new URLSearchParams({ id: userId })

    const response = await fetch(`http://localhost:3000/users?${ params }`);

    if (!response.ok) {
      Router.navigate('login');
      throw new Error('Error en el servidor');  
    }

    const user = (await response.json())[0];

    delete user.password;

    if (!user) {
      Router.navigate('login');
      throw new Error('Acceso no autorizado');
    }

    this.user = user;
  }

  render() {
    return html`
      <dashboard-header .user=${ this.user }></dashboard-header>
      <dashboard-main .user=${ this.user }></dashboard-main>
    `;
  }
}