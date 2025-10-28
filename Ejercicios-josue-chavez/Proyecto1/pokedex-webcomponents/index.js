import { PokedexApp } from "./components/pokedex-app.js";
import { PokemonCard } from "./components/pokemon-card.js";
import { PokemonGrid } from "./components/pokemon-grid.js";
import { LoginScreen } from "./components/login-screen.js";
import { LoadingSpinner } from "./components/loading-spinner.js";

customElements.define('pokemon-card', PokemonCard);
customElements.define('pokemon-grid', PokemonGrid);
customElements.define('pokedex-app', PokedexApp);
customElements.define('login-screen', LoginScreen);
customElements.define('loading-spinner', LoadingSpinner);