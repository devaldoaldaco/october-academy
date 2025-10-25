import { POKEMON_TYPES } from "../../../i18n/pokemon-types.js";

export class TypeBadge extends HTMLElement {
  static template = null;

  constructor() {
    super();
    this.type = '';
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return [ 'type' ];
  }

  async connectedCallback() {
    await this.loadTemplate();
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    
    if (oldValue !== newValue) this.updateContent();
  }

  async loadTemplate() {
    if (!TypeBadge.template) {
      const response = await fetch('./components/pokemon-card/type-badge/type-badge.html');
      TypeBadge.template = await response.text();
    }
  }

  render() {
    this.shadowRoot.innerHTML = TypeBadge.template;
    this.updateContent();
  }

  updateContent() {
    const typeBadge = this.shadowRoot.querySelector('span');

    const typeToSpanish = POKEMON_TYPES[this.type];
    
    if (typeBadge) {
      typeBadge.className = 'type-badge';
      typeBadge.textContent = typeToSpanish;
      typeBadge.classList.add(`type-${ this.type }`);
    }
  }
}