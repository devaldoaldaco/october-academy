import {LitElement, css, html} from 'lit';
import './formLogin/formLogin';

export class LoginPokemon extends LitElement {
  static properties = {
    imageSrc: {type: String},
    altImageSrc: {type: String},
  };

  static styles = css`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
        :host{
        
            display: flex;
            flex-direction: row;
            border-radius: 20px;
            height: 30rem;
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
        }
        button {
        border: none;
        }

        .banner-pokemon {
            flex: 1;
        }

        .form-login{
            flex: 1;
        }

        .banner-pokemon img {
            object-fit: cover;
            padding: 5px;
            border-radius: 20px;
            width: 100%;
            height: 100%;
        }
    }
  `;

  constructor() {
    super();
    this.imageSrc = '';
    this.altImageSrc = '';
  }

  render() {
    return html`
      <section class="banner-pokemon">
        <img
          src="https://images.unsplash.com/photo-1542779283-429940ce8336?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470"
          alt=""
        />
      </section>
       <form-login></form-login>
      `;
  }

 
}

customElements.define('login-pokemon', LoginPokemon);