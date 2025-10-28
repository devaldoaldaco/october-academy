export class LoginScreen extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.VALID_USER = 'admin';
        this.VALID_PASSWORD = 'admin';
    }

    connectedCallback() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    min-height: 100vh;
                }

                .login-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    background: linear-gradient(180deg, #eef2fb 0%, #f8fbff 100%);
                }

                .login-card {
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(14, 20, 30, 0.15);
                    padding: 40px;
                    width: 100%;
                    max-width: 420px;
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

                .login-header {
                    text-align: center;
                    margin-bottom: 30px;
                }

                .login-pokemon {
                    width: 120px;
                    height: 120px;
                    object-fit: contain;
                    filter: drop-shadow(0 10px 25px rgba(255, 193, 7, 0.3));
                    animation: float 3s ease-in-out infinite;
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-15px);
                    }
                }

                .login-title {
                    margin: 15px 0 5px;
                    font-size: 2rem;
                    font-weight: 800;
                    letter-spacing: 1px;
                    color: #0b1a2b;
                    font-family: 'Times New Roman', Times, serif;
                }

                .login-subtitle {
                    margin: 0;
                    color: #6b7280;
                    font-size: 0.95rem;
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
                    font-family: inherit;
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

                .login-hint {
                    text-align: center;
                    font-size: 0.85rem;
                    color: #6b7280;
                    margin-top: 10px;
                    padding: 10px;
                    background: #f3f4f6;
                    border-radius: 8px;
                }

                .login-hint strong {
                    color: #ff3d3d;
                }

                @media (max-width: 420px) {
                    .login-card {
                        padding: 30px 20px;
                    }
                    
                    .login-pokemon {
                        width: 100px;
                        height: 100px;
                    }
                    
                    .login-title {
                        font-size: 1.6rem;
                    }
                }
            </style>

            <div class="login-container">
                <div class="login-card">
                    <div class="login-header">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" 
                             alt="Pikachu" 
                             class="login-pokemon">
                        <h1 class="login-title">POKÉDEX</h1>
                        <p class="login-subtitle">Inicia sesión para continuar</p>
                    </div>
                    
                    <form class="login-form" id="loginForm">
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
                        
                        <div id="errorMessage" class="error-message"></div>
                        
                        <button type="submit" class="btn-login">
                            <span>Iniciar Sesión</span>
                        </button>
                        
                        <div class="login-hint">
                            💡 Usa: <strong>admin</strong> / <strong>admin</strong>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const form = this.shadowRoot.getElementById('loginForm');
        form.addEventListener('submit', (e) => this.handleLogin(e));
    }

    handleLogin(e) {
        e.preventDefault();
        
        const username = this.shadowRoot.getElementById('username').value.trim();
        const password = this.shadowRoot.getElementById('password').value;
        const errorMsg = this.shadowRoot.getElementById('errorMessage');
        
        if (username === this.VALID_USER && password === this.VALID_PASSWORD) {
            this.dispatchEvent(new CustomEvent('login-success', {
                bubbles: true,
                composed: true,
                detail: { username }
            }));
        } else {
            errorMsg.textContent = '❌ Usuario o contraseña incorrectos';
            errorMsg.classList.add('show');
            
            this.shadowRoot.getElementById('username').value = '';
            this.shadowRoot.getElementById('password').value = '';
            this.shadowRoot.getElementById('username').focus();
            
            setTimeout(() => {
                errorMsg.classList.remove('show');
            }, 3000);
        }
    }
}

