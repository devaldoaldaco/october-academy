// CREAR EXPRESIONES REGULARES 

const regex1 = /hola/;
const regex2 = new RegExp('mundo');

//  Retorna true o false

const patron1 = /gato/;
console.log(patron1.test('tengo un gato'));
console.log(patron1.test('tengo un perro'));

const tieneNumeros = /\d/;
console.log(tieneNumeros.test('abc123'));
console.log(tieneNumeros.test('abc'));

// Retorna array o null

const patron2 = /\d+/;
console.log(patron2.exec('tengo 25 años'));
console.log(patron2.exec('no hay numeros'));

const patron3 = /(\w+)@(\w+)/;
const resultado = patron3.exec('user@gmail');
console.log(resultado[0]);
console.log(resultado[1]);
console.log(resultado[2]);

// Busca coincidencias 

const texto1 = 'tengo 10 manzanas y 5 peras';
console.log(texto1.match(/\d+/));
console.log(texto1.match(/\d+/g));

const texto2 = 'hola mundo';
console.log(texto2.match(/adios/));

//  Todas las coincidencias

const texto3 = 'Ana25, Luis30, Maria28';
const patron4 = /(\w+)(\d+)/g;
const todas = [...texto3.matchAll(patron4)];
console.log(todas);
console.log(todas[0][1]);
console.log(todas[0][2]);

// Retorna índice

const texto4 = 'hola mundo';
console.log(texto4.search(/mundo/));
console.log(texto4.search(/adios/));

//Reemplaza primera coincidencia 

const texto5 = 'gato gato gato';
console.log(texto5.replace(/gato/, 'perro'));

const texto6 = 'tengo 25 años';
console.log(texto6.replace(/\d+/, '30'));

// Reemplaza todas

const texto7 = 'gato gato gato';
console.log(texto7.replaceAll(/gato/g, 'perro'));

const texto8 = 'hola-mundo-javascript';
console.log(texto8.replaceAll(/-/g, ' '));

// Divide en array

const texto9 = 'Ana,Luis,Maria';
console.log(texto9.split(/,/));

const texto10 = 'uno dos tres';
console.log(texto10.split(/\s/));

const texto11 = 'abc123def456';
console.log(texto11.split(/\d+/));
