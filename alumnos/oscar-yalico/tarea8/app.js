const string1 = "A string primitive"; // comillas simples
const string2 = "Also a string primitive"; // comillas dobles
const string3 = `Yet another string primitive`; // comillas invertidas
const string4 = new String("A String object"); // por debajo del capó, esto es un objeto

// * metodos statics

// String.fromCharCode()
// Crea una cadena a partir de valores Unicode (UTF-16).
console.log(String.fromCharCode(65, 66, 67)); // ABC
console.log(String.fromCharCode(72, 101, 108, 108, 111)); // Hello

// String.fromCodePoint()
// Similar, pero soporta todos los puntos de código Unicode, incluyendo los caracteres fuera del rango básico
console.log(String.fromCodePoint(9731, 9733, 9842, 0x2f804)); // ☃★♲你
console.log(String.fromCodePoint(65, 90, 97, 122)); // Azaz

// String.raw()
// Crea una cadena "cruda" a partir de una plantilla literal, sin interpretar secuencias de escape
console.log(String.raw`C:\Development\profile\aboutme.html`);

// * metodos de instancia

const text = "Mi nombre es Oscar";

// ? length
// Retorna la cantidad de caracteres de la cadena
console.log(text.length); // 17

// ? charAt(posición)
// Retorna el carácter en la posición indicada (índice empieza en 0)
console.log(text.charAt(3)); // "n"

// ? charCodeAt(posición)
// Retorna el código Unicode (UTF-16) del carácter en esa posición
console.log(text.charCodeAt(3)); // 110 (corresponde a "n")

// ? concat(cadena)
// Une (concatena) una o más cadenas y retorna una nueva
console.log(text.concat(" y soy desarrollador"));
// "Mi nombre es Oscar y soy desarrollador"

// ? includes(cadena)
// Retorna true si la subcadena está contenida dentro del texto
console.log(text.includes("Oscar")); // true

// ? startsWith(cadena)
// Retorna true si la cadena comienza con el texto indicado
console.log(text.startsWith("Mi")); // true

// ? endsWith(cadena)
// Retorna true si la cadena termina con el texto indicado
console.log(text.endsWith("Oscar")); // true

// ? indexOf(cadena)
// Retorna la posición (índice) donde comienza la subcadena, o -1 si no la encuentra
console.log(text.indexOf("nombre")); // 3

// ? replace(viejo, nuevo)
// Retorna una nueva cadena con el reemplazo aplicado (solo el primero por defecto)
console.log(text.replace("Oscar", "Jean"));
// "Mi nombre es Jean"

// ? toUpperCase()
// Retorna una nueva cadena en mayúsculas
console.log(text.toUpperCase());
// "MI NOMBRE ES OSCAR"

// ? toLowerCase()
// Retorna una nueva cadena en minúsculas
console.log(text.toLowerCase());
// "mi nombre es oscar"

// ? trim()
// Elimina espacios al inicio y al final de la cadena
console.log("   Hola   ".trim()); // "Hola"

// ? split(separador)
// Divide la cadena en partes según el separador y retorna un array
console.log(text.split(" "));
// ["Mi", "nombre", "es", "Oscar"]

// ? slice(inicio, fin)
// Retorna una subcadena desde 'inicio' hasta 'fin' (sin incluir fin)
console.log(text.slice(3, 9));
// "nombre"

// ? repeat(n)
// Retorna la cadena repetida n veces
console.log("JS ".repeat(3));
// "JS JS JS "

// ! Ahora vamos con Number

const num1 = 42; // número primitivo
const num2 = 3.1416; // número decimal (floating point)
const num3 = new Number(42); // objeto Number (NO recomendable para uso normal)

// * Métodos estáticos de Number

// ? Number.isFinite(valor)
// Retorna true si el valor es un número finito (no Infinity ni NaN)
console.log(Number.isFinite(25)); // true
console.log(Number.isFinite(Infinity)); // false

// ? Number.isInteger(valor)
// Retorna true si el valor es un entero
console.log(Number.isInteger(42)); // true
console.log(Number.isInteger(3.14)); // false

// ? Number.isNaN(valor)
// Retorna true si el valor es NaN (Not a Number)
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN("texto")); // false (no se convierte a número automáticamente)

// ? Number.parseInt(cadena)
// Convierte una cadena a entero
console.log(Number.parseInt("10")); // 10
console.log(Number.parseInt("10.9")); // 10

// ? Number.parseFloat(cadena)
// Convierte una cadena a número decimal
console.log(Number.parseFloat("10.9")); // 10.9
console.log(Number.parseFloat("3.14rad")); // 3.14

// ? Number.isSafeInteger(valor)
// Retorna true si el número está dentro del rango seguro de enteros en JS
console.log(Number.isSafeInteger(9007199254740991)); // true
console.log(Number.isSafeInteger(9007199254740992)); // false

// ? Number.MAX_VALUE / Number.MIN_VALUE
// Retorna el valor máximo/mínimo representable
console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
console.log(Number.MIN_VALUE); // 5e-324

// ? Number.POSITIVE_INFINITY / Number.NEGATIVE_INFINITY
console.log(Number.POSITIVE_INFINITY); // Infinity
console.log(Number.NEGATIVE_INFINITY); // -Infinity

// ? Number.EPSILON
// Pequeña diferencia entre 1 y el siguiente número representable en JS
console.log(Number.EPSILON); // 2.220446049250313e-16

// * Métodos de instancia

const n = 12345.6789;

// ? toFixed(dígitos)
// Retorna el número como cadena con un número fijo de decimales
console.log(n.toFixed(2)); // "12345.68"

// ? toPrecision(dígitos)
// Retorna el número con una precisión total de dígitos (no solo decimales)
console.log(n.toPrecision(6)); // "12345.7"

// ? toExponential(dígitos)
// Retorna el número en notación exponencial
console.log(n.toExponential(2)); // "1.23e+4"

// ? toString(base)
// Convierte el número a cadena en la base indicada (por defecto base 10)
console.log((255).toString(16)); // "ff" (hexadecimal)
console.log((10).toString(2)); // "1010" (binario)

// ? valueOf()
// Retorna el valor primitivo del objeto Number
console.log(num3.valueOf()); // 42

// ? toLocaleString([locales, opciones])
// Retorna una cadena formateada según la configuración regional
console.log(n.toLocaleString("es-PE")); // "12,345.679"
console.log(n.toLocaleString("de-DE")); // "12.345,679"
console.log(n.toLocaleString("en-US", { style: "currency", currency: "USD" }));
// "$12,345.68"

// * Ejemplos prácticos

const precio = 1999.9;
console.log(`Precio: S/. ${precio.toFixed(2)}`); // "Precio: S/. 1999.90"

const binario = 0b1010; // número binario (10)
const hexadecimal = 0xff; // número hexadecimal (255)
console.log(binario, hexadecimal);