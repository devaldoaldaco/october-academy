import { LitElement, html, css } from "lit";

export class BBVASelect extends LitElement {
    static properties = {
        label: { type: String },
        value: { type: String },
        options: { type: Array },
    };

    static styles = css`
        .select-container {
        margin-bottom: 16px;
        }
        label {
        display: block;
        font-size: 12px;
        color: #666;
        margin-bottom: 4px;
        }
        select {
        width: 100%;
        padding: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        background: white;
        cursor: pointer;
        }
        select:focus {
        outline: none;
        border-color: #1973b8;
        }
    `;

    constructor() {
        super();
        this.options = [];
        this.value = "";
    }

    _handleChange(e) {
        this.value = e.target.value;
        this.dispatchEvent(
        new CustomEvent("select-change", {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        })
        );
    }

    render() {
        return html`
        <div class="select-container">
            ${this.label ? html`<label>${this.label}</label>` : ""}
            <select .value="${this.value}" @change="${this._handleChange}">
            ${this.options.map(
                (opt) => html` <option value="${opt.value}">${opt.label}</option> `
            )}
            </select>
        </div>
        `;
    }
}

customElements.define("bbva-select", BBVASelect);