import { ROUTES } from "../../routes.js";

export class AppRouter extends HTMLElement {
  constructor() {
    super();
    this.currentView = 'login';
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (localStorage.getItem('isLogged')) this.currentView = 'pokedex';

    this.render();

    window.addEventListener('navigate', (e) => {
      this.currentView = e.detail.view;
      this.render();
    });
  }

  render() {
    this.shadowRoot.innerHTML = '';

    const componentName = ROUTES[this.currentView] ?? 'login';
    const component = document.createElement(componentName);

    this.shadowRoot.appendChild(component);
  }
}