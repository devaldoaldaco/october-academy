import { html, LitElement } from "lit";

export class AppRoot extends LitElement {
  render() {
    return html`
      <app-router></app-router>
    `;
  }
}