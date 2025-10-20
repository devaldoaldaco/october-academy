// Variables
const calculadora = document.getElementById("calculadora");
const resultado = document.getElementById("resultado");

// Estado de operaciones
let operaciones = [];

// Evento principal
calculadora.addEventListener("click", manejarClick);

function manejarClick(e) {
  const { target } = e;

  // Solo actuar si es un botón
  if (target.getAttribute("type") !== "button") return;

  const { id, className, innerText } = target;

  // Si es número
  if (!className.includes("operacion")) {
    resultado.value += innerText;
    return;
  }

  // Si es operación
  procesarOperacion(resultado.value, id);
}

// Arrow function usando ...restParams
const procesarOperacion = (...restParams) => {
  const [valor, operador] = restParams;
  console.log(operador);
  // Validar valor actual
  if (valor === "" && operador !== "clear") return;

  switch (operador) {
    case "sumar":
      actualizarOperacion(valor, "+");
      break;
    case "restar":
      actualizarOperacion(valor, "-");
      break;
    case "multiplicar":
      actualizarOperacion(valor, "*");
      break;
    case "dividir":
      actualizarOperacion(valor, "/");
      break;
    case "igual":
      ejecutarOperacion(valor);
      break;
    case "clear":
      limpiar();
      break;
    default:
      break;
  }
};

// Arrow function auxiliar
const actualizarOperacion = (...restParams) => {
  const [valor, simbolo] = restParams;
  operaciones.push(valor, simbolo);
  limpiarResultado();
};

// rrow function para ejecutar el cálculo
const ejecutarOperacion = (...restParams) => {
  const [valor] = restParams;
  operaciones.push(valor);

  try {
    // Evalúa y muestra el resultado
    const resultadoOperacion = eval(operaciones.join(""));
    resultado.value = resultadoOperacion;
  } catch (err) {
    resultado.value = "Error";
  }

  operaciones = [];
};

const limpiarResultado = () => (resultado.value = "");

const limpiar = () => {
  operaciones = [];
  limpiarResultado();
};
