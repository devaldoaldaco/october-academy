import { css, html, LitElement } from "lit";
import { Router } from "../../../router";

export class DashboardUserMovements extends LitElement {
  static properties = {
    movements: {
      type: Array
    },
    isComplete: {
      type: Boolean
    }
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .movements-section {
      background: rgba(30, 30, 45, 0.9);
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.05);
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

    .view-all-link {
      color: #00d4ff;
      text-decoration: none;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.3s;
      cursor: pointer;
    }

    .view-all-link:hover {
      color: #00a8cc;
      gap: 8px;
    }
  `;

  constructor() {
    super();
    this.isComplete = false;
  }

  render() {
    return html`
      <section class="movements-section">
        <div class="section-header">
          <h2>${ this.isComplete 
            ? 'Historial completo'
            : 'Movimientos recientes'
          }</h2>
          ${
            this.isComplete
              ? html``
              : html`
                <a class="view-all-link" @click=${ this.navigateToMovementsHistory }>
                  Ver todos →
                </a>
              `
          }
        </div>

        ${
          this.movements && this.movements.length > 0
            ? this.movements.map(movement => html`
                <user-movement-item
                  .movement=${movement}
                ></user-movement-item>
              `)
            : html`<p style="color: #a0a0b0; text-align: center; padding: 20px;">Sin movimientos</p>`
        }
      </section>
    `;
  }

  navigateToMovementsHistory() {
    Router.navigate('movements-history')
  }
}