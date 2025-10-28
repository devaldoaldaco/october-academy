import { LitElement, html, css, unsafeCSS } from 'lit';

export class PokemonCard extends LitElement {
    static properties = {
        pokemonData: { type: Object },
        flipped: { type: Boolean }
    };

    constructor() {
        super();
        this.pokemonData = null;
        this.flipped = false;
        
        this.TYPE_COLORS = {
            electrico: { bg: ['#fff7d6', '#ffe57a'], progress: ['#ffd54a', '#ffcc33'], foreground: '#22110a' },
            fuego: { bg: ['#ffd7cf', '#ff7a4a'], progress: ['#ff6b4a', '#ff3d3d'], foreground: '#ffffff' },
            agua: { bg: ['#dff2ff', '#8ecaff'], progress: ['#4da6ff', '#1e90ff'], foreground: '#01243a' },
            hielo: { bg: ['#e9fbff', '#c8f0ff'], progress: ['#9fe9ff', '#6fe3ff'], foreground: '#052a35' },
            planta: { bg: ['#e6fbde', '#bff29a'], progress: ['#6fe58b', '#2fb86d'], foreground: '#093214' },
            bicho: { bg: ['#fef9e6', '#d9f2a8'], progress: ['#c0e86b', '#86d43b'], foreground: '#24310a' },
            normal: { bg: ['#f7f7f7', '#e5e7eb'], progress: ['#c9c9c9', '#9b9b9b'], foreground: '#0b1a2b' },
            volador: { bg: ['#f2ecff', '#d7d0ff'], progress: ['#b7a6ff', '#8f7bff'], foreground: '#120a2a' },
            psiquico: { bg: ['#ffe6fb', '#ffccf2'], progress: ['#ff8adf', '#ff5fc3'], foreground: '#2a0526' },
            fantasma: { bg: ['#efe9ff', '#d7d0ff'], progress: ['#a38bff', '#7a5bff'], foreground: '#160b2b' },
            hada: { bg: ['#fff0fb', '#ffd9f7'], progress: ['#ff9fd9', '#ff6fbf'], foreground: '#2a0a1a' },
            lucha: { bg: ['#fff0e6', '#ffd2b0'], progress: ['#ff9a66', '#ff7044'], foreground: '#261306' },
            roca: { bg: ['#faf2e6', '#f0dcbf'], progress: ['#d6b07a', '#b98b4a'], foreground: '#2b1608' },
            tierra: { bg: ['#fff4e6', '#f3d9b0'], progress: ['#e6b77a', '#d08b4a'], foreground: '#291608' },
            veneno: { bg: ['#fff0f0', '#ffdfe6'], progress: ['#e08abf', '#c85fa0'], foreground: '#2a0a1a' },
            oscuro: { bg: ['#f2f2f4', '#d7d7da'], progress: ['#a3a3a6', '#7f7f83'], foreground: '#0b0b0b' },
            acero: { bg: ['#f4f7f9', '#e6eef5'], progress: ['#9fb6c9', '#7da0b7'], foreground: '#08101a' },
            dragon: { bg: ['#eef6ff', '#d6edff'], progress: ['#7fbfff', '#3f93ff'], foreground: '#08213a' },
            default: { bg: ['#ffffff', '#f0f4f8'], progress: ['#d1d9e0', '#9aa4b0'], foreground: '#0b1a2b' }
        };

        this.TYPE_IMAGES = {
            planta: "planta.svg", bicho: "planta.svg",
            fuego: "fuego.svg",
            agua: "agua.svg", hielo: "agua.svg",
            electrico: "electrico.svg", "eléctrico": "electrico.svg",
            psiquico: "psiquico.svg", psíquico: "psiquico.svg",
            fantasma: "psiquico.svg",
            hada: "hada.svg",
            lucha: "lucha.svg", roca: "lucha.svg", rocas: "lucha.svg", tierra: "lucha.svg",
            normal: "incoloro.svg", volador: "incoloro.svg",
            siniestro: "oscuro.svg", veneno: "oscuro.svg",
            acero: "metalico.svg", dragon: "dragon.svg", "dragón": "dragon.svg"
        };

        this.IMAGE_PATH = "./elementos/";
    }

    static get styles() {
        return css`
            :host {
                display: block;
            }

            .card-pokemon {
                perspective: 1200px;
                user-select: none;
                cursor: pointer;
                height: 100%;
            }

            .card-inner {
                position: relative;
                min-height: 380px;
                height: 100%;
                width: 100%;
                border-radius: 14px;
                transform-style: preserve-3d;
                transition: transform 0.75s cubic-bezier(0.2, 0.9, 0.3, 1);
                box-shadow: 0 8px 28px rgba(14, 20, 30, 0.08);
                border: 1px solid rgba(6, 12, 20, 0.03);
            }

            @media (hover: hover) and (pointer: fine) {
                .card-pokemon:hover .card-inner {
                    transform: translateY(-6px) rotateY(8deg);
                }
                .card-pokemon:hover .card-front {
                    transform: translateZ(24px);
                }
            }

            .card-pokemon.flipped .card-inner {
                transform: rotateY(180deg);
            }

            .card-front, .card-back {
                position: absolute;
                inset: 0;
                border-radius: inherit;
                backface-visibility: hidden;
                display: flex;
                flex-direction: column;
                gap: 10px;
                padding: 16px;
            }

            .card-front {
                align-items: center;
                justify-content: flex-start;
                padding-top: 18px;
                box-shadow: inset 0 -32px 60px rgba(255, 255, 255, 0.12);
            }

            .poke-img {
                width: 160px;
                height: 160px;
                object-fit: contain;
                filter: drop-shadow(0 10px 18px rgba(5, 10, 20, 0.08));
            }

            .poke-name {
                margin: 6px 0 0;
                font-weight: 800;
                font-size: 1.15rem;
                text-transform: capitalize;
                letter-spacing: 0.4px;
            }

            .types {
                display: flex;
                gap: 8px;
                margin-top: 10px;
                align-items: center;
                justify-content: center;
                flex-wrap: nowrap;
                width: 100%;
                overflow-x: auto;
                padding: 4px 0;
            }

            .types::-webkit-scrollbar {
                height: 4px;
            }

            .types::-webkit-scrollbar-thumb {
                background: rgba(0, 0, 0, 0.1);
                border-radius: 2px;
            }

            .type-badge {
                display: flex;
                gap: 6px;
                align-items: center;
                padding: 5px 10px;
                border-radius: 999px;
                background: rgba(255, 255, 255, 0.18);
                backdrop-filter: blur(4px);
                border: 1px solid rgba(255, 255, 255, 0.12);
                box-shadow: 0 6px 18px rgba(6, 12, 20, 0.04);
                min-width: fit-content;
                flex-shrink: 0;
            }

            .type-badge img {
                width: 24px;
                height: 24px;
            }

            .type-badge span {
                font-weight: 700;
                font-size: 0.8rem;
                text-transform: capitalize;
                color: rgba(8, 12, 18, 0.95);
                white-space: nowrap;
            }

            .card-back {
                background: linear-gradient(180deg, #ffffff, #fbfdff);
                transform: rotateY(180deg);
                padding: 16px;
                overflow: auto;
                color: #22333b;
            }

            .stats-title {
                margin: 0;
                font-size: 1rem;
                font-weight: 800;
            }

            .abilities-title {
                margin: 6px 0 0;
                font-size: 0.95rem;
                font-weight: 700;
            }

            .separator {
                border: 0;
                height: 1px;
                background: linear-gradient(90deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.02));
                margin: 8px 0 12px;
            }

            .stat {
                display: flex;
                align-items: center;
                gap: 10px;
                margin: 8px 0;
            }

            .stat-label {
                width: 90px;
                font-size: 0.9rem;
                color: #2b3a4a;
            }

            .progress-bar {
                flex: 1;
                height: 12px;
                background: linear-gradient(90deg, rgba(10, 20, 30, 0.06), rgba(10, 20, 30, 0.02));
                border-radius: 999px;
                overflow: hidden;
                box-shadow: inset 0 -2px 6px rgba(0, 0, 0, 0.03);
            }

            .progress-fill {
                height: 100%;
                border-radius: 999px;
                transition: width 0.6s ease;
            }

            .stat-value {
                width: 34px;
                text-align: right;
                font-weight: 700;
                color: #22333b;
            }

            .ability {
                padding: 8px 10px;
                background: #fcfdff;
                border-radius: 8px;
                border: 1px solid rgba(15, 20, 30, 0.03);
                box-shadow: 0 6px 18px rgba(14, 20, 30, 0.03);
                margin-bottom: 8px;
                font-weight: 600;
                color: #243140;
            }

            @media (max-width: 420px) {
                .card-inner {
                    min-height: 360px;
                }
                .poke-img {
                    width: 140px;
                    height: 140px;
                }
            }
        `;
    }

    normalizeType(type) {
        return type ? type.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";
    }

    getColors() {
        if (!this.pokemonData || !this.pokemonData.types) return this.TYPE_COLORS.default;
        const primaryType = this.normalizeType(this.pokemonData.types[0] || 'default');
        return this.TYPE_COLORS[primaryType] || this.TYPE_COLORS.default;
    }

    handleClick() {
        this.flipped = !this.flipped;
    }

    render() {
        if (!this.pokemonData) return html``;

        const colors = this.getColors();
        
        const dynamicStyles = css`
            .card-inner {
                background: linear-gradient(180deg, ${unsafeCSS(colors.bg[0])}, ${unsafeCSS(colors.bg[1])});
            }
            .card-front, .card-back {
                color: ${unsafeCSS(colors.foreground)};
            }
            .progress-fill {
                background: linear-gradient(90deg, ${unsafeCSS(colors.progress[0])}, ${unsafeCSS(colors.progress[1])});
            }
        `;

        return html`
            <style>${dynamicStyles}</style>
            <div class="card-pokemon ${this.flipped ? 'flipped' : ''}" @click=${this.handleClick}>
                <div class="card-inner">
                    ${this.renderFront()}
                    ${this.renderBack()}
                </div>
            </div>
        `;
    }

    renderFront() {
        return html`
            <section class="card-front">
                <img class="poke-img" src="${this.pokemonData.image}" alt="${this.pokemonData.name}">
                <div class="poke-name">${this.pokemonData.name}</div>
                <div class="types">
                    ${this.pokemonData.types.map(type => this.renderTypeBadge(type))}
                </div>
            </section>
        `;
    }

    renderTypeBadge(type) {
        const normalizedType = this.normalizeType(type);
        const imageName = this.TYPE_IMAGES[normalizedType];
        const imagePath = imageName ? `${this.IMAGE_PATH}${imageName}` : '';
        
        return html`
            <div class="type-badge">
                ${imagePath ? html`<img src="${imagePath}" alt="${type}">` : ''}
                <span>${type}</span>
            </div>
        `;
    }

    renderBack() {
        return html`
            <section class="card-back">
                <h3 class="stats-title">Estadísticas</h3>
                <hr class="separator">
                ${this.pokemonData.stats.map(stat => this.renderStat(stat))}
                <h4 class="abilities-title">Habilidades</h4>
                <hr class="separator">
                ${this.pokemonData.abilities.map(ability => html`
                    <div class="ability">${ability}</div>
                `)}
            </section>
        `;
    }

    renderStat(stat) {
        const percentage = Math.max(0, Math.min(100, Math.round((stat.value / 150) * 100)));
        
        return html`
            <div class="stat">
                <div class="stat-label">${stat.name}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <div class="stat-value">${stat.value}</div>
            </div>
        `;
    }
}

//customElements.define('pokemon-card', PokemonCard);