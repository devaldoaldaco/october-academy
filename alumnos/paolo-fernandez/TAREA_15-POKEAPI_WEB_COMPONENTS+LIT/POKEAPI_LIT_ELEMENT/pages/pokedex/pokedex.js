import { css, html, LitElement } from "lit";
import { Task } from "@lit/task";

import { fetchPokemonList } from "./fetch";
import { Router } from "../../router";

export class PokedexPage extends LitElement {
  #limit = 20;

  static properties = {
    pokemons: {
      type: Array,
      state: true
    },
    page: {
      type: Number,
      state: true
    },
    isLoading: {
      type: Boolean,
      state: true
    }
  }

  static styles = css`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :host {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #0F172A;
    }

    header {
      width: 100%;
      text-align: center;
      padding: 40px 20px;
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
      position: relative;
    }

    header > h1 {
      font-size: 2.5rem;
      color: #FFF;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    #logoutBtn {
      position: absolute;
      right: 50px;
      top: 50%;
      transform: translateY(-50%);
      padding: 15px 40px;
      border: none;
      border-radius: 25px;
      background: linear-gradient(135deg, #8B5CF6, #7C3AED);
      color: #FFF;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);

      &:hover {
        box-shadow: 0 8px 20px rgba(139, 92, 246, 0.5);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
    }

    main {
      flex: 1;
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .pokemon-section {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 30px;
      margin-bottom: 40px;
    }

    .text-loading {
      text-align: center;
      font-size: 2rem;
      margin: 40px 0;
      font-weight: 600;
    }

    .load-more-container {
      text-align: center;
      margin-top: 20px;
    }

    #loadMoreBtn {
      padding: 15px 40px;
      border: none;
      border-radius: 25px;
      background: linear-gradient(135deg, #8B5CF6, #7C3AED);
      color: #FFF;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 5px 15px rgba(139, 92, 246, 0.3);

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(139, 92, 246, 0.5);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
    }
  `;

  _pokemonsTask = new Task(this, {
    task: async ([limit, page], { signal }) => {
      this.isLoading = true;
      
      const pokemons = await fetchPokemonList(limit, page); 
      this.pokemons = [ ...this.pokemons, ...pokemons ];

      this.isLoading = false;
    },
    args: () => [ this.#limit, this.page ]
  });

  constructor() {
    super();
    this.pokemons = [];
    this.page = 1;
    this.isLoading = false;
  }

  render() {
    return html`
      <header>
        <h1>Pokedex</h1>
        <button id="logoutBtn" @click=${ this.handleLogout }>Cerrar sesión</button>
      </header>

      <main>
        <section id="pokemonSection" class="pokemon-section">
          ${ this.pokemons.map(pokemon => html`
            <pokemon-card .pokemon=${ pokemon }></pokemon-card>
          `) }
        </section>
        
        <div class="load-more-container">
          <button id="loadMoreBtn" ?disabled=${ this.isLoading } @click=${ this.handleLoadMore }>
            Cargar más pokemon
          </button>
        </div>
      </main>
    `;
  }

  handleLogout = () => {
    localStorage.removeItem('isLogged');
    setTimeout(() => Router.navigate('login'), 2000);
  }

  handleLoadMore = () => {
    this.page++;
  }
}