document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

// * Paleta de colores base
const COLORES_HEX = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F5FF33",
  "#33FFA8",
  "#FFA833",
  "#A833FF",
  "#FF3380",
];

// * Variables globales del juego
const contenido = document.getElementById("contenido");
const scoreElems = document.querySelectorAll(".score");
let cuadros = []; // referencia a los cuadros del juego
let coloresDisponibles = [];
let seleccionados = [];
let bloqueado = false;
let turno = 1;
let puntuaciones = [0, 0]; // Jugador 1 y Jugador 2

// * FUNCIONES PRINCIPALES
function iniciarApp() {
  crearCuadros(); // crea los cuadros y asigna a 'cuadros'
  prepararColores();
  asignarEventos();
  actualizarTurnoUI();
}

// * Crear las 16 cajas del tablero
function crearCuadros() {
  for (let i = 0; i < 16; i++) {
    const div = document.createElement("div");
    contenido.appendChild(div);
  }
  cuadros = document.querySelectorAll("#contenido div");
}

// * Asignar y mezclar colores
function prepararColores() {
  coloresDisponibles = mezclarArray([...COLORES_HEX, ...COLORES_HEX]);
  cuadros.forEach((cuadro, index) => {
    cuadro.dataset.color = coloresDisponibles[index];
  });
}

// * Asignar eventos de click a cada cuadro
function asignarEventos() {
  cuadros.forEach(cuadro => {
    cuadro.addEventListener("click", () => {
      if (!bloqueado) manejarClick(cuadro);
    });
  });
}

// * Lógica del click
function manejarClick(elemento) {
  if (elemento.style.visibility === "hidden") return;
  if (seleccionados.includes(elemento)) return;

  elemento.style.backgroundColor = elemento.dataset.color;
  seleccionados.push(elemento);

  if (seleccionados.length === 2) {
    bloqueado = true;
    setTimeout(matchElements, 600);
  }
}

// * Comparar los dos cuadros seleccionados
function matchElements() {
  const [primero, segundo] = seleccionados;
  const esMatch = primero.dataset.color === segundo.dataset.color;

  if (esMatch) {
    manejarAcierto(primero, segundo);
  } else {
    manejarFallo(primero, segundo);
  }

  seleccionados = [];
  bloqueado = false;
}

// * Cuando hay acierto
function manejarAcierto(primero, segundo) {
  primero.style.visibility = "hidden";
  segundo.style.visibility = "hidden";

  puntuaciones[turno - 1]++;
  actualizarPuntajes();

  if (juegoTerminado()) {
    mostrarGanador();
  }
  // Si acierta, el jugador actual mantiene el turno
}

// * Cuando falla
function manejarFallo(primero, segundo) {
  despintarColor(primero);
  despintarColor(segundo);
  cambiarTurno();
}

// * UTILIDADES
function despintarColor(elemento) {
  elemento.style.backgroundColor = "";
}

function cambiarTurno() {
  turno = turno === 1 ? 2 : 1;
  actualizarTurnoUI();
}

function mezclarArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; 
  }
  return array;
}

// * ACTUALIZACIONES DE UI
function actualizarPuntajes() {
  scoreElems[0].textContent = puntuaciones[0];
  scoreElems[1].textContent = puntuaciones[1];
}

function actualizarTurnoUI() {
  const players = document.querySelectorAll(".players div p");
  players.forEach((p, i) => {
    p.classList.toggle("activo", i + 1 === turno);
  });
}

function juegoTerminado() {
  return Array.from(cuadros).every(c => c.style.visibility === "hidden");
}

function mostrarGanador() {
  const [p1, p2] = puntuaciones;
  let mensaje = "";

  if (p1 > p2) mensaje = "🏆 ¡Jugador 1 gana!";
  else if (p2 > p1) mensaje = "🏆 ¡Jugador 2 gana!";
  else mensaje = "🤝 ¡Empate!";

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-contenido">
      <h2>${mensaje}</h2>
      <button id="reiniciar">Jugar de nuevo</button>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById("reiniciar").addEventListener("click", () => {
    location.reload();
  });
}