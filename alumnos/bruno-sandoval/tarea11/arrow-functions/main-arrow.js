const botones = [
    { id: 'ac', name: 'ac' },
    { id: 'c', name: 'c' },
    { id: 'plus-minus', name: '+/-' },
    { id: 'percentage', name: '%' },
    
    { id: '7', name: '7' },
    { id: '8', name: '8' },
    { id: '9', name: '9' },
    { id: 'divide', name: '÷' },
    
    { id: '4', name: '4' },
    { id: '5', name: '5' },
    { id: '6', name: '6' },
    { id: 'multiply', name: 'x' },
    
    { id: '1', name: '1' },
    { id: '2', name: '2' },
    { id: '3', name: '3' },
    { id: 'subtract', name: '-' },
    
    { id: '0', name: '0' },
    { id: 'decimal', name: '.' },
    { id: 'equals', name: '=' },
    { id: 'add', name: '+' }
];

const screen = document.querySelector('.screen');
const body = document.querySelector('.body');

let currentInput = '0';      // El número que se está escribiendo actualmente
let previousInput = '';    // El primer número de la operación
let operator = null;       // El operador seleccionado
let resultDisplayed = false; // true si la pantalla muestra un resultado


const calculator = (botones) => {
    screen.innerText = currentInput;

    botones.forEach(element => {
        const btn = document.createElement('button');
        btn.classList.add("btn");
        btn.id = element.id;
        btn.innerText = `${element.name}`

        btn.addEventListener('click', (e) => {
            const valor = e.target.id;

            if (isNumber(valor)) {
                handleNumber(valor);
            } else if (isOperator(valor)) {
                handleOperator(valor);
            } else if (valor === 'equals') {
                handleEquals();
            } else if (valor === 'ac') {
                clear();
            } else if (valor === 'c') {
                // Lógica para 'c'
            } else if (valor === 'decimal') {
                // Lógica para 'decimal'
            } else if (valor === 'plus-minus') {
                // Lógica para 'plus-minus'
            }
            updateScreen();
            console.log(currentInput);
        });
        body.appendChild(btn);
    });
};

const handleNumber = (valor) => {
    if (resultDisplayed) {
        currentInput = valor;
        resultDisplayed = false;
    } else if (currentInput === '0') {
        currentInput = valor;
    } else {
        currentInput += valor;
    }
};

const updateScreen = () => {
    if (currentInput.length > 10) {
        screen.innerText = parseFloat(currentInput).toPrecision(9);
    } else {
        screen.innerText = currentInput;
    }
};

const isOperator = (valor) => {
    return ['add', 'subtract', 'multiply', 'divide', 'percentage'].includes(valor);
};

const handleOperator = (valor) => {
    if (operator && !resultDisplayed) {
        handleEquals();
    }
    previousInput = currentInput;
    operator = valor;
    resultDisplayed = true;
};

const handleEquals = () => {
    if (!operator || previousInput === '') {
        return;
    }

    const a = parseFloat(previousInput);
    const b = parseFloat(currentInput);
    let result;

    switch (operator) {
        case 'add':
            result = add(a, b);
            break;
        case 'subtract':
            result = sub(a, b);
            break;
        case 'multiply':
            result = multi(a, b);
            break;
        case 'divide':
            result = div(a, b);
            break;
        case 'percentage':
            result = remainder(a, b);
            break;
        default:
            return;
    }

    currentInput = String(result);
    operator = null;
    previousInput = '';
    resultDisplayed = true;
};

const isNumber = (valor) => !isNaN(valor);

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const multi = (a, b) => a * b;

const div = (a, b) => {
    if (b === 0) {
        return 'Error';
    }
    return a / b;
};

const remainder = (a, b) => a % b;

const clear = () => {
    currentInput = '0';
    previousInput = '';
    operator = null;
    resultDisplayed = false;
};

calculator(botones);