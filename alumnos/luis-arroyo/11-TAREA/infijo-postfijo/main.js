const keys = document.querySelector(".keys");
const display = document.querySelector(".display");
const operadores = ["+", "-", "x", "÷", "%"];
const precedencia = {
  "+": 1,
  "-": 1,
  "x": 2,
  "÷": 2,
  "%": 2,
};
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
            let tokens = tokenizev1(display);
            let colaPostFija = infijoAPostfijo(tokens);
            evaluarPostfija(colaPostFija, display);
            // calcularResultado(display);
          } else {
            let tokens = tokenizev1(display);
            let colaPostFija = infijoAPostfijo(tokens);
            evaluarPostfija(colaPostFija, display);
            // calcularResultado(display);
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

function calcularResultado(display) {
  console.log(display);
  console.log(display.value);
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
}
function obtenerUltimoNumero(expresion) {
  let tempExpresion = expresion.replace(/x/g, "*").replace(/÷/g, "/");
  const regex = /(-?\d+\.?\d*)|([\+\*\/\%])|\(|\)/g;
  const tokens = tempExpresion.match(regex);
  return tokens ? tokens.filter((token) => token && token.trim() !== "") : [];
}
function cambiarSigno(display) {
  const expresion = display.value;
  const lastNumExpr = obtenerUltimoNumero(expresion);
  console.log("lastnumexpr", lastNumExpr);
  const ultimoNumeroStr = lastNumExpr[lastNumExpr.length - 1];
  console.log(ultimoNumeroStr);
  if (!ultimoNumeroStr) {
    return;
  }
  const indiceInicioNum = expresion.lastIndexOf(ultimoNumeroStr);
  console.log("indice", indiceInicioNum);
  const expresionBase = expresion.slice(0, indiceInicioNum);
  console.log("expresion", expresionBase);
  const caracterAnterior = expresionBase.slice(-1);
  console.log("anterior", caracterAnterior);
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
}

//////////

let pilaOperadores = [];
let colaPostFija = [];
let valoresStack = [];

const tokenizev1 = (expression) => {
  // console.log(expression.value);
  // let tempExpression = expression.value.replace(/x/g, "*").replace(/÷/g, "/");
  let regex = /-?\d+|\+|\-|\x|\(|\)/g;
  let tokens = expression.value.match(regex);

  let tokensFinales = [];
  let prev = tokens[0];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].startsWith("-") && tokens[i].length > 1) {
      if (tokens[i - 1] == "(") {
        tokensFinales.push(tokens[i]);
      } else tokensFinales.push(...tokens[i].split(""));
    } else {
      tokensFinales.push(tokens[i]);
    }
  }
  return tokensFinales;
};

// const tokenize = (expression) => {
//   let tempExpression = expression.replace(/x/g, "*").replace(/÷/g, "/");
//   const separators = /([\+\-\*\/%()])/;
//   let tokens = tempExpression.split(separators).filter((t) => t.trim() !== "");
//   const tokensFinales = [];
//   for (let i = 0; i < tokens.length; i++) {
//     let token = tokens[i];
//     if (token === "-") {
//       const ultimoToken = tokensFinales.at(-1);
//       if (tokensFinales.length === 0 || ultimoToken === "(") {
//         const nextToken = tokens[i + 1];
//         if (nextToken) {
//           tokensFinales.push("-" + nextToken);
//           i++;
//           continue;
//         }
//       }
//     }
//     tokensFinales.push(token);
//   }

//   return tokensFinales;
// };
// let tokens = tokenize(expression);
// console.log(tokens);

function infijoAPostfijo(tokens) {
  let pilaOperadores = [];
  let colaPostFija = [];

  const precedenciaExtendida = {
    "+": 1,
    "-": 1,
    "x": 2,
    "÷": 2,
    "%": 2,
    "(": 0,
  };

  for (let token of tokens) {
    const isNumber = !isNaN(parseFloat(token));

    if (isNumber) {
      colaPostFija.push(token);
    } else if (token === "(") {
      pilaOperadores.push(token);
    } else if (token === ")") {
      while (pilaOperadores.length > 0 && pilaOperadores.at(-1) !== "(") {
        colaPostFija.push(pilaOperadores.pop());
      }
      if (pilaOperadores.at(-1) === "(") pilaOperadores.pop(); // Desechar el '('
    } else if (esOperadorBinario(token, precedenciaExtendida)) {
      while (
        pilaOperadores.length > 0 &&
        pilaOperadores.at(-1) !== "(" &&
        precedenciaExtendida[pilaOperadores.at(-1)] >=
          precedenciaExtendida[token]
      ) {
        colaPostFija.push(pilaOperadores.pop());
      }
      pilaOperadores.push(token);
    }
  }

  while (pilaOperadores.length > 0) {
    colaPostFija.push(pilaOperadores.pop());
  }

  return colaPostFija;
};

function esOperadorBinario(token, precedenciaMap) {
  return precedenciaMap[token] !== undefined && token !== "(" && token !== ")";
}

colaPostFija = infijoAPostfijo(tokens2);
console.log("--- FASE 1: Postfijo ---");
console.log("Cola Postfija:", colaPostFija);

function aplicarOperador(op, b, a) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "x":
      return a * b;
    case "÷":
      return a / b;
    case "%":
      return a % b;
    default:
      throw new Error("Operador desconocido");
  }
}

function evaluarPostfija(colaPostFija, display) {
  let valoresStack = [];

  for (let token of colaPostFija) {
    if (!isNaN(parseFloat(token))) {
      valoresStack.push(parseFloat(token));
    } else if (esOperadorBinario(token)) {
      const operador = token;

      const b = valoresStack.pop();
      const a = valoresStack.pop();

      if (a === undefined || b === undefined) {
        throw new Error("Error: Expresión desbalanceada (faltan operandos).");
      }

      valoresStack.push(aplicarOperador(operador, b, a));
    }
  }

  if (valoresStack.length !== 1)
    throw new Error(
      "Error de formato (la pila no se resolvió a un valor único)."
    );
  display.value = valoresStack.pop();
  // return valoresStack.pop();
};

function esOperadorBinario(token) {
  return ["+", "-", "x", "÷", "%"].includes(token);
}

const resultadoFinal = evaluarPostfija(colaPostFija);

console.log(`Tokens Generados: ${tokens2.join(" | ")}`);
console.log(`Cola Postfija: ${colaPostFija.join(" ")}`);
console.log(`\nEl Resultado Final es: ${resultadoFinal}`);

// const operadores = ["+", "-", "x", "÷", "%"];
// let expression = "2+3x4-5x2+(-5)";
// let pilaOperadores = [];
// let colaPostFija = [];
// let valoresStack = [];
// const precedencia = {
//   "+": 1,
//   "-": 1,
//   "x": 2,
//   "÷": 2,
//   "%": 2,
// };

// const tokenizev1 = (expression) => {
//   let tempExpression = expression.replace(/x/g, "*").replace(/÷/g, "/");
//   let regex = /-?\d+|\+|\-|\x|\(|\)/g;
//   let tokens = expression.match(regex);

//   let tokensFinales = [];
//   let prev = tokens[0];
//   for (let i = 0; i < tokens.length; i++) {
//     if (tokens[i].startsWith("-") && tokens[i].length > 1) {
//       if (tokens[i - 1] == "(") {
//         tokensFinales.push(tokens[i]);
//       } else tokensFinales.push(...tokens[i].split(""));
//     } else {
//       tokensFinales.push(tokens[i]);
//     }
//   }
//   return tokensFinales;
// };

// // const tokenize = (expression) => {
// //   let tempExpression = expression.replace(/x/g, "*").replace(/÷/g, "/");
// //   const separators = /([\+\-\*\/%()])/;
// //   let tokens = tempExpression.split(separators).filter((t) => t.trim() !== "");
// //   const tokensFinales = [];
// //   for (let i = 0; i < tokens.length; i++) {
// //     let token = tokens[i];
// //     if (token === "-") {
// //       const ultimoToken = tokensFinales.at(-1);
// //       if (tokensFinales.length === 0 || ultimoToken === "(") {
// //         const nextToken = tokens[i + 1];
// //         if (nextToken) {
// //           tokensFinales.push("-" + nextToken);
// //           i++;
// //           continue;
// //         }
// //       }
// //     }
// //     tokensFinales.push(token);
// //   }

// //   return tokensFinales;
// // };
// // let tokens = tokenize(expression);
// // console.log(tokens);

// let tokens2 = tokenizev1(expression);
// console.log(tokens2);

// const infijoAPostfijo = (tokens) => {
//   let pilaOperadores = [];
//   let colaPostFija = [];

//   const precedenciaExtendida = {
//     "+": 1,
//     "-": 1,
//     "x": 2,
//     "÷": 2,
//     "%": 2,
//     "(": 0,
//   };

//   for (let token of tokens) {
//     const isNumber = !isNaN(parseFloat(token));

//     if (isNumber) {
//       colaPostFija.push(token);
//     } else if (token === "(") {
//       pilaOperadores.push(token);
//     } else if (token === ")") {
//       while (pilaOperadores.length > 0 && pilaOperadores.at(-1) !== "(") {
//         colaPostFija.push(pilaOperadores.pop());
//       }
//       if (pilaOperadores.at(-1) === "(") pilaOperadores.pop(); // Desechar el '('
//     } else if (esOperadorBinario(token, precedenciaExtendida)) {
//       while (
//         pilaOperadores.length > 0 &&
//         pilaOperadores.at(-1) !== "(" &&
//         precedenciaExtendida[pilaOperadores.at(-1)] >=
//           precedenciaExtendida[token]
//       ) {
//         colaPostFija.push(pilaOperadores.pop());
//       }
//       pilaOperadores.push(token);
//     }
//   }

//   while (pilaOperadores.length > 0) {
//     colaPostFija.push(pilaOperadores.pop());
//   }

//   return colaPostFija;
// };
// function esOperadorBinario(token, precedenciaMap) {
//   return precedenciaMap[token] !== undefined && token !== "(" && token !== ")";
// }

// colaPostFija = infijoAPostfijo(tokens2);
// console.log("--- FASE 1: Postfijo ---");
// console.log("Cola Postfija:", colaPostFija);

// function aplicarOperador(op, b, a) {
//   switch (op) {
//     case "+":
//       return a + b;
//     case "-":
//       return a - b;
//     case "x":
//       return a * b;
//     case "÷":
//       return a / b;
//     case "%":
//       return a % b;
//     default:
//       throw new Error("Operador desconocido");
//   }
// }

// const evaluarPostfija = (colaPostFija) => {
//   let valoresStack = [];

//   for (let token of colaPostFija) {
//     if (!isNaN(parseFloat(token))) {
//       valoresStack.push(parseFloat(token));
//     } else if (esOperadorBinario(token)) {
//       const operador = token;

//       const b = valoresStack.pop();
//       const a = valoresStack.pop();

//       if (a === undefined || b === undefined) {
//         throw new Error("Error: Expresión desbalanceada (faltan operandos).");
//       }

//       valoresStack.push(aplicarOperador(operador, b, a));
//     }
//   }

//   if (valoresStack.length !== 1)
//     throw new Error(
//       "Error de formato (la pila no se resolvió a un valor único)."
//     );

//   return valoresStack.pop();
// };

// function esOperadorBinario(token) {
//   return ["+", "-", "x", "÷", "%"].includes(token);
// }

// const resultadoFinal = evaluarPostfija(colaPostFija);

// console.log(`Tokens Generados: ${tokens2.join(" | ")}`);
// console.log(`Cola Postfija: ${colaPostFija.join(" ")}`);
// console.log(`\nEl Resultado Final es: ${resultadoFinal}`);
