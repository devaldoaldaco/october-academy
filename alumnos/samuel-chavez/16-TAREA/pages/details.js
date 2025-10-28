import { LitElement, html, css } from "lit";
export class Details extends LitElement {
  static properties = {
    infoDetails:{type:Object},
  };

  static styles = css`
    
  `;

  constructor() {
    super();
    this.infoDetails={};
  }

  render() {
    return html`
      
    `;
  }
}

window.customElements.define("view-details", Details);
