//Métodos estáticos y de instancia de Object
// assign() - Copia las propiedades enumerables de uno o más objetos a un objeto destino
const destino = { a: 1 };
const fuente = { b: 2, c: 3 };
Object.assign(destino, fuente);
console.log(destino); // { a: 1, b: 2, c: 3 }

// create() - Crea un nuevo objeto con el prototipo especificado
const personaProto = { saludar() { console.log("Hola"); } };
const persona = Object.create(personaProto);
persona.saludar(); // "Hola"

// defineProperties() - Define varias propiedades nuevas en un objeto
const usuario = {};
Object.defineProperties(usuario, {
  nombre: { value: "Carlos", writable: true },
  edad: { value: 25, writable: false },
});
console.log(usuario.nombre); // "Carlos"

// defineProperty() - Define una sola propiedad en un objeto con control sobre sus atributos
const producto = {};
Object.defineProperty(producto, "precio", { value: 100, writable: false });
console.log(producto.precio); // 100

// entries() - Devuelve un array con los pares [clave, valor] de un objeto
const obj = { a: 1, b: 2 };
console.log(Object.entries(obj)); // [["a", 1], ["b", 2]]

// freeze() - Congela un objeto (no se puede modificar, agregar ni eliminar propiedades)
const cuenta = { saldo: 100 };
Object.freeze(cuenta);
cuenta.saldo = 200;
console.log(cuenta.saldo); // 100 (no cambia)

// fromEntries() - Convierte una lista de pares [clave, valor] en un objeto
const pares = [["x", 10], ["y", 20]];
console.log(Object.fromEntries(pares)); // { x: 10, y: 20 }

// getOwnPropertyDescriptor() - Devuelve los detalles de una propiedad específica
const libro = { titulo: "JS Avanzado" };
console.log(Object.getOwnPropertyDescriptor(libro, "titulo"));
// { value: 'JS Avanzado', writable: true, enumerable: true, configurable: true }

// getOwnPropertyDescriptors() - Devuelve los descriptores de todas las propiedades del objeto
console.log(Object.getOwnPropertyDescriptors(libro));
// { titulo: { value: 'JS Avanzado', writable: true, enumerable: true, configurable: true } }

// getOwnPropertyNames() - Devuelve un array con los nombres de todas las propiedades propias (enumerables o no)
console.log(Object.getOwnPropertyNames(libro)); // ["titulo"]

// getOwnPropertySymbols() - Devuelve un array con los símbolos propios del objeto
const sym = Symbol("id");
const personaSim = { [sym]: 123 };
console.log(Object.getOwnPropertySymbols(personaSim)); // [Symbol(id)]

// getPrototypeOf() - Devuelve el prototipo del objeto dado
console.log(Object.getPrototypeOf(persona)); // { saludar: [Function: saludar] }

// groupBy() - Agrupa elementos de un iterable según una función dada (nuevo en ES2024)
const datos = [1, 2, 3, 4, 5];
console.log(Object.groupBy(datos, n => (n % 2 === 0 ? "pares" : "impares")));
// { impares: [1, 3, 5], pares: [2, 4] }

// hasOwn() - Verifica si una propiedad pertenece directamente al objeto
const coche = { marca: "Toyota" };
console.log(Object.hasOwn(coche, "marca")); // true

// is() - Compara si dos valores son estrictamente iguales (mejor que === para NaN)
console.log(Object.is(NaN, NaN)); // true

// isExtensible() - Verifica si se pueden agregar nuevas propiedades a un objeto
const animal = { tipo: "perro" };
console.log(Object.isExtensible(animal)); // true

// isFrozen() - Verifica si un objeto está congelado
console.log(Object.isFrozen(cuenta)); // true

// isSealed() - Verifica si un objeto está sellado
const usuarioSellado = { nombre: "Ana" };
Object.seal(usuarioSellado);
console.log(Object.isSealed(usuarioSellado)); // true

// keys() - Devuelve un array con las claves enumerables del objeto
console.log(Object.keys({ nombre: "Luis", edad: 30 })); // ["nombre", "edad"]

// preventExtensions() - Evita que se agreguen nuevas propiedades al objeto
const personaLimitada = { nombre: "Leo" };
Object.preventExtensions(personaLimitada);
personaLimitada.apellido = "Gómez";
console.log(personaLimitada.apellido); // undefined

// seal() - Sella un objeto (no se pueden agregar ni eliminar propiedades, pero sí modificar)
const item = { nombre: "Laptop" };
Object.seal(item);
item.nombre = "Tablet";
console.log(item.nombre); // "Tablet"

// setPrototypeOf() - Cambia el prototipo de un objeto
const prototipo = { saludo: "Hola!" };
const objetoNuevo = {};
Object.setPrototypeOf(objetoNuevo, prototipo);
console.log(objetoNuevo.saludo); // "Hola!"

// values() - Devuelve un array con los valores de las propiedades enumerables
console.log(Object.values({ a: 10, b: 20 })); // [10, 20]



//Metodos de instancia con Object
// __defineGetter__() - Asocia una función que será llamada al obtener una propiedad (obsoleto)
const persona2 = {};
persona2.__defineGetter__("nombre", function() {
  return "Carlos";
});
console.log(persona.nombre); // "Carlos"

// __defineSetter__() - Asocia una función que será llamada al establecer una propiedad (obsoleto)
persona.__defineSetter__("edad", function(valor) {
  console.log("Edad asignada:", valor);
});
persona.edad = 30; // "Edad asignada: 30"

// __lookupGetter__() - Devuelve la función getter asociada a una propiedad (obsoleto)
console.log(persona.__lookupGetter__("nombre")); // function() { return "Carlos"; }

// __lookupSetter__() - Devuelve la función setter asociada a una propiedad (obsoleto)
console.log(persona.__lookupSetter__("edad")); // function(valor) { console.log("Edad asignada:", valor); }

// hasOwnProperty() - Verifica si una propiedad pertenece directamente al objeto
const libro2 = { titulo: "JS Básico" };
console.log(libro2.hasOwnProperty("titulo")); // true

// isPrototypeOf() - Comprueba si un objeto existe en la cadena de prototipos de otro
const Animal = function() {};
const perro = new Animal();
console.log(Animal.prototype.isPrototypeOf(perro)); // true

// propertyIsEnumerable() - Verifica si una propiedad es enumerable
const usuario2 = { nombre: "Ana" };
console.log(usuario2.propertyIsEnumerable("nombre")); // true

// toLocaleString() - Devuelve una representación localizada del objeto
const fecha = new Date("2025-10-15");
console.log(fecha.toLocaleString()); // "15/10/2025, 00:00:00" (depende de la región)

// toString() - Devuelve una cadena que representa el objeto
console.log({ a: 1, b: 2 }.toString()); // "[object Object]"

// valueOf() - Devuelve el valor primitivo del objeto
const num = new Number(42);
console.log(num.valueOf()); // 42
