const operations = {
  '÷': (a, b) => a / b,
  '×': (a, b) => a * b,
  '-': (a, b) => a - b,
  '+': (a, b) => a + b
};

const HIDDEN_CLASS = 'hidden';
const DECIMAL_SYMBOL = '.';
const DIVISION_SYMBOL = '÷'
const PERCENTAGE_SYMBOL = '%'
const SYNTAX_ERROR_TEXT = 'SYNTAX ERROR';
const NEGATIVE_SYMBOL = '-';

document.addEventListener('DOMContentLoaded', function() {
  const result = document.getElementById('result');
  const subResult = document.getElementById('subResult');
  const numbers = document.querySelectorAll('.number');
  const operators = document.querySelectorAll('.operator');
  const clearAll = document.getElementById('clearAll');
  const clear = document.getElementById('clear');
  const sign = document.getElementById('sign');
  const equal = document.getElementById('equal');
  const decimal = document.getElementById('decimal');

  let firstExpression = '0';
  let secondExpression = '0';
  let lastOperator = null;
  let syntaxError = false;
  
  const numberClickHandler = (event) => {
    const numberButton = event.currentTarget;
    
    if (syntaxError) return;

    if (result.textContent === '0') result.textContent = '';

    result.textContent += numberButton.textContent;

    if (subResult.textContent === '0') {
      firstExpression = result.textContent;
      return;
    }

    secondExpression = result.textContent;
  }

  const decimalClickHandler = () => {
    if (syntaxError) return;
    if (result.textContent.includes(DECIMAL_SYMBOL)) return;

    result.textContent = `${ result.textContent }${ DECIMAL_SYMBOL }`;

    applyResultTextToExpression();
  }

  const operatorClickHandler = (event) => {
    if (syntaxError) return;

    const operatorButton = event.currentTarget;

    const currentOperator = operatorButton.textContent;
      
    if (result.textContent === '0' && lastOperator !== null) {
      subResult.textContent = subResult.textContent.slice(0, -1) + currentOperator;
      lastOperator = currentOperator;
      return;
    }

    if (subResult.textContent !== '0' && lastOperator !== null) {
      calculate();

      secondExpression = '0';
      lastOperator = currentOperator;

      result.textContent = secondExpression;
      subResult.textContent = `${ firstExpression } ${ currentOperator }`;

      return;
    }

    subResult.textContent = `${ result.textContent } ${ currentOperator }`;
    result.textContent = '0';

    subResult.classList.remove(HIDDEN_CLASS);

    lastOperator = currentOperator;
  }

  const clearValues = () => {
    firstExpression = '0';
    secondExpression = '0';
    syntaxError = false;
    lastOperator = null;

    result.textContent = '0';
    subResult.textContent = '0';
    subResult.classList.add(HIDDEN_CLASS);
  }

  const clearOneCharacter = () => {
    if (result.textContent === '0') return;

    const expressionWithoutLastCharacter = result.textContent.slice(0, -1) || '0';

    result.textContent = expressionWithoutLastCharacter;
    
    applyResultTextToExpression();
  }

  const signHandler = () => {
    if (syntaxError) return;

    const currentExpression = result.textContent;

    if (currentExpression === '0') return;

    if (currentExpression.startsWith(NEGATIVE_SYMBOL)) {
      result.textContent = currentExpression.slice(1, currentExpression.length);
      applyResultTextToExpression();
      return;
    }

    result.textContent = `${ NEGATIVE_SYMBOL }${ currentExpression }`;
    applyResultTextToExpression();
  }

  const equalHandler = () => {
    if (syntaxError) return;
    if (subResult.textContent === '0') return; 
    if (lastOperator === null) return;
    if (result.textContent.endsWith('.')) return;

    calculate();
  }

  const calculate = () => {
    const firstNumber = Number(firstExpression);
    const secondNumber = Number(secondExpression);

    if (lastOperator === DIVISION_SYMBOL && secondNumber === 0) {
      subResult.textContent = `${ subResult.textContent } ${ secondExpression }`;
      result.textContent = SYNTAX_ERROR_TEXT;
      syntaxError = true;
      return;
    }

    const operationResult = operations[lastOperator](firstNumber, secondNumber);
    const sanitizedResult = Number.parseFloat(operationResult.toFixed(8));

    firstExpression = sanitizedResult.toString();
    
    subResult.textContent = `${ subResult.textContent } ${ secondExpression }`;
    result.textContent = sanitizedResult;

    lastOperator = null;
  }

  const applyResultTextToExpression = () => {
    if (subResult.textContent === '0') {
      firstExpression = result.textContent;
    } else {
      secondExpression = result.textContent;
    }
  }

  for (const number of numbers) {
    number.addEventListener('click', numberClickHandler);
  }

  decimal.addEventListener('click', decimalClickHandler);

  for (const operator of operators) {
    operator.addEventListener('click', operatorClickHandler);
  }

  clearAll.addEventListener('click', clearValues);
  
  clear.addEventListener('click', clearOneCharacter);

  sign.addEventListener('click', signHandler);

  equal.addEventListener('click', equalHandler);

});