import { css, html, LitElement } from "lit";

export class DashboardMain extends LitElement {
  static properties = {
    user: {
      type: Object
    },
    accounts: {
      type: Array,
      state: true,
    },
    cards: {
      type: Array,
      state: true,
    },
    movements: {
      type: Array,
      state: true
    }
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    main {
      max-width: 1400px;
      margin: 0 auto;
      padding: 30px 20px;
    }

    .welcome-section {
      margin-bottom: 30px;
    }

    .welcome-section h1 {
      font-size: 32px;
      margin-bottom: 5px;
    }

    .welcome-section p {
      color: #a0a0b0;
      font-size: 14px;
    }

    .total-balance-section {
      background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
      border-radius: 20px;
      padding: 30px;
      margin-bottom: 30px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    }

    .total-balance-label {
      color: rgba(255, 255, 255, 0.7);
      font-size: 14px;
      margin-bottom: 10px;
    }

    .total-balance-amount {
      font-size: 42px;
      font-weight: bold;
      color: #00d4ff;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .section-header h2 {
      font-size: 24px;
      color: #ffffff;
    }
  `;

  constructor() {
    super();
    this.user = { };
    this.accounts = [];
    this.cards = [];
    this.movements = [];
  }

  async willUpdate(changedProperties) {
    if (changedProperties.has('user') && this.user?.id) {
      await this.fetchUserProducts();
      await this.fetchUserMovements();
    }
  }

  render() {
    return html`
      <main>
        <section class="welcome-section">
          <h1>Mis Productos</h1>
          <p>Bienvenido a tu banca digital</p>
        </section>

        <section class="total-balance-section">
          <div class="total-balance-label">Saldo Total</div>
          <div class="total-balance-amount">S/ ${ this.getTotalBalance() }</div>
        </section>

        <dashboard-user-products
          .products=${[ ...this.accounts, ...this.cards ]}
        ></dashboard-user-products>

        <dashboard-user-movements
          .movements=${ this.movements }
        ></dashboard-user-movements>
      </main>
    `;
  }

  async fetchUserProducts() {
    const params = new URLSearchParams({ userId: this.user.id });

    const [ responseAccounts, responseCards ] = await Promise.all([
      fetch(`http://localhost:3000/accounts?${ params }`),
      fetch(`http://localhost:3000/cards?${ params }`)
    ]);

    const [ accounts, cards ] = await Promise.all([
      responseAccounts.json(),
      responseCards.json()
    ]);

    this.accounts = accounts;
    this.cards = cards;
  }

  async fetchUserMovements() {
    const params = new URLSearchParams({
      userId: this.user.id,
      _limit: 4
    });

    const response = await fetch(`http://localhost:3000/transactions?${ params }`);
    const movements = await response.json();

    this.movements = movements;
  }

  getTotalBalance() {
    const accountsTotal = this.accounts.reduce((sum, account) => sum + account.balance, 0);
    return accountsTotal.toFixed(2);
  }
}