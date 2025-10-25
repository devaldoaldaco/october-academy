import { css, html, LitElement } from "lit";

import { POKEMON_TYPES } from "../../../i18n/pokemon-types";

export class TypeBadge extends LitElement {
  static properties = {
    type: {
      type: String
    }
  }

  static styles = css`
    .type-badge {
      padding: 6px 16px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: capitalize;
      color: #FFF;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .type-normal { background: #A8A878; }
    .type-fire { background: #F08030; }
    .type-water { background: #6890F0; }
    .type-electric { background: #F8D030; color: #333; }
    .type-grass { background: #78C850; }
    .type-ice { background: #98D8D8; }
    .type-fighting { background: #C03028; }
    .type-poison { background: #A040A0; }
    .type-ground { background: #E0C068; }
    .type-flying { background: #A890F0; }
    .type-psychic { background: #F85888; }
    .type-bug { background: #A8B820; }
    .type-rock { background: #B8A038; }
    .type-ghost { background: #705898; }
    .type-dragon { background: #7038F8; }
    .type-dark { background: #705848; }
    .type-steel { background: #B8B8D0; }
    .type-fairy { background: #EE99AC; }
    .type-unknown { background: #575354ff; }
  `;

  constructor() {
    super();
    this.type = '';
  }

  render() {
    const type = POKEMON_TYPES[this.type] ?? 'Desconocido';
    const typeClass = type === 'Desconocido' ? 'unknown' : this.type;

    return html`
      <span class="type-badge type-${ typeClass }">
        ${ type }
      </span>
    `;
  }
}