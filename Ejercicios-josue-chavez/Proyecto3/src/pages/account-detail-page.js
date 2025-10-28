import { LitElement, html, css } from "lit";
import "../components/base/bbva-header.js";
import "../components/transaction-item.js";

export class AccountDetailPage extends LitElement {
  static properties = {
    account: { type: Object },
    transactions: { type: Array },
  };

  static styles = css`
    :host {
      display: block;
      background: #f4f4f4;
      min-height: 100vh;
    }
    .account-detail-header {
      background: white;
      padding: 20px;
    }
    .account-title {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      text-align: center;
      margin-bottom: 20px;
    }
    .balances-grid {
      display: flex;
      justify-content: space-around;
      gap: 20px;
      padding: 20px 0;
    }
    .balance-item {
      text-align: center;
      flex: 1;
    }
    .balance-label {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
    }
    .balance-amount {
      font-size: 28px;
      font-weight: 600;
      color: #333;
    }
    .account-number {
      text-align: center;
      color: #666;
      font-size: 14px;
      margin-top: 12px;
    }
    .detail-link-container {
      text-align: center;
      margin-top: 16px;
    }
    .detail-link {
      color: #1973b8;
      text-decoration: none;
      font-weight: 600;
      cursor: pointer;
    }
    .apartados-section {
      background: white;
      margin: 20px;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
    }
    .apartados-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }
    .apartados-text {
      color: #666;
      margin-bottom: 16px;
    }
    .apartados-link {
      color: #1973b8;
      font-weight: 600;
      cursor: pointer;
    }
    .actions-bar {
      display: flex;
      justify-content: space-around;
      padding: 16px 20px;
      background: #052c5c;
    }
    .action-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      background: none;
      border: none;
      cursor: pointer;
      color: white;
    }
    .action-icon {
      font-size: 24px;
    }
    .action-text {
      font-size: 12px;
    }
    .transactions-section {
      background: white;
      margin: 20px;
      padding: 20px;
      border-radius: 8px;
    }
    .section-header {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 20px;
      text-transform: uppercase;
    }
  `;

  _handleBack() {
    this.dispatchEvent(
      new CustomEvent("navigate", {
        detail: { view: "dashboard" },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    if (!this.account) return html``;

    return html`
      <bbva-header
        title="Cuentas"
        ?showBack="${true}"
        @back-click="${this._handleBack}"
      ></bbva-header>

      <div class="account-detail-header">
        <div class="account-title">${this.account.name}</div>

        <div class="balances-grid">
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

        <div class="account-number">-${this.account.accountNumber}</div>

        <div class="detail-link-container">
          <a class="detail-link">Detalle de cuenta</a>
        </div>
      </div>

      <div class="apartados-section">
        <div class="apartados-icon">📦</div>
        <div class="apartados-text">
          Con Apartados organiza y controla tu dinero
        </div>
        <a class="apartados-link">Ir a Apartados</a>
      </div>

      <div class="actions-bar">
        <button class="action-btn">
          <div class="action-icon">↔️</div>
          <div class="action-text">Transferir</div>
        </button>
        <button class="action-btn">
          <div class="action-icon">💳</div>
          <div class="action-text">Pagar servicio</div>
        </button>
        <button class="action-btn">
          <div class="action-icon">📱</div>
          <div class="action-text">PLIN</div>
        </button>
        <button class="action-btn">
          <div class="action-icon">⋯</div>
          <div class="action-text">Ver más</div>
        </button>
      </div>

      <div class="transactions-section">
        <div class="section-header">Últimos movimientos</div>
        ${this.transactions?.map(
          (transaction) => html`
            <transaction-item .transaction="${transaction}"></transaction-item>
          `
        )}
      </div>

      <div style="height: 20px;"></div>
    `;
  }
}

customElements.define("account-detail-page", AccountDetailPage);