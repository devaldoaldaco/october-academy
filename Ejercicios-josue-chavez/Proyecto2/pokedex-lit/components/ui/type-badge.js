import { LitElement, html, css, unsafeCSS } from 'lit';

class TypeBadge extends LitElement {
    static styles = css`
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
    `;

    static properties = {
        type: { type: String }
    };

    constructor() {
        super();
        this.type = '';

        this.TYPE_IMAGES = {
            planta: "planta.svg",
            bicho: "planta.svg",
            fuego: "fuego.svg",
            agua: "agua.svg",
            hielo: "agua.svg",
            electrico: "electrico.svg",
            psiquico: "psiquico.svg",
            fantasma: "psiquico.svg",
            hada: "hada.svg",
            lucha: "lucha.svg",
            roca: "lucha.svg",
            tierra: "lucha.svg",
            normal: "incoloro.svg",
            volador: "incoloro.svg",
            veneno: "oscuro.svg",
            oscuro: "oscuro.svg",
            acero: "metalico.svg",
            dragon: "dragon.svg"
        };

        this.IMAGE_PATH = "../images/elementos/";
    }

    normalizeType(type) {
        return type ? type.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";
    }


    getIcon() {
        const normalized = this.normalizeType(this.type);
        const fileName = this.TYPE_IMAGES[normalized];
        return fileName ? `${this.IMAGE_PATH}${fileName}` : null;
    }

    render() {
        const icon = this.getIcon();
        
        return html`
            <div class="type-badge">
                ${icon ? html`<img src="${icon}" alt="${this.type}">` : ''}
                <span>${this.type}</span>
            </div>
        `;
    }
}

customElements.define('type-badge', TypeBadge);