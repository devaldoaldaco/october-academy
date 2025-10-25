export class FlipButton extends HTMLElement {
  static template = null;

  constructor() {
    super();
    this.label = '';
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return [ 'label' ];
  }

  async connectedCallback() {
    await this.loadTemplate();
    this.render();

    this.setupListeners();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
    
    if (oldValue !== newValue) this.updateContent();
  }

  async loadTemplate() {
    if (!FlipButton.template) {
      const response = await fetch('./components/pokemon-card/flip-button/flip-button.html');
      FlipButton.template = await response.text();
    }
  }

  render() {
    this.shadowRoot.innerHTML = FlipButton.template;
    this.updateContent();
  }

  updateContent() {
    const flipButton = this.shadowRoot.querySelector('.flip-button');

    if (flipButton) flipButton.textContent = this.label;
  }

  setupListeners() {
    const button = this.shadowRoot.querySelector('button');

    if (button) {
      button.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('flip-card', {
          bubbles: true,
          composed: true
        }))
      })
    }
  }
}