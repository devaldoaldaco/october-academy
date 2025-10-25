import { LitElement, html, css } from "lit";

export class CarrosulImages extends LitElement {
  static properties = {
    images: { type: Array },
    hideButton: { type: Boolean },
    currentIndex: { type: Number },
  };

  constructor() {
    super();
    this.images = [];
    this.hideButton = false;
    this.currentIndex = 0; // índice actual
  }

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      text-align: center;
    }

    .carousel-container {
      position: relative;
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }

    img {
      width: 250px;
      height: 250px;
      border-radius: 10px;
      object-fit: cover;
      transition: opacity 0.5s ease-in-out;
    }

    button {
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 8px 15px;
      margin: 10px;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }
  `;

  willUpdate(changed) {
    if (changed.has("images")) {
      this.currentIndex = 0;
      console.log("Imágenes actualizadas:", this.images);
    }
  }

  _nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  _prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  render() {
    // Si no hay imágenes
    if (!this.images?.length) {
      return html`<p>No hay imágenes disponibles</p>`;
    }

    const currentImage = this.images[this.currentIndex];

    return html`
      <div class="carousel-container">
        <img src="${currentImage}" alt="imagen del carrusel" />
      </div>

      ${!this.hideButton
        ? html`
            <div>
              <button @click=${this._prevImage}>Anterior</button>
              <button @click=${this._nextImage}>Siguiente</button>
            </div>
          `
        : null}
    `;
  }
}

customElements.define("carrosul-images", CarrosulImages);
