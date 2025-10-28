import { css, html, LitElement } from "lit";

import { emitInputChange } from "../../events/input-change";

export class PasswordInput extends LitElement {
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
    isPasswordVisible: {
      type: Boolean,
      state: true
    }
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :host {
      position: relative;
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

    img {
      position: absolute;
      width: 24px;
      height: 24px;
      right: 10px;
      top: 50%;
      transform: translateY(25%);
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.id = '';
    this.label = '';
    this.placeholder = '';
    this.isPasswordVisible = false;
  }

  render() {
    return html`
      <label for="${ this.id }">Contraseña de Banca por Internet</label>
      <input 
        id="${ this.id }" 
        name="${ this.id }" 
        type="${ this.isPasswordVisible ? 'text' : 'password' }" 
        placeholder="Ingresa tu contraseña"
        @input=${ this.handleInputChange }
      >
      <img 
        src="./assets/icons/${ this.isPasswordVisible ? 'eye' : 'eye_slash' }.svg" 
        class="eye-icon" @click=${ this.togglePasswordVisiblity } 
      />
    `;
  }

  togglePasswordVisiblity() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  handleInputChange(event) {
    const value = event.target.value;
    emitInputChange(this.id, value, this);
  }
}