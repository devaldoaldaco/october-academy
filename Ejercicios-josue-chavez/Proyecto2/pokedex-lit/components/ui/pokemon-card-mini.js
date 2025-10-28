import { LitElement, html, css, unsafeCSS } from 'lit';
import './type-badge.js';

class PokemonCardMini extends LitElement {
    static styles = css`
        :host {
            display: block;
        }

        .card {
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            gap: 12px;
            position: relative;
            overflow: hidden;
        }

        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.15;
            z-index: 0;
        }

        .card-content {
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }

        .card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }

        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }

        .pokemon-image {
            width: 140px;
            height: 140px;
            object-fit: contain;
            margin: 0 auto;
            filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
        }

        .pokemon-name {
            font-size: 1.3rem;
            font-weight: 800;
            text-transform: capitalize;
            margin: 0;
            color: #1f2937;
            text-align: center;
        }

        .types-container {
            display: flex;
            gap: 8px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .btn-detail {
            margin-top: auto;
            padding: 10px 16px;
            background: rgba(255, 255, 255, 0.18);
            color: #1f2937;
            border: 2px solid rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            font-weight: 700;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-detail:hover {
            background: white;
            border-color: rgba(0, 0, 0, 0.2);
            transform: scale(1.05);
        }

        @media (max-width: 768px) {
            .pokemon-image {
                width: 120px;
                height: 120px;
            }

            .pokemon-name {
                font-size: 1.1rem;
            }
        }
    `;

    static properties = {
        pokemon: { type: Object }
    };

    constructor() {
        super();
        this.pokemon = null;
        
        this.TYPE_COLORS = {
            electrico: { bg: ['#fff7d6', '#ffe57a'], foreground: '#22110a' },
            fuego: { bg: ['#ffd7cf', '#ff7a4a'], foreground: '#5a1a0a' },
            agua: { bg: ['#dff2ff', '#8ecaff'], foreground: '#01243a' },
            hielo: { bg: ['#e9fbff', '#c8f0ff'], foreground: '#052a35' },
            planta: { bg: ['#e6fbde', '#bff29a'], foreground: '#093214' },
            bicho: { bg: ['#fef9e6', '#d9f2a8'], foreground: '#24310a' },
            normal: { bg: ['#f7f7f7', '#e5e7eb'], foreground: '#0b1a2b' },
            volador: { bg: ['#f2ecff', '#d7d0ff'], foreground: '#120a2a' },
            psiquico: { bg: ['#ffe6fb', '#ffccf2'], foreground: '#2a0526' },
            fantasma: { bg: ['#efe9ff', '#d7d0ff'], foreground: '#160b2b' },
            hada: { bg: ['#fff0fb', '#ffd9f7'], foreground: '#2a0a1a' },
            lucha: { bg: ['#fff0e6', '#ffd2b0'], foreground: '#261306' },
            roca: { bg: ['#faf2e6', '#f0dcbf'], foreground: '#2b1608' },
            tierra: { bg: ['#fff4e6', '#f3d9b0'], foreground: '#291608' },
            veneno: { bg: ['#fff0f0', '#ffdfe6'], foreground: '#2a0a1a' },
            oscuro: { bg: ['#f2f2f4', '#d7d7da'], foreground: '#0b0b0b' },
            acero: { bg: ['#f4f7f9', '#e6eef5'], foreground: '#08101a' },
            dragon: { bg: ['#eef6ff', '#d6edff'], foreground: '#08213a' },
            default: { bg: ['#ffffff', '#f0f4f8'], foreground: '#0b1a2b' }
        };
    }

    normalizeType(type) {
        return type ? type.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";
    }

    getColors() {
        if (!this.pokemon || !this.pokemon.types) return this.TYPE_COLORS.default;
        const primaryType = this.normalizeType(this.pokemon.types[0]);
        return this.TYPE_COLORS[primaryType] || this.TYPE_COLORS.default;
    }

    handleViewDetail(e) {
        e.stopPropagation();
        this.dispatchEvent(new CustomEvent('view-detail', {
            bubbles: true,
            composed: true,
            detail: { pokemon: this.pokemon }
        }));
    }

    render() {
        if (!this.pokemon) return html``;

        const colors = this.getColors();
        
        return html`
            <style>
                .card {
                    background: linear-gradient(135deg, ${unsafeCSS(colors.bg[0])} 0%, ${unsafeCSS(colors.bg[1])} 100%);
                }
            </style>
            
            <div class="card" @click=${this.handleViewDetail}>
                <div class="card-content">

                    <img 
                        class="pokemon-image" 
                        src="${this.pokemon.image}" 
                        alt="${this.pokemon.name}"
                    >

                    <h3 class="pokemon-name">${this.pokemon.name}</h3>

                    <div class="types-container">
                        ${this.pokemon.types.map(type => html`
                            <type-badge .type=${type} size="small" transparent></type-badge>
                        `)}
                    </div>

                    <button class="btn-detail" @click=${this.handleViewDetail}>
                        Ver Detalle →
                    </button>
                </div>
            </div>
        `;
    }
}

customElements.define('pokemon-card-mini', PokemonCardMini);