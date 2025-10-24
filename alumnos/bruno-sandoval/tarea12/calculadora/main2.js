const PRECEDENCIA = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
    '^': 3
};

const body = document.querySelector(".body");
const screen = document.querySelector(".screen");
const equals = document.querySelector("#equals");
const cleanAll = document.querySelector("#cleanAll");
const clean = document.querySelector("#clean");

let valueInfija = [];
let valuePostFija = [];
let values = '0';

screen.innerText = values;



body.addEventListener('click', (e) => {
    const value = e.target.id;
    if (value !== 'equals' && value!== 'cleanAll' && value !=='clean') {
        if (!isNaN(value)) {
            if (values === '0') {
                values = value;
            } else {
                values = values + value;
            }
        } else if (value === '.') {
            values = values + value;
        } else {
            values = values + ` ${value} `;
        }
    }

    const tokens = values.split(" ");
    valueInfija = tokens;
    console.log('valor infijo ',valueInfija)

    screen.innerText = values;
});

equals.addEventListener('click', () => transformPostFijo(valueInfija));

clean.addEventListener('click',()=> values.length> 1 ? values = values.slice(0,-1) : values ='0');

cleanAll.addEventListener('click',()=> values ='0');

function transformPostFijo(array) {

    const valuesOperations = [];
    const valuesNums = [];
    for (let i = 0; i < array.length; i++) {
        const token = array[i];

        if (!isNaN(token)) {
            valuesNums.push(token);
        }
        else if (token in PRECEDENCIA) {
            while (
                valuesOperations.length > 0 &&
                (
                    PRECEDENCIA[valuesOperations[valuesOperations.length - 1]] > PRECEDENCIA[token]
                )
            ) {
                valuesNums.push(valuesOperations.pop());
            }
            valuesOperations.push(token);
        }
    }

    while (valuesOperations.length > 0) {
        valuesNums.push(valuesOperations.pop());
    }

    console.log('valor postFijo ',valuesNums);
    const finalResult = result(valuesNums);
    screen.innerText = finalResult;
    values= String(finalResult);
}

function result(array){
    const pilaNumeros = [];
    for(let i=0;i<array.length;i++){
        const token = array[i];
        if(!isNaN(token)){
            pilaNumeros.push(parseFloat(token));

        } else if(token in PRECEDENCIA){
            const tempVal1 = pilaNumeros.pop();
            const tempVal2 = pilaNumeros.pop();
            let tempOperation = 0.0;

            switch(token){
                case '+':
                    tempOperation = tempVal2 + tempVal1;
                break;
                case '-':
                    tempOperation = tempVal2 - tempVal1;
                break;
                case '*':
                    tempOperation = tempVal2 * tempVal1;
                break;
                case '/':
                    tempOperation = tempVal2 / tempVal1;
                break;
                case '^':
                    tempOperation = Math.pow(tempVal2,tempVal1);
                break;
            }
            pilaNumeros.push(tempOperation);
        }
    }
    let resultado = pilaNumeros.pop();

    return parseFloat(resultado.toFixed(10));
}
