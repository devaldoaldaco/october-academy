import { css, html, LitElement } from "lit";

import { emitInputChange } from "../../events/input-change";

export class CheckboxInput extends LitElement {
  static properties = {
    id: {
      type: String
    },
    label: {
      type: String
    },
    value: {
      type: Boolean
    }
  }

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    input {
      width: 20px;
      height: 20px;
      cursor: pointer;
      accent-color: #00D4FF;
    }

    label {
      margin: 0;
      cursor: pointer;
      color: #FFFFFF;
    }
  `;

  constructor() {
    super();
    this.id = '';
    this.label = '';
    this.value = false;
  }

  render() {
    return html`
      <input 
        id="${ this.id }" 
        name="${ this.id }" 
        type="checkbox"
        ?checked=${ this.value }
        @change=${ this.handleCheckboxChange }
      >
      <label for="${ this.id }">${ this.label }</label>
    `;
  }

  handleCheckboxChange(event) {
    const value = event.target.checked;
    emitInputChange(this.id, value, this);
  }
}