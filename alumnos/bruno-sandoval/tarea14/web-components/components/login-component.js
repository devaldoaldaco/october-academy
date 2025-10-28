export class LoginComponent extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
    }

    connectedCallback() {
        console.log('se ejecuto connectedCallback');
        this.shadowRoot.innerHTML = '';
        this.render();
    }
    
    disconnectedCallback() {
        console.log('se ejecuto disconnectedCallback');
    }

    render(){
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
            :root{
                --primary-color: rgb(243 244 246);
                --second-color: rgb(107 114 128);
                --tertiary-color: #ffffff;
                --boder-color: rgb(229 231 235);
                --text-primary: rgb(31 41 55);
                --button-boton: #374467;
                --accent-color: #38b2ac;
                --accent-color-hover: #319795;
            }
            .login-card {
                margin: 200px auto;
                max-width: 18rem;
                background-color: var(--tertiary-color, #ffffff);
                padding: 1.5rem;
                border-radius: 0.5rem;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                &>h1 {
                    color: var(--text-primary, #1f2937);
                    margin-top: 0;
                }
                &>form{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                    width: 100%;
                    &>.form-group {
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                        &>label {
                            margin-bottom: 5px;
                            font-size: 0.9rem;
                            color: var(--second-color, #6b7280);
                        }
                        &>input{
                            padding: 10px;
                            border: 1px solid var(--boder-color, #e5e7eb);
                            border-radius: 4px;
                            font-size: 1rem;
                        }
                    }
                    &>button {
                        width: 100%;
                        background-color: var(--button-boton, #374467);
                        color: var(--tertiary-color, #ffffff);
                        padding: 12px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 1rem;
                        font-weight: bold;
                        transition: background-color 0.3s;
                    }
                    &>button:hover {
                        background-color: #4a5a8a; /* Color de hover similar a tu estilo */
                    }
                }
            }
            </style>
            <div class="login-card">
                <h1>Login</h1>
                <form>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" required>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        `;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('form').addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleSubmit(event) {
        event.preventDefault();

        const emailInput = this.shadowRoot.querySelector('#email').value;
        const passwordInput = this.shadowRoot.querySelector('#password').value;

        if (emailInput && passwordInput) {
            this.dispatchEvent(new CustomEvent('login-submit', { 
                detail: { email: emailInput, password: passwordInput }, 
                bubbles: true, //permite que el evento burbujee hacia arriba en el DOM,
                composed: true  //permite que el evento sea escuchado fuera del shadow DOM
            }));
        } else {
            alert("Por favor, ingresa el usuario y la contraseña.");
        }
    }
}
