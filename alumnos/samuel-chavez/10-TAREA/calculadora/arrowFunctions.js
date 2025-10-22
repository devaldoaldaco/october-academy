const operatorEqual = document.getElementById("operadorEqual");
const buttons = document.querySelectorAll(".btn");
const number = document.querySelectorAll(".number");
const content = document.getElementById("contentCalculator");
const paragraph = document.getElementById("contentParagraph");
const ac = document.getElementById("ac");
const deleteContent = document.getElementById("delete");
const percentage = document.getElementById("percentage");

//operadores
const operators = ["+", "-", "x", "/"];
let resetContent = false;
let result;

buttons.forEach((b) => {
  b.addEventListener("click", () => {
    const btnContent = b.textContent;
    const lastChar = content.textContent.slice(-1);

    //validacion ultimo elemento = operator
    if (operators.includes(lastChar) && operators.includes(btnContent)) {
      return;
    }

    //max operandos
    const currentOperands = content.textContent.split(/[\+\-x\/]/);
    if (operators.includes(btnContent) && !resetContent) {
      if (currentOperands.length >= 2) return;
    }

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
  const lastChar = operatorValue.slice(-1);
  if (operators.some((op) => operatorValue.endsWith(op))) {
    return;
  }

  if (operators.includes(lastChar)) return;
  let values;
  switch (true) {
    case operatorValue.includes("+"):
      values = operatorValue.split("+").map(Number);
      result = add(values);
      console.log(values);
      console.log("si sume", result);
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
  }

  paragraph.textContent = `${result}`;
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

const add = (values) => {
  return values.reduce((acumulador, e) => {
    return (acumulador = acumulador + e);
  }, 0);
};

const subtract = (values) => {
  return values.reduce((acumulador, e) => {
    return (acumulador = acumulador - e);
  });
};

const multiply = (values) => {
  return values.reduce((acumulador, e) => {
    return (acumulador = acumulador * e);
  }, 1);
};

const divide = (values) => {
  return values.reduce((acumulador, e, index) => {
    if (e === 0 && index !== 0) {
      alert("Error: No se puede dividir por cero");
      return acumulador;
    }
    return index === 0 ? e : acumulador / e;
  });
};
