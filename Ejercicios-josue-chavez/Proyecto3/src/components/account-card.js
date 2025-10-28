import { LitElement, html, css } from "lit";

export class AccountCard extends LitElement {
    static properties = {
        account: { type: Object },
    };

    static styles = css`
        .account-card {
        background: white;
        border-radius: 8px;
        padding: 20px;
        margin: 16px 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: transform 0.2s;
        }
        .account-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        .account-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
        }
        .account-name {
        color: #1973b8;
        font-size: 18px;
        font-weight: 600;
        }
        .account-number {
        color: #666;
        font-size: 14px;
        margin-top: 4px;
        }
        .balances {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        }
        .balance-item {
        flex: 1;
        }
        .balance-label {
        font-size: 12px;
        color: #666;
        margin-bottom: 4px;
        }
        .balance-amount {
        font-size: 20px;
        font-weight: 600;
        color: #333;
        }
        .detail-link {
        color: #1973b8;
        text-align: center;
        padding: 12px;
        cursor: pointer;
        font-weight: 600;
        margin-top: 12px;
        display: block;
        text-decoration: none;
        }
    `;

    _handleClick() {
        this.dispatchEvent(
        new CustomEvent("account-select", {
            detail: { account: this.account },
            bubbles: true,
            composed: true,
        })
        );
    }

    render() {
        if (!this.account) return html``;

        return html`
        <div class="account-card" @click="${this._handleClick}">
            <div class="account-header">
            <div>
                <div class="account-name">${this.account.name}</div>
                <div class="account-number">-${this.account.accountNumber}</div>
            </div>
            </div>
            <div class="balances">
            <div class="balance-item">
                <div class="balance-label">Saldo disponible</div>
                <div class="balance-amount">
                S/ ${this.account.availableBalance.toFixed(2)}
                </div>
            </div>
            <div class="balance-item">
                <div class="balance-label">Saldo contable</div>
                <div class="balance-amount">
                S/ ${this.account.accountingBalance.toFixed(2)}
                </div>
            </div>
            </div>
            <a class="detail-link">Detalle de cuenta</a>
        </div>
        `;
    }
}

customElements.define("account-card", AccountCard);