import { LitElement, html, css } from "lit";

export class BBVAHeader extends LitElement {
    static properties = {
        title: { type: String },
        showBack: { type: Boolean },
    };

    static styles = css`
        header {
        background: #052c5c;
        color: white;
        padding: 16px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        }
        .header-left {
        display: flex;
        align-items: center;
        gap: 16px;
        }
        .back-button {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        }
        .title {
        font-size: 18px;
        font-weight: 600;
        }
        .logo {
        font-size: 24px;
        font-weight: bold;
        }
    `;

    _handleBack() {
        this.dispatchEvent(
        new CustomEvent("back-click", {
            bubbles: true,
            composed: true,
        })
        );
    }

    render() {
        return html`
        <header>
            <div class="header-left">
            ${this.showBack
                ? html`
                    <button class="back-button" @click="${this._handleBack}">
                    ←
                    </button>
                `
                : ""}
            ${this.title
                ? html` <div class="title">${this.title}</div> `
                : html` <div class="logo">BBVA</div> `}
            </div>
        </header>
        `;
    }
}

customElements.define("bbva-header", BBVAHeader);