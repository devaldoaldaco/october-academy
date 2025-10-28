import { LitElement, html, css } from 'lit';

class BankAccount extends LitElement {
  static properties = {
    showBalance: { type: Boolean },
    selectedTransaction: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
      font-family: 'Segoe UI', sans-serif;
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
      cursor: pointer;
      transition: 0.2s;
    }

    .transaction-item:hover {
      background: #f8f8f8;
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

    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
    }

    .modal {
      background: white;
      border-radius: 10px;
      padding: 1.5rem;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      animation: fadeIn 0.3s ease;
    }

    .modal h4 {
      margin-top: 0;
    }

    .modal button {
      background: #003c81ff;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 0.5rem 1rem;
      cursor: pointer;
      margin-top: 1rem;
      float: right;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `;

  constructor() {
    super();
    this.showBalance = true;
    this.selectedTransaction = null;
  }

  toggleBalance() {
    this.showBalance = !this.showBalance;
  }

  openTransactionDetail(tx) {
    this.selectedTransaction = tx;
  }

  closeModal() {
    this.selectedTransaction = null;
  }

  formatCurrency(amount) {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'USD',
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

      <div class="transactions-card">
        <h3>Movimientos Recientes</h3>
        <div class="transactions-list">
          ${transactions.map(tx => html`
            <div class="transaction-item" @click=${() => this.openTransactionDetail(tx)}>
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

      ${this.selectedTransaction ? html`
        <div class="modal-backdrop" @click=${this.closeModal}>
          <div class="modal" @click=${e => e.stopPropagation()}>
            <h4>Detalle de Transacción</h4>
            <p><strong>Descripción:</strong> ${this.selectedTransaction.description}</p>
            <p><strong>Fecha:</strong> ${this.selectedTransaction.date}</p>
            <p><strong>Tipo:</strong> ${this.selectedTransaction.type === 'ingresos' ? 'Ingreso' : 'Gasto'}</p>
            <p><strong>Monto:</strong> ${this.formatCurrency(this.selectedTransaction.amount)}</p>
            <button @click=${this.closeModal}>Cerrar</button>
          </div>
        </div>
      ` : ''}
    `;
  }
}

customElements.define('bank-account', BankAccount);
