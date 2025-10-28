import { LitElement,html } from "lit";

export class AppRoot extends LitElement {
    static properties = {
        currentPage: { type: String },
        userData: { type: Object },
        selectedAccount: { type: Object },
    };

    constructor() {
        super();
        this.currentPage = 'home';
        this.userData = {
            nombre: "Bruno Alejandro",
            username: "bruno.sandoval210@gmail.com",
            password: "admin123",
            accounts: [
                { 
                    name: "Cuenta sueldo",
                    number: "12340669",
                    balance: 9049.00,
                    label: "Saldo disponible",
                    movements: [
                        { date: '25 octubre 2025', description: 'Transf inmediata al 002 718124', amount: -4.00, retention: 0.60 },
                        { date: '24 octubre 2025', description: 'Pago de nómina (BBVA)', amount: 1500.00, retention: 0.00 }
                    ]
                },
                { 
                    name: "Cuenta Ahorro",
                    number: "56781122", 
                    balance: 500.00,
                    label: "Saldo disponible" ,
                    movements: [
                        { date: '20 octubre 2025', description: 'Transferencia recibida', amount: 500.00, retention: 0.00 }
                    ]
                },
            ],
            income: 9162.93,
            expenses: 9049.00,
        };
        this.selectedAccount = this.userData.accounts[0];
    }

    handleAccountSelect(e) {
        this.selectedAccount = e.detail.account;
        this.currentPage = 'details';
    }

    handleNavigation(e) {
        this.currentPage = e.detail.page;
    }

    handleLoginSuccess(e) {
        if (e.detail.success) {
            this.currentPage = 'dashboard';
        }
    }

    render() {
        let content;
        if (this.currentPage === 'home') {
            content = html`
                <home-component 
                    .nombre=${this.userData.nombre} 
                    @navigate=${this.handleNavigation}
                ></home-component>
            `;
        } else if (this.currentPage === 'login') {
            content = html`
                <login-component 
                    .nombre=${this.userData.nombre} 
                    .expectedUsername=${this.userData.username}
                    .expectedPassword=${this.userData.password}
                    @loginsuccess=${this.handleLoginSuccess}
                    @navigate=${this.handleNavigation}
                ></login-component>
            `;
        } else if (this.currentPage === 'dashboard') {
            content = html`
                <dashboard-component
                    .nombre=${this.userData.nombre}
                    .income=${this.userData.income}
                    .expenses=${this.userData.expenses}
                    .accounts=${this.userData.accounts}
                    @navigate=${this.handleNavigation}
                    @accountselected=${this.handleAccountSelect}  
                ></dashboard-component>
            `;
        } else if (this.currentPage === 'details') {
            content = html`
                <details-component
                    .accountName=${this.selectedAccount.name}
                    .availableBalance=${this.selectedAccount.balance}
                    .accountingBalance=${this.selectedAccount.balance + (this.selectedAccount.movements?.[0]?.retention || 0)} 
                    .movements=${this.selectedAccount.movements} 
                    @navigate=${this.handleNavigation}
                ></details-component>
            `;
        } else {
            content = html`<p>Página no encontrada.</p>`;
        }
        return html`<main>${content}</main>`;
    }
}
