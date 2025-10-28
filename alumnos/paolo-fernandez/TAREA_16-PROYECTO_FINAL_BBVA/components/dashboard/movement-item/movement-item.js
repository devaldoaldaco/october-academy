import { css, html, LitElement } from "lit";

export class UserMovementItem extends LitElement {
  static properties = {
    movement: {
      type: Object
    }
  }

  static styles = css`
    .movement-item {
      background: #252535;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.3s;
      border: 1px solid transparent;
    }

    .movement-item:hover {
      border-color: #00d4ff;
      transform: translateX(5px);
    }

    .movement-info {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .movement-icon {
      width: 45px;
      height: 45px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      flex-shrink: 0;
    }

    .movement-icon.income {
      background: rgba(0, 255, 136, 0.2);
    }

    .movement-icon.expense {
      background: rgba(255, 68, 102, 0.2);
    }

    .movement-details {
      flex-grow: 1;
    }

    .movement-description {
      font-size: 15px;
      font-weight: 500;
      margin-bottom: 4px;
    }

    .movement-date {
      color: #a0a0b0;
      font-size: 12px;
    }

    .movement-amount {
      font-size: 20px;
      font-weight: bold;
      text-align: right;
    }

    .movement-amount.positive {
      color: #00ff88;
    }

    .movement-amount.negative {
      color: #ff4466;
    }
  `;

  constructor() {
    super();
    this.movement = {};
  }

  formatAmount(amount) {
    if (!amount) return 'S/ 0.00';

    const sign = amount > 0 ? '+ ' : '- ';
    const value = Math.abs(amount).toFixed(2);
    return `${ sign } S/. ${ value }`;
  }

  formatDate(dateString) {
    if (!dateString) return 'Fecha desconocida';
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', { 
        day: '2-digit', 
        month: '2-digit', 
        year: '2-digit',
        hour: '2-digit', 
        minute: '2-digit' 
    });
  }

  render() {
    if (!this.movement?.description) {
      return html``;
    }

    return html`
      <div class="movement-item">
        <div class="movement-info">
          <div class="movement-icon ${ this.movement.type }">
            ${ this.movement.icon }
          </div>
          <div class="movement-details">
            <div class="movement-description">${ this.movement.description }</div>
            <div class="movement-date">${ this.formatDate(this.movement.date) }</div>
          </div>
        </div>
        <div class="movement-amount ${ this.movement.amount > 0 ? 'positive' : 'negative' }">
          ${ this.formatAmount(this.movement.amount) }
        </div>
      </div>
    `;
  }
}