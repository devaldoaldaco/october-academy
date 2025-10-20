const keys = document.querySelector(".keys");
const display = document.querySelector(".display");
const operadores = ["+", "-", "x", "÷", "%"];
keys.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (button.classList.contains("key-number")) {
    if (display.value == 0) {
      //SI ES 0 SOLO AGREGAS CONTENIDO
      display.value = button.textContent;
    } else {
      //SI NO ES CERO
      if (display.value[display.value.length - 1] == ")") {
        //SI EL ULTIMO DIGITO ES UN PARENTESIS AGREGAMOS POR DEFECTO EL SIMBOLO DE MULTIPLICAR
        display.value = display.value + "x" + button.textContent;
      } else {
        //CASO CONTRARIO SOLO AGREGAMOS EL NUMERO O SIMBOLO
        display.value = display.value + button.textContent;
      }
    }
  } else if (button.classList.contains("key-operator")) {
    //SI ES UN OPERADOR * - + ÷
    if (display.value == 0) {
      //SI ES CERO
      if (button.classList.contains("key-equal")) {
        //SI USA SIMBOLO IGUAL MUESTRA LO MISMO
        display.value = display.value;
      } else {
        //SI ES DIFERENTE DE CERO
        if (operadores.includes(display.value[display.value.length - 1])) {
          //SI INCLUYE ALGUN OPERADOR
          display.value[display.value.length - 1] = button.textContent;
        } else {
          display.value = display.value + button.textContent;
        }
      }
    } else {
      //DIFERENTE DE CERO
      if (button.classList.contains("key-equal")) {
        //validamos si se dio click al igual
        if (display.value != 0) {
          if (operadores.includes(display.value[display.value.length - 1])) {
            //si el ultimo digito es un operador lo reemplazamos para que no falle el eval
            display.value = display.value.slice(0, -1);
            calcularResultado(display);
          } else {
            calcularResultado(display);
          }
        }
      } else if (operadores.includes(display.value[display.value.length - 1])) {
        //si el ultimo digito es un operador, si seleccionamos otro operador simplemente lo reemplazamos
        let newText = display.value.slice(0, -1);
        display.value = newText + button.textContent;
      } else {
        display.value = display.value + button.textContent;
      }
    }
  } else if (button.classList.contains("key-function")) {
    if (button.dataset.action == "clear") {
      display.value = 0;
    } else if (button.dataset.action == "sign") {
      if (!operadores.includes(display.value[display.value.length - 1])) {
        cambiarSigno(display);
      }
    }
  }
  console.log(button);
});

const calcularResultado = (display) => {
  let expresion = display.value;
  let resultado;
  expresion = expresion.replace(/x/g, "*");
  expresion = expresion.replace(/÷/g, "/");
  try {
    resultado = eval(expresion);
    display.value = resultado;
  } catch (error) {
    display.value = "Error";
    console.error("Error al evaluar la expresión:", error);
  }
};

const obtenerUltimoNumero = (expresion) => {
  let tempExpresion = expresion.replace(/x/g, "*").replace(/÷/g, "/");
  const regex = /(-?\d+\.?\d*)|([\+\*\/\%])|\(|\)/g;
  const tokens = tempExpresion.match(regex);
  return tokens ? tokens.filter((token) => token && token.trim() !== "") : [];
};

const cambiarSigno = (display) => {
  const expresion = display.value;
  const lastNumExpr = obtenerUltimoNumero(expresion);
  console.log("lastnumexpr", lastNumExpr);
  const ultimoNumeroStr = lastNumExpr[lastNumExpr.length - 1];
  console.log(ultimoNumeroStr);
  if (!ultimoNumeroStr) {
    return;
  }
  const indiceInicioNum = expresion.lastIndexOf(ultimoNumeroStr);
  const expresionBase = expresion.slice(0, indiceInicioNum);
  let nuevaExpresion = expresionBase;

  const lastOperator = lastNumExpr[lastNumExpr.length - 2];
  console.log(lastOperator);
  console.log(ultimoNumeroStr);
  if (ultimoNumeroStr < 0) {
    const lastSymbol = ultimoNumeroStr[0];
    console.log(lastSymbol);
    if (
      lastSymbol === "+" ||
      lastSymbol === "-" ||
      lastSymbol === "x" ||
      lastSymbol === "÷"
    ) {
      nuevaExpresion = expresionBase + "+" + ultimoNumeroStr.slice(1);
    } else {
      nuevaExpresion = expresionBase + ultimoNumeroStr;
    }
  } else if (lastNumExpr[lastNumExpr.length - 1] == ")") {
    console.log("aqui dentro");
    let expresionBase = lastNumExpr.slice(0, -3).join("");
    nuevaExpresion =
      expresionBase + lastNumExpr[lastNumExpr.length - 2].slice(1);
    nuevaExpresion = nuevaExpresion.replace("*", "x").replace("/", "÷");
  } else {
    nuevaExpresion += "(-" + ultimoNumeroStr + ")";
  }

  display.value = nuevaExpresion;
};
