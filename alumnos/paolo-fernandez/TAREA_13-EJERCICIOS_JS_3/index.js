/**
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
console.log('=== EJERCICIO 1 ===');

class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  info() {
    return `${ this.make } ${ this.model } (${ this.year })`;
  }
}

console.log('Vehicle:', Vehicle);

class Car extends Vehicle {
  constructor(make, model, year, doors) {
    super(make, model, year);
    this.doors = doors;
  }
}
console.log('\n');
console.log('Car:', Car);

class ElectricCar extends Car {
  constructor(make, model, year, doors, batteryCapacity) {
    super(make, model, year, doors);
    this.batteryCapacity = batteryCapacity;
  }

  info() {
    const baseInfo = Vehicle.prototype.info.call(this);
    return `${ baseInfo } - battery: ${ this.batteryCapacity } kWh`;
  }
}
console.log('\n');
console.log('ElectricCar:', ElectricCar);

console.log('\n');
const tesla = new ElectricCar('Tesla', 'Model 3', 2021, 4, 75);
console.log(`** const tesla = new ElectricCar('Tesla', 'Model 3', 2021, 4, 75) **`);
console.log(`tesla.info():`, tesla.info());

console.log('\n');
console.log('** Prototipos **');
console.log('Vehicle.prototype:', Vehicle.prototype);
console.log('Car.prototype:', Car.prototype);
console.log('ElectricCar.prototype:', ElectricCar.prototype);

console.log('\n');
console.log('** Cadena de Prototipos **');
console.log(
  'ElectricCar.prototype.__proto__ === Car.prototype:', 
  ElectricCar.prototype.__proto__ === Car.prototype
);
console.log(
  'Car.prototype.__proto__ === Vehicle.prototype:',
  Car.prototype.__proto__ === Vehicle.prototype
);
console.log(
  'ElectricCar.prototype.__proto__.__proto__ === Vehicle.prototype:',
  ElectricCar.prototype.__proto__.__proto__ === Vehicle.prototype
);

console.log('\n\n');

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
console.log('=== EJERCICIO 2 ===');

function EventEmitterMixin(SuperClass) {
  return class extends SuperClass {
    constructor(...args) {
      super(...args);
      this._events = { };
    }

    on(event, callback) {
      if (!this._events[event]) this._events[event] = [];
      this._events[event].push(callback);
    }

    off(event, callback) {
      if (!this._events[event]) return;
      this._events[event] = this._events[event].filter(cb => cb !== callback);
    }

    emit(event, data) {
      if (!this._events[event]) return;

      for (const callback of this._events[event]) {
        callback(data);
      }
    }
  }
}
console.log('EventEmitterMixin:', EventEmitterMixin);

function SerializableMixin(SuperClass) {
  return class extends SuperClass {
    toJSON() {
      const obj = {};

      for (const key in this) {
        if (this.hasOwnProperty(key) && !key.startsWith('_')) {
          obj[key] = this[key];
        }
      }

      return obj;
    }

    static fromJSON(json) {
      const instance = new this();
      Object.assign(instance, json);

      return instance;
    }
  };
}
console.log('\n');
console.log('SerializableMixin:', SerializableMixin);

function applyMixins(BaseClass, mixins) {
  return mixins.reduce(
    (currentClass, mixin) => mixin(currentClass),
    BaseClass
  );
}
console.log('\n');
console.log('applyMixins:', applyMixins);

class Device extends applyMixins(Object, [ EventEmitterMixin, SerializableMixin ]) {
  constructor(id) {
    super();
    this.id = id;
    this.status = 'active';
  }
}
console.log('\n');
console.log('Device:', Device);

const device = new Device('sensor-1');
console.log('\n');
console.log(`** const device = new Device('sensor-1') **`);

device.on('change', (data) => {
  console.log(`\t${ device.id } -> Evento recibido:`, data);
});
console.log(`** Agregando evento al device **`);
console.log(`device.on('change', data => {
  console.log('\t-> Evento recibido:', data);
})`);

console.log(`device.emit('change', { value: 42 })`);
device.emit('change', { value: 42 });
console.log(`device.emit('change', { value: 100 })`);
device.emit('change', { value: 100 });

console.log('\n');
const json = device.toJSON();
console.log('** const json = device.toJSON() **');
console.log('json:', json);

console.log('\n');
const restored = Device.fromJSON(json);
console.log('** const restored = Device.fromJSON(json) **');
console.log('restored:', restored);

console.log('\n');
console.log('restored === device:', restored === device);
console.log('restored instanceof Device:', restored instanceof Device);
console.log('device instanceof Device:', device instanceof Device);

console.log('\n\n');

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
console.log('=== EJERCICIO 3 ===');

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }
}
console.log('Book:', Book);

class Shelf {
  constructor(id, category) {
    this.id = id;
    this.category = category;
    this.books = [];
  }
  
  addBook(book) {
    if (this.hasBook(book.id)) return;

    this.books.push(book);
  }
  
  removeBook(book) {
    this.books = this.books.filter(b => b.id !== book.id);
  }

  hasBook(bookId) {
    return this.books.some(b => b.id === bookId)
  }
  
  clone() {
    const cloned = new Shelf(this.id, this.category);
    cloned.books = [ ...this.books ];
    return cloned;
  }
}
console.log('\n');
console.log('Shelf:', Shelf);

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
    this.shelves = [];
  }
  
  addBook(book) {
    this.books.push(book);
  }
  
  addShelf(shelf) {
    this.shelves.push(shelf);
  }
  
  moveBook(book, fromShelfId, toShelfId) {
    if (!toShelfId) {
      throw new Error(`El estante destino es requerido`);
    }

    if (fromShelfId) {
      const shelfOrigin = this.shelves.find(shelf => shelf.id === fromShelfId);
      
      if (!shelfOrigin) {
        throw new Error(`Estante "${ fromShelfId }" no encontrado`);
      }

      if (!shelfOrigin.hasBook(book.id)) {
        throw new Error(`Libro "${ book.id }" no encontrado en el estante "${ fromShelfId }"`);
      }

      shelfOrigin.removeBook(book);
    }

    const shelfTarget = this.shelves.find(shelf => shelf.id === toShelfId);

    if (!shelfTarget) {
      throw new Error(`Estante "${ toShelfId }" no encontrado`);
    }

    shelfTarget.addBook(book);
  }
  
  clone() {
    const cloned = new Library(this.name);
    
    // AGREGACIÓN: Compartir referencias a Books
    cloned.books = this.books;
    
    // COMPOSICIÓN: Clonar Shelfs (deep copy)
    cloned.shelves = this.shelves.map(shelf => shelf.clone());
    
    return cloned;
  }
}
console.log('\n');
console.log('Library:', Library);

console.log('\n');
console.log('** Instanciación de objetos **');

const book1 = new Book('B1', '1984', 'George Orwell');
const book2 = new Book('B2', 'Brave New World', 'Aldous Huxley');
const book3 = new Book('B3', 'Fahrenheit 451', 'Ray Bradbury');
console.log(`** const book1 = new Book('B1', '1984', 'George Orwell') **`);
console.log(`** const book2 = new Book('B2', 'Brave New World', 'Aldous Huxley') **`);
console.log(`** const book3 = new Book('B3', 'Fahrenheit 451', 'Ray Bradbury') **`);

console.log('\n');
const library = new Library('Biblioteca Central');
console.log(`** const library = new Library('Biblioteca Central') **`);

console.log('\n');
const fiction = new Shelf('S1', 'Ficción');
const classics = new Shelf('S2', 'Clásicos');
console.log(`** const fiction = new Shelf('S1', 'Ficción') **`);
console.log(`** const classics = new Shelf('S2', 'Clásicos') **`);

console.log('\n');
console.log('** Estableciendo libros y estantes de la biblioteca **');
library.addShelf(fiction);
library.addShelf(classics);
console.log(`library.addShelf(fiction)`);
console.log(`library.addShelf(classics)`);

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);
console.log(`library.addBook(book1)`);
console.log(`library.addBook(book2)`);
console.log(`library.addBook(book3)`);

console.log('\n');
console.log('** Estado inicial **');
console.log('Libros en biblioteca:', [ ...library.books ]);
console.log(`${ fiction.category }:`, [ ...fiction.books ]);
console.log(`${ classics.category }:`, [ ...classics.books ]);

console.log('\n');
console.log('** Moviendo libros a estantes **');
library.moveBook(book1, null, 'S1');
library.moveBook(book2, null, 'S2');
library.moveBook(book3, null, 'S1');
console.log(`library.moveBook(book1, null, 'S1')`);
console.log(`library.moveBook(book2, null, 'S2')`);
console.log(`library.moveBook(book3, null, 'S1')`);

console.log(`${ fiction.category }:`, [ ...fiction.books ]);
console.log(`${ classics.category }:`, [ ...classics.books ]);

console.log('\n');
console.log('** Moviendo "1984" de Ficción a Clásicos **');
library.moveBook(book1, 'S1', 'S2');
console.log(`library.moveBook(book1, 'S1', 'S2')`);

console.log(`${ fiction.category }:`, [ ...fiction.books ]);
console.log(`${ classics.category }:`, [ ...classics.books ]);

console.log('\n');
console.log('** AGREGACIÓN (libros compartidos) **');
const library2 = new Library('Biblioteca 2');
console.log(`** const library2 = new Library('Biblioteca 2') **`);
library2.addBook(book1);
console.log(`library2.addBook(book1)`);
console.log(
  `library.books.includes(book1) && library2.books.includes(book1):`, 
  library.books.includes(book1) && library2.books.includes(book1)
);
console.log(
  `library.books[0] === library2.books[0]:`, 
  library.books[0] === library2.books[0]
);

console.log('\n');
console.log('** COMPOSICIÓN (estantes clonados) **');
const libraryClone = library.clone();
console.log(`** const libraryClone = library.clone() **`);
console.log(
  `library.books === libraryClone.books:`, 
  library.books === libraryClone.books
);
console.log(
  `library.shelves[0] === libraryClone.shelves[0]:`, 
  library.shelves[0] === libraryClone.shelves[0]
);
console.log(
  `library.shelves[0].books[0] === libraryClone.shelves[0].books[0]`,
  library.shelves[0].books[0] === libraryClone.shelves[0].books[0]
);

console.log('\n');
console.log('** Modificando estante clonado **');
libraryClone.shelves[0].category = 'Ciencia Ficción';
console.log(`libraryClone.shelves[0].category = 'Ciencia Ficción'`);
console.log('library.shelves[0].category:', library.shelves[0].category);
console.log('libraryClone.shelves[0].category:', libraryClone.shelves[0].category); 

console.log('\n\n');

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
console.log('=== EJERCICIO 4 ===');

const animalProto = {
  eat(food) {
    console.log(`Comiendo ${ food }`);
  },
  breathe() {
    console.log(`Respirando...`);
  }
};
console.log('animalProto:', animalProto);
// console.log(
//   'Object.getPrototypeOf(animalProto) === Object:', 
//   Object.getPrototypeOf(animalProto) === Object
// );

console.log('\n');
const mammalProto = Object.create(animalProto);
console.log(`** const mammalProto = Object.create(animalProto) **`);
mammalProto.warmBlooded = true;
mammalProto.giveBirth = function() {
  console.log('Dando a luz...');
}
console.log(`mammalProto.warmBlooded = true`);
console.log(`mammalProto.giveBirth = ${ mammalProto.giveBirth }`);
console.log('mammalProto:', mammalProto);
console.log('** Verificando herencia **');
console.log(
  'Object.getPrototypeOf(mammalProto) === animalProto:', 
  Object.getPrototypeOf(mammalProto) === animalProto
);

console.log('\n');
const human = Object.create(mammalProto);
console.log(`** const human = Object.create(mammalProto) **`);
human.name = 'Paolo';
human.age = 24;
human.speak = function(message) {
  console.log(`${ this.name } dice: "${ message }"`);
}
console.log(`human.name = 'Paolo'`);
console.log(`human.age = 24`);
console.log(`human.speak = ${ human.speak }`);
console.log('human:', human);
console.log('** Verificando herencia **');
console.log(
  'Object.getPrototypeOf(human) === mammalProto:', 
  Object.getPrototypeOf(human) === mammalProto
);

console.log('\n');
console.log('** Probando herencia **');
console.log('* Métodos de animalProto *');
console.log(`- human.eat('manzana'):`)
human.eat('manzana');
console.log(`- human.breathe():`)
human.breathe();

console.log('\n');
console.log('* Métodos y propiedades de mammalProto *');
console.log(`- human.giveBirth():`);
human.giveBirth();
console.log('- warmBlooded:', human.warmBlooded)

console.log('\n');
console.log('* Métodos y propiedades propias de human *');
console.log(`- human.speak('Hola Mundo'):`)
human.speak('Hola Mundo');
console.log('- human.name:', human.name);
console.log('- human.age:', human.age);

console.log('\n');
console.log('** hasOwnProperty **');
console.log('* Propiedades propias *');
console.log(
  `human.hasOwnProperty('name'):`, 
  human.hasOwnProperty('name')
);
console.log(
  `human.hasOwnProperty('age'):`, 
  human.hasOwnProperty('age')
);
console.log(
  `human.hasOwnProperty('speak'):`, 
  human.hasOwnProperty('speak')
);

console.log('\n');
console.log('* Propiedades heredadas *');
console.log(
  `human.hasOwnProperty('eat'):`, 
  human.hasOwnProperty('eat')
);
console.log(
  `human.hasOwnProperty('breathe'):`, 
  human.hasOwnProperty('breathe')
);
console.log(
  `human.hasOwnProperty('giveBirth'):`, 
  human.hasOwnProperty('giveBirth')
);
console.log(
  `human.hasOwnProperty('warmBlooded'):`, 
  human.hasOwnProperty('warmBlooded')
);

console.log('\n');
console.log('** Existen pero NO son propias **');
console.log(`'eat' in human:`, 'eat' in human);
console.log(`'breathe' in human:`, 'breathe' in human);
console.log(`'giveBirth' in human:`, 'giveBirth' in human);
console.log(`'warmBlooded' in human:`, 'warmBlooded' in human);

console.log('\n');
console.log('** Recorriendo la cadena de prototipos **');
let current = human;
let level = 0;

while (current !== null) {
  const ownProps = Object.getOwnPropertyNames(current);
  console.log(`Nivel ${ level }:`, ownProps);
  current = Object.getPrototypeOf(current);
  level++;
}

console.log('\n\n');

/*
  Ejercicio 5 — Clases con campos privados y prototype methods (interoperabilidad)

  Tarea: Implementa BankAccount usando campos privados de clase (#balance) y métodos públicos en prototype (ej: deposit, withdraw, toString).

  Asegura que el campo privado no sea accesible desde instancias ni desde prototype.

  Añade un método estático BankAccount.transfer(from, to, amount) que use los métodos públicos.
  Firma sugerida: class BankAccount { #balance = 0; constructor(...) { } ... }
  Restricción: demostrar que BankAccount.prototype.hasOwnProperty('#balance') es false.
  Pista: los campos privados no aparecen en el objeto ni en el prototipo; muestra pruebas.
*/
console.log('=== EJERCICIO 5 ===');

class BankAccount {
  #balance = 0;

  constructor(owner, balance = 0) {
    this.owner = owner;
    this.#balance = balance;
    this.lastTransactionAt = null;
  }

  get balance() {
    return this.#balance;
  }

  credit(amount) {
    if (amount <= 0) {
      throw new Error('El monto a depositar debe positivo');
    }

    this.#balance += amount;
    this.lastTransactionAt = new Date();

    return this.#balance;
  }

  debit(amount) {
    if (amount <= 0) {
      throw new Error('El monto a retirar debe positivo');
    }
    
    if (amount > this.#balance) {
      throw new Error(`Operación rechazada. Saldo insuficiente: ${ this.#balance }`);
    }

    this.#balance -= amount;
    this.lastTransactionAt = new Date();

    return this.#balance;
  }

  static transfer(from, to, amount) {
    from.debit(amount);
    to.credit(amount);
  }
}
console.log('BankAccount:', BankAccount);

console.log('\n');
console.log('** Creando cuentas **');
const juan = new BankAccount('Juan', 1000);
const pedro = new BankAccount('Pedro', 500);
console.log(`** const juan = new BankAccount('Juan', 1000) **`);
console.log(`** const pedro = new BankAccount('Pedro', 500) **`);
console.log(`juan.balance:`, juan.balance);
console.log(`pedro.balance:`, pedro.balance);

console.log('\n');
console.log('** Operaciones básicas **');
juan.credit(200);
pedro.debit(100);
console.log(`juan.credit(200)`);
console.log(`pedro.debit(100)`);
console.log(`juan.balance:`, juan.balance);
console.log(`pedro.balance:`, pedro.balance);

console.log('\n');
console.log('** Transferencia **');
BankAccount.transfer(juan, pedro, 300);
console.log(`BankAccount.transfer(juan, pedro, 300)`);
console.log(`juan.balance:`, juan.balance);
console.log(`pedro.balance:`, pedro.balance);

console.log('\n');
console.log('** #balance como propiedad PRIVADA **');
console.log(`'balance' in juan:`, 'balance' in juan);
console.log(`'#balance' in juan:`, '#balance' in juan);
console.log(`juan:`, juan);
console.log(`Object.keys(juan):`, Object.keys(juan));
console.log(
  `Object.getOwnPropertyNames(juan):`, 
  Object.getOwnPropertyNames(juan)
);
console.log(`BankAccount.prototype:`, BankAccount.prototype);
console.log(
  `BankAccount.prototype.hasOwnProperty('#balance'):`, 
  BankAccount.prototype.hasOwnProperty('#balance')
);
console.log(
  `Object.getOwnPropertyNames(BankAccount.prototype):`, 
  Object.getOwnPropertyNames(BankAccount.prototype)
);

console.log('\n\n');

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
console.log('=== EJERCICIO 6 ===');

class Rango {
  static #currentRange = null;

  constructor(min, max) {
    if (min >= max) {
      throw new Error(`Rango no válido. El valor mínimo debe ser mayor al valor máximo (${ min } >= ${ max })`);
    }

    this.min = min;
    this.max = max;
    Rango.#currentRange = this;
  }

  static [Symbol.hasInstance](instance) {
    if (instance?.constructor === Rango) return true;

    if (typeof instance === 'number' && Rango.#currentRange) {
      return instance >= Rango.#currentRange.min &&
        instance <= Rango.#currentRange.max;
    }

    return false;
  }
}
console.log('Rango:', Rango);

console.log('\n');
const rango = new Rango(1,3);
console.log(`** const rango = new Rango(1,3) **`);
console.log(`rango:`, rango);
console.log(`2 instanceof Rango:`, 2 instanceof Rango);
console.log(`5 instanceof Rango:`, 5 instanceof Rango);
console.log(`rango instanceof Rango:`, rango instanceof Rango);

console.log('\n\n');

/*

Ejercicio 7 — Herencia múltiple por agregación (delegación)

Tarea: JavaScript no soporta herencia múltiple directa. Implementa MultiRole que combine comportamientos de varias clases mediante delegación (no mixins).

Por ejemplo, crea CanFly, CanSwim, CanWalk como clases con métodos fly(), swim(), walk().

Crea class SuperAgent que agrega instancias de esas capacidades y delega llamadas (superAgent.fly() debe llamar internamente a this._flyer.fly() si existe).
Firma sugerida: class SuperAgent { constructor({flyer, swimmer, walker}) { ... } }
Restricción: delegación dinámica: si no se pasa swimmer, superAgent.swim() debe lanzar con mensaje claro.
Pista: usa Proxy opcionalmente para delegar automáticamente métodos no presentes.

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

Ejercicio 9 — Performance: método en prototype vs método por instancia

Tarea: Diseña un benchmark que compare crear 100k instancias de una clase con:

Método definido en prototype, y

Método definido en el constructor (por instancia).
Mide tiempo de creación y memoria aproximada (usar performance.now() y contar propiedades propias).
Firma sugerida: benchmarkPrototypeVsInstance(iterations = 100000).
Restricción: muestra resultados y concluye cuál es más eficiente y por qué.
Pista: el método por instancia duplica la función por cada objeto; el prototype comparte la referencia.

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