import { LitElement, html, css } from 'lit';

class LoginForm extends LitElement {
    static styles = css`
        :host {
            display: block;
        }

        .login-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .form-group label {
            font-weight: 700;
            font-size: 0.9rem;
            color: #374151;
        }

        .form-group input {
            padding: 12px 16px;
            border: 2px solid #e5e7eb;
            border-radius: 10px;
            font-size: 1rem;
            font-family: inherit;
            transition: all 0.3s ease;
            background: #f9fafb;
        }

        .form-group input:focus {
            outline: none;
            border-color: #ff3d3d;
            background: white;
            box-shadow: 0 0 0 3px rgba(255, 61, 61, 0.1);
        }

        .error-message {
            padding: 12px;
            background: #fee;
            border: 1px solid #fcc;
            border-radius: 8px;
            color: #c00;
            font-size: 0.9rem;
            font-weight: 600;
            text-align: center;
            display: none;
        }

        .error-message.show {
            display: block;
            animation: shake 0.4s ease;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }

        .btn-login {
            padding: 14px 24px;
            background: #ff3d3d;
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(255, 61, 61, 0.3);
        }

        .btn-login:hover {
            background: #e62e2e;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 61, 61, 0.4);
        }

        .btn-login:active {
            transform: translateY(0);
        }
    `;

    static properties = {
        errorMessage: { type: String },
        showError: { type: Boolean }
    };

    constructor() {
        super();
        this.errorMessage = '';
        this.showError = false;
        this.VALID_USER = 'admin';
        this.VALID_PASSWORD = 'admin';
    }

    get _errorIcon() {
        return html`
            <svg xmlns="http://www.w3.org/2000/svg" width="0.9rem" height="0.9rem" viewBox="0 0 48 48"><rect width="48" height="48" fill="none"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="m6 11l5-5l13 13L37 6l5 5l-13 13l13 13l-5 5l-13-13l-13 13l-5-5l13-13z" clip-rule="evenodd"/></svg>
        `;
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const username = formData.get('username').trim();
        const password = formData.get('password');
        
        if (username === this.VALID_USER && password === this.VALID_PASSWORD) {
            this.dispatchEvent(new CustomEvent('login-success', {
                bubbles: true,
                composed: true,
                detail: { username }
            }));
        } else {
            this.errorMessage = 'Usuario o contraseña incorrectos';
            this.showError = true;

            form.elements.username.value = '';
            form.elements.password.value = '';
            form.elements.username.focus();
            
            setTimeout(() => {
                this.showError = false;
            }, 3000);
        }
    }

    render() {
        return html`
            <form class="login-form" @submit=${this.handleSubmit}>
                <div class="form-group">
                    <label for="username">Usuario</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        placeholder="Ingresa tu usuario"
                        autocomplete="username"
                        required
                    >
                </div>
                
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Ingresa tu contraseña"
                        autocomplete="current-password"
                        required
                    >
                </div>
                
                <div class="error-message ${this.showError ? 'show' : ''}">
                    ${this._errorIcon} 
                    <span>${this.errorMessage}</span>
                </div>
                
                <button type="submit" class="btn-login">
                    <span>Iniciar Sesión</span>
                </button>
            </form>
        `;
    }
}

customElements.define('login-form', LoginForm);