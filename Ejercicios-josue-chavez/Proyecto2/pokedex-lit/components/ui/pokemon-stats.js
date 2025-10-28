import { LitElement, html, css } from 'lit';

class PokemonStats extends LitElement {
    static styles = css`
        :host {
            display: block;
        }

        .stats-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }

        .stat-row {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .stat-name {
            min-width: 120px;
            font-weight: 700;
            font-size: 0.9rem;
            color: #374151;
            text-transform: capitalize;
        }

        .stat-bar {
            flex: 1;
            height: 24px;
            background: #e5e7eb;
            border-radius: 12px;
            overflow: hidden;
            position: relative;
        }

        .stat-fill {
            height: 100%;
            background: linear-gradient(90deg, #3b82f6, #2563eb);
            border-radius: 12px;
            transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 8px;
        }

        .stat-value {
            min-width: 50px;
            text-align: right;
            font-weight: 800;
            font-size: 1rem;
            color: #1f2937;
        }

        .stat-fill-value {
            color: white;
            font-weight: 700;
            font-size: 0.85rem;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        /* Colores según el valor */
        .stat-fill.low {
            background: linear-gradient(90deg, #ef4444, #dc2626);
        }

        .stat-fill.medium {
            background: linear-gradient(90deg, #f59e0b, #d97706);
        }

        .stat-fill.high {
            background: linear-gradient(90deg, #22c55e, #16a34a);
        }

        .stat-fill.very-high {
            background: linear-gradient(90deg, #8b5cf6, #7c3aed);
        }

        @media (max-width: 768px) {
            .stat-name {
                min-width: 100px;
                font-size: 0.85rem;
            }

            .stat-value {
                min-width: 40px;
                font-size: 0.9rem;
            }
        }
    `;

    static properties = {
        stats: { type: Array }
    };

    constructor() {
        super();
        this.stats = [];
    }

    getStatClass(value) {
        if (value >= 120) return 'very-high';
        if (value >= 80) return 'high';
        if (value >= 50) return 'medium';
        return 'low';
    }

    render() {
        if (!this.stats || this.stats.length === 0) {
            return html`<p>No hay estadísticas disponibles</p>`;
        }

        return html`
            <div class="stats-list">
                ${this.stats.map(stat => {
                    const percentage = Math.max(5, Math.min(100, (stat.value / 150) * 100));
                    const statClass = this.getStatClass(stat.value);
                    
                    return html`
                        <div class="stat-row">
                            <div class="stat-name">${stat.name}</div>
                            <div class="stat-bar">
                                <div 
                                    class="stat-fill ${statClass}" 
                                    style="width: ${percentage}%"
                                >
                                    <span class="stat-fill-value">${stat.value}</span>
                                </div>
                            </div>
                            
                        </div>
                    `;
                })}
            </div>
        `;
    }
}

customElements.define('pokemon-stats', PokemonStats);