import { LitElement, html, css } from 'lit';

class PokemonAbilities extends LitElement {
    static styles = css`
        :host {
            display: block;
        }

        .abilities-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 12px;
        }

        .ability-card {
            padding: 12px 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            font-weight: 600;
            color: #374151;
            text-transform: capitalize;
            transition: all 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .ability-card:hover {
            border-color: #3b82f6;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }

        .ability-icon {
            display: flex;
            align-items: center;
            margin-right: 8px; 
            font-size: 1.2rem;
        }

        .no-abilities {
            text-align: center;
            padding: 20px;
            color: #9ca3af;
            font-style: italic;
        }

        @media (max-width: 768px) {
            .abilities-list {
                grid-template-columns: 1fr;
            }
        }
    `;

    static properties = {
        abilities: { type: Array }
    };

    constructor() {
        super();
        this.abilities = [];
    }

    render() {
        if (!this.abilities || this.abilities.length === 0) {
            return html`
                <div class="no-abilities">
                    No hay habilidades disponibles
                </div>
            `;
        }

        return html`
            <div class="abilities-list">
                ${this.abilities.map(ability => html`
                    <div class="ability-card">
                        <span class="ability-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="m12 17.275l-4.15 2.5q-.275.175-.575.15t-.525-.2t-.35-.437t-.05-.588l1.1-4.725L3.775 10.8q-.25-.225-.312-.513t.037-.562t.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15t.537.15t.388.45l1.875 4.45l4.85.425q.35.05.55.225t.3.45t.038.563t-.313.512l-3.675 3.175l1.1 4.725q.075.325-.05.588t-.35.437t-.525.2t-.575-.15z"/></svg>
                        </span>
                        ${ability}
                    </div>
                `)}
            </div>
        `;
    }
}

customElements.define('pokemon-abilities', PokemonAbilities);