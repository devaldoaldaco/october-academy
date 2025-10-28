import { LitElement, html, css } from 'lit';

class LogoHeader extends LitElement {
    static styles = css`
        :host {
            display: block;
            text-align: center;
            margin-bottom: 30px;
        }

        .logo-pokemon {
            width: 120px;
            height: 120px;
            object-fit: contain;
            filter: drop-shadow(0 10px 25px rgba(255, 193, 7, 0.3));
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
        }

        .title {
            margin: 15px 0 5px;
            font-size: 2rem;
            font-weight: 800;
            letter-spacing: 1px;
            color: #0b1a2b;
        }

        .subtitle {
            margin: 0;
            color: #6b7280;
            font-size: 0.95rem;
        }

        @media (max-width: 420px) {
            .logo-pokemon {
                width: 100px;
                height: 100px;
            }
            
            .title {
                font-size: 1.6rem;
            }
        }
    `;

    static properties = {
        title: { type: String },
        subtitle: { type: String },
        imageUrl: { type: String }
    };

    constructor() {
        super();
        this.title = 'POKÉDEX';
        this.subtitle = '';
        this.imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';
    }

    render() {
        return html`
            <img src="${this.imageUrl}" alt="Pikachu" class="logo-pokemon">
            <h1 class="title">${this.title}</h1>
            ${this.subtitle ? html`<p class="subtitle">${this.subtitle}</p>` : ''}
        `;
    }
}

customElements.define('logo-header', LogoHeader);