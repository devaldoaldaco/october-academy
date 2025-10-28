import { css, html, LitElement } from "lit";

const PRODUCT_TYPE_MAP = {
  'savings': 'Cuenta de Ahorros',
  'checking': 'Cuenta Corriente',
  'debit': 'Tarjeta Débito',
  'credit': 'Tarjeta Crédito'
};

export class UserProductCard extends LitElement {
  static properties = {
    product: {
      type: Object,
    }
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .product-card {
      background: rgba(30, 30, 45, 0.9);
      border-radius: 20px;
      padding: 25px;
      cursor: pointer;
      transition: all 0.3s;
      border: 2px solid transparent;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      height: 100%;
    }

    .product-card:hover {
      border-color: #00d4ff;
      transform: translateY(-5px);
      box-shadow: 0 12px 40px rgba(0, 212, 255, 0.2);
    }

    .product-type {
      color: #a0a0b0;
      font-size: 12px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .product-name {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    .product-number {
      color: #a0a0b0;
      font-size: 13px;
      margin-bottom: 15px;
    }

    .product-balance {
      font-size: 28px;
      font-weight: bold;
      color: #00d4ff;
    }

    .product-balance.credit-available {
      font-size: 16px;
      color: #00ff88;
    }
  `;

  constructor() {
    super();
    this.product = { }
  }

  render() {
    return html`
      <div class="product-card">
        <div class="product-type">${ PRODUCT_TYPE_MAP[this.product.type] ?? this.product.type }</div>
        <div class="product-name">${ this.product.name }</div>
        <div class="product-number">${ this.product.number }</div>
        ${
          this.product.type === 'credit'
            ? html`
              <div class="product-balance credit-available">
                Disponible: S/ ${ this.product.balance }
              </div>
            `
            : html`
              <div class="product-balance">
                S/ ${ this.product.balance }
              </div>`
        }
        
      </div>
    `;
  }
}