const LOGIN_VIEW = `
    <header class="header__container">
      <div>
        <div>
          <svg
            viewBox="0 0 48 48"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <h2>PokeData</h2>
      </div>

      <div>
        <label class="form-input-container">
          <div class="form-input-wrapper">
            <div class="search-icon-container" data-icon="MagnifyingGlass">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path
                  d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                ></path>
              </svg>
            </div>
            <input placeholder="Search" class="form-input" value="" />
          </div>
        </label>

        <button>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path
                d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"
              ></path>
            </svg>
          </div>
        </button>

        <div
          style="
            background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCarJcc_frVQnqx9JVIpLXQ9-bSDsDgd-NM-UektfhLVe2Ipk5sk_McDo8gKjWeDIB755oKI_lGxAccfCO7CQoE5faR2At6mM5WqHRFss7ygGXcf8QjNmCc3Nb6c5Zzm99KPl0bIESlcBsZScxWbVPoe2mQtMuwgy-24vUjQQf08lUsJPBFAr7XKTJeMA9grbDzhEKbYxEVPn5bbl5JAX6tAsTe5E-LyWtXFtbpcwQTYzvtLNgspPTfPtYfqz3kby1UtkJb-nZH_Bg');
          "
        ></div>
      </div>
    </header>
    <login-view></login-view>`;
const HOME_VIEW = `
       <header class="header__container">
      <div>
        <div>
          <svg
            viewBox="0 0 48 48"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <h2>PokeData</h2>
      </div>

      <div>
        <label class="form-input-container">
          <div class="form-input-wrapper">
            <div class="search-icon-container" data-icon="MagnifyingGlass">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path
                  d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                ></path>
              </svg>
            </div>
            <input placeholder="Search" class="form-input" value="" />
          </div>
        </label>

        <button>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path
                d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"
              ></path>
            </svg>
          </div>
        </button>

        <div
          style="
            background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCarJcc_frVQnqx9JVIpLXQ9-bSDsDgd-NM-UektfhLVe2Ipk5sk_McDo8gKjWeDIB755oKI_lGxAccfCO7CQoE5faR2At6mM5WqHRFss7ygGXcf8QjNmCc3Nb6c5Zzm99KPl0bIESlcBsZScxWbVPoe2mQtMuwgy-24vUjQQf08lUsJPBFAr7XKTJeMA9grbDzhEKbYxEVPn5bbl5JAX6tAsTe5E-LyWtXFtbpcwQTYzvtLNgspPTfPtYfqz3kby1UtkJb-nZH_Bg');
          "
        ></div>
      </div>
    </header>
    <main class="main__container">
      <div class="layout__container">
        <div class="gallery-title-container"><p>Pokémon Data</p></div>
        <grid-element class="grid"></grid-element>
        <div class="load-more-button-container">
          <button id="load">
            <span class="truncate">Load More</span>
          </button>
        </div>
      </div>
    </main>`;
const ROUTER_OUTLET = document.getElementById("router-outlet");
const BASE_URL = "https://pokeapi.co/api/v2/pokemon"; //?limit=9&offset=0
let limit = 20;
let offset = 0;

const BASE_PATH = "/alumnos/luis-arroyo/15-TAREA/web-components";

const getPokemons = async (limit, offset) => {
  const result = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
  const data = await result.json();
  const promisesArray = data.results.map((item) => {
    return getPokemon(item.url);
  });

  const results = await Promise.all(promisesArray);

  console.log(results);

  return results;
};

const getPokemon = async (url) => {
  const result = await fetch(url);
  const data = await result.json();
  return data;
};

function navigate(path) {
  if (path === "/home") {
    ROUTER_OUTLET.innerHTML = HOME_VIEW;
    loadHomeContent();
    console.log("load");
  } else {
    ROUTER_OUTLET.innerHTML = LOGIN_VIEW;
  }
  let newUrl = BASE_PATH + path;
  window.history.pushState({}, path, newUrl);
}

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname.replace(BASE_PATH, "");
  const initialPath = currentPath === "" ? "/login" : currentPath;

  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  const initialRoute = isAuthenticated ? "/home" : initialPath;

  navigate(initialRoute);

  document.addEventListener("loginSuccess", (event) => {
    localStorage.setItem("isLoggedIn", "true");
    navigate("/home");
  });

  window.addEventListener("popstate", () => {
    const path = window.location.pathname;
    navigate(path);
  });
});

async function loadHomeContent() {
  const grid = document.querySelector(".grid");
  const load = document.getElementById("load");

  if (!grid) {
    console.log("El componente <grid-element> no se encontró en el DOM.");
    return;
  }

  try {
    const results = await getPokemons(limit, offset);
    grid.pokemons = results;
    offset = 0;
  } catch (error) {
    console.error(error);
  }
  load.addEventListener("click", () => {
    offset += 20;
    getPokemons(20, offset).then(
      (results) => (grid.pokemons = [...grid.pokemons, ...results])
    );
  });
}

load.addEventListener("click", () => {
  offset += 20;
  getPokemons(20, offset).then(
    (results) => (grid.pokemons = [...grid.pokemons, ...results])
  );
});
