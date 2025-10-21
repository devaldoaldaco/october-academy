'use strict';

let masculino = true;
let femenino = false;



masculino && femenino // false
masculino && !femenino // true

let edad = 30;

edad && femenino //

// a && b => b
// a || b => b

// nullish coalecing operator ??

const nombre = undefined ?? 'ALDO';
const juan = 'JUAN' ?? 'OTRO JUAN';
const direccion = undefined ?? {nombreCalle: ''}

console.log(nombre, juan);

// optional chaining ?.

const persona = {nombre: {first: 'aldo', last: 'aldaco'}};
persona.direccion = direccion;
persona.sexo = 'masculino';

console.log(persona.nombre.first);
console.log(persona.direccion?.nombreCalle);
console.log('asdadas');

// ternary operator  expression ? 'pasa si true' : 'pasa si false' 

const texto = (persona.sexo === 'masculino' && persona.pene) ? 'Hola soy hombre' : 'Hola soy algo diferente a hombre';


let textoDos = '';
if(persona.sexo === 'masculino' && persona.pene) {
    textoDos = 'Hola soy hombre';
} else {
    textoDos = 'Hola soy hombre';
}

let dia = 'martes';
switch(dia) {
    case 'lunes':
        console.log('chale es lunes inicio de semana que flojera');
        break;
    case 'viernes':
        console.log('vamos por cervezas');
        break;
    default:
        console.log('tome demasiado y no se que dia es');
}

const diasDeLaSemana = {
    'lunes': () => console.log('chale es lunes inicio de semana que flojera'),
    'viernes': () => console.log('vamos por cervezas')
};

diasDeLaSemana[dia]?.() ?? console.log('tome demasiado y no se que dia es'); 


function saludar(nombre = 'aldo', ...restOfParams) { // rest paramaters
    console.log(nombre, restOfParams); // cannot read property of undefined
}

saludar('pedro', 34, {nombre: 'alfonso'});
// function declaration
function sumar(...restParams) {
    return restParams.reduce((acum, current) => {
        acum = current + acum;
        return acum;
    }, 0);
}

const resultado = sumar(1,1,2,3,4,5,6,7,78);
console.log(resultado)

function saludar(nombre) {
    let contador = 0;
    console.log(this);
    let contar = function() {
        contador++;
        console.log(contador);
    }
    return contar;
}

const contar = saludar('aldo');

contar();
contar();
contar();
contar();

const jheyson = {
    nombre: 'jheyson',
    saludar: function(gritando) {
        let saludo = `Hola yo soy: ${this.nombre}`;
        if(gritando) {
            saludo = saludo.toUpperCase();
        }
        console.log(this, saludo);
    }
}

jheyson.saludar();

const saludo = jheyson.saludar;
const otroSaludo = saludo.bind(jheyson, true);
otroSaludo();


function despedir(...rest) {
    // console.log(`Adios: ${rest[0]}, los argumentos de la funcion son: ${rest}`);
    console.log(rest);
    console.log(arguments);
}

despedir('aldo');
// function expression

const filtradoPorColor = function() {
    console.log(this); //
}

filtradoPorColor();

(function() {
    var lodash = function() {
        // ...code
    }
    console.log('asdasdsd');
})(); // IIFE => inmediatly invkoed function expression
// arrow function

const button = document.querySelector('button');

button.addEventListener('click', saludo.bind(jheyson));

// arrow function 

const gritar = (_, apellido) => `HOLA ${_} ${apellido}`;

const text = gritar('aldo');
console.log(text);

const saludoIngles = (...args) => {
    console.log(this, args);//
    // arguments no existe
    return `HELLO ${nombre}`;
};


const bruno = {
    nombre: 'Bruno',
    saludar: (nombre) => {
        console.log(this);// lexical 
        return `HELLO ${nombre}`;
    }
}
console.log(bruno.saludar());
console.log(saludoIngles('aldo'));

// constructor function this....

// function Auto(marca, modelo, color) {
//     this.marca = marca;
//     this.modelo = modelo;   
//     this.color = color;
//     this.arrancar = () => {
//         console.log(this);
//     }
// }

class Auto {
    constructor(marca = 'generica', modelo = '2025', color = 'transparente'){
        this.marca = marca;
        this.modelo = modelo;   
        this.color = color;
        this.acelerar = this.acelerar.bind(this); // ligar fuertemente el contexto
    }

    static isArray(arr) {
        return arr instanceof Array;
    }

    acelerar() {
        console.log('run run run');
    }
}

const vw = new Auto('volks wagen', 'taos', 'blanca');
vw.acelerar();
console.log(Auto.isArray([]));
const audi = new Auto('audi', 'a3', 'rojo');
const mercedez = new Auto('mercedez', 'm4', 'negro');
const mini = new Auto();

console.log(vw, audi, mercedez)
console.log(mini)


class Animal {
    constructor(color, alimentacion, nombre) {
        this.color = color;
        this.alimentacion = alimentacion;
        this.nombre = nombre;
    }

    get _name() {
        return this.nombre;
    }

    set bautizar(name) {
        this.nombre = name;
    }

    hacerRuido() {
        if(this.nombre === 'perro') {
            console.log(this, 'guau guau guau');
        } else {
            console.log('sonido......');
        }
    }
}


const kevin = new Animal('blanco', 'carnivoro', 'perro');
kevin.color = 'negro';
kevin.hacerRuido();


const resul = [1,2,3].map((current) => {
    console.log(current)
    return current * 2;
});

// Array.prototype.map = function() {
//     console.log(this, 'pum pum pum');
// }

// [1,2,3].map((current) => {
//     console.log(current)
//     return current * 2;
// });
console.log(    resul);

const greta = new Animal('cafe', 'carnivoro', 'perro');
greta.hacerRuido();

greta.alimentacion
greta.hacerRuido

console.log(greta['alimentacion'])
greta['hacerRuido']();


greta.bautizar = 'greta';

console.log(greta._name)


class CuentaBancaria {
    constructor(saldo) {
        this._saldo = saldo;
    }

    depositar(cantidad) {
        this._saldo = this._saldo + cantidad;
    }

    descontar(cantidad) {
        this._saldo = this._saldo - cantidad;
    }

    get saldo() {
        return this._saldo;
    }

    set saldo(nuevoSaldo) {
        return this._saldo = nuevoSaldo;
    }
}


const aldo = new CuentaBancaria(0);
aldo.saldo = '1000';
console.log(aldo.saldo); 
console.log(aldo._saldo); // puedo pero no debo


class CuentaSantader {
    #saldo = 0;

    get saldo() {
        return this.#saldo;
    }

    set saldo(nuevoSaldo) {
        this.#saldo = nuevoSaldo;
    }
}


const aldoSantander = new CuentaSantader();

console.log(aldoSantander.saldo);
