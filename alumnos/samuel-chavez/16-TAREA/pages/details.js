import { LitElement, html, css } from "lit";
import "../components/details-target";
import "../components/details-acount";
import { productosBBVA } from "../productsBBVA";
export class Details extends LitElement {
  static properties = {
    idProduct: { type: Number },
    _data: { type: Array },
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `;

  constructor() {
    super();
    this.idProduct = 0;
    this._data = productosBBVA;
  }

  render() {
    return html` ${this.idProduct === 1
      ? html`<details-acount
          target
          .productDetails=${this._data[this.idProduct - 1]}
        ></details-acount>`
      : this.idProduct === 2
      ? html`<details-target
          target
          .productDetails=${this._data[this.idProduct - 1]}
        ></details-target>`
      : null}`;
  }
}

window.customElements.define("view-details", Details);
