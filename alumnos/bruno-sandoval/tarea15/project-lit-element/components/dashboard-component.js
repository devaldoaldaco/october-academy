import { css, html, LitElement } from "lit";

export class DashboardComponent extends LitElement {
    static properties = {
        nombre: {type:String},
        income: { type: Number },
        expenses: { type: Number },
        accounts: { type: Array }
    }

    constructor() {
        super();
        this.nombre = 'Bruno Sandoval'
        this.income = 99900.0;
        this.expenses = 99900.0;
        this.accounts = [{
            name: "Cuenta sueldo", number: "12340669", balance: 1545.99, label: "Saldo disponible"
        }];
    }

    static styles = css`
    :host {
        --color-primary: #000552;
        --color-secondary: #121a47;
        --color-ternary: #80ccf0;
        --color-cuarty: #5e85da;
        --color-fifty: #002b4f;
        --color-white: #ffffff;
        --color-sixty: #12141b;
        color: var(--color-white);
    }

    .background-dashboard {
        box-sizing: border-box;
        max-width: 400px;
        height: 100vh;
        background-color: var(--color-primary);
        background-image:
            linear-gradient(to bottom,
                rgba(0, 0, 0, 0.4) 0%,
                var(--color-fifty) 50%),
            url("./img/background-login.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: top;

        &>.dashboard-header {
            &>.tittle {
                padding-bottom: 2rem;

                &>h1 {
                    margin: 0;
                    font-weight: lighter;
                    text-align: center;
                }
            }

            &>.motions {
                padding: 1rem;
                color: var(--color-white);

                &>.income,
                &>.expenses {
                    margin-bottom: 1.5rem;

                    &>.header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 1.1rem;
                        margin-bottom: 0.5rem;

                        &>.amount {
                            font-weight: bold;
                        }
                    }

                    &>.progress-bar-container {
                        height: 1rem;
                        overflow: hidden;
                        margin: 0.5rem 0;

                        &>.progress-bar {
                            height: 100%;
                            transform: skewX(-20deg) translateX(1rem);
                            width: calc(100% + 2rem);
                            transition: width 0.5s ease-out;
                        }
                    }
                }

                &>.income>.progress-bar-container>.progress-bar {
                    background-color: #e6b340;
                }

                &>.expenses>.progress-bar-container>.progress-bar {
                    background-color: var(--color-ternary);
                }
            }
        }

        &>.dashboard-body {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
            
        }
    }
    `;

    handleAccountClick(account) {
    this.dispatchEvent(new CustomEvent('accountselected', {
        detail: { account: account },
        bubbles: true,
        composed: true
    }));
}

    renderAccounts() {
        if (!this.accounts || this.accounts.length === 0) {
            return html`<p style="text-align: center; color: rgba(255, 255, 255, 0.5);">No hay cuentas disponibles.</p>`;
        }
        return this.accounts.map(account => html`
            <account-component 
            name = "${account.name}"
            number = "${account.number}" 
            balance = "${account.balance}" 
            label = "${account.label}" 
            @click=${() => this.handleAccountClick(account)}
            >
            </account-component>
    `);
    }

    calculateProgressWidth(total) {
        const max = Math.max(this.income, this.expenses);
        if (max === 0) return '0%';
        const percentage = (total / max) * 100;
        return `${percentage.toFixed(0)}%`;
    }

    render() {
        return html`
        <div class="background-dashboard">
            <div class="dashboard-header">
                <div class="tittle">
                    <h1>Hola, ${this.nombre}</h1>
                </div>
                <div class="motions">
                    <div class="income">
                        <div class="header">
                            <span class="label">Ingresos</span>
                            <span class="amount">S/${this.income}</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar" style="width: ${this.calculateProgressWidth(this.income)};"></div>
                        </div>
                    </div>

                    <div class="expenses">
                        <div class="header">
                            <span class="label">Gastos</span>
                            <span class="amount">S/${this.expenses}</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar" style="width: ${this.calculateProgressWidth(this.expenses)};"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dashboard-body">
                ${this.renderAccounts()}
            </div>
        </div>
        `;
    }
}