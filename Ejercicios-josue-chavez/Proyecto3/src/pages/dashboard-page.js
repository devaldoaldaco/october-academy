import { LitElement, html, css } from "lit";
import "../components/base/bbva-header.js";
import "../components/account-card.js";

export class DashboardPage extends LitElement {
  static properties = {
    user: { type: Object },
    accounts: { type: Array },
    cards: { type: Array },
    summary: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
      background: #f4f4f4;
      min-height: 100vh;
    }
    .dashboard-header {
      background: linear-gradient(135deg, #052c5c 0%, #1973b8 100%);
      color: white;
      padding: 20px;
    }
    .user-greeting {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .greeting-text h2 {
      font-size: 24px;
      margin-bottom: 4px;
    }
    .user-avatar {
      width: 60px;
      height: 60px;
      background: #5dade2;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
    }
    .change-user {
      color: white;
      font-size: 14px;
      margin-top: 4px;
      cursor: pointer;
      text-decoration: underline;
    }
    .summary {
      display: flex;
      gap: 20px;
      margin-top: 20px;
    }
    .summary-item {
      flex: 1;
    }
    .summary-label {
      font-size: 14px;
      opacity: 0.9;
    }
    .summary-amount {
      font-size: 24px;
      font-weight: 600;
      margin-top: 4px;
    }
    .expenses {
      background: rgba(255, 255, 255, 0.1);
      padding: 10px;
      border-radius: 4px;
      margin-top: 4px;
    }
    .expense-bar {
      height: 4px;
      background: #5dade2;
      border-radius: 2px;
      margin-top: 8px;
    }
    .actions {
      display: flex;
      justify-content: space-around;
      padding: 20px;
      background: white;
      margin: 0 20px;
      border-radius: 8px;
      margin-top: -20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .action-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 10px;
    }
    .action-icon {
      width: 40px;
      height: 40px;
      background: #f4f4f4;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
    .action-label {
      font-size: 12px;
      color: #666;
    }
    .content {
      padding: 20px;
    }
    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #666;
      margin-bottom: 16px;
      text-transform: uppercase;
    }
    .cards-container {
      background: white;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .card-item {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .card-visual {
      width: 80px;
      height: 50px;
      background: linear-gradient(135deg, #052c5c 0%, #1973b8 100%);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      font-weight: bold;
    }
    .card-info {
      flex: 1;
    }
    .card-name {
      font-weight: 600;
      color: #1973b8;
    }
    .card-number {
      color: #666;
      font-size: 14px;
      margin-top: 4px;
    }
  `;

  _handleAccountSelect(e) {
    this.dispatchEvent(
      new CustomEvent("navigate", {
        detail: { view: "account-detail", data: e.detail.account },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`
      <bbva-header></bbva-header>

      <div class="dashboard-header">
        <div class="user-greeting">
          <div class="greeting-text">
            <h2>Hola ${this.user?.name || ""}</h2>
            <a class="change-user">Cambiar usuario</a>
          </div>
          <div class="user-avatar">${this.user?.initials || ""}</div>
        </div>

        <div class="summary">
          <div class="summary-item">
            <div class="summary-label">Ingresos</div>
            <div class="summary-amount">
              S/ ${this.summary?.income.toFixed(2)}
            </div>
          </div>
          <div class="summary-item">
            <div class="summary-label">Gastos</div>
            <div class="expenses">
              <div class="summary-amount">
                S/ ${this.summary?.expenses.toFixed(2)}
              </div>
              <div class="expense-bar"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="actions">
        <button class="action-button">
          <div class="action-icon">↔️</div>
          <div class="action-label">Transferir</div>
        </button>
        <button class="action-button">
          <div class="action-icon">📱</div>
          <div class="action-label">PLIN</div>
        </button>
        <button class="action-button">
          <div class="action-icon">💱</div>
          <div class="action-label">T-Cambio</div>
        </button>
        <button class="action-button">
          <div class="action-icon">⋯</div>
          <div class="action-label">Más</div>
        </button>
      </div>

      <div class="content">
        <h3 class="section-title">Cuentas</h3>
        ${this.accounts?.map(
          (account) => html`
            <account-card
              .account="${account}"
              @account-select="${this._handleAccountSelect}"
            ></account-card>
          `
        )}
        ${this.cards?.length > 0
          ? html`
              <h3 class="section-title">Tarjetas</h3>
              <div class="cards-container">
                ${this.cards.map(
                  (card) => html`
                    <div class="card-item">
                      <div class="card-visual">BBVA</div>
                      <div class="card-info">
                        <div class="card-name">${card.name}</div>
                        <div class="card-number">-${card.cardNumber}</div>
                      </div>
                    </div>
                  `
                )}
              </div>
            `
          : ""}
      </div>
    `;
  }
}

customElements.define("dashboard-page", DashboardPage);