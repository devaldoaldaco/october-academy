import { html, css, LitElement } from "lit";
export class ResumeComponent extends LitElement {
  static properties = {
    transactions: {
      type: Array,
    },
    resume: { type: Object },
    ingresosPct: {
      type: Number,
    },
    egresosPct: {
      type: Number,
    },
  };
  constructor() {
    super();
  }
  static styles = css`
    .resume-container {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .bar {
      height: 20px;
    }
    .ingresos {
      display: flex;
      flex-direction: column;
      gap: 8px;

      & > .bar {
        position: relative;
        width: 100%;
        /* background-color: var(--blue-bg); */
      }
    }
    .egresos {
      display: flex;
      flex-direction: column;
      gap: 8px;
      & > .bar {
        position: relative;
        /* background-color: orange; */
      }
    }

    .bar::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: var(--blue-bg);

      transform: skewX(-15deg);

      transform-origin: 0 0;
    }
    .egresos .bar::before {
      background-color: orange;
    }
  `;
  willUpdate(changedProperties) {
    if (changedProperties.has("transactions") && this.transactions) {
      this.resume = this._calculateTotals(this.transactions);
      this._getVisualPercentages(this.resume.ingresos, this.resume.egresos);
    }
    super.willUpdate(changedProperties);
  }
  _calculateTotals(transactions) {
    if (!transactions || transactions.length === 0) {
      return { ingresos: 0, egresos: 0 };
    }

    const totals = transactions.reduce(
      (accumulator, transaction) => {
        const amount = transaction.amount;

        if (amount > 0) {
          accumulator.ingresos += amount;
        } else {
          accumulator.egresos += Math.abs(amount);
        }

        return accumulator;
      },
      { ingresos: 0, egresos: 0 }
    );

    return totals;
  }
  _getVisualPercentages(ingresos, egresos) {
    if (ingresos <= 0) {
      return { ingresosPct: 0, egresosPct: 0 };
    }

    const egresosPercent = (egresos / ingresos) * 100;
    this.ingresosPct = 100;
    this.egresosPct = Math.min(egresosPercent, 100);
    console.log(Math.min(egresosPercent, 100));
  }
  render() {
    return html`<div class="resume-container">
      <div class="ingresos">
        <span>
          <span>Ingresos</span>
          <span>${this.resume?.ingresos}</span>
        </span>
        <div class="bar"></div>
      </div>
      <div class="egresos">
        <span>
          <span>Egresos</span>
          <span>${this.resume?.egresos}</span>
        </span>
        <div class="bar" style="width: ${this.egresosPct}%"></div>
      </div>
    </div> `;
  }
}
