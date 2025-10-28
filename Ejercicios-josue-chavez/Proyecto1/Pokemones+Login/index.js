const CONFIG = {
    BATCH_SIZE: 20,
    MAX_POKEMON: 898,
    CONCURRENCY_LIMIT: 6,
    API_BASE: "https://pokeapi.co/api/v2/pokemon/",
    ROOT_MARGIN: "600px",
    VALID_USER: "admin",
    VALID_PASSWORD: "admin"
};

const state = {
    nextToLoad: 1,
    loading: false,
    reachedEnd: false,
    typeNameCache: new Map(),
    isAuthenticated: false
};

const checkSession = () => {
    const session = sessionStorage.getItem('pokedexAuth');
    if (session === 'authenticated') {
        state.isAuthenticated = true;
        showPokedex();
    } else {
        showLogin();
    }
};

const showLogin = () => {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('pokedexScreen').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('errorMessage').classList.remove('show');
};

const showPokedex = () => {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('pokedexScreen').style.display = 'flex';
    
    if (state.nextToLoad === 1 && !state.loading) {
        initializePokedex();
    }
};

const handleLogin = (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMessage');
    
    if (username === CONFIG.VALID_USER && password === CONFIG.VALID_PASSWORD) {
        state.isAuthenticated = true;
        sessionStorage.setItem('pokedexAuth', 'authenticated');
        errorMsg.classList.remove('show');
        showPokedex();
    } else {
        errorMsg.textContent = '❌ Usuario o contraseña incorrectos';
        errorMsg.classList.add('show');
        
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('username').focus();

        setTimeout(() => {
            errorMsg.classList.remove('show');
        }, 3000);
    }
};

const handleLogout = () => {
    state.isAuthenticated = false;
    sessionStorage.removeItem('pokedexAuth');
    
    showLogin();
};

const TYPE_COLORS = {
    electrico: { bg: ['#fff7d6', '#ffe57a'], progress: ['#ffd54a', '#ffcc33'], foreground: '#22110a' },
    fuego: { bg: ['#ffd7cf', '#ff7a4a'], progress: ['#ff6b4a', '#ff3d3d'], foreground: '#ffffff' },
    agua: { bg: ['#dff2ff', '#8ecaff'], progress: ['#4da6ff', '#1e90ff'], foreground: '#01243a' },
    hielo: { bg: ['#e9fbff', '#c8f0ff'], progress: ['#9fe9ff', '#6fe3ff'], foreground: '#052a35' },
    planta: { bg: ['#e6fbde', '#bff29a'], progress: ['#6fe58b', '#2fb86d'], foreground: '#093214' },
    bicho: { bg: ['#fef9e6', '#d9f2a8'], progress: ['#c0e86b', '#86d43b'], foreground: '#24310a' },
    normal: { bg: ['#f7f7f7', '#e5e7eb'], progress: ['#c9c9c9', '#9b9b9b'], foreground: '#0b1a2b' },
    volador: { bg: ['#f2ecff', '#d7d0ff'], progress: ['#b7a6ff', '#8f7bff'], foreground: '#120a2a' },
    psiquico: { bg: ['#ffe6fb', '#ffccf2'], progress: ['#ff8adf', '#ff5fc3'], foreground: '#2a0526' },
    fantasma: { bg: ['#efe9ff', '#d7d0ff'], progress: ['#a38bff', '#7a5bff'], foreground: '#160b2b' },
    hada: { bg: ['#fff0fb', '#ffd9f7'], progress: ['#ff9fd9', '#ff6fbf'], foreground: '#2a0a1a' },
    lucha: { bg: ['#fff0e6', '#ffd2b0'], progress: ['#ff9a66', '#ff7044'], foreground: '#261306' },
    roca: { bg: ['#faf2e6', '#f0dcbf'], progress: ['#d6b07a', '#b98b4a'], foreground: '#2b1608' },
    tierra: { bg: ['#fff4e6', '#f3d9b0'], progress: ['#e6b77a', '#d08b4a'], foreground: '#291608' },
    veneno: { bg: ['#fff0f0', '#ffdfe6'], progress: ['#e08abf', '#c85fa0'], foreground: '#2a0a1a' },
    oscuro: { bg: ['#f2f2f4', '#d7d7da'], progress: ['#a3a3a6', '#7f7f83'], foreground: '#0b0b0b' },
    acero: { bg: ['#f4f7f9', '#e6eef5'], progress: ['#9fb6c9', '#7da0b7'], foreground: '#08101a' },
    dragon: { bg: ['#eef6ff', '#d6edff'], progress: ['#7fbfff', '#3f93ff'], foreground: '#08213a' },
    default: { bg: ['#ffffff', '#f0f4f8'], progress: ['#d1d9e0', '#9aa4b0'], foreground: '#0b1a2b' }
};

const TYPE_IMAGES = {
    planta: "planta.svg", bicho: "planta.svg",
    fuego: "fuego.svg",
    agua: "agua.svg", hielo: "agua.svg",
    electrico: "electrico.svg", "eléctrico": "electrico.svg",
    psiquico: "psiquico.svg", psíquico: "psiquico.svg",
    fantasma: "psiquico.svg",
    hada: "hada.svg",
    lucha: "lucha.svg", roca: "lucha.svg", rocas: "lucha.svg", tierra: "lucha.svg",
    normal: "incoloro.svg", volador: "incoloro.svg",
    siniestro: "oscuro.svg", veneno: "oscuro.svg",
    acero: "metalico.svg", dragon: "dragon.svg", "dragón": "dragon.svg"
};

const IMAGE_PATH = "../images/elementos/";

const normalizeType = (type) => {
    return type ? type.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";
};

const getTypeSpanishCached = async (typeUrl) => {
    if (!typeUrl) return '';
    if (state.typeNameCache.has(typeUrl)) return state.typeNameCache.get(typeUrl);
    
    try {
        const res = await fetch(typeUrl);
        if (!res.ok) throw new Error("Tipo no encontrado");
        const json = await res.json();
        const nameObj = json.names?.find(n => n.language?.name === 'es');
        const result = nameObj?.name || json.name || '';
        state.typeNameCache.set(typeUrl, result);
        return result;
    } catch (err) {
        console.warn("Error fetching type:", typeUrl, err);
        state.typeNameCache.set(typeUrl, '');
        return '';
    }
};

const decorateCard = (card) => {
    const typesData = card.dataset.types ? JSON.parse(card.dataset.types) : [];
    const primaryType = normalizeType(typesData[0] || "default");
    const colors = TYPE_COLORS[primaryType] || TYPE_COLORS.default;
    
    const inner = card.querySelector(".card-inner");
    if (inner) {
        inner.style.setProperty("--card-bg-1", colors.bg[0]);
        inner.style.setProperty("--card-bg-2", colors.bg[1]);
        inner.style.setProperty("--card-foreground", colors.foreground);
        inner.style.setProperty("--progress-1", colors.progress[0]);
        inner.style.setProperty("--progress-2", colors.progress[1]);
    }
    
    card.classList.add(`type-${primaryType}`);
    
    card.querySelectorAll(".types figure").forEach(fig => {
        const typeText = fig.dataset.type || "";
        const key = normalizeType(typeText);
        const fileName = TYPE_IMAGES[key];
        
        if (fileName) {
            fig.innerHTML = `<img src="${IMAGE_PATH}${fileName}" alt="${typeText}"><figcaption>${typeText}</figcaption>`;
        } else {
            fig.innerHTML = `<figcaption>${typeText}</figcaption>`;
        }
    });
};

const fetchPokemon = async (id) => {
    const url = `${CONFIG.API_BASE}${id}/`;
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Pokémon ${id} no encontrado`);
        const p = await res.json();
        
        const image = p.sprites?.other?.['official-artwork']?.front_default || p.sprites?.front_default || '';
        const stats = p.stats?.map(s => ({
            name: s.stat?.name || '',
            value: s.base_stat || 0
        })) || [];
        const abilities = p.abilities?.map(a => a.ability?.name || '') || [];
        
        const typesSpanish = [];
        for (const t of (p.types || [])) {
            const urlType = t.type?.url || '';
            const es = urlType ? await getTypeSpanishCached(urlType) : (t.type?.name || '');
            typesSpanish.push(es || t.type?.name || '');
        }
        
        return {
            id: p.id,
            name: p.name,
            image,
            stats,
            abilities,
            types: typesSpanish
        };
    } catch (err) {
        console.warn("Error fetching pokemon:", id, err);
        return null;
    }
};

const createCard = (data) => {
    if (!data) return;
    
    const grid = document.getElementById("cardsGrid");
    if (!grid) return;
    
    const article = document.createElement("article");
    article.className = "card-pokemon";
    article.dataset.id = data.id;
    article.dataset.types = JSON.stringify(data.types);
    
    const typesHtml = data.types.map(t => `<figure data-type="${t}"></figure>`).join("");
    const statsHtml = data.stats.map(s => {
        const percentage = Math.max(0, Math.min(100, Math.round((s.value / 150) * 100)));
        return `
            <div class="stat">
                <label>${s.name}</label>
                <div class="progress-bar">
                    <div class="progress-fill" style="width:${percentage}%"></div>
                </div>
                <div class="value">${s.value}</div>
            </div>`;
    }).join("");
    
    const abilitiesHtml = data.abilities.map(a => `<div class="ability">${a}</div>`).join("");
    
    article.innerHTML = `
        <div class="card-inner">
            <section class="card-front">
                <img class="poke-img" src="${data.image}" alt="${data.name}">
                <div class="poke-name">${data.name}</div>
                <div class="types">${typesHtml}</div>
            </section>
            <section class="card-back">
                <h3 class="stats">Estadísticas</h3>
                <hr class="sep">
                ${statsHtml}
                <h4 class="abilities">Habilidades</h4>
                <hr class="sep">
                ${abilitiesHtml}
            </section>
        </div>
    `;
    
    grid.appendChild(article);
    decorateCard(article);
    
    article.addEventListener("click", (e) => {
        if (e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button') return;
        article.classList.toggle("flipped");
    });
};

const fetchWithConcurrency = async (ids, limit) => {
    const results = [];
    for (let i = 0; i < ids.length; i += limit) {
        const chunk = ids.slice(i, i + limit);
        const chunkResults = await Promise.all(chunk.map(id => fetchPokemon(id)));
        results.push(...chunkResults);
    }
    return results;
};

const getOrCreateElement = (id, styles, text = "") => {
    let el = document.getElementById(id);
    if (el) return el;
    
    el = document.createElement("div");
    el.id = id;
    if (styles) el.style.cssText = styles;
    if (text) el.innerText = text;
    
    const grid = document.getElementById("cardsGrid");
    grid.insertAdjacentElement("afterend", el);
    return el;
};

const loadBatch = async () => {
    if (state.loading || state.reachedEnd) return;
    
    state.loading = true;
    const loader = getOrCreateElement("pokeloader", null, "Cargando pokémon...");
    loader.style.display = "block";
    
    const start = state.nextToLoad;
    const end = Math.min(start + CONFIG.BATCH_SIZE - 1, CONFIG.MAX_POKEMON);
    const ids = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    
    const results = await fetchWithConcurrency(ids, CONFIG.CONCURRENCY_LIMIT);
    results.forEach(data => createCard(data));
    
    state.nextToLoad = end + 1;
    
    if (state.nextToLoad > CONFIG.MAX_POKEMON) {
        state.reachedEnd = true;
        const sentinel = document.getElementById("sentinel");
        if (sentinel) sentinel.remove();
        loader.innerText = "No hay más pokémon.";
    } else {
        setTimeout(() => loader.style.display = "none", 350);
    }
    
    state.loading = false;
};

const setupInfiniteScroll = () => {
    const sentinel = getOrCreateElement("sentinel", "width:100%;height:1px;");
    
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadBatch().catch(err => console.error("Error loading batch:", err));
                }
            });
        },
        {
            root: null,
            rootMargin: CONFIG.ROOT_MARGIN,
            threshold: 0.01
        }
    );
    
    observer.observe(sentinel);
};

const initializePokedex = async () => {
    try {
        setupInfiniteScroll();
        await loadBatch();
    } catch (err) {
        console.error("Initialization error:", err);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    checkSession();
});