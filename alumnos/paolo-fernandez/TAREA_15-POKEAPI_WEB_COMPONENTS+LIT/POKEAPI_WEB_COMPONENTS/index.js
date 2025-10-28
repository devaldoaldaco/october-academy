import { AppRoot } from "./components/app-root/app-root.js";
import { AppRouter } from "./components/app-router/app-router.js";

import { LoginPage } from "./pages/login/login.js";

import { PokedexPage } from "./pages/pokedex/pokedex.js";
import { PokemonCard } from "./components/pokemon-card/pokemon-card.js";
import { PokemonCardFront } from "./components/pokemon-card/card-front/pokemon-card-front.js";
import { PokemonCardBack } from "./components/pokemon-card/card-back/pokemon-card-back.js";

import { TypeBadge } from "./components/pokemon-card/type-badge/type-badge.js";
import { FlipButton } from "./components/pokemon-card/flip-button/flip-button.js";

customElements.define('app-root', AppRoot);
customElements.define('app-router', AppRouter);

customElements.define('page-login', LoginPage);

customElements.define('page-pokedex', PokedexPage);
customElements.define('pokemon-card', PokemonCard);
customElements.define('pokemon-card-front', PokemonCardFront);
customElements.define('pokemon-card-back', PokemonCardBack);

customElements.define('type-badge', TypeBadge);
customElements.define('flip-button', FlipButton);