import { loginFormSubmitListener } from "./listeners.js";

export class LoginPage extends HTMLElement {
  static template = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    await this.loadTemplate();
    this.render();
    
    this.setupListeners();
  }

  async loadTemplate() {
    if (!LoginPage.template) {
      const response = await fetch('./pages/login/login.html');
      const template = document.createElement('template');
      
      template.innerHTML = await response.text();
      LoginPage.template = template.content;
    }
  }

  render() {
    this.shadowRoot.appendChild(LoginPage.template.cloneNode(true));
  }

  setupListeners() {
    const form = this.shadowRoot.querySelector('#loginForm');
    if (form) {
      form.addEventListener('submit', loginFormSubmitListener)
    }
  }
}