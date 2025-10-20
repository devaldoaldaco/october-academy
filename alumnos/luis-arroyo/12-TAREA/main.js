const operadores = ["+", "-", "x", "÷", "%"];
let expression = "2+3x4";
let pilaOperadores = [];
let pilaOperandos = [];
let valoresStack = [];
for (let char of expression) {
  if (operadores.includes(char)) pilaOperadores.push(char);
  else pilaOperandos.push(char);
}
for (let i = pilaOperadores.length - 1; i >= 0; i--) {
  pilaOperandos.push(pilaOperadores.pop());
}

function aplicarOperador(op, b, a) {
  a = parseFloat(a);
  b = parseFloat(b);
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
  }
}

for (let i = 0; i < pilaOperandos.length; i++) {
  if (!operadores.includes(pilaOperandos[i]))
    valoresStack.push(pilaOperandos[i]);
  else {
    valoresStack.push(
      aplicarOperador(pilaOperandos[i], valoresStack.pop(), valoresStack.pop())
    );
  }
}

console.log(pilaOperadores);
console.log(pilaOperandos);
console.log(valoresStack);
