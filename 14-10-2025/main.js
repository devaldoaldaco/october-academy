// Variables 

// VAR
var nombre = 'aldo';
function saludar() {
    var nombre = 'juan';
    console.log(nombre); // scope function
}

saludar();

console.log(nombre); // scope global

let edad = 30;

edad = 31; 
// LET
{
    const PI = 3.1416;
    let edad = 30;
}

console.log(edad); // 31


// DATA TYPES


// PRIMITIVES

let primerNombre = 'aldo';
let edadAldo = 30;
let male = true;

console.log(primerNombre,edadAldo,male);

primerNombre = 'alda';
edadAldo = 31;
male = false;

console.log(primerNombre,edadAldo,male);

let otroNombre = primerNombre;

console.log(otroNombre);

otroNombre = 'gilberto';

console.log(otroNombre, primerNombre);
// NON PRIMITIVES

const persona = {
    nombre: 'aldo',
    edad: 30
};
console.log(persona);

persona.nombre = 'alda';

console.log(persona);

const otraPersona = persona;

console.log(otraPersona, persona);

otraPersona.nombre = 'jesus';

console.log(otraPersona, persona);


console.log(typeof persona.nombre);

// 'string'
// string
// 'String'
// 'STRING'

console.log(typeof null);

// Strings


//"" double quotes "'asdasd"
//'' single quotes <= '"asdasd"'
//`` back ticks

let txt = "LoreLorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti et praesentium facere nobis illo aliquam exercitationem magnam nemo dolorum numquam delectus ducimus autem eligendi, provident fuga consequatur eum iste officiis?"
let txt1 = 'LoreLorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti et praesentium facere nobis illo aliquam exercitationem magnam nemo dolorum numquam delectus ducimus autem'
let txt2 = `LoreLorem ipsum, dolor sit amet consectetur ${['a', 'l', 'd', 'o'].join('')} elit. Deleniti et praesentium facere nobis` // template strings
let txt3 = 'LoreLorem ipsum, dolor sit amet consectetur ' + ['a', 'l', 'd', 'o'].join('') + ' elit. Deleniti et praesentium facere nobis'
// String
console.log(txt2, txt3);

console.log(txt.toLowerCase());
console.log(txt.toUpperCase());
console.log(txt.includes('grito')); // metodos de instancia
console.log(txt.length);

console.log(String.fromCharCode(65)); // metodos de instancia

// String

let edadLuis = 1239182.10;
let cuentaBruno = 1000000000000000000000000n;
let pisos = new Number(true); // type coercion
console.log(edadLuis, pisos);

console.log(typeof NaN);

const number = 5;

console.log(number.toString(2));

const suma = parseInt('abc');

console.log(Number.isNaN(suma));

let variable = null;
let otravariable = undefined;

// Array

let alumnos = [{nombre: 'aldo', edad: 30}];
let alumnosAprobados = new Array(1,2,3,4);
let alumnosAprobados2 = new Array(10);

function transformar(item) {
    return item * 2;
}

console.log(alumnos.map(transformar))
// alumnos[0] // 12
// alumnos.length - 1 // 
console.log(alumnosAprobados)
console.log(alumnosAprobados2)

console.log(alumnos.push({nombre: 'Paolo', edad: 25}, {nombre: 'Josue', edad: 21}))// agrega un elemento al final 
console.log(alumnos);//
console.log(alumnos.pop())// agrega un elemento al final 
console.log(alumnos);//

const animales = ['perro', 'perico', 'gato'];
console.log(animales);//
console.log(animales.shift());
console.log(animales);//
console.log(animales.unshift('perro'));
console.log(animales);//

console.log(alumnos.concat(animales));
console.log(animales);//
console.log(alumnos);//

console.log(animales.join('-'));
console.log(animales.join());
console.log(alumnos.join());

console.log(animales.slice(0,2));
console.log(animales);
console.log(animales.splice(0,0,'puma'));
console.log(animales);

const buscarPerro = (item) => {
    if(item === 'perro') {
        return item;
    }
}

console.log(animales.includes('perro'));
console.log(animales.find(buscarPerro));
console.log(animales.some(buscarPerro)); 
console.log(animales.every(buscarPerro));
function procesarPalabra(word) {
  console.log(word);
  if (word === "dos") {
    words.shift();
  }
}
const words = ["uno", "dos", "tres", "cuatro"];
console.log(words);
words.forEach(procesarPalabra);
console.log(words);


let otroArray = [];

animales.forEach(animal => {
    otroArray.push(`nombre: ${animal}`);
});

console.log(animales, otroArray);

// 
let juan = {
    nombre: 'juan',
    edad: 30
};
console.log(juan);

juan.nombre = 'alberto';
juan['edad'] = 31;

console.log(juan);

console.log(Object.keys(juan));
console.log(Object.values(juan));
console.log(Object.entries(juan));

console.log(Object.assign({}, juan));

const pedrito = {...juan}

console.log(pedrito);


const animalesMamiferos = [...animales];
console.log(animalesMamiferos)

Object.prototype.toString = function() {
    return `${this.nombre} ${this.edad}`;
}

console.log(pedrito.toString());

const telefonos = {
    0: '5513044563',
    1: '+121313131'
}

console.log(telefonos[0], alumnos.toString());


// OPERATORS
// truthy 1, 'asdasd', true, -1
// falsy false, null, undefined, 0

// unstrict equal
console.log('0' == 0) // true => type coercion
console.log('' == false) // true => type coercion

// unstrict equal
console.log('0' === 0) // false => evitamos type coercion

// unstrict equal
console.log('0' != 0) // false => type coercion

// unstrict equal
console.log('0' !== 0) // true => evitamos type coercion


console.log(false < 1) // true => evitamos type coercion
console.log(1 < 1) // false => evitamos type coercion

console.log(0 > 1) // false => evitamos type coercion
console.log(1 > 1) // false => evitamos type coercion