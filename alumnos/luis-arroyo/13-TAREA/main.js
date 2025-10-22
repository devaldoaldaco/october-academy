/*
Ejercicio 1 — Clase base + método en prototype y sobreescritura

Tarea: Crea una jerarquía clásica Vehicle → Car → ElectricCar.

Vehicle define propiedades make, model, year y un método en su prototype llamado info() que devuelve "make model (year)".

Car hereda de Vehicle y añade doors.

ElectricCar hereda de Car, añade batteryCapacity y sobrescribe info() invocando el info() del prototipo padre (no usar super — usa Vehicle.prototype.info.call o equivalente).
Firma sugerida: clases Vehicle, Car, ElectricCar.
Restricción: demuestra la igualdad entre ElectricCar.prototype.__proto__ y Car.prototype.
Pista: prueba tanto con new como examinando la cadena de prototipos.
Ejemplo:

const tesla = new ElectricCar('Tesla','Model 3',2021,4,75);
tesla.info(); // "Tesla Model 3 (2021) — battery: 75 kWh"
*/

class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  info() {
    return `${this.make} ${this.model} ${this.year}`;
  }
}

class Car extends Vehicle {
  constructor(make, model, year, doors) {
    super(make, model, year);
    this.doors = doors;
  }
}

class ElectricCar extends Car {
  constructor(make, model, year, doors, batteryCapacity) {
    super(make, model, year, doors);
    this.batteryCapacity = batteryCapacity;
  }
}

ElectricCar.prototype.info = function () {
  const vehicleInfo = Vehicle.prototype.info.call(this);
  return `${vehicleInfo} — battery: ${this.batteryCapacity} kWh`;
};
const tesla = new ElectricCar("Tesla", "Model 3", 2021, 4, 75);
console.log(tesla.info()); // "Tesla Model 3 (2021) — battery: 75 kWh"

const protoChainCar = Object.getPrototypeOf(ElectricCar.prototype);
console.log(
  `  ElectricCar.prototype.__proto__ === Car.prototype?`,
  protoChainCar === Car.prototype
);
const protoChainVehicle = Object.getPrototypeOf(Car.prototype);
console.log(
  `  Car.prototype.__proto__ === Vehicle.prototype?`,
  protoChainVehicle === Vehicle.prototype
);

/*
Ejercicio 2 — Mixins (composición de comportamiento)

Tarea: Implementa un sistema de mixins que permita añadir capacidades reutilizables a clases.

Crea mixins EventEmitterMixin (on/off/emit) y SerializableMixin (toJSON/fromJSON estático).

Aplica ambos a una clase Device (ej: class Device extends applyMixins(Base, [EventEmitterMixin, SerializableMixin])).
Firma sugerida: function applyMixins(BaseClass, mixins) y la clase Device.
Restricción: los métodos del mixin deben poder usar this del objeto final.
Pista: mixins devuelven clases que extienden una clase pasada; usar class extends en cadena.
Ejemplo:

const d = new Device('sensor-1');
d.on('change', data => console.log(data));
d.emit('change', {value: 42});
const json = Device.toJSON(d);
*/

const EventEmitterMixin = (superClass) =>
  class extends superClass {
    constructor(...args) {
      super(...args);
    }
    on() {
      console.log("on");
    }
    off() {
      console.log("off");
    }
    emit() {
      console.log("emit");
    }
  };

const SerializableMixin = (superClass) =>
  class extends superClass {
    constructor(...args) {
      super(...args);
    }
    toJSONStringify() {
      console.log(this);
      return JSON.stringify(this);
    }
    fromJSON(obj) {
      return JSON.parse(obj);
    }
  };

const applyMixins = (BaseClass, mixins) => {
  let CurrentClass = BaseClass;
  for (const Mixin of mixins) {
    CurrentClass = Mixin(CurrentClass);
  }

  return CurrentClass;
};

class Base {
  constructor(name) {
    this.name = name;
    console.log(name);
  }
}

class Device extends applyMixins(Base, [EventEmitterMixin, SerializableMixin]) {
  constructor(name) {
    super(name);
  }
}

const dev = new Device("sensor-1");
dev.on();
dev.off();
dev.emit();
const json = dev.toJSONStringify();
console.log(json);

/*
Ejercicio 3 — Agregación vs composición (modelado de relaciones)

Tarea: Modela una Library que agrega Books y compone Shelfs.

Book es un objeto independiente (puede existir fuera de la Library).

Shelf pertenece exclusivamente a una Library (si la Library se clona, sus Shelfs también deben clonarse).

Implementa métodos para: library.addBook(book), library.addShelf(shelf), library.moveBook(bookId, fromShelfId, toShelfId).
Firma sugerida: clases Book, Shelf, Library.
Restricción: demuestra la diferencia: clonar un Book compartido vs clonar la Library debe deep-clonar Shelfs.
Pista: para composición, usa clonación defensiva en el constructor de Library.
*/

class Book {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
  clone() {
    return new Book(this.id, this.title);
  }
}

class Shelf {
  constructor(shelfId, libraryId) {
    this.id = shelfId;
    this.libraryId = libraryId;
    this.books = [];
  }
  clone() {
    const newShelf = new Shelf(this.id, this.libraryId, this.capacity);
    newShelf.books = this.books.map((book) => book.clone());
    return newShelf;
  }

  addBook(book) {
    console.log("adding book", book);
    this.books.push(book);
    console.log(this.books);
  }

  removeBook(bookId) {
    const index = this.books.findIndex((b) => b.id === bookId);
    if (index > -1) {
      return this.books.splice(index, 1)[0];
    }
    return null;
  }
}

class Library {
  constructor(id, shelfs = []) {
    this.id = id;
    this.shelfs = new Map();
    shelfs.forEach((shelf) => {
      this.shelfs.set(shelf.id, shelf);
    });
    this.allBooks = new Map();
  }

  clone() {
    const clonedShelfs = Array.from(this.shelfs.values()).map((shelf) =>
      shelf.clone()
    );
    const newLibrary = new Library(this.id + " Clone", clonedShelfs);
    newLibrary.shelfs.forEach((shelf) => {
      shelf.books.forEach((book) => newLibrary.allBooks.set(book.id, book));
    });

    return newLibrary;
  }

  addBook(book, shelfId) {
    const shelf = this.shelfs.get(shelfId);
    if (shelf) {
      shelf.addBook(book);
      this.allBooks.set(book.id, book);
      return true;
    }
    return false;
  }

  addShelf(shelf) {
    this.shelfs.set(shelf.id, shelf);
  }

  moveBook(bookId, fromShelfId, toShelfId) {
    const fromShelf = this.shelfs.get(fromShelfId);
    const toShelf = this.shelfs.get(toShelfId);

    if (!fromShelf || !toShelf) return false;

    const bookToMove = fromShelf.removeBook(bookId);

    if (bookToMove) {
      return toShelf.addBook(bookToMove);
    }
    return false;
  }
}

const bookA = new Book(1, "Book A");
const bookB = new Book(2, "Book B");

const shelfX = new Shelf("X", 1);
const shelfY = new Shelf("Y", 1);

let libraryOriginal = new Library(1);
libraryOriginal.addShelf(shelfX);
libraryOriginal.addShelf(shelfY);

console.log("--- LIBRARY ORIGINAL ---");
console.log(libraryOriginal);

console.log("--- add books ---");
libraryOriginal.addBook(bookA, "X");
libraryOriginal.addBook(bookB, "Y");

let libraryClone = libraryOriginal.clone();

console.log("--- ESTADO INICIAL ---");
console.log(
  `Original X Book Title: ${libraryOriginal.shelfs.get("X").books[0].title}`
);
console.log(
  `Clone X Book Title:    ${libraryClone.shelfs.get("X").books[0].title}`
);

console.log(
  `Original Y Book Title: ${libraryOriginal.shelfs.get("Y").books[0].title}`
);
console.log(
  `Clone Y Book Title:    ${libraryClone.shelfs.get("Y").books[0].title}`
);

console.log("--- COMPOSICIÓN (Shelfs) ---");

libraryOriginal.moveBook(101, "X", "Y");
console.log("Libro A movido de X a Y");

console.log(
  `Clon X Book Count: ${libraryClone.shelfs.get("X").books.length} (Debe ser 1)`
);
console.log(
  `Clon Y Book Count: ${libraryClone.shelfs.get("Y").books.length} (Debe ser 1)`
);
//SI SE HUBIESE MODIFICADO, EL COUNT DE X DEBERIA SER 0 Y DE Y 2

console.log("--- AGREGACIÓN (Books) ---");

bookA.title = "Book a modificado";

const originalBookA = libraryOriginal.allBooks.get(1);
console.log(`Libro A Original: ${originalBookA.title}`);
libraryOriginal = null;
console.log(`Libro A Original: ${originalBookA.title}`); // a pesar de borrar el libraryoriginal aun se puede usar el book original

const cloneBookA = libraryClone.allBooks.get(1);
console.log(`Libro A Clonado:     ${cloneBookA.title}`);

/*
Ejercicio 4 — Prototypal inheritance manual (Object.create)

Tarea: Sin usar class ni function constructora, crea objetos que formen una cadena prototípica: animalProto → mammalProto → human.

animalProto tiene método eat().

mammalProto añade warmBlooded: true.

human debe crearse con Object.create(mammalProto) y añadir propiedades propias.
Firma sugerida: no aplica (usa Object.create).
Restricción: muestra cómo hasOwnProperty distingue propiedades propias vs heredadas.
Ejemplo:

human.eat(); // funciona
console.log(human.warmBlooded); // true
console.log(human.hasOwnProperty('warmBlooded')); // false
*/

const animalProto = {
  eat: function () {
    console.log(`${this.name} está comiendo.`);
  },
};

const mammalProto = Object.create(animalProto);

mammalProto.warmBlooded = true;
mammalProto.sleep = function () {
  console.log(`${this.name} está durmiendo.`);
};

const human = Object.create(mammalProto);

human.name = "Alice";
human.age = 30;
human.hasOwnProperty = human.hasOwnProperty || Object.prototype.hasOwnProperty;

human.eat();
console.log(human.warmBlooded); // true
console.log(human.hasOwnProperty("warmBlooded")); // false

/*
Ejercicio 5 — Clases con campos privados y prototype methods (interoperabilidad)

Tarea: Implementa BankAccount usando campos privados de clase (#balance) y métodos públicos en prototype (ej: deposit, withdraw, toString).

Asegura que el campo privado no sea accesible desde instancias ni desde prototype.

Añade un método estático BankAccount.transfer(from, to, amount) que use los métodos públicos.
Firma sugerida: class BankAccount { #balance = 0; constructor(...) { } ... }
Restricción: demostrar que BankAccount.prototype.hasOwnProperty('#balance') es false.
Pista: los campos privados no aparecen en el objeto ni en el prototipo; muestra pruebas.
*/

class BankAccount {
  #balance;
  #owner;
  constructor(owner) {
    this.#balance = 0;
    this.#owner = owner;
  }
  deposit(amount) {
    this.#balance += amount;
  }
  withdraw(amount) {
    if (amount <= this.#balance && amount > 0) {
      this.#balance - amount;
      return true;
    }
  }
  toString() {
    return `Owner: ${this.#owner}, [Balance: $${this.#balance.toFixed(2)}]`;
  }
  static transfer(fromAccount, toAccount, amount) {
    if (fromAccount.withdraw(amount)) {
      toAccount.deposit(amount);
      console.log(
        `\nTRANSFERENCIA EXITOSA: $${amount} transferidos de ${
          fromAccount.#owner
        } a ${toAccount.#owner}.`
      );
      return true;
    }
    console.error(
      `TRANSFERENCIA FALLIDA: Fondos insuficientes en ${fromAccount.#owner}.`
    );
    return false;
  }
}

const accountA = new BankAccount("Alice", 100);
const accountB = new BankAccount("Bob", 50);

console.log(accountA.toString());

accountA.deposit(20);
console.log(`Balance después del depósito: ${accountA.toString()}`);

console.log(
  `'Debe ser false: ${BankAccount.prototype.hasOwnProperty("#balance")}`
);
// try {
//   console.log(accountA.#balance); // Intento de acceso
// } catch (e) {
//   console.error("ERROR de Acceso:", e.name);
// }

console.log(
  `Estado Inicial: A=${accountA.toString()} | B=${accountB.toString()}`
);

BankAccount.transfer(accountA, accountB, 15);

BankAccount.transfer(accountA, accountB, 200);

console.log(
  `\nEstado Final: A=${accountA.toString()} | B=${accountB.toString()}`
);

/*

Ejercicio 6 — Symbol.hasInstance y control de instanceof

Tarea: Crea una clase Range que permita:

new Range(1,10) y que x instanceof Range devuelva true si x es un número dentro del rango.

Implementa static [Symbol.hasInstance](instance) para personalizar instanceof.
Firma sugerida: class Range { constructor(min,max) { ... } static [Symbol.hasInstance](instance) { ... } }
Restricción: instanceof con un número debe funcionar como describo, y una instancia de Range debe seguir siendo instanceof Range.
Ejemplo:

const r = new Range(1,3);
console.log(2 instanceof Range); // true
console.log(5 instanceof Range); // false
console.log(r instanceof Range); // true
*/

class Range {
  constructor(min, max) {
    this.min = min;
    this.max = max;
    Range.defaultMin = min;
    Range.defaultMax = max;
  }
  static [Symbol.hasInstance](instance) {
    if (instance && instance.constructor === Range) {
      return true;
    }
    if (typeof instance === "number") {
      const r = new Range(Range.defaultMin, Range.defaultMax);
      if (instance >= r.min && instance <= r.max) {
        return true;
      }
    }

    return false;
  }
}

const r = new Range(1, 3);
console.log(2 instanceof Range); // true
console.log(5 instanceof Range); // false
console.log(r instanceof Range); // true

/*
Ejercicio 7 — Herencia múltiple por agregación (delegación)

Tarea: JavaScript no soporta herencia múltiple directa. Implementa MultiRole que combine comportamientos de varias clases mediante delegación (no mixins).

Por ejemplo, crea CanFly, CanSwim, CanWalk como clases con métodos fly(), swim(), walk().

Crea class SuperAgent que agrega instancias de esas capacidades y delega llamadas (superAgent.fly() debe llamar internamente a this._flyer.fly() si existe).
Firma sugerida: class SuperAgent { constructor({flyer, swimmer, walker}) { ... } }
Restricción: delegación dinámica: si no se pasa swimmer, superAgent.swim() debe lanzar con mensaje claro.
Pista: usa Proxy opcionalmente para delegar automáticamente métodos no presentes.
*/

/*
Ejercicio 8 — Serialización/Deserialización con preservación de prototipo

Tarea: Implementa funciones serialize(obj) y deserialize(str) que:

Serialicen un objeto con su clase si proviene de una instancia registrada (p. ej. Person, Employee), guardando el tipo.

deserialize debe reconstruir la instancia con el prototipo correcto (no solo object literal).

Soporta nested objects que sean instancias de clases registradas.
Firma sugerida: registerClass(name, ctor), serialize(obj), deserialize(jsonStr).
Restricción: no uses eval. Usa un mapa de clases registradas.
Ejemplo:

registerClass('Person', Person);
const p = new Person('Ana');
const s = serialize({ owner: p });
const restored = deserialize(s);
restored.owner instanceof Person; // true
*/

/*
Ejercicio 9 — Performance: método en prototype vs método por instancia

Tarea: Diseña un benchmark que compare crear 100k instancias de una clase con:

Método definido en prototype, y

Método definido en el constructor (por instancia).
Mide tiempo de creación y memoria aproximada (usar performance.now() y contar propiedades propias).
Firma sugerida: benchmarkPrototypeVsInstance(iterations = 100000).
Restricción: muestra resultados y concluye cuál es más eficiente y por qué.
Pista: el método por instancia duplica la función por cada objeto; el prototype comparte la referencia.
*/

/*
Ejercicio 10 — Patrón Decorator con clases y prototype (runtime wrapping)

Tarea: Implementa un LoggerDecorator que envuelva cualquier instancia y loguee llamadas a métodos (nombre del método, args, tiempo de ejecución).

Debe funcionar sin cambiar la clase original y sin heredar de ella (usa Proxy o creación dinámica de objeto con el mismo prototipo).

Asegura que decorated instanceof OriginalClass siga siendo true si es posible. (Si no es posible con Proxy, documenta la limitación y demuestra alternativa con Object.setPrototypeOf).
Firma sugerida: function decorateWithLogger(instance) { return decoratedInstance }
Restricción: preservar this correcto dentro de los métodos originales y soportar métodos asíncronos (deben mostrar tiempo real de ejecución).
Ejemplo:

const orig = new SomeService();
const d = decorateWithLogger(orig);
await d.fetchData(1); // logs "fetchData args:[1] - took 32ms"

*/
