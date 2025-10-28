import { LitElement, html, css } from "lit";

export class BBVAInput extends LitElement {
    static properties = {
        label: { type: String },
        type: { type: String },
        value: { type: String },
        placeholder: { type: String },
        showPassword: { type: Boolean },
    };

    static styles = css`
        .input-container {
        margin-bottom: 16px;
        }
        label {
        display: block;
        font-size: 12px;
        color: #666;
        margin-bottom: 4px;
        }
        .input-wrapper {
        position: relative;
        }
        input {
        width: 100%;
        padding: 14px 40px 14px 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        transition: border-color 0.3s;
        }
        input:focus {
        outline: none;
        border-color: #1973b8;
        }
        .icon-button {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #1973b8;
        }
        .icon-button svg {
        width: 20px;
        height: 20px;
        stroke: currentColor;
        }
    `;

    constructor() {
        super();
        this.type = "text";
        this.value = "";
        this.showPassword = false;
    }

    _handleInput(e) {
        this.value = e.target.value;
        this.dispatchEvent(
        new CustomEvent("input-change", {
            detail: { value: this.value },
            bubbles: true,
            composed: true,
        })
        );
    }

    _togglePassword() {
        this.showPassword = !this.showPassword;
    }

    _eyeIcon() {
        return html`
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <rect width="24" height="24" fill="none" />
            <path
              fill="currentColor"
              d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
            />
          </svg>
        `;
    }

    _eyeOffIcon() {
        return html`
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <rect width="24" height="24" fill="none" />
            <path
              fill="currentColor"
              d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"
            />
          </svg>
        `;
    }

    render() {
        const inputType =
        this.type === "password" && !this.showPassword ? "password" : "text";

        return html`
        <div class="input-container">
            ${this.label ? html`<label>${this.label}</label>` : ""}
            <div class="input-wrapper">
            <input
                type="${inputType}"
                .value="${this.value}"
                placeholder="${this.placeholder || ""}"
                @input="${this._handleInput}"
            />
            ${this.type === "password"
                ? html`
                    <button
                    class="icon-button"
                    type="button"
                    @click="${this._togglePassword}"
                    title="${this.showPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"}"
                    >
                    ${this.showPassword ? this._eyeOffIcon() : this._eyeIcon()}
                    </button>
                `
                : ""}
            </div>
        </div>
        `;
    }
}

customElements.define("bbva-input", BBVAInput);
