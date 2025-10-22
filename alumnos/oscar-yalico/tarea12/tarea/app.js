const input = document.getElementById("expression");
const postfixEl = document.getElementById("postfix");
const resultEl = document.getElementById("result");

// Eventos
document.getElementById("convert").addEventListener("click", () => {
  const expr = input.value.trim();
  if (!expr) return alert("Ingrese una expresión");

  const postfix = infixToPostfix(expr);
  postfixEl.textContent = postfix;
  resultEl.textContent = "";
});

document.getElementById("evaluate").addEventListener("click", () => {
  const postfix = postfixEl.textContent.trim();
  if (!postfix) return alert("Primero convierta a postfijo");

  const result = evaluatePostfix(postfix);
  resultEl.textContent = result;
});

document.getElementById("clear").addEventListener("click", () => {
  input.value = "";
  postfixEl.textContent = "";
  resultEl.textContent = "";
});

// Prioridad de operadores
// Numero mayor = mayor precedencia(mayor prioridad)
const precedence = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
  "^": 3,
};

// Asociatividad de operadores
// Izquierda: +, -, *, /
// Derecha: ^
const isLeftAssociative = (op) => op !== "^";

// Convierte infijo a postfijo
function infixToPostfix(expression) {
  const output = [];
  const stack = [];

  // Dividir la expresión en tokens (números y operadores)
  // Entrada 3 + 4 * (2 - 1)
  // salida ["3", "+", "4", "*", "(", "2", "-", "1", ")"]
  const tokens =
    expression
      .match(/\d+(\.\d+)?|[+\-*/^()]|\s+/g)
      ?.filter((t) => t.trim().length > 0) || [];

  // algoritmo de Dijkstra
  for (let token of tokens) {
    if (!isNaN(token)) {
      // Si es número
      output.push(token);
    } else if (token === "(") {
      stack.push(token);
    } else if (token === ")") {
      // Desapilar hasta encontrar (
      while (stack.length && stack[stack.length - 1] !== "(") {
        output.push(stack.pop());
      }
      stack.pop(); // eliminar '('
    } else if (token in precedence) {
      // Mientras el operador de la pila tenga mayor o igual precedencia
      while (
        stack.length &&
        stack[stack.length - 1] in precedence &&
        ((isLeftAssociative(token) &&
          precedence[stack[stack.length - 1]] >= precedence[token]) ||
          (!isLeftAssociative(token) &&
            precedence[stack[stack.length - 1]] > precedence[token]))
      ) {
        output.push(stack.pop());
      }
      stack.push(token);
    }
  }

  // Vaciar operadores restantes
  while (stack.length) {
    output.push(stack.pop());
  }

  return output.join(" ");
}

// Evalúa expresión postfija
function evaluatePostfix(postfix) {
  const stack = [];
  const tokens = postfix.split(" ");
  // Postfijo: 3 4 2 * 1 5 - / +

  //   [3]
  // [3,4]
  // [3,4,2]
  // → * → [3,8]
  // [3,8,1]
  // [3,8,1,5]
  // → - → [3,8,-4]
  // → / → [3,-2]
  // → + → [1]

  for (let token of tokens) {
    if (!isNaN(token)) {
      stack.push(parseFloat(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();

      switch (token) {
        case "+":
          stack.push(a + b);
          break;
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
        case "^":
          stack.push(Math.pow(a, b));
          break;
      }
    }
  }

  return stack.pop();
}
