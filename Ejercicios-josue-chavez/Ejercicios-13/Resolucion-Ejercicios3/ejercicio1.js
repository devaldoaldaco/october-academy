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
}

Vehicle.prototype.info = function () {
    return `${this.make} ${this.model} (${this.year})`;
};

class Car extends Vehicle {
    constructor(make, model, year, doors) {
        super(make, model, year);
        this.doors = doors;
    }
}

class ElectricCar extends Car {
    constructor(make, model, year, doors, batteryCapacity) {
        super(make, model, year, doors);
        this.batteryCapacity = batteryCapacity
    }

    info() {
        const base = Vehicle.prototype.info.call(this);
        return `${base} — battery: ${this.batteryCapacity} kWh`;
    }
}

const tesla = new ElectricCar('Tesla', 'Model 3', 2021, 4, 75);
console.log(tesla.info()); 

console.log(ElectricCar.prototype.__proto__ === Car.prototype);

console.log(Object.getPrototypeOf(ElectricCar.prototype) === Car.prototype); // true
