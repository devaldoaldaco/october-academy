//String
//Metodos estaticos
//devuelve una cadena creada a partir de las unidades de código UTF-16 especificadas
console.log(String.fromCharCode(65, 66, 67));
//soporta puntos de código Unicode, a diferencia de fromCharCode que solo soporta unidades de código UTF-16.
console.log(String.fromCodePoint(65, 66, 67));

console.log(`hola\nque tal`);
//raw: devuelve una cadena "cruda", es decir, no interpreta secuencias de escape como \n o \t
console.log(String.raw`hola\nque tal`);
//Metodos de instancia

let palabra = "hola mundo";
let frase = " hola mundo, soy Bruno";
let frase2 = "los monos, tienen hermanos monos y hijos monos";

console.log(palabra.charAt(0));//devuelve el caracter en la posicion indicada
console.log(palabra.charCodeAt(0));//devuelve el codigo UTF-16 del caracter en la posicion indicada
console.log(palabra.codePointAt(0));//devuelve el punto de codigo Unicode del caracter en la posicion indicada
console.log(palabra.concat(" soy Bruno"));//concatena cadenas
console.log(palabra.includes("hola"))//retorna true si la cadena contiene el texto especificado
console.log(palabra.endsWith("mundo"))//retorna true si la cadena termina con el texto especificado
console.log(palabra.indexOf("u"))//retorna la posicion de la primera ocurrencia del texto especificado, o -1 si no se encuentra, si hay 2 o mas ocurrencias, devuelve la posicion de la primera
console.log(palabra.lastIndexOf("o"))//retorna la posicion de la ultima ocurrencia del texto especificado, o -1 si no se encuentra
console.log(palabra.localeCompare("hola mundo"))//compara dos cadenas en el orden del idioma local, devuelve un numero negativo si la cadena es menor, 0 si son iguales, y un numero positivo si es mayor
console.log(palabra.match(/o/g))//devuelve un array con todas las ocurrencias que coinciden con la expresion regular, o null si no hay coincidencias
const coincidencias =palabra.matchAll(/o/g)//devuelve un iterador con todas las ocurrencias que coinciden con la expresion regular, incluyendo grupos capturados;
console.log(Array.from(coincidencias));

//normaliza la cadena en la forma de normalizacion Unicode especificada (NFC, NFD, NFKC, NFKD)
let str = "\u1E9B\u0323";
console.log(str.normalize("NFC"))
console.log(str.normalize("NFD"));
console.log(str.normalize("NFKC"));
console.log(str.normalize("NFKD"));

console.log(palabra.padEnd(15, "ab"))//agrega caracteres al final de la cadena hasta alcanzar la longitud especificada
console.log(palabra.padStart(15, "ab"))//agrega caracteres al inicio de la cadena hasta alcanzar la longitud especificada
console.log(palabra.repeat(2))//repite la cadena el numero de veces especificado
console.log(palabra.replace("mundo", "Bruno"))//reemplaza la primera ocurrencia del texto especificado por el nuevo texto
console.log(frase2.replaceAll("monos", "perros"))//reemplaza todas las ocurrencias del texto especificado por el nuevo texto
console.log(palabra.search("mundo"))//retorna la posicion de la primera ocurrencia que coincide con la expresion regular, o -1 si no se encuentra
console.log(palabra.slice(0, 4))//extrae una seccion de la cadena y devuelve una nueva cadena, desde el indice inicial hasta el indice final (no incluido)
console.log(palabra.split(" "))//divide la cadena en un array de subcadenas, usando el separador especificado
console.log(palabra.startsWith("hola"))//retorna true si la cadena comienza con el texto especificado
console.log(palabra.substring(0, 4))//extrae los caracteres entre dos indices y devuelve una nueva cadena
console.log(palabra.toLocaleLowerCase("en-US"))//convierte la cadena a minusculas
console.log(palabra.toLocaleUpperCase("en-US"))//convierte la cadena a mayusculas
console.log(palabra.toLowerCase())//convierte la cadena a minusculas
console.log(palabra.toString())//devuelve la cadena como una cadena de texto
console.log(palabra.toUpperCase())//convierte la cadena a mayusculas
console.log(palabra.trim())//elimina los espacios en blanco al inicio y al final de la cadena
console.log(frase.trimStart())//elimina los espacios en blanco al inicio de la cadena
console.log(frase.trimEnd())//elimina los espacios en blanco al final de la cadena
console.log(frase.valueOf());//devuelve el valor primitivo de la cadena