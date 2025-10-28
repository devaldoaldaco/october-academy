import { LitElement, html, css } from 'lit';
import '../ui/login-form.js';
import '../ui/logo-header.js';

class LoginScreen extends LitElement {
    static styles = css`
        :host {
            display: block;
            width: 100%;
            min-height: 100vh;
        }

        .login-screen {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            animation: fadeInUp 0.6s ease;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .login-container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(14, 20, 30, 0.15);
            padding: 40px;
            width: 100%;
            max-width: 420px;
        }

        @media (max-width: 420px) {
            .login-container {
                padding: 30px 20px;
            }
        }
    `;

    handleLogin(e) {
        this.dispatchEvent(new CustomEvent('login-success', {
            bubbles: true,
            composed: true,
            detail: e.detail
        }));
    }

    render() {
        return html`
            <div class="login-screen">
                <div class="login-container">
                    <logo-header 
                        title="POKÉDEX" 
                        subtitle="Inicia sesión para continuar">
                    </logo-header>
                    
                    <login-form @login-success=${this.handleLogin}></login-form>
                </div>
            </div>
        `;
    }
}

customElements.define('login-screen', LoginScreen);