const operatorEqual = document.getElementById("operadorEqual");
const buttons = document.querySelectorAll(".btn");
const number = document.querySelectorAll(".number");
const content = document.getElementById("contentCalculator");
const paragraph = document.getElementById("contentParagraph");
const ac = document.getElementById("ac");
const deleteContent = document.getElementById("delete");
const percentage = document.getElementById("percentage");

//operadores
const operators = ["+", "-", "x", "/","(",")"];

let resetContent = false;
let result;

buttons.forEach((b) => {
  b.addEventListener("click", () => {
    const btnContent = b.textContent;
    const lastChar = content.textContent.slice(-1);

    //validacion ultimo elemento = operator
    /*if (operators.includes(lastChar) && operators.includes(btnContent)) {
      return;
    }*/

    /* //max operandos
    const currentOperands = content.textContent.split(/[\+\-x\/]/);
    if (operators.includes(btnContent) && !resetContent) {
      if (currentOperands.length >= 2) return;
    }*/

    //validacion decimales
    if (btnContent === ".") {
      const parts = content.textContent.split(/[\+\-x\/]/);
      const lastNumber = parts[parts.length - 1];
      if (lastNumber.includes(".")) return;
    }

    //Validación luego de presionar un número
    if (
      resetContent &&
      !operators.includes(b.textContent) &&
      b.textContent !== "="
    ) {
      content.textContent = "";
      resetContent = false;
    }

    //Validación luego de presionar un operador
    if (resetContent && operators.includes(b.textContent)) {
      content.textContent = paragraph.textContent;
      resetContent = false;
    }

    content.textContent += btnContent;
  });
});

ac.addEventListener("click", () => {
  paragraph.textContent = "0";
  content.textContent = "";
  resetContent = false;
});

operatorEqual.addEventListener("click", () => {
  const operatorValue = content.textContent;

  console.log(infixToPostfix(operatorValue));
  /*if (operators.some((op) => operatorValue.endsWith(op))) {
    return;
  }*/

  const postfixArray = infixToPostfix(operatorValue);
  console.log("Infijo:", operatorValue);
  console.log("Postfijo:", postfixArray);
  /*switch (true) {
    case operatorValue.includes("+"):
      values = operatorValue.split("+").map(Number);
      result = add(values);
      break;
    case operatorValue.includes("-"):
      values = operatorValue.split("-").map(Number);
      result = subtract(values);
      break;
    case operatorValue.includes("/"):
      values = operatorValue.split("/").map(Number);
      result = divide(values);
      break;
    case operatorValue.includes("x"):
      values = operatorValue.split("x").map(Number);
      result = multiply(values);
      break;
    default:
      alert("No podemos realizar esta operacion");
      break;
  }*/

  paragraph.textContent = `${postfixArray}`;
  resetContent = true;
});

deleteContent.addEventListener("click", () => {
  let aux = paragraph.textContent;

  if (aux !== "0") {
    content.textContent = aux;
    paragraph.textContent = "0";
  }
  resetContent = false;
  content.textContent = content.textContent.slice(0, -1) || "0";
});

percentage.addEventListener("click", () => {
  let expr = content.textContent;

  const parts = expr.split(/([+\-x/])/);
  let last = parts[parts.length - 1];

  let value = parseFloat(last);
  if (isNaN(value)) return;

  value = value / 100;
  parts[parts.length - 1] = value.toString();

  content.textContent = parts.join("");
  paragraph.textContent = value.toString();
});

const add = (...values) => values.reduce((acum, e) => acum + e, 0);
const substract = (...values) => values.reduce((acum, e) => (acum = acum - e));
const multiply = (...values) =>
  values.reduce((acum, e) => (acum = acum * e), 1);
const divide = (...values) => {
  return values.reduce((acumulador, e, index) => {
    if (e === 0 && index !== 0) {
      alert("Error: No se puede dividir por cero");
      return acumulador;
    }
    return index === 0 ? e : acumulador / e;
  });
};

const infixToPostfix = (content) => {
  let postfixArray = [];
  let operatorDepencyArray = [];
  const contentvalues = separatorOperator(content);
  console.log(contentvalues);

  for (let i = 0; i < contentvalues.length; i++) {
    let value = contentvalues[i];

    if (!operators.includes(value)) {
      postfixArray.push(value);
    } else if (value === "(") {
      operatorDepencyArray.push(value);
    } else if (value === ")") {
      while (
        operatorDepencyArray.length &&
        operatorDepencyArray[operatorDepencyArray.length - 1] !== "("
      ) {
        postfixArray.push(operatorDepencyArray.pop());
      }
      const top = operatorDepencyArray.pop();
      if (top !== "(") {
        alert("Hay un incongurnecia con los parentesis ingresados");
        return;
      }
    } else {
      while (
        operatorDepencyArray.length > 0 &&
        precedency(operatorDepencyArray[operatorDepencyArray.length - 1]) >=
          precedency(value)
      ) {
        postfixArray.push(operatorDepencyArray.pop());
      }
      operatorDepencyArray.push(value);
    }
  }

  while (operatorDepencyArray.length > 0) {
    const top = operatorDepencyArray.pop();
    if (top === "(" || top === ")") {
      alert("Hay un incongruencia con los parentesis ingresados");
      return;
    }
    postfixArray.push(top);
  }
  console.log('array de operadores',operatorDepencyArray);
  console.log('postix array',postfixArray);
  return resulPostfix(postfixArray);

};

const resulPostfix = (arrayPostfix) => {
  let arrayNumbers = [];
  for (let i = 0; i < arrayPostfix.length; i++) {
    let value = arrayPostfix[i];
    if (!operators.includes(arrayPostfix[i])) {
      arrayNumbers.push(Number(value));
    } else {
      let value2 = arrayNumbers.pop();
      let value1 = arrayNumbers.pop();
      switch (true) {
        case value === "+":
          arrayNumbers.push(add(value1, value2));
          break;
        case value === "-":
          arrayNumbers.push(substract(value1, value2));
          break;
        case value === "/":
          arrayNumbers.push(divide(value1, value2));
          break;
        case value === "x":
          arrayNumbers.push(multiply(value1, value2));
          break;
        default:
          alert("No podemos realizar esta operacion");
          break;
      }
    }
  }
  return arrayNumbers[0];
};

const separatorOperator = (expression) => {
  return expression.match(/\d+|[+\-x\/()]/g);
};

const precedency = (value) => {
 if (value == "+" || value == "-") {
    return 2;
  } else if (value == "/" || value == "x") {
    return 3;
  } else return 0;
};
