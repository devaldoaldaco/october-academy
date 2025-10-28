import { AppRoot } from "./components/app-root/app-root";
import { AppRouter } from "./components/app-router/app-router";

import { LoginPage } from "./pages/login/login";

import { PokedexPage } from "./pages/pokedex/pokedex";
import { PokemonCard } from "./components/pokemon-card/pokemon-card";
import { PokemonCardFront } from "./components/pokemon-card/card-front/pokemon-card-front";
import { PokemonCardBack } from "./components/pokemon-card/card-back/pokemon-card-back";

import { TypeBadge } from "./components/pokemon-card/type-badge/type-badge";
import { FlipButton } from "./components/pokemon-card/flip-button/flip-button";

customElements.define('app-root', AppRoot);
customElements.define('app-router', AppRouter);

customElements.define('page-login', LoginPage);

customElements.define('page-pokedex', PokedexPage);
customElements.define('pokemon-card', PokemonCard);
customElements.define('pokemon-card-front', PokemonCardFront);
customElements.define('pokemon-card-back', PokemonCardBack);

customElements.define('flip-button', FlipButton);
customElements.define('type-badge', TypeBadge);