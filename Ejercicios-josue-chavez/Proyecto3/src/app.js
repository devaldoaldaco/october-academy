import { LitElement, html, css } from "lit";
import { MOCK_DATA } from "./data/mock-data.js";
import "./pages/login-page.js";
import "./pages/dashboard-page.js";
import "./pages/account-detail-page.js";

export class BBVAApp extends LitElement {
    static properties = {
        currentView: { type: String },
        isAuthenticated: { type: Boolean },
        currentUser: { type: Object },
        selectedAccount: { type: Object },
    };

    static styles = css`
        :host {
        display: block;
        }
    `;

    constructor() {
        super();
        this.currentView = "login";
        this.isAuthenticated = false;
        this.currentUser = null;
        this.selectedAccount = null;
    }

    _handleLoginSuccess(e) {
        this.currentUser = e.detail.user;
        this.isAuthenticated = true;
        this.currentView = "dashboard";
    }

    _handleNavigate(e) {
        this.currentView = e.detail.view;
        if (e.detail.data) {
        this.selectedAccount = e.detail.data;
        }
    }

    render() {
        if (!this.isAuthenticated) {
        return html`
            <login-page @login-success="${this._handleLoginSuccess}"></login-page>
        `;
        }

        switch (this.currentView) {
        case "dashboard":
            return html`
            <dashboard-page
                .user="${this.currentUser}"
                .accounts="${MOCK_DATA.accounts}"
                .cards="${MOCK_DATA.cards}"
                .summary="${MOCK_DATA.summary}"
                @navigate="${this._handleNavigate}"
            ></dashboard-page>
            `;

        case "account-detail":
            return html`
            <account-detail-page
                .account="${this.selectedAccount}"
                .transactions="${MOCK_DATA.transactions.filter(
                (t) => t.accountId === this.selectedAccount.id
                )}"
                @navigate="${this._handleNavigate}"
            ></account-detail-page>
            `;

        default:
            return html`<div>Vista no encontrada</div>`;
        }
    }
}

customElements.define("bbva-app", BBVAApp);
