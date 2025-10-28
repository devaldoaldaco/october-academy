import { LitElement, html, css } from 'lit';

/**
 * LoadingSpinner - Spinner de carga animado
 */
class LoadingSpinner extends LitElement {
    static styles = css`
        :host {
            display: block;
            text-align: center;
            padding: 20px;
        }

        .spinner-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
        }

        .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #e5e7eb;
            border-top-color: #3b82f6;
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
            width: 50px;
            height: 50px;
            background: 
                linear-gradient(to bottom, #ef4444 50%, white 50%);
            border: 4px solid #1f2937;
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
            width: 16px;
            height: 16px;
            background: white;
            border: 3px solid #1f2937;
            border-radius: 50%;
            z-index: 2;
        }

        .pokeball::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            width: 100%;
            height: 4px;
            background: #1f2937;
            transform: translateY(-50%);
            z-index: 1;
        }

        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-15px);
            }
        }
    `;

    static properties = {
        type: { type: String },
        message: { type: String }
    };

    constructor() {
        super();
        this.type = 'spinner'; // 'spinner' o 'pokeball'
        this.message = 'Cargando pokémon...';
    }

    render() {
        return html`
            <div class="spinner-container">
                ${this.type === 'pokeball' 
                    ? html`<div class="pokeball"></div>`
                    : html`<div class="spinner"></div>`
                }
                <div class="spinner-text">${this.message}</div>
            </div>
        `;
    }
}

customElements.define('loading-spinner', LoadingSpinner);