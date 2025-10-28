import { LitElement, html, css } from 'lit';
import './pokemon-card-mini.js';
import './loading-spinner.js';

class PokemonGrid extends LitElement {
    static styles = css`
        :host {
            display: block;
            width: 100%;
        }

        .grid-container {
            display: grid;
            gap: 20px;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            margin-bottom: 40px;
            /* evita el estiramiento vertical de los items para que el gap funcione correctamente 
            align-items: start;*/
        }

        .sentinel {
            width: 100%;
            height: 1px;
        }

        .end-message {
            text-align: center;
            padding: 20px;
            color: #6b7280;
            font-weight: 600;
            font-size: 1.1rem;
        }

        loading-spinner {
            display: block;
            margin: 20px 0;
        }

        @media (max-width: 768px) {
            .grid-container {
                grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                gap: 16px;
            }
        }
    `;

    static properties = {
        pokemonList: { type: Array },
        loading: { type: Boolean },
        reachedEnd: { type: Boolean }
    };

    constructor() {
        super();
        this.pokemonList = [];
        this.loading = false;
        this.reachedEnd = false;
        
        this.BATCH_SIZE = 20;
        this.MAX_POKEMON = 898;
        this.CONCURRENCY_LIMIT = 6;
        this.API_BASE = "https://pokeapi.co/api/v2/pokemon/";
        this.nextToLoad = 1;
        this.typeNameCache = new Map();
        this.observer = null;
    }

    firstUpdated() {
        this.setupInfiniteScroll();
        this.loadBatch();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    setupInfiniteScroll() {
        const sentinel = this.shadowRoot.querySelector('.sentinel');
        
        this.observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !this.loading && !this.reachedEnd) {
                        this.loadBatch();
                    }
                });
            },
            { root: null, rootMargin: '400px', threshold: 0.01 }
        );
        
        this.observer.observe(sentinel);
    }

    async loadBatch() {
        if (this.loading || this.reachedEnd) return;
        
        this.loading = true;
        
        const start = this.nextToLoad;
        const end = Math.min(start + this.BATCH_SIZE - 1, this.MAX_POKEMON);
        const ids = Array.from({ length: end - start + 1 }, (_, i) => start + i);
        
        try {
            const results = await this.fetchWithConcurrency(ids);
            const validResults = results.filter(data => data !== null);
            this.pokemonList = [...this.pokemonList, ...validResults];
            
            this.nextToLoad = end + 1;
            
            if (this.nextToLoad > this.MAX_POKEMON) {
                this.reachedEnd = true;
            }
        } catch (error) {
            console.error('Error loading batch:', error);
        } finally {
            this.loading = false;
        }
    }

    async fetchWithConcurrency(ids) {
        const results = [];
        for (let i = 0; i < ids.length; i += this.CONCURRENCY_LIMIT) {
            const chunk = ids.slice(i, i + this.CONCURRENCY_LIMIT);
            const chunkResults = await Promise.all(chunk.map(id => this.fetchPokemon(id)));
            results.push(...chunkResults);
        }
        return results;
    }

    async fetchPokemon(id) {
        const url = `${this.API_BASE}${id}/`;
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Pokémon ${id} no encontrado`);
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
            
            return {
                id: p.id,
                name: p.name,
                image,
                stats,
                abilities,
                types: typesSpanish
            };
        } catch (err) {
            console.warn('Error fetching pokemon:', id, err);
            return null;
        }
    }

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

    handleViewDetail(e) {
        this.dispatchEvent(new CustomEvent('view-detail', {
            bubbles: true,
            composed: true,
            detail: e.detail
        }));
    }

    render() {
        return html`
            <div class="grid-container">
                ${this.pokemonList.map(pokemon => html`
                    <pokemon-card-mini 
                        .pokemon=${pokemon}
                        @view-detail=${this.handleViewDetail}>
                    </pokemon-card-mini>
                `)}
            </div>

            ${this.loading ? html`<loading-spinner></loading-spinner>` : ''}
            
            ${this.reachedEnd 
                ? html`<div class="end-message">🎉 Has visto todos los Pokémon</div>`
                : html`<div class="sentinel"></div>`
            }
        `;
    }
}

customElements.define('pokemon-grid', PokemonGrid);