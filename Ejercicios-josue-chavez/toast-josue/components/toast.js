import { html, css, LitElement } from "lit";

export class ToastJosue extends LitElement {
    static properties = {
        type: { 
            type: String, 
            reflect: false,
        },
        message: { 
            type: String, 
            reflect: true,
        },
        duration: { 
            type: Number, 
            reflect: true,
            converter: (value) => Number(value) || 3000
        }
    };

    static styles = css`
        :host {
            display: block;
            position: fixed;
            top: 20px;
            right: 20px;
            animation: slideIn 0.3s ease;
        }

        .toast {
            min-width: 320px;
            padding: 16px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 12px;
            position: relative;
            overflow: hidden;
        }

        :host([type="success"]) .toast {
            background: #10b981;
            color: white;
        }

        :host([type="error"]) .toast {
            background: #ef4444;
            color: white;
        }

        :host([type="warning"]) .toast {
            background: #f59e0b;
            color: white;
        }

        :host([type="info"]) .toast {
            background: #3b82f6;
            color: white;
        }

        .icon {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
        }

        .message {
            flex: 1;
            font-size: 14px;
            font-weight: 500;
        }

        .close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 4px;
            display: flex;
            opacity: 0.8;
        }

        .close:hover {
            opacity: 1;
        }

        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        :host(.closing) {
            animation: slideOut 0.3s ease forwards;
        }

        @keyframes slideOut {
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;

    constructor() {
        super();
        this.type = 'info';
        this.message = 'Notificación';
        this.duration = 3000;
    }

    connectedCallback() {
        super.connectedCallback();
        this._startTimer();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._clearTimer();
    }

    _startTimer() {
        if (this.duration > 0) {
            this._timeout = setTimeout(() => {
                this._close();
            }, this.duration);
        }
    }

    _clearTimer() {
        if (this._timeout) {
            clearTimeout(this._timeout);
        }
    }

    _close() {
        this._clearTimer();
        this.classList.add('closing');
        setTimeout(() => this.remove(), 300);
    }

    _getIcon() {
        const icons = {
            success: html`<svg class="icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>`,
            error: html`<svg class="icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>`,
            warning: html`<svg class="icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>`,
            info: html`<svg class="icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/></svg>`
        };
        return icons[this.type];
    }

    render() {
        return html`
            <div class="toast">
                ${this._getIcon()}
                <div class="message">${this.message}</div>
                <button class="close" @click=${this._close}>
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                </button>
            </div>
        `;
    }
}