export class AppRoot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }
  
  render() {
    this.shadowRoot.innerHTML = `<app-router></app-router>`;
  }
}