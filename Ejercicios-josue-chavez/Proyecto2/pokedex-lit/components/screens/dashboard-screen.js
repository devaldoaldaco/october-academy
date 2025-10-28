import { LitElement, html, css } from 'lit';
import '../ui/navbar.js';
import '../ui/pokemon-grid.js';

class DashboardScreen extends LitElement {
    static styles = css`
        :host {
            display: block;
            width: 100%;
            min-height: 100vh;
        }

        .dashboard-screen {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .dashboard-content {
            flex: 1;
            padding: 20px;
            max-width: 1400px;
            width: 100%;
            margin: 0 auto;
        }
    `;

    handleLogout() {
        this.dispatchEvent(new CustomEvent('logout', {
            bubbles: true,
            composed: true
        }));
    }

    handleViewDetail(e) {
        this.dispatchEvent(new CustomEvent('view-detail', {
            bubbles: true,
            composed: true,
            detail: e.detail
        }));
    }

    render() {
        return html`
            <div class="dashboard-screen">
                <nav-bar @logout=${this.handleLogout}></nav-bar>
                
                <div class="dashboard-content">
                    <pokemon-grid @view-detail=${this.handleViewDetail}></pokemon-grid>
                </div>
            </div>
        `;
    }
}

customElements.define('dashboard-screen', DashboardScreen);