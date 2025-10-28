import { LitElement, html, css, unsafeCSS } from 'lit';
import '../ui/pokemon-stats.js';
import '../ui/pokemon-abilities.js';
import '../ui/type-badge.js';
import '../ui/loading-spinner.js';

class DetailScreen extends LitElement {
    static styles = css`
        :host {
            display: block;
            width: 100%;
            min-height: 100vh;
        }

        .detail-screen {
            min-height: 100vh;
            padding: 30px 20px;
            animation: slideIn 0.4s ease;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .detail-container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(14, 20, 30, 0.1);
            overflow: hidden;
        }

        .detail-header {
            padding: 40px 30px;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }

        .back-button {
            position: absolute;
            top: 20px;
            left: 20px;
            padding: 10px 20px;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 12px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .back-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .pokemon-image {
            width: 280px;
            height: 280px;
            object-fit: contain;
            filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15));
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }

        .pokemon-name {
            font-size: 3rem;
            font-weight: 900;
            text-transform: capitalize;
            margin: 0;
            letter-spacing: 1px;
            color: rgba(0, 0, 0, 0.85);
        }

        .pokemon-id {
            font-size: 1.2rem;
            color: rgba(0, 0, 0, 0.5);
            font-weight: 600;
        }

        .types-container {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            justify-content: center;
        }

        .detail-body {
            padding: 30px;
            background: #f9fafb;
            display: flex;
            flex-direction: column;
            gap: 30px;
        }

        .section-title {
            font-size: 1.5rem;
            font-weight: 800;
            margin: 0 0 15px 0;
            color: #1f2937;
        }

        .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 400px;
        }

        @media (max-width: 768px) {
            .detail-screen {
                padding: 20px 16px;
            }

            .pokemon-image {
                width: 200px;
                height: 200px;
            }

            .pokemon-name {
                font-size: 2rem;
            }

            .detail-header {
                padding: 30px 20px;
            }

            .detail-body {
                padding: 20px;
            }
        }
    `;

    static properties = {
        pokemon: { type: Object },
        pokemonId: { type: String },
        loading: { type: Boolean }
    };

    constructor() {
        super();
        this.pokemon = null;
        this.pokemonId = null;
        this.loading = false;
        
        this.TYPE_COLORS = {
            electrico: { bg: '#fff7d6', foreground: '#22110a' },
            fuego: { bg: '#ffd7cf', foreground: '#5a1a0a' },
            agua: { bg: '#dff2ff', foreground: '#01243a' },
            hielo: { bg: '#e9fbff', foreground: '#052a35' },
            planta: { bg: '#e6fbde', foreground: '#093214' },
            bicho: { bg: '#fef9e6', foreground: '#24310a' },
            normal: { bg: '#f7f7f7', foreground: '#0b1a2b' },
            volador: { bg: '#f2ecff', foreground: '#120a2a' },
            psiquico: { bg: '#ffe6fb', foreground: '#2a0526' },
            fantasma: { bg: '#efe9ff', foreground: '#160b2b' },
            hada: { bg: '#fff0fb', foreground: '#2a0a1a' },
            lucha: { bg: '#fff0e6', foreground: '#261306' },
            roca: { bg: '#faf2e6', foreground: '#2b1608' },
            tierra: { bg: '#fff4e6', foreground: '#291608' },
            veneno: { bg: '#fff0f0', foreground: '#2a0a1a' },
            oscuro: { bg: '#f2f2f4', foreground: '#0b0b0b' },
            acero: { bg: '#f4f7f9', foreground: '#08101a' },
            dragon: { bg: '#eef6ff', foreground: '#08213a' },
            default: { bg: '#ffffff', foreground: '#0b1a2b' }
        };
    }

    updated(changedProperties) {
        if (changedProperties.has('pokemonId') && this.pokemonId && !this.pokemon) {
            this.loadPokemonById();
        }
    }

    async loadPokemonById() {
        if (!this.pokemonId) return;
        
        this.loading = true;
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokemonId}/`);
            if (!res.ok) throw new Error('Pokemon not found');
            const p = await res.json();
            
            const image = p.sprites?.other?.['official-artwork']?.front_default || 
                         p.sprites?.front_default || '';
            const stats = p.stats?.map(s => ({
                name: s.stat?.name || '',
                value: s.base_stat || 0
            })) || [];
            const abilities = p.abilities?.map(a => a.ability?.name || '') || [];
            
            const typesSpanish = [];
            for (const t of (p.types || [])) {
                const urlType = t.type?.url || '';
                const es = urlType ? await this.getTypeSpanishCached(urlType) : (t.type?.name || '');
                typesSpanish.push(es || t.type?.name || '');
            }
            
            this.pokemon = {
                id: p.id,
                name: p.name,
                image,
                stats,
                abilities,
                types: typesSpanish
            };
        } catch (error) {
            console.error('Error loading pokemon:', error);
        } finally {
            this.loading = false;
        }
    }

    typeNameCache = new Map();

    async getTypeSpanishCached(typeUrl) {
        if (!typeUrl) return '';
        if (this.typeNameCache.has(typeUrl)) return this.typeNameCache.get(typeUrl);
        
        try {
            const res = await fetch(typeUrl);
            if (!res.ok) throw new Error("Tipo no encontrado");
            const json = await res.json();
            const nameObj = json.names?.find(n => n.language?.name === 'es');
            const result = nameObj?.name || json.name || '';
            this.typeNameCache.set(typeUrl, result);
            return result;
        } catch (err) {
            this.typeNameCache.set(typeUrl, '');
            return '';
        }
    }

    normalizeType(type) {
        return type ? type.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";
    }

    getColors() {
        if (!this.pokemon || !this.pokemon.types) return this.TYPE_COLORS.default;
        const primaryType = this.normalizeType(this.pokemon.types[0]);
        return this.TYPE_COLORS[primaryType] || this.TYPE_COLORS.default;
    }

    handleBack() {
        this.dispatchEvent(new CustomEvent('back-to-dashboard', {
            bubbles: true,
            composed: true
        }));
    }

    render() {
        if (this.loading) {
            return html`
                <div class="detail-screen">
                    <div class="detail-container">
                        <div class="loading-container">
                            <loading-spinner message="Cargando pokémon..."></loading-spinner>
                        </div>
                    </div>
                </div>
            `;
        }

        if (!this.pokemon) {
            return html`
                <div class="detail-screen">
                    <div class="detail-container">
                        <div class="loading-container">
                            <p>Pokémon no encontrado</p>
                            <button @click=${this.handleBack}>Volver</button>
                        </div>
                    </div>
                </div>
            `;
        }

        const colors = this.getColors();
        
        return html`
            <style>
                .detail-header {
                    background: linear-gradient(135deg, ${unsafeCSS(colors.bg)} 0%, ${unsafeCSS(colors.bg)}dd 100%);
                    color: ${unsafeCSS(colors.foreground)};
                }
            </style>

            <div class="detail-screen">
                <div class="detail-container">
                    <div class="detail-header">
                        <button class="back-button" @click=${this.handleBack}>
                            ← Volver
                        </button>

                        <img 
                            class="pokemon-image" 
                            src="${this.pokemon.image}" 
                            alt="${this.pokemon.name}"
                        >

                        <h1 class="pokemon-name">${this.pokemon.name}</h1>
                        <p class="pokemon-id">#${String(this.pokemon.id).padStart(3, '0')}</p>

                        <div class="types-container">
                            ${this.pokemon.types.map(type => html`
                                <type-badge .type=${type} transparent></type-badge>
                            `)}
                        </div>
                    </div>

                    <div class="detail-body">
                        <div>
                            <h2 class="section-title">Estadísticas</h2>
                            <pokemon-stats .stats=${this.pokemon.stats}></pokemon-stats>
                        </div>

                        <div>
                            <h2 class="section-title">Habilidades</h2>
                            <pokemon-abilities .abilities=${this.pokemon.abilities}></pokemon-abilities>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('detail-screen', DetailScreen);