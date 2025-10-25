import { css, html, LitElement } from "lit";

import { POKEMON_TYPES } from "../../../i18n/pokemon-types";

export class PokemonCardBack extends LitElement {
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

    .card-back {
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      background: linear-gradient(135deg, #334155 0%, #1E293B 100%);
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      overflow-y: auto;
      height: 100%;
    }

    .card-back h3 {
      color: #3B82F6;
      font-size: 1.5rem;
      margin-bottom: 5px;
      text-transform: capitalize;
      text-align: center;
    }

    .detail-section {
      background: rgba(255, 255, 255, 0.05);
      padding: 12px;
      border-radius: 10px;
      border-left: 3px solid #3B82F6;
    }

    .detail-section h4 {
      color: #94A3B8;
      font-size: 0.85rem;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .abilities-list {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .ability-item {
      background: rgba(59, 130, 246, 0.2);
      padding: 5px 12px;
      border-radius: 15px;
      font-size: 0.85rem;
      text-transform: capitalize;
      color: #93C5FD;
      border: 1px solid rgba(59, 130, 246, 0.3);
    }

    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
    }

    .info-label {
      font-size: 0.7rem;
      color: #94A3B8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 3px;
    }

    .info-value {
      font-size: 1rem;
      color: #FFF;
      font-weight: 600;
    }

    .shiny-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(255, 215, 0, 0.1);
      padding: 12px;
      border-radius: 10px;
      border: 2px solid rgba(255, 215, 0, 0.3);
    }

    .shiny-label {
      font-size: 0.9rem;
      color: #FCD34D;
      font-weight: 600;
    }

    .shiny-image {
      width: 70px;
      height: 70px;
      object-fit: contain;
      filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
    }
  `;

  constructor() {
    super();
    this.pokemon = { };
  }

  render() {
    const weight = (this.pokemon.weight / 10).toFixed(1);
    const height = (this.pokemon.height / 10).toFixed(1);

    const types = this.pokemon.types.map(type => POKEMON_TYPES[type]).join(', ');

    return html`
      <div class="card-back">
      <h3>${ this.pokemon.name }</h3>
      
      <div class="detail-section">
        <h4>Habilidades</h4>
        <ul class="abilities-list">
          ${ this.pokemon.abilities.map(ability => html`
            <li class="ability-item">${ ability }</li>  
          `) }
        </ul>
      </div>
      
      <div class="detail-section">
        <h4>Características</h4>
        <div class="info-grid">
          <div class="info-item weight">
            <span class="info-label">Peso</span>
            <span class="info-value">${ weight }</span>
          </div>
          <div class="info-item height">
            <span class="info-label">Altura</span>
            <span class="info-value">${ height }</span>
          </div>
          <div class="info-item types">
            <span class="info-label">Tipos</span>
            <span class="info-value">${ types }</span>
          </div>
          <div class="info-item base-experience">
            <span class="info-label">Experiencia base</span>
            <span class="info-value">${ this.pokemon.baseExperience }</span>
          </div>
        </div>
      </div>
      
      <div class="shiny-container">
        <div>
          <div class="shiny-label">Versión Shiny</div>
        </div>
      
        <img src="${ this.pokemon.spriteShiny }" alt="${ this.pokemon.name } shiny" class="shiny-image">
      </div>

      <flip-button label="Volver"></flip-button>
    </div>
    `;
  }
}