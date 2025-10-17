console.log('-----------------------x------------------------------');
//Ejemplos REDUCE, MAP y FILTER
const numbers = [1, 2, 3, 4, 5, 6];

const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4, 6]

const doubled = evens.map((n) => n * 2);
console.log(doubled); // [4, 8, 12]

const sum = doubled.reduce((acc, n) => acc + n, 0);
console.log(sum); // 24

// Ejemplos SET

const numbersSet = new Set();

numbersSet.add(1);
numbersSet.add(2);
numbersSet.add(2); // Sin duplicarse ya que estamos trabajanod con Set
numbersSet.add(3);

console.log(numbersSet); // Set(3) { 1, 2, 3 }

console.log(numbersSet.has(2)); // true

numbersSet.delete(1);
console.log(numbersSet); // Set(2) { 2, 3 }

numbersSet.forEach((n) => console.log(n));

// Ejemplos DATE

const now = new Date();
console.log(now);

console.log("Año:", now.getFullYear());
console.log("Mes:", now.getMonth() + 1);
console.log("Día:", now.getDate());
console.log(
  "Hora:",
  now.getHours(),
  ":",
  now.getMinutes(),
  ":",
  now.getSeconds()
);

const birthday = new Date("1990-05-15");
console.log(birthday);

//Ejemplos localStorage

localStorage.setItem("username", "Carlos");

console.log(localStorage.getItem("username")); // "Carlos"

localStorage.removeItem("username");

localStorage.clear();

//Ejemplos sessionStorage
sessionStorage.setItem("sessionID", "abc123");

console.log(sessionStorage.getItem("sessionID")); // "abc123"

sessionStorage.removeItem("sessionID");

sessionStorage.clear();

//Regex
const emails = [
  "juan@gmail.com",
  "maria@hotmail",
  "ana@yahoo.com",
  "test@domain",
];

// Regex simple para email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validEmailsemailRegex = emails.filter((email) => emailRegex.test(email));

console.log(validEmailsemailRegex);
// ["juan@gmail.com", "ana@yahoo.com"]

let text = "Hola Carlos, Carlos es mi amigo";
let newText = text.replace(/Carlos/g, "Juan");
console.log(newText);
// "Hola Juan, Juan es mi amigo"

const nums = ["123", "456a", "789"];

const validNumbers = numbers.filter((n) => /^\d+$/.test(n));
console.log(validNumbers); // ["123", "789"]