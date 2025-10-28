import { css, html, LitElement } from "lit";



export class DashboardUserProducts extends LitElement {
  static properties = {
    products: {
      type: Array
    }
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    h2 {
      font-size: 24px;
      color: #ffffff;
      margin-bottom: 20px;
    }

    .products-section {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
  `;

  constructor() {
    super();
    this.products = [{ }];
  }

  willUpdate() {
    this.products = this.products.map(product => {
      const type = product.accountType ?? product.cardType;

      const name = product.accountName ?? product.cardName

      const number = product.maskedNumber;

      let balance = product.balance ?? product.availableCredit;
      if (product.cardType === 'debit') {
        const account = this.products.find(p => 
          p.id === product.accountId && p.accountType
        );

        balance = account.balance;
      }

      return {
        type,
        name,
        number,
        balance
      };
    });
  }

  render() {
    return html`
      <h2>Mis Cuentas y Tarjetas</h2>

      <section class="products-section">
        ${ this.products.map(product => html`
          <user-product-card
            .product=${ product }
          ></user-product-card>  
        `) }
      </section>
    `;
  }
}