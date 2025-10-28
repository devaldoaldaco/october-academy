import { css, LitElement, html } from "lit";

export class LoginComponent extends LitElement {
    static properties = {
        email: {type:String},
        password: {type:String}
    };

    constructor() {
        super();
        this.email = '';
        this.password = '';
    };

    static styles = css`
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
    `;

    handleChange(e){
        const {id,value} = e.target;
        if (id === 'email') {
            this.email = value;
        } else if (id === 'password') {
            this.password = value;
        }
    };

    submit(e){
        e.preventDefault();
        if((this.email) && (this.password)){
            this.dispatchEvent( new CustomEvent('login-submit',{
                detail: { email: this.email, password: this.password }, 
                bubbles: true,
                composed: true 
            }));
        }
        this.email = '';
        this.password = '';
    };


    render() {
        return html`
        <div class="login-card">
                <h1>Login</h1>
                <form @submit = ${this.submit}>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" .value=${this.email} @input=${this.handleChange} required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" .value=${this.password} @input=${this.handleChange} required>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        `;
    }

}