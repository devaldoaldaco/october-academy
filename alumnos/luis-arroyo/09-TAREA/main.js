//SET
console.log("----SET----");

const users = new Set(["user1", "user2"]);
console.log(users);

users.add("user3");
users.add("user1");
console.log(`Metodo .add(): ${[...users]}`);

const userExists = users.has("user2");
console.log(`Metodo .has() ${userExists}`);

users.delete("user1");
console.log(`Metodo .delete(): ${[...users]}`);

users.clear();
console.log(`Metodo .clear(): ${users.size}`);

const fruits = new Set(["manzana", "pera", "mango"]);
console.log("Método .forEach()");
fruits.forEach((valor) => {
  console.log(`Fruta: ${valor}`);
});

console.log("Método .values()");
const iterador = fruits.values();
console.log(iterador.next().value);
console.log(iterador.next().value);

console.log("Método .entries()");
for (const [key, value] of fruits.entries()) {
  console.log(`Clave y Valor: ${key} = ${value}`);
}

console.log("Método .keys()");
for (const a of fruits.keys()) {
  console.log("Fruta: " + a);
}

//MAP

console.log("----MAP----");

const usersMap = new Map();
const userA = { name: "Luis", age: 25, country: "Peru", status: "active" };
const userB = { name: "Juan", age: 27, country: "Mexico", status: "active" };

console.log("Método .set()");
usersMap.set(1, userA);
usersMap.set(2, userB);
usersMap.set("admin", "Activo");
console.log(usersMap);

console.log("Método .get()");
console.log(`El estado del usuario A es: ${usersMap.get(1).status}`);
console.log(`El estado de 'admin' es: ${usersMap.get("admin")}`);

console.log("Método .has()");
console.log(`${usersMap.has(1)}`);
console.log(`${usersMap.has(2)}`);
console.log(`${usersMap.has(3)}`); //FALSO NO EXISTE USUARIO MAPEADO AL ID 3

console.log("Método .set()");
usersMap.set(2, { ...userB, status: "inactive" });
console.log(`Estado actualizado de B: ${usersMap.get(2).status}`);

console.log("Método .delete()");
usersMap.delete("admin");
console.log(`Tamaño después de borrar 'admin': ${usersMap.size}`);

console.log("Método .keys()");
for (const key of usersMap.keys()) {
  console.log(`User ${key}: ${JSON.stringify(usersMap.get(key))}`);
}

console.log("Método .entries()");
for (const [key, value] of usersMap.entries()) {
  console.log(`El valor de ${key} es ${JSON.stringify(value)}`);
}

console.log("Método .forEach()");
usersMap.forEach((value, key) => {
  console.log(`Clave: ${key}, Valor: ${JSON.stringify(value)}`);
});

//DATE
console.log("----DATE----");

const today = new Date();
console.log(`1. Fecha actual: ${today}`);

const birthday = new Date(2025, 2, 30, 10, 30, 0);
console.log(`2. Fecha: ${birthday}`);

const timeStamp = Date.now();
console.log(`3. Timestamp: ${timeStamp}`);

const ms = Date.parse("2025-10-17");
console.log(`4. Milisegundos: ${ms}`);

const date = new Date(2025, 9, 17, 0, 0, 0);

console.log(`Year: ${date.getFullYear()}`);

console.log(`Mes (0=Enero): ${date.getMonth()}`);

console.log(`Día: ${date.getDate()}`);

console.log(`Día de la semana: ${date.getDay()}`);

console.log(`Hora: ${date.getHours()}`);

console.log(`Mes UTC: ${date.getUTCMonth()}`);
console.log(`Hora UTC: ${date.getUTCHours()}`);

date.setFullYear(2026);
console.log(`Metodo .setFullYear(): ${date}`);

date.setMonth(11);
console.log(`Metodo .setMonth(): ${date}`);

date.setDate(40);
console.log(`Metodo .setDate(): ${date}`);

date.setHours(8, 0, 0);
console.log(`Metodo .setHours(): ${date}`);

console.log(`ISO String: ${date.toISOString()}`);

console.log(`toString(): ${date.toString()}`);

const opciones = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
console.log(
  `Formato español de Perú: ${date.toLocaleDateString("es-PE", opciones)}`
);

console.log(`Hora en formato de 12h: ${date.toLocaleTimeString("en-US")}`);

//REGEX
console.log("----REGEX----");

const pattern = /javascript/i;
const text1 =
  "loreLorem ipsum dolor sit amet consectetur a javascript dipisicing elit. Neque hic laboriosam, possimus expedita voluptatem eos. Dolore aperiam nulla tempore corporis unde modi, aut dolorum magni deleniti aliquid assumenda id expedita?";
const text2 =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque hic laboriosam, possimus expedita voluptatem eos. Dolore aperiam nulla tempore corporis unde modi, aut dolorum magni deleniti aliquid assumenda id expedita?";

console.log(`1. ¿Contiene 'JavaScript'? ${pattern.test(text1)}`);
console.log(`2. ¿Contiene 'JavaScript'? ${pattern.test(text2)}`);

const result = pattern.exec(text1);
console.log(`3. Metodo .exec(): ${result}`);

const correo = "hola@gmail.com";
const frase = "Hoy es 17/10/2025 y mañana es 18/10/2025.";
const numeros = "1 22 333 4444";

const arrobaPattern = /@/;
console.log(`\n4. Índice del '@': ${correo.search(arrobaPattern)}`);

const digitPattern = /\d+/g;
console.log(`5. Números encontrados: ${frase.match(digitPattern)}`);

const noSpaces = numeros.replace(/\s/g, "-");
console.log(`6. String sin espacios: ${noSpaces}`);

const words = "Manzanas, peras, uvas & naranjas.";
const wordsArray = words.split(/\W+/);
console.log(`7. Array de palabras: ${wordsArray}`);

const dniPattern = /^\d{8}$/;

console.log("\n--- Validación de DNI ---");
console.log(`8. DNI '12345678' es válido: ${dniPattern.test("12345678")}`);
console.log(`9. DNI '123435679' es válido: ${dniPattern.test("123435679")}`);
// for (const person of people) {
//   //valores
//   console.log(person.name);
// }
// for (const person in people) {
//   //claves
//   console.log(person);
// }
// localStorage.setItem("person",{name:"Luis",age:25})
// sessionStorage.setItem("person2",{name:"Juan",age:22})
