import { LitElement, html, css } from 'lit';
//import './login-screen.js';
//import './pokemon-grid.js';


export class PokedexApp extends LitElement {
    static styles = css`
        :host {
            display: block;
            width: 100%;
            min-height: 100vh;
        }

        .app-container {
            width: 100%;
            min-height: 100vh;
        }
    `;

    static properties = {
        isAuthenticated: { type: Boolean }
    };

    constructor() {
        super();
        this.isAuthenticated = false;
        this.checkSession();
    }

    checkSession() {
        const session = sessionStorage.getItem('pokedexAuth');
        this.isAuthenticated = session === 'authenticated';
    }

    handleLoginSuccess(e) {
        this.isAuthenticated = true;
        sessionStorage.setItem('pokedexAuth', 'authenticated');
    }

    handleLogout(e) {
        this.isAuthenticated = false;
        sessionStorage.removeItem('pokedexAuth');
    }

    // Template con Lit (usa html tagged template)
    render() {
        return html`
            <div class="app-container">
                ${this.isAuthenticated 
                    ? html`<pokemon-grid @logout=${this.handleLogout}></pokemon-grid>`
                    : html`<login-screen @login-success=${this.handleLoginSuccess}></login-screen>`
                }
            </div>
        `;
    }
}

//customElements.define('pokedex-app', PokedexApp);