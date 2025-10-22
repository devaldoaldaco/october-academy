/*Ejercicio 1 — Clase base + método en prototype y sobreescritura

Tarea: Crea una jerarquía clásica Vehicle → Car → ElectricCar.

Vehicle define propiedades make, model, year y un método en su prototype llamado info() que devuelve "make model (year)".

Car hereda de Vehicle y añade doors.

ElectricCar hereda de Car, añade batteryCapacity y sobrescribe info() invocando el info() del prototipo padre (no usar super — usa Vehicle.prototype.info.call o equivalente).
Firma sugerida: clases Vehicle, Car, ElectricCar.
Restricción: demuestra la igualdad entre ElectricCar.prototype.__proto__ y Car.prototype.
Pista: prueba tanto con new como examinando la cadena de prototipos.
Ejemplo:

const tesla = new ElectricCar('Tesla','Model 3',2021,4,75);
tesla.info(); // "Tesla Model 3 (2021) — battery: 75 kWh"*/

class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  info() {
    return `${this.make}, ${this.model}, ${this.year}`;
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
  return `${this.make}, ${this.model}, ${this.year}, ${this.batteryCapacity}`;
};

const tesla = new ElectricCar("Tesla", "Model 3", 2021, 4, 75);
console.log(tesla.info());
console.log(tesla.__proto__.__proto__ === Car.prototype);

/*Ejercicio 2 — Mixins (composición de comportamiento)

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
const json = Device.toJSON(d);*/

function EventEmitterMixin(Base) {
  return class extends Base {
    on(event, listener) {
      console.log(
        `on llamado desde ${this.constructor.name} con evento: ${event}`
      );
      console.log("this es:", this);
    }

    off(event, listener) {
      console.log(
        `off llamado desde ${this.constructor.name} con evento: ${event}`
      );
      console.log("this es:", this);
    }

    emit(event, data) {
      console.log(
        `emit llamado desde ${this.constructor.name} con evento: ${event}`
      );
      console.log("this es:", this);
    }
  };
}

function SerializableMixin(Base) {
  return class extends Base {
    toJSON() {
      console.log(`toJSON llamado desde ${this.constructor.name}`);
      console.log("El this es:", this);
    }

    static fromJSON(json) {
      console.log(`fromJSON llamado en clase ${this.name}`);
      console.log("json recibido:", json);
    }
  };
}

class Base {
  constructor(name) {
    this.name = name;
  }
}

function applyMixins(BaseClass, mixins) {
  return mixins.reduce((acc, mixin) => mixin(acc), BaseClass);
}

class Device extends applyMixins(Base, [EventEmitterMixin, SerializableMixin]) {
  constructor(name) {
    super(name);
  }
}

//prueba sugerida
const d = new Device("sensor-1");

d.on("change", () => {});
d.emit("change", { value: 42 });
d.toJSON();

Device.fromJSON('{"name":"sensor-1"}');

/*Ejercicio 7 — Herencia múltiple por agregación (delegación)

Tarea: JavaScript no soporta herencia múltiple directa. Implementa MultiRole que combine comportamientos de varias clases mediante delegación (no mixins).

Por ejemplo, crea CanFly, CanSwim, CanWalk como clases con métodos fly(), swim(), walk().

Crea class SuperAgent que agrega instancias de esas capacidades y delega llamadas (superAgent.fly() debe llamar internamente a this._flyer.fly() si existe).
Firma sugerida: class SuperAgent { constructor({flyer, swimmer, walker}) { ... } }
Restricción: delegación dinámica: si no se pasa swimmer, superAgent.swim() debe lanzar con mensaje claro.
Pista: usa Proxy opcionalmente para delegar automáticamente métodos no presentes.*/

class CanFly {
  fly() {
    console.log("puedo volar");
  }
}

class CanSwim {
  swim() {
    console.log("puedo nadar");
  }
}

class CanWalk {
  walk() {
    console.log("puedo caminar");
  }
}

// Clase que combina las habilidades por delegación
class SuperAgent {
  constructor({ flyer, swimmer, walker }) {
    this._flyer = flyer;
    this._swimmer = swimmer;
    this._walker = walker;
  }

  fly() {
    if (!this._flyer) {
      console.log("No puedo volar");
    }
    this._flyer.fly();
  }

  swim() {
    if (!this._swimmer) {
      console.log("No puedo nadar");
    }
    this._swimmer.swim();
  }

  walk() {
    if (!this._walker) {
      console.log("No puedo caminar");
    }
    this._walker.walk();
  }
}

// --------- Ejemplo de uso ---------
const capabilities = new SuperAgent({
  flyer: new CanFly(),
  walker: new CanWalk(),
});

capabilities.fly();
capabilities.walk();
//capabilities.swim();

/*Ejercicio 6 — Symbol.hasInstance y control de instanceof

Tarea: Crea una clase Range que permita:

new Range(1,10) y que x instanceof Range devuelva true si x es un número dentro del rango.

Implementa static [Symbol.hasInstance](instance) para personalizar instanceof.
Firma sugerida: class Range { constructor(min,max) { ... } static [Symbol.hasInstance](instance) { ... } }
Restricción: instanceof con un número debe funcionar como describo, y una instancia de Range debe seguir siendo instanceof Range.
Ejemplo:

const r = new Range(1,3);
console.log(2 instanceof Range); // true
console.log(5 instanceof Range); // false
console.log(r instanceof Range); // true*/

class Range {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  static [Symbol.hasInstance](instance) {
    //Condicion: Una instancia de Range debe seguir siendo instanceof Range.
    if (
      this === Range &&
      instance instanceof Object &&
      instance.constructor === Range
    ) {
      return true;
    }

    // Condicion: devuelva true si x es un número dentro del rango.
    if (typeof instance === "number") {
      return instance >= r.min && instance <= r.max;
    }

    return false;
  }
}

const r = new Range(1, 3);
console.log(2 instanceof Range);
console.log(5 instanceof Range);
console.log(r instanceof Range);

/*Ejercicio 5 — Clases con campos privados y prototype methods (interoperabilidad)

Tarea: Implementa BankAccount usando campos privados de clase (#balance) y métodos públicos en prototype (ej: deposit, withdraw, toString).

Asegura que el campo privado no sea accesible desde instancias ni desde prototype.

Añade un método estático BankAccount.transfer(from, to, amount) que use los métodos públicos.
Firma sugerida: class BankAccount { #balance = 0; constructor(...) { } ... }
Restricción: demostrar que BankAccount.prototype.hasOwnProperty('#balance') es false.
Pista: los campos privados no aparecen en el objeto ni en el prototipo; muestra pruebas.*/

class BankAccount {
  #balance = 0;
  constructor(client) {
    this.from = client;
  }

  deposit() {
    this.#balance += amount;
    console.log(`${this.client} depositó ${amount}. Saldo: ${this.#balance}`);
  }
  withdraw() {
    this.#balance -= amount;
    console.log(`${this.owner} retiró ${amount}. Saldo: ${this.#balance}`);
  }
  toString() {
    return `Cuenta de ${this.owner}, saldo actual: ${this.#balance}`;
  }

  static transfer(from, to, amount) {
    from.withdraw();
    to.deposit();
    console.log(`Transferencia de ${amount} de ${from.client} a ${to.client}`);
  }
}

const prueba1 = new BankAccount('Elias');

// pruebas
console.log(prueba1.balance);
console.log(BankAccount.prototype.hasOwnProperty('#balance'));
