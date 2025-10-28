import { css, html, LitElement } from "lit";

export class AccountComponent extends LitElement {
    static properties ={
        name: {type:String},
        number: {type:String},
        balance: {type:String},
        label: {type:String},
    }

    constructor(){
        super();
        this.name = '';
        this.number = '';
        this.balance = '';
        this.label = '';
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
        .account {
            background-color: var(--color-sixty);
            max-width: 100%;
            padding: 1.5rem 1rem;
            color: var(--color-white);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);

            &>.section-title {
                display: block;
                font-size: 0.8rem;
                color: rgba(255, 255, 255, 0.7);
                margin-bottom: 1rem;
                font-weight: bold;
                letter-spacing: 1px;
            }

            &>.account-details {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;

                &>.left-col {
                    display: flex;
                    flex-direction: column;
                    text-align: left;

                    &>.account-name {
                        font-size: 1rem;
                        font-weight: bold;
                        color: var(--color-ternary);
                        margin-bottom: 0.2rem;
                    }

                    &>.account-number {
                        font-size: 0.8rem;
                        color: rgba(255, 255, 255, 0.5);
                    }
                }

                &>.right-col {
                    display: flex;
                    flex-direction: column;
                    text-align: right;

                    &>.account-balance {
                        font-size: 1rem;
                        font-weight: bold;
                        color: var(--color-white);
                        margin-bottom: 0.2rem;
                    }

                    &>.balance-label {
                        font-size: 0.8rem;
                        color: rgba(255, 255, 255, 0.5);
                    }
                }
            }
        }
    `;

    formatCurrency() {
        if (typeof this.balance !== 'number') return parseFloat(this.balance).toFixed(2);
        return this.balance.toFixed(2);
    }

    formatAccountNumber() {
        if (!this.number) return '';
        const lastFour = this.number.slice(-4);
        return `•••${lastFour}`;
    }

    render(){
        return html`
            <div class="account">
                <span class="section-title">CUENTAS</span>
                <div class="account-details">
                    <div class="left-col">
                        <span class="account-name">${this.name}</span>
                        <span class="account-number">${this.formatAccountNumber()}</span>
                    </div>
                    <div class="right-col">
                        <span class="account-balance">S/${this.formatCurrency()}</span>
                        <span class="balance-label">${this.label}</span>
                    </div>
                </div>
            </div>
        `;
    }
}