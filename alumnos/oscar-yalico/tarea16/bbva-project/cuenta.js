import { LitElement, html, css } from 'lit';

class BankAccount extends LitElement {
  static properties = {
    showBalance: { type: Boolean },
  };

  static styles = css`
    :host {
      display: block;
    }

    .balance-card {
      background: linear-gradient(135deg, #003c81ff 0%, #0056b3 100%);
      color: white;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      margin-bottom: 1rem;
    }

    .balance-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .toggle-balance {
      background: rgba(255,255,255,0.2);
      color: white;
      border: none;
      border-radius: 8px;
      padding: 0.4rem 0.8rem;
      font-size: 0.9rem;
      cursor: pointer;
      transition: 0.3s;
    }

    .toggle-balance:hover {
      background: rgba(255,255,255,0.3);
    }

    .balance-amount {
      font-size: 2rem;
      font-weight: bold;
      margin: 0.5rem 0;
    }

    .account-number {
      opacity: 0.9;
      font-size: 0.9rem;
      letter-spacing: 1px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .stat-card {
      background: white;
      border-radius: 10px;
      padding: 1rem;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    .stat-label {
      color: #666;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
    }

    .stat-value.income {
      color: #16a34a;
    }

    .stat-value.expense {
      color: #dc2626;
    }

    .transactions-card {
      background: white;
      border-radius: 10px;
      padding: 1rem;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    .transactions-card h3 {
      margin-top: 0;
      color: #333;
    }

    .transactions-list {
      max-height: 300px;
      overflow-y: auto;
    }

    .transaction-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.8rem 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .transaction-item:last-child {
      border-bottom: none;
    }

    .transaction-desc {
      font-weight: 500;
      color: #333;
    }

    .transaction-date {
      font-size: 0.8rem;
      color: #666;
      margin-top: 0.2rem;
    }

    .transaction-amount {
      font-weight: bold;
    }

    .transaction-amount.income {
      color: #16a34a;
    }

    .transaction-amount.expense {
      color: #dc2626;
    }
  `;

  constructor() {
    super();
    this.showBalance = true;
  }

  toggleBalance() {
    this.showBalance = !this.showBalance;
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
    }).format(Math.abs(amount));
  }

  render() {
    const balance = 15847.32;
    const accountNumber = '**** **** **** 4829';
    
    const stats = {
      ingresos: 3700.00,
      gastos: 487.19,
      savings: 3212.81
    };

    const transactions = [
      { id: 1, date: '28 Oct', description: 'Supermercado Central', amount: -156.50, type: 'gastos' },
      { id: 2, date: '27 Oct', description: 'Salario - Empresa XYZ', amount: 3500.00, type: 'ingresos' },
      { id: 3, date: '26 Oct', description: 'Netflix Subscription', amount: -15.99, type: 'gastos' },
      { id: 4, date: '25 Oct', description: 'Transferencia recibida', amount: 200.00, type: 'ingresos' },
      { id: 5, date: '24 Oct', description: 'Restaurante La Marsa', amount: -87.40, type: 'gastos' },
    ];

    return html`
      <!-- Balance Card -->
      <div class="balance-card">
        <div class="balance-header">
          <div>
            <div style="font-size: 0.9rem; opacity: 0.9;">Saldo Disponible</div>
          </div>
          <button class="toggle-balance" @click=${this.toggleBalance}>
            ${this.showBalance ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
        <div class="balance-amount">
          ${this.showBalance ? this.formatCurrency(balance) : '••••••'}
        </div>
        <div class="account-number">${accountNumber}</div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Ingresos del mes</div>
          <div class="stat-value income">${this.formatCurrency(stats.ingresos)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Gastos del mes</div>
          <div class="stat-value expense">${this.formatCurrency(stats.gastos)}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Ahorros</div>
          <div class="stat-value">${this.formatCurrency(stats.savings)}</div>
        </div>
      </div>

      <!-- Transactions -->
      <div class="transactions-card">
        <h3>Movimientos Recientes</h3>
        <div class="transactions-list">
          ${transactions.map(tx => html`
            <div class="transaction-item">
              <div>
                <div class="transaction-desc">${tx.description}</div>
                <div class="transaction-date">${tx.date}</div>
              </div>
              <div class="transaction-amount ${tx.type}">
                ${tx.type === 'ingresos' ? '+' : ''}${this.formatCurrency(tx.amount)}
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define('bank-account', BankAccount);