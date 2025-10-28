import { AppRoot } from "./components/app-root/app-root.js";
import { AppRouter } from "./components/app-router/app-router.js";

import { LoginPage } from "./pages/login/login.js";

import { LoginFooter } from "./components/login/footer/footer.js";
import { LoginHeader } from "./components/login/header/header.js";
import { LoginMain } from "./components/login/main/main.js";
import { LoginSection } from "./components/login/main/login-section/login-section.js";
import { SignupSection } from "./components/login/main/signup-section/signup-section.js";
import { LoginForm } from "./components/login/main/login-form/login-form.js";

import { DashboardPage } from "./pages/dashboard/dashboard.js";
import { DashboardHeader } from "./components/dashboard/header/header.js";
import { DashboardMain } from "./components/dashboard/main/main.js";
import { DashboardUserProducts } from "./components/dashboard/products/products.js";
import { UserProductCard } from "./components/dashboard/product-card/product-card.js";
import { DashboardUserMovements } from "./components/dashboard/movements/movements.js";
import { UserMovementItem } from "./components/dashboard/movement-item/movement-item.js";
import { MovementsHistoryPage } from "./pages/dashboard/movements-history/movements-history.js";

import { TextInput } from "./components/form-inputs/text-input.js";
import { PasswordInput } from "./components/form-inputs/password-input.js";
import { CheckboxInput } from "./components/form-inputs/checkbox-input.js";
import { SelectInput } from "./components/form-inputs/select-input.js";

customElements.define('app-root', AppRoot);
customElements.define('app-router', AppRouter);

customElements.define('page-login', LoginPage);
customElements.define('login-header', LoginHeader);
customElements.define('login-main', LoginMain);
customElements.define('login-footer', LoginFooter);
customElements.define('login-section', LoginSection);
customElements.define('signup-section', SignupSection);
customElements.define('login-form', LoginForm);

customElements.define('page-dashboard', DashboardPage);
customElements.define('dashboard-header', DashboardHeader);
customElements.define('dashboard-main', DashboardMain);
customElements.define('dashboard-user-products', DashboardUserProducts);
customElements.define('user-product-card', UserProductCard);
customElements.define('dashboard-user-movements', DashboardUserMovements);
customElements.define('user-movement-item', UserMovementItem);
customElements.define('page-movements-history', MovementsHistoryPage);

customElements.define('text-input', TextInput);
customElements.define('password-input', PasswordInput);
customElements.define('checkbox-input', CheckboxInput);
customElements.define('select-input', SelectInput);

