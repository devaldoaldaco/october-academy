import { css, html, LitElement } from "lit";

export class LoginComponent extends LitElement{
    static properties ={
        nombre: {type : String},
        expectedUsername: {type : String},
        expectedPassword: {type : String},
        inputPassword: { type: String, state: true }
    }

    constructor(){
        super();
        this.nombre = 'Bruno Alejandro';
        this.expectedUsername = '';
        this.expectedPassword = '';
        this.inputPassword = '';
    }

    handlePasswordChange(e) {
        this.inputPassword = e.target.value;
    }

    handleLogin() {
        if (this.inputPassword === this.expectedPassword) {
            this.dispatchEvent(new CustomEvent('loginsuccess', {
                detail: { success: true },
                bubbles: true, composed: true
            }));
        } else {
            alert('Contraseña incorrecta');
            this.inputPassword = '';
            this.requestUpdate();
        }
    }

    static styles = css`
    :host {
        --color-primary: #000552;
        --color-secondary: #121a47;
        --color-ternary: #80ccf0;
        --color-cuarty: #5e85da;
        --color-fifty: #002b4f;
        --color-white: #ffffff;
        color: var(--color-white);
    }
    .background-login {
        background-color: var(--color-secondary);
        max-width: 400px;
        height: 100vh;
        box-sizing: border-box;
        padding: 1rem;

        &>.header {
            padding: 1rem 0 2rem 0;

            &>p {
                text-align: center;
                font-size: 1.5rem;
                margin: 0;
            }
        }

        &>.body {
            width: 100%;
            display: flex;
            justify-content: space-between;

            &>.name {
                font-size: 2rem;
                margin: 0;
                max-width: 250px;
            }

            &>.name-icon {
                color: var(--color-white);
                font-size: 1.5rem;
                background-color: var(--color-ternary);
                border-radius: 100%;
                width: 4rem;
                height: 4rem;
                padding: 1rem;
                box-sizing: border-box;
                text-transform: uppercase;
            }
        }
        &>.input {
            display: flex;
            align-items: center;
            background-color: var(--color-primary);
            padding: 0 0.5rem;
            margin-top: 1.5rem;
            border-radius: 0.5rem;
            border: 1px solid var(--color-white);
            &>input {
                border: none;
                background: none;
                outline: none;    
                flex-grow: 1;    
                width: 100%;
                height: 2.5rem;
                color: var(--color-white);
                font-size: 1rem;
                padding: 0 0.5rem;
            }
            &>input::placeholder{
                color: var(--color-white);
            }
        }
        &>p{
            color: var(--color-cuarty);
            font-size: 1.2rem;
        }
    }
    `;

    getInitials(){
        let initials ='';
        const palabras = this.nombre.split(" ");
        palabras.forEach(palabra=>initials = initials+palabra.substring(0,1));
        return initials;
    }

    render(){
        return html`
        <div class="background-login">
            <div class="header">
                <p>Iniciar sesion</p>
            </div>
            <div class="body">
                <h2 class="name">Buenas noches, ${this.nombre}</h2>
                <div class="name-icon">${this.getInitials()}</div>
            </div>
            <div class="input">
                <input  type="password" name="password" placeholder="Contraseña" .value=${this.inputPassword} @input=${this.handlePasswordChange} @keyup=${(e) => { if (e.key === 'Enter') this.handleLogin(); }}>
            </div>
            <p>¿Olvidaste tu contraseña?</p>
        </div>
        `;
    }
}