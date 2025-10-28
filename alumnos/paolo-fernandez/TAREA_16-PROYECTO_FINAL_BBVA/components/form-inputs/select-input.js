import { css, html, LitElement } from "lit";
import { emitInputChange } from "../../events/input-change";

export class SelectInput extends LitElement {
  static properties = {
    id: {
      type: String
    },
    label: {
      type: String
    },
    options: {
      type: Array
    },
    value: {
      type: String
    }
  }

  static styles = css`
    label {
      display: block;
      color: #A0A0B0;
      font-size: 13px;
      margin-bottom: 8px;
    }

    select {
      width: 100%;
      padding: 14px;
      border: 1px solid #404050;
      border-radius: 10px;
      background-color: #252535;
      color: #FFFFFF;
      font-size: 14px;
      transition: all 0.3s;
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2300d4ff' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 14px center;
      padding-right: 40px;
    }

    select:focus {
      outline: none;
      border-color: #00D4FF;
      box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1);
    }
  `;

  constructor() {
    super();
    this.id = '';
    this.label = '';
    this.options = [{ value: '', label: 'Sin opciones para mostrar' }];
    this.value = '';
  }

  render() {
    return html`
      <label for="${ this.id }">${ this.label }</label>
      <select 
        id="${ this.id }"
        name="${ this.id }"
        .value=${ this.value }
        @change=${ this.handleOptionChange }
      >
        ${ this.options.map(option =>
          html`
            <option 
              value="${ option.value }"
              ?selected=${ option.value === this.value }
            >${ option.label }</option>
        `) }
      </select>
    `;
  }

  handleOptionChange(event) {
    const value = event.target.value;
    emitInputChange(this.id, value, this);
  }
}