import { LitElement, html, css } from 'lit';

export class LoadingSpinner extends LitElement {
    static styles = css`
        :host {
            display: block;
            width: 100%;
            text-align: center;
            padding: 18px;
        }

        .spinner-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
        }

        .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #e5e7eb;
            border-top-color: #ff3d3d;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }

        .spinner-text {
            color: #6b7280;
            font-weight: 600;
            font-size: 0.95rem;
        }

        .pokeball {
            width: 40px;
            height: 40px;
            background: 
                linear-gradient(to bottom, #ff3d3d 50%, white 50%),
                radial-gradient(circle at center, white 20%, transparent 20%);
            border: 3px solid #000;
            border-radius: 50%;
            position: relative;
            animation: bounce 0.6s ease-in-out infinite;
        }

        .pokeball::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 12px;
            height: 12px;
            background: white;
            border: 2px solid #000;
            border-radius: 50%;
        }

        .pokeball::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 3px;
            background: #000;
            transform: translateY(-50%);
        }

        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }

        .use-pokeball .spinner {
            display: none;
        }

        .use-pokeball .pokeball {
            display: block;
        }

        .pokeball {
            display: none;
        }
    `;

    static properties = {
        type: { type: String }
    };

    constructor() {
        super();
        this.type = 'spinner';
    }

    render() {
        return html`
            <div class="spinner-container ${this.type === 'pokeball' ? 'use-pokeball' : ''}">
                <div class="spinner"></div>
                <div class="pokeball"></div>
                <div class="spinner-text">Cargando pokémon...</div>
            </div>
        `;
    }
}

//customElements.define('loading-spinner', LoadingSpinner);