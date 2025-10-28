import { LitElement, html, css } from 'lit';

class Navbar extends LitElement {
    static styles = css`
        :host {
            display: block;
            width: 100%;
            background: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .navbar {
            max-width: 1400px;
            margin: 0 auto;
            padding: 16px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
        }

        .navbar-brand {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .brand-logo {
            width: 40px;
            height: 40px;
            object-fit: contain;
        }

        .brand-title {
            font-size: 1.5rem;
            font-weight: 800;
            letter-spacing: 0.5px;
            color: #0b1a2b;
            margin: 0;
        }

        .navbar-actions {
            display: flex;
            gap: 12px;
            align-items: center;
        }

        .btn-logout {
            padding: 10px 20px;
            background: #374151;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-logout:hover {
            background: #1f2937;
            transform: translateY(-2px);
        }

        @media (max-width: 768px) {
            .navbar {
                flex-direction: column;
                text-align: center;
            }

            .brand-title {
                font-size: 1.2rem;
            }
        }
    `;

    handleLogout() {
        this.dispatchEvent(new CustomEvent('logout', {
            bubbles: true,
            composed: true
        }));
    }

    render() {
        return html`
            <nav class="navbar">
                <div class="navbar-brand">
                    <img 
                        class="brand-logo" 
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                        alt="Pokédex"
                    >
                    <h1 class="brand-title">POKEMONES</h1>
                </div>

                <div class="navbar-actions">
                    <button class="btn-logout" @click=${this.handleLogout}>
                        Cerrar Sesión
                    </button>
                </div>
            </nav>
        `;
    }
}

customElements.define('nav-bar', Navbar);