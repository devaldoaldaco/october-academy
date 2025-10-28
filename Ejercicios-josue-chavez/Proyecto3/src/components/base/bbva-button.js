import { LitElement, html, css } from "lit";

export class BBVAButton extends LitElement {
    static properties = {
        variant: { type: String },
        type: { type: String },
    };

    static styles = css`
        button {
        padding: 14px 28px;
        border-radius: 4px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        border: none;
        transition: all 0.3s;
        width: 100%;
        }
        .primary {
        background: #052c5c;
        color: white;
        }
        .primary:hover {
        background: #043a75;
        }
        .secondary {
        background: white;
        color: #052c5c;
        border: 1px solid #052c5c;
        }
        .secondary:hover {
        background: #f4f4f4;
        }
    `;

    constructor() {
        super();
        this.variant = "primary";
        this.type = "button";
    }

    _handleClick(e) {
        this.dispatchEvent(
        new CustomEvent("button-click", {
            bubbles: true,
            composed: true,
        })
        );
    }

    render() {
        return html`
        <button
            class="${this.variant}"
            type="${this.type}"
            @click="${this._handleClick}"
        >
            <slot></slot>
        </button>
        `;
    }
}

customElements.define("bbva-button", BBVAButton);