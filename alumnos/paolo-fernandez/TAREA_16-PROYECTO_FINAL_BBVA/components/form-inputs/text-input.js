import { css, html, LitElement } from "lit";

import { emitInputChange } from "../../events/input-change";

export class TextInput extends LitElement {
  static properties = {
    id: {
      type: String
    },
    label: {
      type: String
    },
    placeholder: {
      type: String
    },
    value: {
      type: String
    }
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    label {
      display: block;
      color: #A0A0B0;
      font-size: 13px;
      margin-bottom: 8px;
    }

    input {
      width: 100%;
      padding: 14px;
      border: 1px solid #404050;
      border-radius: 10px;
      background-color: #252535;
      color: #FFFFFF;
      font-size: 14px;
      transition: all 0.3s;
    }

    input:focus {
      outline: none;
      border-color: #00D4FF;
      box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
    }
  `;

  constructor() {
    super();
    this.id = '';
    this.label = '';
    this.placeholder = '';
    this.value = '';
  }

  render() {
    return html`
      <label for=${ this.id }>${ this.label }</label>
      <input 
        id="${ this.id }"
        name="${ this.id }" 
        placeholder="${ this.placeholder }"
        type="text"
        .value=${ this.value }
        @input=${ this.handleInputChange }
      >
    `;
  }

  handleInputChange(event) {
    const value = event.target.value;
    emitInputChange(this.id, value, this);
  }
}