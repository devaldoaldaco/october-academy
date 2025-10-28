import { css, html, LitElement } from "lit";

export class HomeComponent extends LitElement{
    static properties = {
        nombre: {type : String}
    }
    constructor(){
        super();
        this.nombre = "Bruno Alejandro";
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
        box-sizing: border-box;
        max-width: 400px;
        height: 100vh;
        background-color: var(--color-primary);
        background-image:
            linear-gradient(to bottom,
                rgba(0, 0, 0, 0.4) 0%,
                var(--color-fifty) 100%), 
                url("../img/background-login.jpg");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: top;

        &>h1 {
            text-align: center;
            margin: 0;
            text-transform: uppercase;
            font-weight: lighter;
            padding: 2rem 0 2rem 0;
        }

        &>.card-user {
            background-color: var(--color-secondary);
            width: calc(100% - 2rem);
            margin: 0 1rem;
            padding: 1rem 1rem 7rem 1rem;
            box-sizing: border-box;
            border-radius: 1rem;

            &>.card-head {
                width: 100%;
                display: flex;

                &>.name {
                    text-transform: capitalize;
                    font-size: 2rem;
                    margin: 0;
                }

                &>.name-icon {
                    color: var(--color-primary);
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

            &>.card-body {
                &>p {
                    color: var(--color-ternary);
                    font-weight: bold;
                }

                &>button {
                    background-color: var(--color-white);
                    color: var(--color-primary);
                    padding: 1rem 3rem;
                    border: none;
                    width: 100%;
                    border-radius: 0.5rem;
                    font-weight: bold;
                    font-size: 1.1rem;
                }
            }
        }
    }
    `;

    getInitials(){
        let initials ='';
        const palabras = this.nombre.split(" ");
        palabras.forEach(palabra=>initials = initials+palabra.substring(0,1));
        return initials;
    }

    navigateToLogin() {
        this.dispatchEvent(new CustomEvent('navigate', {
            detail: { page: 'login' },
            bubbles: true, 
            composed: true
        }));
    }

    render(){
        return html`
        <div class="background-login">
            <h1>bbva</h1>
            <div class="card-user">
                <div class="card-head">
                    <h2 class="name">hola ${this.nombre}</h2>
                    <div class="name-icon">${this.getInitials()}</div>
                </div>
                <div class="card-body">
                    <p>Cambiar usuario</p>
                    <button @click = ${this.navigateToLogin}>Acceder</button>
                </div>
            </div>
        </div>
        `;
    }
}