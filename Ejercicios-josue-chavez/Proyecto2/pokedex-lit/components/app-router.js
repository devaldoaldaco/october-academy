import { LitElement, html, css } from 'lit';
import './screens/login-screen.js';
import './screens/dashboard-screen.js';
import './screens/detail-screen.js';

class AppRouter extends LitElement {
    static styles = css`
        :host {
            display: block;
            width: 100%;
            min-height: 100vh;
        }

        .screen-container {
            width: 100%;
            min-height: 100vh;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;

    static properties = {
        currentScreen: { type: String },
        isAuthenticated: { type: Boolean },
        selectedPokemon: { type: Object },
        pokemonId: { type: String }
    };

    constructor() {
        super();
        this.currentScreen = 'login';
        this.isAuthenticated = false;
        this.selectedPokemon = null;
        this.pokemonId = null;
        this.checkSession();
        this.handlePopState = this.handlePopState.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('popstate', this.handlePopState);
        this.loadFromURL();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('popstate', this.handlePopState);
    }

    checkSession() {
        const session = sessionStorage.getItem('pokedexAuth');
        if (session === 'authenticated') {
            this.isAuthenticated = true;
        }
    }

    handlePopState(e) {
        this.loadFromURL();
    }

    loadFromURL() {
        const path = window.location.pathname;
        
        if (path === '/' || path === '/login') {
            if (!this.isAuthenticated) {
                this.currentScreen = 'login';
            } else {
                this.navigateTo('dashboard');
            }
        } else if (path === '/dashboard') {
            if (this.isAuthenticated) {
                this.currentScreen = 'dashboard';
                this.selectedPokemon = null;
            } else {
                this.navigateTo('login');
            }
        } else if (path.startsWith('/detail/')) {
            if (this.isAuthenticated) {
                this.pokemonId = path.split('/')[2];
                this.currentScreen = 'detail';
            } else {
                this.navigateTo('login');
            }
        } else {
            this.navigateTo('login');
        }
    }

    handleLoginSuccess(e) {
        this.isAuthenticated = true;
        sessionStorage.setItem('pokedexAuth', 'authenticated');
        this.navigateTo('dashboard');
    }

    handleLogout() {
        this.isAuthenticated = false;
        sessionStorage.removeItem('pokedexAuth');
        this.selectedPokemon = null;
        this.navigateTo('login');
    }

    handleViewDetail(e) {
        this.selectedPokemon = e.detail.pokemon;
        this.navigateTo('detail', e.detail.pokemon.id);
    }

    handleBackToDashboard() {
        this.selectedPokemon = null;
        this.navigateTo('dashboard');
    }

    navigateTo(screen, pokemonId = null) {
        let url = '/';
        
        switch(screen) {
            case 'login':
                url = '/login';
                this.currentScreen = 'login';
                break;
            case 'dashboard':
                url = '/dashboard';
                this.currentScreen = 'dashboard';
                break;
            case 'detail':
                url = `/detail/${pokemonId}`;
                this.currentScreen = 'detail';
                this.pokemonId = pokemonId;
                break;
        }
        
        window.history.pushState({ screen }, '', url);
        
        this.requestUpdate();
    }

    renderScreen() {
        switch(this.currentScreen) {
            case 'login':
                return html`
                    <login-screen 
                        @login-success=${this.handleLoginSuccess}>
                    </login-screen>
                `;
            
            case 'dashboard':
                return html`
                    <dashboard-screen 
                        @logout=${this.handleLogout}
                        @view-detail=${this.handleViewDetail}>
                    </dashboard-screen>
                `;
            
            case 'detail':
                return html`
                    <detail-screen 
                        .pokemon=${this.selectedPokemon}
                        .pokemonId=${this.pokemonId}
                        @back-to-dashboard=${this.handleBackToDashboard}>
                    </detail-screen>
                `;
            
            default:
                return html`<p>404 - Pantalla no encontrada</p>`;
        }
    }

    render() {
        return html`
            <div class="screen-container">
                ${this.renderScreen()}
            </div>
        `;
    }
}

customElements.define('app-router', AppRouter);