import { LitElement, html, css } from "lit";

export class TransactionItem extends LitElement {
    static properties = {
        transaction: { type: Object },
    };

    static styles = css`
        .transaction {
        padding: 16px 0;
        border-bottom: 1px solid #e0e0e0;
        }
        .transaction-date {
        font-size: 14px;
        font-style: italic;
        color: #666;
        margin-bottom: 8px;
        }
        .transaction-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        }
        .transaction-description {
        color: #1973b8;
        font-size: 14px;
        }
        .transaction-amount {
        font-size: 18px;
        font-weight: 600;
        }
        .negative {
        color: #333;
        }
        .positive {
        color: #5cb65c;
        }
    `;

    _formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-PE", {
        day: "numeric",
        month: "long",
        year: "numeric",
        });
    }

    render() {
        if (!this.transaction) return html``;

        const isNegative = this.transaction.amount < 0;

        return html`
        <div class="transaction">
            <div class="transaction-date">
            ${this._formatDate(this.transaction.date)}
            </div>
            <div class="transaction-content">
            <div class="transaction-description">
                ${this.transaction.description}
            </div>
            <div
                class="transaction-amount ${isNegative ? "negative" : "positive"}"
            >
                S/ ${this.transaction.amount.toFixed(2)}
            </div>
            </div>
        </div>
        `;
    }
}

customElements.define("transaction-item", TransactionItem);