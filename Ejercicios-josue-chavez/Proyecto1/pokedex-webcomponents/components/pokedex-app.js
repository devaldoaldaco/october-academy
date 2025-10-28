export class PokedexApp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isAuthenticated = false;
    }

    connectedCallback() {
        this.checkSession();
        this.render();
        this.attachEventListeners();
    }

    checkSession() {
        const session = sessionStorage.getItem('pokedexAuth');
        this.isAuthenticated = session === 'authenticated';
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    min-height: 100vh;
                }
                
                .app-container {
                    width: 100%;
                    min-height: 100vh;
                }
                
                .hidden {
                    display: none;
                }
            </style>
            
            <div class="app-container">
                ${this.isAuthenticated ? this.renderPokedex() : this.renderLogin()}
            </div>
        `;
    }

    renderLogin() {
        return `<login-screen></login-screen>`;
    }

    renderPokedex() {
        return `<pokemon-grid></pokemon-grid>`;
    }

    attachEventListeners() {
        this.shadowRoot.addEventListener('login-success', (e) => {
            this.isAuthenticated = true;
            sessionStorage.setItem('pokedexAuth', 'authenticated');
            this.render();
        });

        this.shadowRoot.addEventListener('logout', (e) => {
            this.isAuthenticated = false;
            sessionStorage.removeItem('pokedexAuth');
            this.render();
        });
    }
}

