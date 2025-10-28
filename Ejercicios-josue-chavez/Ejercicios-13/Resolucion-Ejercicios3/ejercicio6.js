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
        Range._instances.add(this);
    }

    contains(n) {
        return typeof n === 'number' && n >= this.min && n <= this.max;
    }

    static _instances = new Set();

    static [Symbol.hasInstance](instance) {
        if (typeof instance === 'number') {
        for (const r of Range._instances) {
            if (r.contains(instance)) return true;
        }
        return false;
        }
        return Object.prototype.isPrototypeOf.call(Range.prototype, instance) || instance instanceof Object && Range.prototype.isPrototypeOf(instance);
    }
}

// Pruebas:
const r = new Range(1, 3);
console.log(2 instanceof Range); // true
console.log(5 instanceof Range); // false
console.log(r instanceof Range); // true

// Si creamos otro range, 5 podría ser true si cae en ese range
const r2 = new Range(4, 6);
console.log(5 instanceof Range); // true
