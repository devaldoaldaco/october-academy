import { css, html, LitElement } from "lit";

export class FlipButton extends LitElement {
  static properties = {
    label: {
      type: String
    }
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :host {
      padding: 10px 20px;
      border-radius: 10px;
    }

    .flip-button {
      padding: 10px 20px;
      border-radius: 10px;
      background: rgba(59, 130, 246, 0.2);
      border: 2px solid #3B82F6;
      color: #3B82F6;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      width: 100%;
    }

    .flip-button:hover {
      background: #3B82F6;
      color: #FFF;
      transform: scale(1.05);
    }
  `;

  constructor() {
    super();
    this.label = '';
  }

  render() {
    return html`
      <button @click=${ this.handleFlip } class="flip-button">
        ${ this.label }
      </button>
    `;
  }

  handleFlip = () => {
    this.dispatchEvent(new CustomEvent('flip-card', {
      bubbles: true,
      composed: true
    }));
  }
}