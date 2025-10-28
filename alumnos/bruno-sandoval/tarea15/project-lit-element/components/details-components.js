import { css, html, LitElement } from "lit";

export class DetailsComponent extends LitElement {
    static properties = {
        accountingBalance: { type: Number },
        availableBalance: { type: Number },
        accountName: { type: String },
        movements: { type: Array }, 
    }

    constructor() {
        super();
        this.accountName = 'Cuenta sueldo';
        this.availableBalance = 0.32;
        this.accountingBalance = 0.92;
        this.movements = [
            { date: '25 octubre 2025', description: 'Transf inmediata al 002 718124', amount: -4.00, retention: 0.60 }
        ];
    }
    
    formatCurrency(amount) {
        if (typeof amount !== 'number') return '0.00';
        return new Intl.NumberFormat('es-PE', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        }).format(amount);
    }
    
    renderMovements() {
        return this.movements.map(item => html`
            <div class="movement-item">
                <div class="date-info">${item.date}</div>
                <div class="transaction-details">
                    <span class="description">${item.description}</span>
                    <span class="transaction-amount negative">S/ ${item.amount.toFixed(2)}</span>
                </div>
            </div>
        `);
    }

    static styles = css`
        :host {
            --color-primary: #000552;
            --color-secondary: #121a47;
            --color-ternary: #80ccf0;
            --color-white: #ffffff;
            display: block;
        }

        .account-summary-view {
            max-width: 400px;
            background-color: var(--color-primary);
            min-height: 100vh;
            color: var(--color-white);
            padding-bottom: 5rem;
            &>.header {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
                position: relative;
                background-color: var(--color-secondary);
                &>.back-arrow {
                    position: absolute;
                    left: 1rem;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                &>.page-title {
                    font-size: 1.1rem;
                    margin: 0;
                    font-weight: 500;
                }
            }
            &>.account-carousel {
                padding: 1rem;
                &>.account-card {
                    background-color: var(--color-secondary);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    text-align: center;
                    &>.card-title {
                        font-size: 1.2rem;
                        font-weight: bold;
                        margin-top: 0;
                        margin-bottom: 1.5rem;
                    }
                    &>.balances {
                        display: flex;
                        justify-content: space-around;
                        margin-bottom: 1rem;
                        &>.balance-item {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            &>.balance-item .amount {
                                font-size: 1.1rem;
                                font-weight: bold;
                                color: var(--color-white);
                            }
                            
                            &>.balance-item .label {
                                font-size: 0.8rem;
                                color: rgba(255, 255, 255, 0.6);
                            }
                        }
                    }
                    &>.detail-link {
                        color: var(--color-ternary);
                        text-decoration: none;
                        font-size: 0.9rem;
                        font-weight: bold;
                    }
                }
                &>.carousel-dots {
                    text-align: center;
                    padding-top: 1rem;
                    &>.dot {
                        display: inline-block;
                        width: 6px;
                        height: 6px;
                        background-color: rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                        margin: 0 4px;
                    }
                    
                    &>.dot.active {
                        background-color: var(--color-white);
                    }
                }
            }
            &>.info-card {
                background-color: var(--color-secondary);
                border-radius: 0.5rem;
                padding: 1.5rem;
                margin: 0 1rem 1rem 1rem;
                text-align: center;
                &>.icon {
                    font-size: 2rem;
                    display: block;
                    margin-bottom: 0.5rem;
                }
                
                &>.info-text {
                    margin: 0.5rem 0;
                }
                
                &>.info-link {
                    color: var(--color-ternary);
                    text-decoration: none;
                    font-weight: bold;
                }
            }
            &>.quick-access-nav {
                display: flex;
                justify-content: space-around;
                padding: 0.5rem 0;
                background-color: var(--color-primary);
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                &>.nav-button {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background: none;
                    border: none;
                    color: var(--color-ternary);
                    font-size: 0.8rem;
                    cursor: pointer;
                    padding: 0.5rem;
                    &>.icon {
                        font-size: 1.5rem;
                        margin-bottom: 0.3rem;
                        line-height: 1;
                    }
                }
            }
            &>.movements-section {
                padding: 1rem;
                &>.retention-summary {
                    display: flex;
                    justify-content: space-between;
                    font-size: 1.1rem;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    &>.retention-title {
                        color: var(--color-ternary);
                        font-weight: bold;
                    }
                    
                    &>.retention-amount {
                        font-weight: bold;
                    }
                }
                &>.section-title {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.7);
                    margin: 1.5rem 0 0.5rem 0;
                    text-transform: uppercase;
                }
                &>.movement-item {
                    padding: 1rem 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    &>.date-info {
                        font-size: 0.8rem;
                        color: rgba(255, 255, 255, 0.5);
                        margin-bottom: 0.5rem;
                    }
                    &>.transaction-details {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                        &>.description {
                            font-size: 1rem;
                            color: var(--color-white);
                        }
                        
                        &>.transaction-amount {
                            font-weight: bold;
                        }
                        
                        &>.transaction-amount.negative {
                            color: red;
                        }
                    }
                }
            }
        }

    `;

    render() {
        return html`
            <div class="account-summary-view">
                <header class="header">
                    <span class="back-arrow" @click=${() => this.dispatchEvent(new CustomEvent('navigate', { detail: { page: 'dashboard' }, bubbles: true, composed: true }))}>←</span>
                    <h1 class="page-title">Cuentas</h1>
                </header>
                <div class="account-carousel">
                    <div class="account-card">
                        <h2 class="card-title">${this.accountName}</h2>
                        <div class="balances">
                            <div class="balance-item">
                                <span class="amount">S/ ${this.formatCurrency(this.availableBalance)}</span>
                                <span class="label">Saldo disponible</span>
                            </div>
                            <div class="balance-item">
                                <span class="amount">S/ ${this.formatCurrency(this.accountingBalance)}</span>
                                <span class="label">Saldo contable</span>
                            </div>
                        </div>
                        <a href="#" class="detail-link">Detalle de cuenta</a>
                    </div>
                    <div class="carousel-dots">
                        <span class="dot active"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                </div>
                <div class="info-card">
                    <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960"
                            width="48px" fill="#e3e3e3">
                            <path
                                d="M140-160q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm340-302L140-685v465h680v-465L480-462Zm0-60 336-218H145l335 218ZM140-685v-55 520-465Z" />
                        </svg></span>
                    <p class="info-text">Con Apartados organiza y controla tu dinero</p>
                    <a href="#" class="info-link">Ir a Apartados</a>
                </div>
                <nav class="quick-access-nav">
                    <button class="nav-button">
                        <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960"
                                width="48px" fill="#e3e3e3">
                                <path
                                    d="M481-158q-131 0-225.5-94.5T161-478v-45l-80 80-39-39 149-149 149 149-39 39-80-80v45q0 107 76.5 183.5T481-218q29 0 55-5t49-15l43 43q-36 20-72.5 28.5T481-158Zm289-169L621-476l40-40 79 79v-41q0-107-76.5-183.5T480-738q-29 0-55 5.5T376-719l-43-43q36-20 72.5-28t74.5-8q131 0 225.5 94.5T800-478v43l80-80 39 39-149 149Z" />
                            </svg></span>
                        <span class="label">Transferir</span>
                    </button>
                    <button class="nav-button">
                        <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960"
                                width="48px" fill="#e3e3e3">
                                <path
                                    d="M446.75-80q-11.25 0-22.5-4.25T404-97L98-404q-9-8-13.5-19.5T80-446.25q0-11.25 4.3-22.5Q88.61-480 98-489l373-373q8.3-8.25 19.61-13.13Q501.93-880 514-880h307q24.75 0 42.38 17.62Q881-844.75 881-820v306q0 12.09-5 23.04Q871-480 863-472L489-97q-9 8-20 12.5T446.75-80ZM445-138l376-378v-304H514L139-445l306 307Zm271-526q21 0 36.5-15.5T768-716q0-21-15.5-36.5T716-768q-21 0-36.5 15.5T664-716q0 21 15.5 36.5T716-664ZM480-479Z" />
                            </svg></span>
                        <span class="label">Pagar servicio</span>
                    </button>
                    <button class="nav-button">
                        <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960"
                                width="48px" fill="#e3e3e3">
                                <path
                                    d="M165-120q-19.29 0-32.14-12.86Q120-145.71 120-165v-135q0-14.91 10-26.96Q140-339 155-343l119-26q12.7-2 25.85 2Q313-363 323-352l95 98q45-24 86-55.5t78-69.5q35-34 64-72t55-82l-99.77-100.77Q593-642 590.5-653.5t-.43-25.86L617-805q4-15 14-25t24-10h140q19.29 0 32.14 12.86Q840-814.29 840-795q0 116-56 236.5T625-335Q522-232 401.5-176T165-120Zm566-468q25-60 37-106.5t12-85.5H673l-23 110 81 82ZM362-225l-79-83-103 21v107q45-2 93-14t89-31Zm369-363ZM362-225Z" />
                            </svg></span>
                        <span class="label">PLIN</span>
                    </button>
                    <button class="nav-button">
                        <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960"
                                width="48px" fill="#e3e3e3">
                                <path
                                    d="M207.86-432Q188-432 174-446.14t-14-34Q160-500 174.14-514t34-14Q228-528 242-513.86t14 34Q256-460 241.86-446t-34 14Zm272 0Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm272 0Q732-432 718-446.14t-14-34Q704-500 718.14-514t34-14Q772-528 786-513.86t14 34Q800-460 785.86-446t-34 14Z" />
                            </svg></span>
                        <span class="label">Ver más</span>
                    </button>
                </nav>
                <div class="movements-section">
                    <div class="retention-summary">
                        <span class="retention-title">Total retenciones</span>
                        <span class="retention-amount">S/ ${this.formatCurrency(this.movements[0]?.retention || 0)}</span>
                    </div>

                    <h3 class="section-title">ÚLTIMOS MOVIMIENTOS</h3>

                    ${this.renderMovements()}
                </div>
            </div>
        `;
    }
}