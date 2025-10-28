import { CardComponent } from "./components/card-component";
import { LoginComponent } from "./components/login-component";

customElements.define('card-component',CardComponent);
customElements.define('login-component',LoginComponent);


const url = 'https://corsproxy.io/?https://www.demonslayer-api.com/api/v1';

const loginView = document.querySelector('#login-view');
const appView = document.querySelector('#app-view');
const container = document.querySelector('.container');
const limitButton = document.querySelector('#limitButton');
const search = document.querySelector('#search');
const logoutButton = document.querySelector('#logout-button');
const loginComponent = document.querySelector('login-component');

let isAuthenticated = false;
let limit = 5;
let filterName = '';
let allCharacters = [];

function updateView() {
    if (isAuthenticated) {
        loginView.style.display = 'none';
        appView.style.display = 'block';
        listarElementos();
    } else {
        loginView.style.display = 'block';
        appView.style.display = 'none';
        container.innerHTML = '';
    }
}

function handleLogin(email, password) {
    if (email === "bruno.sandoval210@gmail.com" && password === "admin") {
        isAuthenticated = true;
        alert("¡Inicio de sesión exitoso! Bienvenido.");
    } else {
        alert("Error de inicio de sesión. Credenciales incorrectas.");
        isAuthenticated = false;
    }
    updateView();
}

function handleLogout() {
    isAuthenticated = false;
    filterName = '';
    limit = 5;
    updateView();
}

function renderCards(data) {
    container.innerHTML = '';
    data.forEach(personaje => {
        const card = document.createElement('card-component');
        card.setAttribute('img', personaje.img || 'default.png'); 
        card.setAttribute('name', personaje.name || 'Desconocido');
        card.setAttribute('description', personaje.description || 'Sin descripción.');
        card.setAttribute('race', personaje.race || 'N/A');
        card.setAttribute('age', personaje.age || 'N/A');
        card.setAttribute('gender', personaje.gender || 'N/A');
        card.setAttribute('quote', personaje.quote || 'No hay cita.');
        container.appendChild(card);
    });
}


async function listarElementos() {
    let urlApi;
    try {
        if (filterName === undefined || filterName === null || filterName.length === 0) {
            urlApi = (`${url}/characters?limit=${limit}`);
        } else {
            urlApi = (`${url}/characters?name=${filterName}`);
        }
        
        const response = await fetch(urlApi);
        const json = await response.json();
        allCharacters = json.content;
        
        if (filterName.length > 0) {
            renderCards(allCharacters);
            limitButton.style.display = 'none';
        } else {
            renderCards(allCharacters);
            if (limit >= 45) {
                limitButton.style.display = 'none';
            } else {
                limitButton.style.display = 'block';
            }
        }
        console.log(allCharacters);

    } catch (error) {
        console.error("Hubo un error con el fetch:", error);
    }
}

loginComponent.addEventListener('login-submit', (e) => {
    const { email, password } = e.detail; 
    handleLogin(email, password);
});

limitButton.addEventListener('click', () => {
    if(limit<=45){
        if (filterName.length === 0) {
            limit += 5;
            listarElementos(); 
        }
    }
});

search.addEventListener('keydown', (e)=>{
    if (e.key === 'Enter') {
        filterName = e.target.value;
        limit = 5; 
        listarElementos();
    }
});


logoutButton.addEventListener('click', handleLogout);

updateView();