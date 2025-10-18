//METODOS ESTATICOS
//Metodo Estatico fromCharCode
const pruebaMetodoFromCharCode = String.fromCharCode(64, 66, 67);
console.log(pruebaMetodoFromCharCode)

//Metodo Estatico fromCodePoint
const pruebaMetodoFromCodePoint = String.fromCodePoint(0x1d306, 0x61, 0x1d307); // "\uD834\uDF06a\uD834\uDF07"
console.log(pruebaMetodoFromCodePoint)

//Metodo Estatico raw
const pruebaMetodoRaw = String.raw(
    {
        raw: ["foo", "bar", "baz"],
    },
    2 + 3,
    "Java" + "Script",
);
console.log(pruebaMetodoRaw)

//METODOS DE INSTANCIA
//Metodo anchor - deprecated
var miCadena = "Tabla de Contenidos";
document.body.innerHTML = miCadena.anchor("hola");

var textoActivo = "MDN";
var URL = "https://developer.mozilla.org/";

console.log("Haga click para volver a " + textoActivo.link(URL));