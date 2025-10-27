class GridElement extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); 
        this._pokemons = [];
    }

    set pokemons(data) {
        this._pokemons = data;
        this.render();
    }

    get pokemons() {
        return this._pokemons;
    }

    connectedCallback() {
        this.render();
    }
    
    
    get styles() {
        return `
            :host { 
                display: block; 
                padding: 20px 0;
                margin: 0 auto;
                // max-width: 960px;
            }
            .pokemon-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                gap: 16px; 
            }
        `;
    }

    render() {
        if (!this.shadowRoot) return;

        this.shadowRoot.innerHTML = `<style>${this.styles}</style><div class="pokemon-grid" id="card-grid"></div>`;
        
        const gridContainer = this.shadowRoot.getElementById('card-grid');

        if (!this._pokemons || this._pokemons.length === 0) {
            gridContainer.innerHTML = '<p>Cargando Pokémon o lista vacía...</p>';
            return;
        }

        this._pokemons.forEach(pokemon => {
            const card = document.createElement('pokemon-card');
            card.pokemonData = pokemon; 
            gridContainer.appendChild(card);
        });
    }
}

customElements.define('grid-element', GridElement);