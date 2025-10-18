const body = document.querySelector('body');

// ===============================
//        INICIO: STRINGS
// ===============================

console.log(`===============================
       INICIO: STRINGS
===============================`);

const text = '¡Hola Mundo! Bienvenido a Javascript 🚀';
const email = 'usuario@email.com';
const url = 'https://www.ejemplo.com';
const spaces = '  texto con espacios  ';
const multiline = `Primera línea
Segunda línea
Tercera línea`;

console.log('=== CADENAS INICIALES ===');
console.log('text:', text);
console.log('email:', email);
console.log('url:', url);
console.log('spaces:', spaces);
console.log('multiline:', multiline);
console.log('\n');


// *** INICIO: MÉTODOS ESTÁTICOS *** //
/*
  1. String.fromCharCode()
  2. String.fromCodePoint()
  3. String.raw()
*/

console.log('=== MÉTODOS ESTÁTICOS ===');

// 1. String.fromCharCode()
console.log('1. String.fromCharCode()');
const from1 = String.fromCharCode(72, 111, 108, 97, 128640, 127881); // CÓDIGOS UTF-16
console.log('\tCódigos[72, 111, 108, 97, 128640, 127881] ->', from1);

// 2. String.fromCodePoint()
console.log('2. String.fromCodePoint()'); // EMOJIS
const from2 = String.fromCodePoint(72, 111, 108, 97, 128640, 127881);
console.log('\tCódigos[72, 111, 108, 97, 128640, 127881] ->', from2);

// 3. String.raw()
console.log('3. String.raw()');
const path = String.raw`C:\nuevo\texto\ejemplo.txt`;
console.log('\tRuta sin escapar:', path);

console.log('\n');

// *** FIN: MÉTODOS ESTÁTICOS *** //

// *** INICIO: MÉTODOS DE INSTANCIA *** //
/*
  1. String.prototype.anchor() (OBSOLETO)
  2. String.at()
  3. String.prototype.big() (OBSOLETO)
  4. String.prototype.blink() (OBSOLETO)
  5. String.prototype.bold() (OBSOLETO)
  6. String.prototype.charAt()
  7. String.prototype.charCodeAt()
  8. String.prototype.codePointAt()
  9. String.prototype.concat()
  10. String.prototype.endsWith()
  11. String.prototype.fixed() (OBSOLETO)
  12. String.prototype.fontcolor() (OBSOLETO)
  13. String.prototype.fontsize() (OBSOLETO)
  14. String.prototype.includes()
  15. String.prototype.indexOf()
  16. isWellFormed()
  17. String.prototype.italics() (OBSOLETO)
  18. String.prototype.lastIndexOf()
  19. String.prototype.link() (OBSOLETO)
  20. String.prototype.localeCompare()
  21. String.prototype.match()
  22. String.prototype.matchAll()
  23. String.prototype.normalize()
  24. String.prototype.padEnd()
  25. String.prototype.padStart()
  26. String.prototype.repeat()
  27. String.prototype.replace()
  28. String.prototype.replaceAll()
  29. String.prototype.search()
  30. String.prototype.slice()
  31. String.prototype.small() (OBSOLETO)
  32. String.prototype.split()
  33. String.prototype.startsWith()
  34. String.prototype.strike() (OBSOLETO)
  35. String.prototype.sub() (OBSOLETO)
  36. String.prototype.substr() (OBSOLETO)
  37. String.prototype.substring()
  38. String.prototype.sup() (OBSOLETO)
  39. String.prototype.toLocaleLowerCase()
  40. String.prototype.toLocaleUpperCase()
  41. String.prototype.toLowerCase()
  42. String.prototype.toString()
  43. String.prototype.toUpperCase()
  44. toWellFormed()
  45. String.prototype.trim()
  46. String.prototype.trimEnd()
  47. trimStart()
  48. String.prototype.valueOf()
  49. [Symbol.iterator]()
*/

console.log('=== MÉTODOS DE INSTANCIA ===');

// 1. String.prototype.anchor() (OBSOLETO)
console.log('1. String.prototype.anchor() (OBSOLETO)');
const anchor = 'Inicio'.anchor('section-1');
console.log(`\t'Inicio'.anchor('section-1'):`, anchor);
// body.innerHTML = anchor;

// 2. String.at()
console.log('2. String.at()');
console.log('\ttext.at(0):', text.at(0));
console.log('\ttext.at(-1):', text.at(-1));

// 3. String.prototype.big() (OBSOLETO)
console.log('3. String.prototype.big() (OBSOLETO)');
const big = 'Texto grande'.big();
console.log(`\t'Texto grande'.big():`, big);
// body.innerHTML = big;

// 4. String.prototype.blink() (OBSOLETO)
console.log('4. String.prototype.blink() (OBSOLETO)');
const blink = 'Parpadeo'.blink();
console.log(`\t'Parpadeo'.blink():`, blink);
// body.innerHTML = blink;

// 5. String.prototype.bold() (OBSOLETO)
console.log('5. String.prototype.bold() (OBSOLETO)');
const bold = 'Texto en negrita'.bold();
console.log(`\t'Texto en negrita'.bold():`, bold);
// body.innerHTML = bold;

// 6. String.prototype.charAt()
console.log('6. String.prototype.charAt()');
console.log('\ttext.charAt(6):', text.charAt(6));

// 7. String.prototype.charCodeAt()
console.log('7. String.prototype.charCodeAt()');
console.log('\ttext.charCodeAt(6):', text.charCodeAt(6));

// 8. String.prototype.codePointAt()
console.log('8. String.prototype.codePointAt()');
console.log('\ttext.codePointAt(0):', text.codePointAt(0));
console.log('\ttext.codePointAt(41):', text.codePointAt(37));

// 9. String.prototype.concat()
console.log('9. String.prototype.concat():');
const concatenado = text.concat(' - ', 'Aprendiendo strings');
console.log(`\ttext.concat(' - ', 'Aprendiendo strings'):`, concatenado);

// 10. String.prototype.endsWith()
console.log('10. String.prototype.endsWith()');
console.log(`\ttext.endsWith('🚀'):`, text.endsWith('🚀'));
console.log(`\ttext.endsWith('Mundo'):`, text.endsWith('Mundo'));

// 11. String.prototype.fixed() (OBSOLETO)
console.log('11. String.prototype.fixed() (OBSOLETO)');
const fixed = 'Texto monoespaciado'.fixed();
console.log(`\t'Texto monoespaciado'.fixed():`, fixed);
// body.innerHTML = fixed;

// 12. String.prototype.fontcolor() (OBSOLETO)
console.log('12. String.prototype.fontcolor() (OBSOLETO)');
const fontcolor = 'Texto rojo'.fontcolor('red');
console.log(`\t'Texto rojo'.fontcolor('red'):`, fontcolor);
// body.innerHTML = fontcolor;

// 13. String.prototype.fontsize() (OBSOLETO)
console.log('13. String.prototype.fontsize() (OBSOLETO)');
const fontsize = 'Texto grande'.fontsize(7);
console.log(`\t'Texto grande'.fontsize(7):`, fontsize);
// body.innerHTML = fontsize;

// 14. String.prototype.includes()
console.log('14. String.prototype.includes()');
console.log(`\ttext.includes('Javascript'):`, text.includes('Javascript'));
console.log(`\ttext.includes('Python'):`, text.includes('Python'));

// 15. String.prototype.indexOf()
console.log('15. String.prototype.indexOf()');
console.log(`\ttext.indexOf('Mundo'):`, text.indexOf('Mundo'));
console.log(`\ttext.indexOf('Python'):`, text.indexOf('Python'));

// 16. isWellFormed()
console.log('16. isWellFormed()');
console.log('\ttext.isWellFormed():', text.isWellFormed());
const malformed = String.fromCharCode(0xD800);
console.log('\tString.fromCharCode(0xD800).isWellFormed():', malformed.isWellFormed());

// 17. String.prototype.italics() (OBSOLETO)
console.log('17. String.prototype.italics() (OBSOLETO)');
const italics = 'Texto en cursiva'.italics();
console.log(`\t'Texto en cursiva'.italics():`, italics);
// body.innerHTML = italics;

// 18. String.prototype.lastIndexOf()
console.log('18. String.prototype.lastIndexOf()');
const repeated = 'ana ama a ana';
console.log(`\t'ana ama a ana'.lastIndexOf('ana'):`, repeated.lastIndexOf('ana'));
console.log(`\t'ana ama a ana'.lastIndexOf('a'):`, repeated.lastIndexOf('a'));

// 19. String.prototype.link() (OBSOLETO)
console.log('19. String.prototype.link() (OBSOLETO)');
const link = 'Click aquí'.link('https://ejemplo.com');
console.log(`\t'Click aquí'.link('https://ejemplo.com'):`, link);
// body.innerHTML = link;

// 20. String.prototype.localeCompare()
console.log('20. String.prototype.localeCompare()');
console.log(`\t'á'.localeCompare('z'):`, 'á'.localeCompare('z')); // á < z
console.log(`\t'zebra'.localeCompare('animal'):`, 'zebra'.localeCompare('animal')); // animal < zebra
console.log(`\t'b'.localeCompare('b'):`, 'b'.localeCompare('b')); // b = b

// 21. String.prototype.match()
console.log('21. String.prototype.match()');
const match = text.match(/[A-Z][a-z]+/g);
console.log('\ttext.match(/[A-Z][a-z]+/g):', match);

// 22. String.prototype.matchAll()
console.log('22. String.prototype.matchAll()');
const matchAll = [ ...text.matchAll(/[A-Z][a-z]+/g) ];
console.log('\t[...text.matchAll(/\\d+/g)]:', matchAll);

// 23. String.prototype.normalize()
console.log('23. String.prototype.normalize()');
const accent1 = 'café';
const accent2 = 'cafe\u0301';
console.log('\t', {accent1, accent2});
console.log('\taccent1 === accent2:', accent1 === accent2);
console.log('\taccent1.normalize() === accent2.normalize():', accent1.normalize() === accent2.normalize());

// 24. String.prototype.padEnd()
console.log('24. String.prototype.padEnd()');
const padEnd = '42'.padEnd(5, '0');
console.log(`\t'42'.padEnd(5, '0'):`, padEnd);

// 25. String.prototype.padStart()
console.log('25. String.prototype.padStart()');
const padStart = '42'.padStart(5, '0');
console.log(`\t'42'.padStart(5, '0'):`, padStart);

// 26. String.prototype.repeat()
console.log('26. String.prototype.repeat()');
const repeat = 'ja'.repeat(3);
console.log(`\t'ja'.repeat(3):`, repeat);

// 27. String.prototype.replace()
console.log('27. String.prototype.replace()');
const replace = text.replace('Mundo', 'Universo');
console.log(`\ttext.replace('Mundo', 'Universo'):`, replace);

// 28. String.prototype.replaceAll()
console.log('28. String.prototype.replaceAll()');
const replaceAll = 'uno dos uno tres uno'.replaceAll('uno', 'mil');
console.log(`\t'uno dos uno tres uno'.replaceAll('uno', 'mil'):`, replaceAll);

// 29. String.prototype.search()
console.log('29. String.prototype.search()');
console.log('\ttext.search(/\\d+/):', text.search(/\d+/));

// 30. String.prototype.slice()
console.log('30. String.prototype.slice()');
console.log('\ttext.slice(0, 11):', text.slice(0, 12));
console.log('\ttext.slice(-4):', text.slice(-9));

// 31. String.prototype.small() (OBSOLETO)
console.log('31. String.prototype.small() (OBSOLETO)');
const small = 'Texto pequeño'.small();
console.log(`\t'Texto pequeño'.small():`, small);
// body.innerHTML = small;

// 32. String.prototype.split()
console.log('32. String.prototype.split()');
const split = text.split(' ');
console.log(`\ttext.split(' '):`, split);

// 33. String.prototype.startsWith()
console.log('33. String.prototype.startsWith()');
console.log(`\ttext.startsWith('¡Hola'):`, text.startsWith('¡Hola'));

// 34. String.prototype.strike() (OBSOLETO)
console.log('34. String.prototype.strike() (OBSOLETO)');
const strike = 'Texto tachado'.strike();
console.log(`\t'Texto tachado'.strike():`, strike);
// body.innerHTML = strike;

// 35. String.prototype.sub() (OBSOLETO)
console.log('35. String.prototype.sub() (OBSOLETO)');
const sub = '2'.sub();
console.log(`\t'H' + '2'.sub() + 'O':`, 'H' + '2'.sub() + 'O');
// body.innerHTML = `H${ sub }O`;

// 36. String.prototype.substr() (OBSOLETO)
console.log('36. String.prototype.substr() (OBSOLETO)');
console.log('\ttext.substr(6, 5):', text.substr(6, 5));

// 37. String.prototype.substring()
console.log('37. String.prototype.substring()');
console.log('\ttext.substring(6, 11):', text.substring(6, 11));

// 38. String.prototype.sup() (OBSOLETO)
console.log('38. String.prototype.sup() (OBSOLETO)');
const sup = '2'.sup();
console.log(`\t'E = mc' + '2'.sup():`, 'E = mc' + '2'.sup());
// body.innerHTML = `E = mc${ sup }`;

// 39. String.prototype.toLocaleLowerCase()
console.log('39. String.prototype.toLocaleLowerCase()');
const turkish = 'İstanbul';
console.log(`\t'İstanbul'.toLocaleLowerCase('tr'):`, turkish.toLocaleLowerCase('tr'));

// 40. String.prototype.toLocaleUpperCase()
console.log('40. String.prototype.toLocaleUpperCase()');
console.log(`\t'istanbul'.toLocaleUpperCase('tr'):`, 'istanbul'.toLocaleUpperCase('tr'));

// 41. String.prototype.toLowerCase()
console.log('41. String.prototype.toLowerCase()');
console.log('\ttext.toLowerCase():', text.toLowerCase());

// 42. String.prototype.toString()
console.log('42. String.prototype.toString()');
const objString = new String('objeto');
console.log(`\tnew String('objeto').toString():`, objString.toString());

// 43. String.prototype.toUpperCase()
console.log('43. String.prototype.toUpperCase()');
console.log('\ttext.toUpperCase():', text.toUpperCase());

// 44. toWellFormed()
console.log('44. toWellFormed()');
const toWellFormed = malformed.toWellFormed();
console.log('\tmalformed.toWellFormed():', toWellFormed);
console.log('\ttoWellFormed.isWellFormed():', toWellFormed.isWellFormed());

// 45. String.prototype.trim()
console.log('45. String.prototype.trim()');
console.log(`\t'${ spaces }'.trim():`, `'${ spaces.trim() }'`);

// 46. String.prototype.trimEnd()
console.log('46. String.prototype.trimEnd()');
console.log(`\t'${ spaces }'.trimEnd():`, `'${ spaces.trimEnd() }'`);

// 47. trimStart()
console.log('47. trimStart()');
console.log(`\t'${ spaces }'.trimStart():`, `'${ spaces.trimStart() }'`);

// 48. String.prototype.valueOf()
console.log('48. String.prototype.valueOf()');
console.log(`\tnew String('objeto').valueOf():`, objString.valueOf());

// 49. [Symbol.iterator]()
console.log('49. [Symbol.iterator]()');
console.log(`\tIterando 'Hola':`);
for (const char of 'Hola') {
	console.log('\t-', char);
}

console.log('\n');


// *** FIN: MÉTODOS DE INSTANCIA *** //

// *** INICIO: PROPIEDADES DE INSTANCIA *** //
/*
  1. String.length
*/

console.log('=== PROPIEDADES DE INSTANCIA ===');

// 1. String.length
console.log('1. String.length');
console.log(`\ttext.length:`, text.length);


// *** FIN: PROPIEDADES DE INSTANCIA *** //

console.log(`===============================
         FIN: STRINGS
===============================`);

console.log('\n\n');


// ===============================
//          FIN: STRINGS
// ===============================




// ===============================
//        INICIO: NUMBERS
// ===============================

console.log(`===============================
       INICIO: NUMBERS
===============================`);

const num = 42.789;
const large = 123456789.123456789;
const smallNum = 0.000000123;
const negative = -273.15;
const infinity = Infinity;
const nan = NaN;

console.log('=== NÚMEROS INICIALES ===');
console.log('num:', num);
console.log('large:', large);
console.log('smallNum:', smallNum);
console.log('negative:', negative);
console.log('infinity:', infinity);
console.log('nan:', nan);
console.log('\n');

// *** INICIO: MÉTODOS ESTÁTICOS *** //
/*
  1. Number.isFinite()
  2. Number.isInteger()
  3. Number.isNan()
  4. Number.isSafeInteger()
  5. Number.parseFloat()
  6. Number.parseInt()
*/

console.log('=== MÉTODOS ESTÁTICOS ===');

// 1. Number.isFinite()
console.log('1. Number.isFinite()');
console.log('\tNumber.isFinite(42):', Number.isFinite(42));
console.log('\tNumber.isFinite(Infinity):', Number.isFinite(Infinity));
console.log('\tNumber.isFinite(NaN):', Number.isFinite(NaN));

// 2. Number.isInteger()
console.log('2. Number.isInteger()');
console.log('\tNumber.isInteger(42):', Number.isInteger(42));
console.log('\tNumber.isInteger(42.5):', Number.isInteger(42.5));
console.log('\tNumber.isInteger(NaN):', Number.isInteger(NaN));

// 3. Number.isNaN()
console.log('3. Number.isNaN()');
console.log('\tNumber.isNaN(NaN):', Number.isNaN(NaN));
console.log('\tNumber.isNaN(42):', Number.isNaN(42));
console.log('\tNumber.isNaN("texto"):', Number.isNaN('texto'));

// 4. Number.isSafeInteger()
console.log('4. Number.isSafeInteger()');
console.log('\tNumber.isSafeInteger(42):', Number.isSafeInteger(42));
console.log('\tNumber.isSafeInteger(9007199254740991):', Number.isSafeInteger(9007199254740991));
console.log('\tNumber.isSafeInteger(9007199254740992):', Number.isSafeInteger(9007199254740992));

// 5. Number.parseFloat()
console.log('5. Number.parseFloat()');
console.log('\tNumber.parseFloat("3.14"):', Number.parseFloat('3.14'));
console.log('\tNumber.parseFloat("3.14abc"):', Number.parseFloat('3.14abc'));
console.log('\tNumber.parseFloat("abc"):', Number.parseFloat('abc'));

// 6. Number.parseInt()
console.log('6. Number.parseInt()');
console.log('\tNumber.parseInt("42"):', Number.parseInt('42'));
console.log('\tNumber.parseInt("42.9"):', Number.parseInt('42.9'));
console.log('\tNumber.parseInt("1010", 2):', Number.parseInt('1010', 2));
console.log('\tNumber.parseInt("FF", 16):', Number.parseInt('FF', 16));

console.log('\n');

// *** FIN: MÉTODOS ESTÁTICOS *** //

// *** INICIO: MÉTODOS DE INSTANCIA *** //
/*
  1. Number.toExponential()
  2. Number.prototype.toFixed()
  3. Number.prototype.toLocaleString()
  4. Number.prototype.toPrecision()
  5. Number.prototype.toString()
  6. Number.prototype.valueOf()
*/

console.log('=== MÉTODOS DE INSTANCIA ===');

// 1. Number.prototype.toExponential()
console.log('1. Number.prototype.toExponential()');
console.log('\tnum.toExponential():', num.toExponential());
console.log('\tnum.toExponential(2):', num.toExponential(2));
console.log('\tlarge.toExponential(4):', large.toExponential(4));

// 2. Number.prototype.toFixed()
console.log('2. Number.prototype.toFixed()');
console.log('\tnum.toFixed():', num.toFixed());
console.log('\tnum.toFixed(2):', num.toFixed(2));
console.log('\tnum.toFixed(5):', num.toFixed(5));

// 3. Number.prototype.toLocaleString()
console.log('3. Number.prototype.toLocaleString()');
console.log('\tlarge.toLocaleString():', large.toLocaleString());
console.log('\tlarge.toLocaleString("es-PE"):', large.toLocaleString('es-PE'));
console.log('\tlarge.toLocaleString("en-US"):', large.toLocaleString('en-US'));

// 4. Number.prototype.toPrecision()
console.log('4. Number.prototype.toPrecision()');
console.log('\tnum.toPrecision():', num.toPrecision());
console.log('\tnum.toPrecision(3):', num.toPrecision(3));
console.log('\tlarge.toPrecision(5):', large.toPrecision(5));

// 5. Number.prototype.toString()
console.log('5. Number.prototype.toString()');
console.log('\tnum.toString():', num.toString());
console.log('\t(42).toString(2):', (42).toString(2));
console.log('\t(255).toString(16):', (255).toString(16));

// 6. Number.prototype.valueOf()
console.log('6. Number.prototype.valueOf()');
const objNumber = new Number(42);
console.log('\tnew Number(42).valueOf():', objNumber.valueOf());

console.log('\n');

// *** FIN: MÉTODOS DE INSTANCIA *** //

// *** INICIO: PROPIEDADES ESTÁTICAS *** //
/*
  1. EPSILON
  2. Number.MAX_SAFE_INTEGER
  3. MIN_SAFE_INTEGER
  4. Number.MIN_VALUE
  5. Number.NaN
  6. Number.NEGATIVE_INFINITY
  7. Number.POSITIVE_INFINITY
*/

console.log('=== PROPIEDADES ESTÁTICAS ===');

// 1. Number.EPSILON
console.log('1. Number.EPSILON');
console.log('\tNumber.EPSILON:', Number.EPSILON);

// 2. Number.MAX_SAFE_INTEGER
console.log('2. Number.MAX_SAFE_INTEGER');
console.log('\tNumber.MAX_SAFE_INTEGER:', Number.MAX_SAFE_INTEGER);

// 3. Number.MAX_VALUE
console.log('3. Number.MAX_VALUE');
console.log('\tNumber.MAX_VALUE:', Number.MAX_VALUE);

// 4. Number.MIN_SAFE_INTEGER
console.log('4. Number.MIN_SAFE_INTEGER');
console.log('\tNumber.MIN_SAFE_INTEGER:', Number.MIN_SAFE_INTEGER);

// 5. Number.MIN_VALUE
console.log('5. Number.MIN_VALUE');
console.log('\tNumber.MIN_VALUE:', Number.MIN_VALUE);

// 6. Number.NaN
console.log('6. Number.NaN');
console.log('\tNumber.NaN:', Number.NaN);
console.log('\tNumber.isNaN(Number.NaN):', Number.isNaN(Number.NaN));

// 7. Number.NEGATIVE_INFINITY
console.log('7. Number.NEGATIVE_INFINITY');
console.log('\tNumber.NEGATIVE_INFINITY:', Number.NEGATIVE_INFINITY);

// 8. Number.POSITIVE_INFINITY
console.log('8. Number.POSITIVE_INFINITY');
console.log('\tNumber.POSITIVE_INFINITY:', Number.POSITIVE_INFINITY);

// *** FIN: PROPIEDADES ESTÁTICAS *** //

console.log(`===============================
         FIN: NUMBERS
===============================`);

console.log('\n\n');

// ===============================
//          FIN: NUMBERS
// ===============================




// ===============================
//        INICIO: OBJECTS
// ===============================

console.log(`===============================
       INICIO: OBJECTS
===============================`);

const user = {
	name: 'Juan',
	age: 25,
	email: 'juan@email.com',
	active: true
};

const product = {
	id: 101,
	title: 'Laptop',
	price: 1200,
	stock: 5
};

console.log('=== OBJETOS INICIALES ===');
console.log('user:', user);
console.log('product:', product);
console.log('\n');

// *** INICIO: MÉTODOS ESTÁTICOS *** //
/*
  1. Object.assign()
  2. Object.create()
  3. Object.defineProperties()
  4. Object.defineProperty()
  5. Object.entries()
  6. Object.freeze()
  7. Object.fromEntries()
  8. Object.getOwnPropertyDescriptor()
  9. Object.getOwnPropertyDescriptors()
  10. Object.getOwnPropertyNames()
  11. Object.getOwnPropertySymbols()
  12. Object.getPrototypeOf()
  13. groupBy()
  14. Object.hasOwn()
  15. Object.is()
  16. Object.isExtensible()
  17. Object.isFrozen()
  18. Object.isSealed()
  19. Object.keys()
  20. Object.preventExtensions()
  21. Object.seal()
  22. Object.setPrototypeOf()
  23. Object.values()
*/


console.log('=== MÉTODOS ESTÁTICOS ===');

// 1. Object.assign()
console.log('1. Object.assign()');
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };
const result = Object.assign(target, source);
console.log('\tObject.assign({a:1, b:2}, {b:3, c:4}):', result);

// 2. Object.create()
console.log('2. Object.create()');
const person = {
	greet() {
		return 'Hola';
	}
};
const student = Object.create(person);
student.name = 'María';
console.log('\tObject.create(person):', student);
console.log('\tstudent.greet():', student.greet());

// 3. Object.defineProperties()
console.log('3. Object.defineProperties()');
const obj1 = {};
Object.defineProperties(obj1, {
	prop1: { value: 42, writable: true },
	prop2: { value: 'texto', writable: false }
});
console.log('\tObject.defineProperties(obj, {...}):', obj1);

// 4. Object.defineProperty()
console.log('4. Object.defineProperty()');
const obj2 = {};
Object.defineProperty(obj2, 'name', {
	value: 'JavaScript',
	writable: false,
	enumerable: true
});
console.log('\tObject.defineProperty(obj, "name", {...}):', obj2);
console.log('\tobj2.name:', obj2.name);

// 5. Object.entries()
console.log('5. Object.entries()');
const entries = Object.entries(user);
console.log('\tObject.entries(user):', entries);

// 6. Object.freeze() -> BLOQUEAR EL OBJETO PARA QUE NO PUEDA AGREGAR, ELIMINAR NI MODIFICAR PROPIEDADES
console.log('6. Object.freeze()');
const frozen = Object.freeze({ x: 10, y: 20 });
console.log('\tObject.freeze({x:10, y:20}):', frozen);
console.log('\tObject.isFrozen(frozen):', Object.isFrozen(frozen));

// 7. Object.fromEntries()
console.log('7. Object.fromEntries()');
const entriesArray = [['name', 'Pedro'], ['age', 30]];
const fromEntries = Object.fromEntries(entriesArray);
console.log('\tObject.fromEntries([[\'name\', \'Pedro\'], [\'age\', 30]]):', fromEntries);

// 8. Object.getOwnPropertyDescriptor()
console.log('8. Object.getOwnPropertyDescriptor()');
const descriptor = Object.getOwnPropertyDescriptor(user, 'name');
console.log('\tObject.getOwnPropertyDescriptor(user, "name"):', descriptor);

// 9. Object.getOwnPropertyDescriptors()
console.log('9. Object.getOwnPropertyDescriptors()');
const descriptors = Object.getOwnPropertyDescriptors(user);
console.log('\tObject.getOwnPropertyDescriptors(user):', descriptors);

// 10. Object.getOwnPropertyNames()
console.log('10. Object.getOwnPropertyNames()');
const propNames = Object.getOwnPropertyNames(user);
console.log('\tObject.getOwnPropertyNames(user):', propNames);

// 11. Object.getOwnPropertySymbols()
console.log('11. Object.getOwnPropertySymbols()');
const sym = Symbol('id');
const objWithSym = { [sym]: 123, name: 'Test' };
const symbols = Object.getOwnPropertySymbols(objWithSym);
console.log('\tObject.getOwnPropertySymbols(objWithSym):', symbols);

// 12. Object.getPrototypeOf()
console.log('12. Object.getPrototypeOf()');
const proto = Object.getPrototypeOf(student);
console.log('\tObject.getPrototypeOf(student):', proto);
console.log('\tproto === person:', proto === person);

// 13. Object.groupBy()
console.log('13. Object.groupBy()');
const items = [
	{ type: 'fruit', name: 'apple' },
	{ type: 'vegetable', name: 'carrot' },
	{ type: 'fruit', name: 'banana' }
];
const grouped = Object.groupBy(items, item => item.type);
console.log('\tObject.groupBy(items, item => item.type):', grouped);

// 14. Object.hasOwn()
console.log('14. Object.hasOwn()');
console.log('\tObject.hasOwn(user, "name"):', Object.hasOwn(user, 'name'));
console.log('\tObject.hasOwn(user, "toString"):', Object.hasOwn(user, 'toString'));

// 15. Object.is()
console.log('15. Object.is()');
console.log('\tObject.is(25, 25):', Object.is(25, 25));
console.log('\tObject.is(NaN, NaN):', Object.is(NaN, NaN));
console.log('\tObject.is(0, -0):', Object.is(0, -0));

// 16. Object.isExtensible()
console.log('16. Object.isExtensible()');
const extensible = { a: 1 };
console.log('\tObject.isExtensible(extensible):', Object.isExtensible(extensible));
Object.preventExtensions(extensible);
console.log('\tDespués de preventExtensions:', Object.isExtensible(extensible));

// 17. Object.isFrozen()
console.log('17. Object.isFrozen()');
console.log('\tObject.isFrozen(user):', Object.isFrozen(user));
console.log('\tObject.isFrozen(frozen):', Object.isFrozen(frozen));

// 18. Object.isSealed()
console.log('18. Object.isSealed()');
const sealed = Object.seal({ x: 1 });
console.log('\tObject.isSealed(sealed):', Object.isSealed(sealed));
console.log('\tObject.isSealed(user):', Object.isSealed(user));

// 19. Object.keys()
console.log('19. Object.keys()');
const keys = Object.keys(user);
console.log('\tObject.keys(user):', keys);

// 20. Object.preventExtensions() -> BLOQUEAR EL OBJETO PARA QUE NO PUEDA AGREGAR PROPIEDADES
console.log('20. Object.preventExtensions()');
const obj3 = { a: 1 };
Object.preventExtensions(obj3);
console.log('\tObject.preventExtensions(obj3):', obj3);
console.log('\tObject.isExtensible(obj3):', Object.isExtensible(obj3));

// 21. Object.seal() -> BLOQUEAR EL OBJETO PARA QUE NO PUEDA AGREGAR NI ELIMINAR PROPIEDADES
console.log('21. Object.seal()');
const obj4 = { a: 1, b: 2 };
Object.seal(obj4);
console.log('\tObject.seal(obj4):', obj4);
console.log('\tObject.isSealed(obj4):', Object.isSealed(obj4));

// 22. Object.setPrototypeOf()
console.log('22. Object.setPrototypeOf()');
const animal = { type: 'animal' };
const dog = { name: 'Rex' };
Object.setPrototypeOf(dog, animal);
console.log('\tObject.setPrototypeOf(dog, animal):', dog);
console.log('\tdog.type:', dog.type);

// 23. Object.values()
console.log('23. Object.values()');
const values = Object.values(user);
console.log('\tObject.values(user):', values);

console.log('\n');

// *** FIN: MÉTODOS ESTÁTICOS *** //

// *** INICIO: MÉTODOS DE INSTANCIA *** //
/*
  1. Object.prototype.__defineGetter__() (OBSOLETO)
  2. __defineSetter__() (OBSOLETO)
  3. __lookupGetter__() (OBSOLETO)
  4. __lookupSetter__() (OBSOLETO)
  5. Object.prototype.hasOwnProperty()
  6. Object.prototype.isPrototypeOf()
  7. Object.prototype.propertyIsEnumerable()
  8. Object.prototype.toLocaleString()
  9. Object.prototype.toString()
  10. Object.prototype.valueOf()
*/

console.log('=== MÉTODOS DE INSTANCIA ===');

// 1. Object.prototype.__defineGetter__() (OBSOLETO)
console.log('1. Object.prototype.__defineGetter__() (OBSOLETO)');
const obj5 = { _x: 0 };
obj5.__defineGetter__('x', function() { return this._x; });
console.log('\tobj5.__defineGetter__("x", ...)');
console.log('\tobj5.x:', obj5.x);

// 2. Object.prototype.__defineSetter__() (OBSOLETO)
console.log('2. Object.prototype.__defineSetter__() (OBSOLETO)');
obj5.__defineSetter__('x', function(value) { this._x = value; });
obj5.x = 10;
console.log('\tobj5.__defineSetter__("x", ...)');
console.log('\tobj5.x = 10; obj5.x:', obj5.x);

// 3. Object.prototype.__lookupGetter__() (OBSOLETO)
console.log('3. Object.prototype.__lookupGetter__() (OBSOLETO)');
const getter = obj5.__lookupGetter__('x');
console.log('\tobj5.__lookupGetter__("x"):', getter);

// 4. Object.prototype.__lookupSetter__() (OBSOLETO)
console.log('4. Object.prototype.__lookupSetter__() (OBSOLETO)');
const setter = obj5.__lookupSetter__('x');
console.log('\tobj5.__lookupSetter__("x"):', setter);

// 5. Object.prototype.hasOwnProperty()
console.log('5. Object.prototype.hasOwnProperty()');
console.log('\tuser.hasOwnProperty("name"):', user.hasOwnProperty('name'));
console.log('\tuser.hasOwnProperty("toString"):', user.hasOwnProperty('toString'));

// 6. Object.prototype.isPrototypeOf()
console.log('6. Object.prototype.isPrototypeOf()');
console.log('\tperson.isPrototypeOf(student):', person.isPrototypeOf(student));
console.log('\tObject.prototype.isPrototypeOf(user):', Object.prototype.isPrototypeOf(user));

// 7. Object.prototype.propertyIsEnumerable()
console.log('7. Object.prototype.propertyIsEnumerable()');
console.log('\tuser.propertyIsEnumerable("name"):', user.propertyIsEnumerable('name'));
console.log('\tuser.propertyIsEnumerable("toString"):', user.propertyIsEnumerable('toString'));

// 8. Object.prototype.toLocaleString()
console.log('8. Object.prototype.toLocaleString()');
const date = new Date();
console.log('\tdate.toLocaleString():', date.toLocaleString());

// 9. Object.prototype.toString()
console.log('9. Object.prototype.toString()');
console.log('\tuser.toString():', user.toString());
console.log('\t[1,2,3].toString():', [1,2,3].toString());

// 10. Object.prototype.valueOf()
console.log('10. Object.prototype.valueOf()');
console.log('\tuser.valueOf():', user.valueOf());
console.log('\tuser.valueOf() === user:', user.valueOf() === user);

console.log('\n');

// *** FIN: MÉTODOS DE INSTANCIA *** //

// *** INICIO: PROPIEDADES DE INSTANCIA *** //
/*
  1. Object.prototype.__proto__ (OBSOLETO)
  2. Object.prototype.constructor
*/

console.log('=== PROPIEDADES DE INSTANCIA ===');

// 1. Object.prototype.__proto__ (OBSOLETO)
console.log('1. Object.prototype.__proto__ (OBSOLETO)');
console.log('\tuser.__proto__:', user.__proto__);
console.log('\tuser.__proto__ === Object.prototype:', user.__proto__ === Object.prototype);

// 2. Object.prototype.constructor
console.log('2. Object.prototype.constructor');
console.log('\tuser.constructor:', user.constructor);
console.log('\tuser.constructor === Object:', user.constructor === Object);

// *** FIN: PROPIEDADES DE INSTANCIA *** //

console.log(`===============================
         FIN: OBJECTS
===============================`);

// ===============================
//          FIN: OBJECTS
// ===============================