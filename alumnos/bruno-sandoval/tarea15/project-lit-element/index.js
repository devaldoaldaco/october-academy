import { AccountComponent } from "./components/account-component";
import { AppRoot } from "./components/app-root";
import { DashboardComponent } from "./components/dashboard-component";
import { DetailsComponent } from "./components/details-components";
import { HomeComponent } from "./components/home-component";
import { LoginComponent } from "./components/login-component";

customElements.define('home-component',HomeComponent);
customElements.define('login-component',LoginComponent);
customElements.define('dashboard-component',DashboardComponent);
customElements.define('account-component',AccountComponent);
customElements.define('app-root', AppRoot);
customElements.define('details-component', DetailsComponent);