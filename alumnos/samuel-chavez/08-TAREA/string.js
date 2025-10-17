//Métodos estáticos y de instancia con String

//Devuelve una cadena creada mediante el uso de una secuencia de valores Unicode especificada.
console.log(String.fromCharCode(89, 66, 67, 88));

//Crea caracteres a partir de códigos Unicode, incluyendo emojis y símbolos avanzados.
//Comparacion
console.log(String.fromCharCode(128512));
console.log(String.fromCodePoint(128512));
//Si el codigo no es valido, se devuelve un error RangeError.
//String.fromCodePoint(NaN);

//Devuelve el texto dentro de un template literal sin interpretar las secuencias de escape(\n, \t, etc).

console.log("C:Usersanadocs");
console.log(String.raw`C:\Users\ana\docs`);

console.log("Hi\n${2 + 3}!");
console.log(String.raw`Hi\n${2 + 3}!`);

//Metodos de instancia con String

//El método anchor() crea un ancla HTML, <a>, que se usa como un enlace a hipertexto.
//METODO DEPRECADO
let titulo = "Serie: TWD";
console.log(titulo.anchor("cap1")); // <a name="cap1">Serie: TWD</a>

//El método at() devuelve el carácter en la posición especificada(puede ser positiva o negativa).
let texto = `Hola Mundo`;
console.log(texto.at(1)); // "o"
console.log(texto.at(-4));// "u"

//El método charArt devuelve el carácter en la posición especificada (tiene limitaciones)
console.log(texto.charAt(1)); //"o"
console.log(texto.charAt(-4)); //"" (vacío, no acepta negativos)
console.log(texto.charAt(10)); //"" (vacío, posición fuera de rango)

//El método big() crea un elemento <big> que aumenta el tamaño del texto.
//METODO DEPRECADO
var textExample = "¡Hola Mundo!";
console.log(textExample.big()); //<big>¡Hola Mundo!</big>
//
console.log(textExample.small());
console.log(textExample.fontsize(7));

//El método blink() crea un elemento <blink> que hace parpadear el texto.
//METODO DEPRECADO
var textExample = "¡Hola Mundo!";
console.log(textExample.blink()); // <blink>¡Hola Mundo!</blink>
//
console.log(textExample.italics());
console.log(textExample.strike());

//El método bold() crea un elemento <b> que hace el texto en negrita.
//METODO DEPRECADO
var textExample = "¡Hola Mundo!"; 
console.log(textExample.bold()); // <b>¡Hola Mundo!</b>

// El método charCodeAt devuelve el código Unicode (número) del carácter en la posición especificada
console.log("Hola".charCodeAt(2)); //108 (código Unicode de "l")

// El método codePointAt devuelve el código Unicode completo del carácter en la posición especificada, soportando emojis y símbolos especiales.
let emoji = "😀";
console.log(emoji.codePointAt(0)); //128512 (código Unicode del emoji)

//El método concat() concatena uno o más strings y devuelve un nuevo string resultante
console.log("Hi!".concat(" My name is", ":")); //"Hi! My name is:"

// El método endsWith() determina si una cadena de texto termina con los caracteres de una cadena indicada, devolviendo true o false según corresponda.
const textEnd = "dogs are the best!";
console.log(textEnd.endsWith("best!")); //true
console.log(textEnd.endsWith("best", [17])); //true

//El método fixed() muestra el texto en una fuente donde todas las letras ocupan el mismo espacio (estilo código)
//METODO DEPRECADO
console.log("My first name".fixed()); //<tt>My first name</tt>

//El método fontcolor() muestra el texto con un color especificado.
//METODO DEPRECADO
let bienvenida = "Welcome my dear and esteemed";
console.log(bienvenida.fontcolor("red")); // <font color="red">Welcome my dear and esteemed</font>

//El método fontsize() muestra el texto con un tamaño especificado.
//METODO DEPRECADO
let bienvenido = "Welcome my dear and esteemed";
console.log(bienvenida.fontsize(7)); //<font size="7">Welcome my dear and esteemed</font>

//El método includes() verifica si un string contiene otro string específico.
let frase = "JavaScript es genial";
console.log(frase.includes("Script", 4)); //true

//El método indexOf() busca un texto dentro del string y devuelve la posición (índice) donde lo encuentra. Si no lo encuentra, devuelve -1.
let frase2 = "Hola Hola Hola";
console.log(frase.indexOf("Hola", 6)); //10 
console.log(frase.indexOf("Hola", 15)); //-1

//El método isWellFormed() verifica si el string está bien formado (no contiene caracteres Unicode inválidos o 'sustitutos solitarios'). Devuelve true o false
const textos = [
  "ab\uD800",
  "ab\uD800c",
  "\uDFFFab",
  "c\uDFFFab",
  "abc",
  "ab\uD83D\uDE04c",
];
// false (contiene surrogate solitario)
// false (contiene surrogate solitario)
// false (contiene surrogate solitario)
// false (contiene surrogate solitario)
// true (bien formado)
// true (emoji válido, bien formado)
for (const texto of textos) {
  console.log(texto.isWellFormed());
}

//El método italics() muestra el texto en cursiva.
//METODO DEPRECADO
console.log("texto importante".italics()); //<i>texto importante</i>

// El método lastIndexOf() busca un texto dentro del string y devuelve la posición de la última ocurrencia. Si no lo encuentra, devuelve -1 (lo hace de final a inicio)
let contador = "uno dos uno tres uno";
contador.lastIndexOf("uno", 10); //8

//El método link() envuelve el string en una etiqueta HTML <a> con un atributo href para crear un enlace (hipervínculo).
//METODO DEPRECADO
console.log("https://ejemplo.com".link()); //<a href="undefined">https://ejemplo.com</a>

//El método localeCompare() Compara dos cadenas de texto según las reglas de ordenamiento del idioma local. Devuelve un número negativo si la cadena va antes, positivo si va después, o cero si son equivalentes.
console.log("a".localeCompare("b"));//-1
console.log("b".localeCompare("a"));//1
console.log("a".localeCompare("a"));//0

// Ordenar un array con acentos correctamente
const frutas = ["manzana", "plátano", "árbol", "naranja"];
frutas.sort((a, b) => a.localeCompare(b));
console.log(frutas); //['árbol', 'manzana', 'naranja', 'plátano']

// Con opciones de idioma
console.log("ä".localeCompare("z", "de")); //-1
console.log("ä".localeCompare("z", "sv")); ///1

// Ignorar mayúsculas/minúsculas
console.log("A".localeCompare("a", "es", { sensitivity: "base" })); //0 (son iguales ignorando mayúsculas)

//El método match() busca coincidencias de un patrón (expresión regular) en una cadena.
// Devuelve un array con las coincidencias encontradas o null si no encuentra nada.
const frase3 = "ana ama habla con mamá ana";
console.log(texto.match(/ana/));//['ana'] (primera coincidencia)
console.log(texto.match(/ana/g));//['ana', 'ana'] (todas las coincidencias)


//El método matchAll() busca todas las coincidencias de un patrón en un texto y te devuelve información
// detallada de cada una (incluyendo su posición y grupos capturados).
const email = "Mi email es juan@correo.com y también uso maria@email.com";
const regex = /(\w+)@(\w+)\.(\w+)/g;
const coincidencias = texto.matchAll(regex);
// Primera coincidencia: ['juan@correo.com', 'juan', 'correo', 'com', index: 12, ...]
// Segunda coincidencia: ['maria@email.com', 'maria', 'email', 'com', index: 41, ...]

//El método normalize() normaliza caracteres Unicode para que diferentes representaciones 
// de un mismo carácter se conviertan en una forma estándar.
const texto1 = "café";  
const texto2 = "café";  

console.log(texto1 === texto2); //false 
console.log(texto1.normalize() === texto2.normalize());  //ture

//El método padEnd() rellena el final de una cadena con caracteres hasta alcanzar una longitud específica.
const precio = "50";
console.log(precio.padEnd(5, "0"));  // "50000"
console.log("Hola".padEnd(10, "."));  // "Hola......"


//El método padStart() rellena el inicio de una cadena con caracteres hasta alcanzar una longitud específica.
const numero = "5";
console.log(numero.padStart(3, "0"));  // "005"
console.log("Hola".padStart(10, "*"));  // "******Hola"


//El método repeat() repite una cadena el número de veces especificado.
javascriptconsole.log("Ja".repeat(3));  // "JaJaJa"
console.log("=".repeat(10));  // "=========="


//El método replace() reemplaza la primera coincidencia de un patrón en una cadena.
const frase4 = "Me gusta el café y el café";
console.log(frase4.replace("café", "té")); // "Me gusta el té y el café" - Solo reemplaza el primero

//El método replaceAll() reemplaza todas las coincidencias de un patrón en una cadena.
console.log(frase4.replaceAll("café", "té"));  // "Me gusta el té y el té" - Reemplaza todos

//El método search() busca un patrón en una cadena y devuelve la posición donde lo encontró, o -1 si no existe.
const frase5 = "Buen dia";
console.log(frase5 .search("dia"));  // 5 (posición donde empieza)
console.log(frase5 .search("luego"));  // -1 (no existe)

//El método slice() extrae una parte de una cadena desde una posición inicial hasta una final (sin modificar la original).
console.log( "JavaScript".slice(0, 4));   // "Java"
console.log( "JavaScript".slice(4));      // "Script"
console.log( "JavaScript".slice(-6));     // "Script" (desde el final)

//El método small() envuelve el texto en etiquetas HTML <small>).
//METODO DEPRECADO
javascriptconsole.log("Texto".small());  // "<small>Texto</small>"


//El método split() divide una cadena en un array usando un separador.
const comas = "manzana,pera,uva";
console.log(texto.split(","));  // ["manzana", "pera", "uva"]
console.log("Hola".split(""));  // ["H", "o", "l", "a"]

//El método startsWith() verifica si una cadena comienza con ciertos caracteres. Devuelve true o false.
console.log("Hola Mundo".startsWith("Hola"));   // true
console.log("Hola Mundo".startsWith("Mundo"));  // false

//El método strike() envuelve el texto en etiquetas HTML <strike> (tachado).
//METODO DEPRECADO
console.log("Texto".strike());  // "<strike>Texto</strike>"


//El método sub() envuelve el texto en etiquetas HTML <sub> (subíndice).
//METODO DEPRECADO
console.log("H2O".sub());  // "<sub>H2O</sub>"


//El método substr() extrae caracteres desde una posición con una longitud específica.
//METODO DEPRECADO
console.log("JavaScript".substr(4, 6));  // "Script"

//El método substring() extrae caracteres entre dos posiciones (similar a slice() pero sin índices negativos).
console.log("JavaScript".substring(0, 4));  // "Java"
console.log("JavaScript".substring(4));     // "Script"

//El método sup() E¿envuelve el texto en etiquetas HTML <sup> (superíndice).
//METODO DEPRECADO
console.log("x2".sup());  // "<sup>x2</sup>"


//El método toLocaleLowerCase() convierte a minúsculas respetando las reglas del idioma local.
const nombreLugar = "ISTANBUL";
console.log(nombreLugar.toLocaleLowerCase("en-US"));  // "istanbul"
console.log(nombreLugar.toLocaleLowerCase("tr-TR"));  // "ıstanbul" (turco)

//El método toLocaleUpperCase() convierte a mayúsculas respetando las reglas del idioma local.
const nombreLugar2 = "istanbul";
console.log(nombreLugar2 .toLocaleUpperCase("en-US"));  // "ISTANBUL"
console.log(nombreLugar2 .toLocaleUpperCase("tr-TR"));  // "İSTANBUL" (turco)


//El método toLowerCase() convierte todos los caracteres de una cadena a minúsculas.
const ejemplo = "HOLA Mundo";
console.log(texto.toLowerCase());  // "hola mundo"

//El método toString() convierte un valor a cadena de texto.
const numm = 123;
console.log(numero.toString());  // "123"
console.log(String(numero));     // "123" (alternativa)

//El método toUpperCase() convierte todos los caracteres de una cadena a MAYÚSCULAS.
console.log("hola mundo".toUpperCase());  // "HOLA MUNDO"

//El método toWellFormed() reemplaza caracteres Unicode mal formados (surrogates solitarios) con el carácter de reemplazo �.
const malFormado = "Hola\uD800Mundo";  // \uD800 es un surrogate solitario
console.log(malFormado.toWellFormed());  // "Hola�Mundo"


//El método trim() elimina espacios en blanco al inicio y al final de una cadena.
console.log("   Hola Mundo   ".trim());  // "Hola Mundo"


//El método trimEnd()/ trimRight() elimina espacios en blanco solo al final de una cadena.
console.log("   Hola Mundo   ".trimEnd());  // "   Hola Mundo"

//El método trimStart() / trimLeft() elimina espacios en blanco solo al inicio de una cadena.
console.log("   Hola Mundo   ".trimStart()); // "Hola Mundo   "


//El método valueOf() devuelve el valor primitivo de un objeto String (raramente necesario).
const stringPrueba = new String("Hola");

console.log(stringPrueba.valueOf());  // "Hola"
console.log(typeof stringPrueba);     // "object"
console.log(typeof stringPrueba.valueOf());  // "string"

//El método  [Symbol.iterator]() permite iterar sobre cada carácter de una cadena usando for...of o el operador spread.
const textoPrueba = "Hola";

// Con for...of
for (const letra of textoPrueba) {
  console.log(letra);
}
// H
// o
// l
// a

// Con spread operator
console.log([...texto]);  // ["H", "o", "l", "a"]


