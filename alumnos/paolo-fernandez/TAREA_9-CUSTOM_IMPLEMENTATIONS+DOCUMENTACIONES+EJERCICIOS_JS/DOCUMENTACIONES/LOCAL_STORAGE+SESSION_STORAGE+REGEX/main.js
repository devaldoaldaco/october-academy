// ===============================
//      INICIO: LOCAL STORAGE
// ===============================

console.log(`===============================
     INICIO: LOCAL STORAGE
===============================`);

// localStorage es una propiedad del objeto global 'window'
// Almacena datos de forma persistente (no expiran)
// Los datos sobreviven al cierre del navegador
// Capacidad: ~5-10MB según el navegador
// Solo almacena strings (hay que usar JSON.stringify/parse para objetos)

console.log('=== INFORMACIÓN ===');
console.log('localStorage es del objeto:', typeof window !== 'undefined' ? 'window' : 'global');
console.log('Tipo:', typeof localStorage);
console.log('\n');

// *** INICIO: MÉTODOS *** //
/*
  1. localStorage.setItem()
  2. localStorage.getItem()
  3. localStorage.removeItem()
  4. localStorage.clear()
  5. localStorage.key()
*/

console.log('=== MÉTODOS ===');

// 1. localStorage.setItem()
console.log('1. localStorage.setItem()');
localStorage.setItem('nombre', 'Juan');
localStorage.setItem('edad', '25');
console.log('\tlocalStorage.setItem("nombre", "Juan")');
console.log('\tValor guardado:', localStorage.getItem('nombre'));

// Guardar objetos (necesita JSON.stringify)
const user = { nombre: 'María', edad: 30, ciudad: 'Lima' };
localStorage.setItem('usuario', JSON.stringify(user));
console.log('\tlocalStorage.setItem("usuario", JSON.stringify(user))');

// 2. localStorage.getItem()
console.log('2. localStorage.getItem()');
const nombre = localStorage.getItem('nombre');
const usuarioString = localStorage.getItem('usuario');
const usuarioObj = JSON.parse(usuarioString);
console.log('\tlocalStorage.getItem("nombre"):', nombre);
console.log('\tJSON.parse(localStorage.getItem("usuario")):', usuarioObj);
console.log('\tlocalStorage.getItem("noExiste"):', localStorage.getItem('noExiste')); // null

// 3. localStorage.removeItem()
console.log('3. localStorage.removeItem()');
localStorage.setItem('temporal', 'valor temporal');
console.log('\tAntes de remover:', localStorage.getItem('temporal'));
localStorage.removeItem('temporal');
console.log('\tDespués de remover:', localStorage.getItem('temporal')); // null

// 4. localStorage.clear()
console.log('4. localStorage.clear()');
console.log('\tItems antes de clear:', localStorage.length);
// localStorage.clear(); // Descomentar para limpiar todo
console.log('\t(clear() comentado para no borrar todo)');

// 5. localStorage.key()
console.log('5. localStorage.key()');
console.log('\tlocalStorage.key(0):', localStorage.key(0)); // Primera clave
console.log('\tlocalStorage.key(1):', localStorage.key(1)); // Segunda clave

console.log('\n');

// *** FIN: MÉTODOS *** //

// *** INICIO: PROPIEDADES *** //
/*
  1. localStorage.length
*/

console.log('=== PROPIEDADES ===');

// 1. localStorage.length
console.log('1. localStorage.length');
console.log('\tlocalStorage.length:', localStorage.length);

console.log('\n');

// *** FIN: PROPIEDADES *** //

// *** EJEMPLOS PRÁCTICOS *** //
console.log('=== EJEMPLOS PRÁCTICOS ===');

// Iterar sobre todas las claves
console.log('Iterando sobre localStorage:');
for (let i = 0; i < localStorage.length; i++) {
	const key = localStorage.key(i);
	const value = localStorage.getItem(key);
	console.log(`\t${key}: ${value}`);
}

// Guardar un array
const frutas = ['manzana', 'banana', 'naranja'];
localStorage.setItem('frutas', JSON.stringify(frutas));
const frutasRecuperadas = JSON.parse(localStorage.getItem('frutas'));
console.log('\nArray guardado y recuperado:', frutasRecuperadas);

console.log('\n');

console.log(`===============================
       FIN: LOCAL STORAGE
===============================`);

console.log('\n\n');

// ===============================
//       FIN: LOCAL STORAGE
// ===============================




// ===============================
//     INICIO: SESSION STORAGE
// ===============================

console.log(`===============================
    INICIO: SESSION STORAGE
===============================`);

// sessionStorage es una propiedad del objeto global 'window'
// Almacena datos solo durante la sesión (pestaña/ventana)
// Los datos se borran al cerrar la pestaña/ventana
// Capacidad: ~5-10MB según el navegador
// Solo almacena strings (igual que localStorage)
// Cada pestaña tiene su propio sessionStorage

console.log('=== INFORMACIÓN ===');
console.log('sessionStorage es del objeto:', typeof window !== 'undefined' ? 'window' : 'global');
console.log('Tipo:', typeof sessionStorage);
console.log('Diferencia con localStorage: datos solo duran la sesión actual');
console.log('\n');

// *** INICIO: MÉTODOS *** //
/*
  1. sessionStorage.setItem()
  2. sessionStorage.getItem()
  3. sessionStorage.removeItem()
  4. sessionStorage.clear()
  5. sessionStorage.key()
*/

console.log('=== MÉTODOS ===');

// 1. sessionStorage.setItem()
console.log('1. sessionStorage.setItem()');
sessionStorage.setItem('token', 'abc123xyz');
sessionStorage.setItem('ultimoAcceso', new Date().toISOString());
console.log('\tsessionStorage.setItem("token", "abc123xyz")');
console.log('\tValor guardado:', sessionStorage.getItem('token'));

// Guardar objetos
const sesion = { id: 1, usuario: 'admin', activo: true };
sessionStorage.setItem('sesion', JSON.stringify(sesion));
console.log('\tsessionStorage.setItem("sesion", JSON.stringify(sesion))');

// 2. sessionStorage.getItem()
console.log('2. sessionStorage.getItem()');
const token = sessionStorage.getItem('token');
const sesionString = sessionStorage.getItem('sesion');
const sesionObj = JSON.parse(sesionString);
console.log('\tsessionStorage.getItem("token"):', token);
console.log('\tJSON.parse(sessionStorage.getItem("sesion")):', sesionObj);
console.log('\tsessionStorage.getItem("noExiste"):', sessionStorage.getItem('noExiste')); // null

// 3. sessionStorage.removeItem()
console.log('3. sessionStorage.removeItem()');
sessionStorage.setItem('temp', 'temporal');
console.log('\tAntes de remover:', sessionStorage.getItem('temp'));
sessionStorage.removeItem('temp');
console.log('\tDespués de remover:', sessionStorage.getItem('temp')); // null

// 4. sessionStorage.clear()
console.log('4. sessionStorage.clear()');
console.log('\tItems antes de clear:', sessionStorage.length);
// sessionStorage.clear(); // Descomentar para limpiar todo
console.log('\t(clear() comentado para no borrar todo)');

// 5. sessionStorage.key()
console.log('5. sessionStorage.key()');
console.log('\tsessionStorage.key(0):', sessionStorage.key(0));
console.log('\tsessionStorage.key(1):', sessionStorage.key(1));

console.log('\n');

// *** FIN: MÉTODOS *** //

// *** INICIO: PROPIEDADES *** //
/*
  1. sessionStorage.length
*/

console.log('=== PROPIEDADES ===');

// 1. sessionStorage.length
console.log('1. sessionStorage.length');
console.log('\tsessionStorage.length:', sessionStorage.length);

console.log('\n');

// *** FIN: PROPIEDADES *** //

// *** EJEMPLOS PRÁCTICOS *** //
console.log('=== EJEMPLOS PRÁCTICOS ===');

// Iterar sobre sessionStorage
console.log('Iterando sobre sessionStorage:');
for (let i = 0; i < sessionStorage.length; i++) {
	const key = sessionStorage.key(i);
	const value = sessionStorage.getItem(key);
	console.log(`\t${key}: ${value}`);
}

// Guardar estado temporal de formulario
const formData = {
	nombre: 'Pedro',
	email: 'pedro@email.com',
	paso: 2
};
sessionStorage.setItem('formTemp', JSON.stringify(formData));
console.log('\nDatos de formulario temporal:', JSON.parse(sessionStorage.getItem('formTemp')));

console.log('\n');

console.log(`===============================
      FIN: SESSION STORAGE
===============================`);

console.log('\n\n');

// ===============================
//      FIN: SESSION STORAGE
// ===============================




// ===============================
//     INICIO: REGULAR EXPRESSIONS
// ===============================

console.log(`===============================
    INICIO: REGULAR EXPRESSIONS
===============================`);

// RegExp (Regular Expressions) es un objeto nativo de JavaScript
// Sirve para buscar, validar y manipular patrones en strings
// Se puede crear de 2 formas: literal /patrón/flags o constructor new RegExp()
// NO es una propiedad de window, es un objeto global de JavaScript

console.log('=== INFORMACIÓN ===');
console.log('RegExp es:', typeof RegExp); // function (constructor)
console.log('Tipo de instancia:', typeof /abc/); // object
console.log('\n');

// Formas de crear RegExp
const regex1 = /hola/i; // Literal (más común)
const regex2 = new RegExp('hola', 'i'); // Constructor
console.log('=== FORMAS DE CREAR ===');
console.log('Literal: /hola/i =>', regex1);
console.log('Constructor: new RegExp("hola", "i") =>', regex2);
console.log('\n');

// Flags (modificadores)
console.log('=== FLAGS DISPONIBLES ===');
console.log('g - global: busca todas las coincidencias');
console.log('i - case insensitive: ignora mayúsculas/minúsculas');
console.log('m - multiline: ^ y $ funcionan en cada línea');
console.log('s - dotAll: el punto (.) incluye saltos de línea');
console.log('u - unicode: habilita soporte completo de unicode');
console.log('y - sticky: busca desde la posición exacta de lastIndex');
console.log('\n');

const textTest = 'Hola Mundo. hola javascript. HOLA regex.';

// *** INICIO: MÉTODOS ESTÁTICOS *** //
/*
  1. RegExp[@@species]
*/

console.log('=== MÉTODOS ESTÁTICOS ===');
console.log('(RegExp tiene principalmente métodos de instancia)');
console.log('\n');

// *** FIN: MÉTODOS ESTÁTICOS *** //

// *** INICIO: MÉTODOS DE INSTANCIA *** //
/*
  1. RegExp.prototype.exec()
  2. RegExp.prototype.test()
  3. RegExp.prototype.toString()
  4. RegExp.prototype[@@match]()
  5. RegExp.prototype[@@matchAll]()
  6. RegExp.prototype[@@replace]()
  7. RegExp.prototype[@@search]()
  8. RegExp.prototype[@@split]()
*/

console.log('=== MÉTODOS DE INSTANCIA ===');

// 1. RegExp.prototype.exec()
console.log('1. RegExp.prototype.exec()');
const regexExec = /hola/gi;
const execResult1 = regexExec.exec(textTest);
console.log('\t/hola/gi.exec(textTest):', execResult1);
const execResult2 = regexExec.exec(textTest);
console.log('\tSegunda llamada (con flag g):', execResult2);

// 2. RegExp.prototype.test()
console.log('2. RegExp.prototype.test()');
const regexTest = /javascript/i;
console.log('\t/javascript/i.test(textTest):', regexTest.test(textTest));
console.log('\t/python/i.test(textTest):', /python/i.test(textTest));

// 3. RegExp.prototype.toString()
console.log('3. RegExp.prototype.toString()');
const regexToString = /hola/gi;
console.log('\t/hola/gi.toString():', regexToString.toString());

// 4-8. Métodos Symbol (usados internamente por String)
console.log('4-8. Métodos Symbol');
console.log('\t(Usados internamente por métodos de String como match, replace, etc.)');

console.log('\n');

// *** FIN: MÉTODOS DE INSTANCIA *** //

// *** INICIO: PROPIEDADES DE INSTANCIA *** //
/*
  1. RegExp.prototype.flags
  2. RegExp.prototype.global
  3. RegExp.prototype.ignoreCase
  4. RegExp.prototype.multiline
  5. RegExp.prototype.dotAll
  6. RegExp.prototype.unicode
  7. RegExp.prototype.sticky
  8. RegExp.prototype.source
  9. RegExp.prototype.lastIndex
*/

console.log('=== PROPIEDADES DE INSTANCIA ===');

const regexProps = /hola/gim;

// 1. RegExp.prototype.flags
console.log('1. RegExp.prototype.flags');
console.log('\t/hola/gim.flags:', regexProps.flags);

// 2. RegExp.prototype.global
console.log('2. RegExp.prototype.global');
console.log('\t/hola/gim.global:', regexProps.global);

// 3. RegExp.prototype.ignoreCase
console.log('3. RegExp.prototype.ignoreCase');
console.log('\t/hola/gim.ignoreCase:', regexProps.ignoreCase);

// 4. RegExp.prototype.multiline
console.log('4. RegExp.prototype.multiline');
console.log('\t/hola/gim.multiline:', regexProps.multiline);

// 5. RegExp.prototype.dotAll
console.log('5. RegExp.prototype.dotAll');
const regexDotAll = /hola/s;
console.log('\t/hola/s.dotAll:', regexDotAll.dotAll);

// 6. RegExp.prototype.unicode
console.log('6. RegExp.prototype.unicode');
const regexUnicode = /hola/u;
console.log('\t/hola/u.unicode:', regexUnicode.unicode);

// 7. RegExp.prototype.sticky
console.log('7. RegExp.prototype.sticky');
const regexSticky = /hola/y;
console.log('\t/hola/y.sticky:', regexSticky.sticky);

// 8. RegExp.prototype.source
console.log('8. RegExp.prototype.source');
console.log('\t/hola/gim.source:', regexProps.source);

// 9. RegExp.prototype.lastIndex
console.log('9. RegExp.prototype.lastIndex');
const regexLastIndex = /hola/g;
regexLastIndex.test(textTest);
console.log('\tDespués de test() con flag g:', regexLastIndex.lastIndex);

console.log('\n');

// *** FIN: PROPIEDADES DE INSTANCIA *** //

// *** EJEMPLOS PRÁCTICOS *** //
console.log('=== EJEMPLOS PRÁCTICOS ===');

// Validar email
console.log('1. Validar email:');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log('\t"test@email.com" es válido:', emailRegex.test('test@email.com'));
console.log('\t"invalido" es válido:', emailRegex.test('invalido'));

// Extraer números
console.log('\n2. Extraer números:');
const numberText = 'Tengo 25 años y mi teléfono es 987654321';
const numbers = numberText.match(/\d+/g);
console.log('\tNúmeros encontrados:', numbers);

// Reemplazar con regex
console.log('\n3. Reemplazar palabras:');
const replaceText = 'El gato y el gato juegan';
const replaced = replaceText.replace(/gato/g, 'perro');
console.log('\tOriginal:', replaceText);
console.log('\tReemplazado:', replaced);

// Validar teléfono peruano
console.log('\n4. Validar teléfono peruano:');
const phoneRegex = /^9\d{8}$/;
console.log('\t"987654321" es válido:', phoneRegex.test('987654321'));
console.log('\t"123456789" es válido:', phoneRegex.test('123456789'));

// Extraer hashtags
console.log('\n5. Extraer hashtags:');
const tweetText = 'Me encanta #JavaScript y #Programming #Code';
const hashtags = tweetText.match(/#\w+/g);
console.log('\tHashtags encontrados:', hashtags);

// Validar URL
console.log('\n6. Validar URL:');
const urlRegex = /^https?:\/\/[\w\-.]+(\.[\w\-]+)+[/#?]?.*$/;
console.log('\t"https://ejemplo.com" es válida:', urlRegex.test('https://ejemplo.com'));
console.log('\t"ejemplo.com" es válida:', urlRegex.test('ejemplo.com'));

console.log('\n');

console.log(`===============================
     FIN: REGULAR EXPRESSIONS
===============================`);

console.log('\n\n');

// ===============================
//     FIN: REGULAR EXPRESSIONS
// ===============================

// *** COMPARACIÓN Y NOTAS *** //
console.log('=== NOTAS IMPORTANTES ===\n');

console.log('DIFERENCIAS localStorage vs sessionStorage:');
console.log('- localStorage: persistente, sobrevive al cierre del navegador');
console.log('- sessionStorage: temporal, se borra al cerrar la pestaña/ventana');
console.log('- Ambos tienen los mismos métodos y son del objeto window');
console.log('- Capacidad similar: ~5-10MB\n');

console.log('SOBRE RegExp:');
console.log('- NO es una propiedad de window, es un objeto global de JavaScript');
console.log('- Es parte del estándar ECMAScript');
console.log('- Se puede crear con literal /patrón/ o constructor new RegExp()');
console.log('- Muy útil para validaciones y manipulación de texto');