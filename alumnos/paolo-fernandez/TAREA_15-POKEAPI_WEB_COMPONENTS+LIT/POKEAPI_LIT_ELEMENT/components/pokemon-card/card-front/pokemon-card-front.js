import { css, html, LitElement } from "lit";

export class PokemonCardFront extends LitElement {
  static properties = {
    pokemon: {
      type: Object,
      state: true
    }
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .card-front {
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      background: linear-gradient(135deg, #1E293B 0%, #334155 100%);
      display: flex;
      flex-direction: column;
      padding: 20px;
      height: 100%;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .pokemon-number {
      font-size: 0.9rem;
      color: #94A3B8;
      font-weight: 600;
    }

    .pokemon-name {
      font-size: 1.8rem;
      color: #FFF;
      font-weight: 700;
      text-transform: capitalize;
      margin-bottom: 15px;
    }

    .pokemon-image-container {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
      border-radius: 15px;
      margin-bottom: 15px;
      position: relative;
    }

    .pokemon-image {
      width: 200px;
      height: 200px;
      object-fit: contain;
      filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
      transition: transform 0.3s ease;
    }

    .pokemon-types {
      display: flex;
      gap: 10px;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
      height: 30px;
    }
  `;

  constructor() {
    super();
    this.pokemon = { };
  }

  render() {
    return html`
      <div class="card-front">
        <div class="card-header">
          <span class="pokemon-number">${ this.pokemon.id }</span>
        </div>
        
        <h2 class="pokemon-name">${ this.pokemon.name }</h2>
        
        <div class="pokemon-image-container">
          <img src="${ this.pokemon.sprite }" alt="${ this.pokemon.name }" class="pokemon-image">
        </div>
        
        <div class="pokemon-types">
          ${ this.pokemon.types.map(type => html`
            <type-badge type=${ type }></type-badge>  
          `) }
        </div>
        
        <flip-button label="Ver detalles"></flip-button>
      </div>
    `;
  }
}