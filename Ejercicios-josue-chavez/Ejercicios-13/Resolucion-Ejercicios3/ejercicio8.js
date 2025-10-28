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

const classRegistry = new Map();

function registerClass(name, ctor) {
    classRegistry.set(name, ctor);
}   

function serialize(obj) {
    return JSON.stringify(obj, function (key, value) {
        if (value && typeof value === 'object') {
        const ctorName = value.constructor && value.constructor.name;
        if (classRegistry.has(ctorName)) {
            const data = {};
            for (const k of Object.keys(value)) data[k] = value[k];
            return { __type: ctorName, __data: data };
        }
        }
        return value;
    });
}

function deserialize(jsonStr) {
    return JSON.parse(jsonStr, function (key, value) {
        if (value && value.__type && classRegistry.has(value.__type)) {
        const ctor = classRegistry.get(value.__type);
        const instance = Object.create(ctor.prototype);
        for (const k of Object.keys(value.__data || {})) {
            instance[k] = value.__data[k];
        }
        return instance;
        }
        return value;
    });
}

class Person {
    constructor(name) {
        this.name = name;
    }
    greet() { return `hi I'm ${this.name}`; }
    }
    class Employee extends Person {
    constructor(name, role) {
        super(name);
        this.role = role;
    }
    describe() { return `${this.name} - ${this.role}`; }
}

registerClass('Person', Person);
registerClass('Employee', Employee);

const p = new Person('Ana');
const e = new Employee('Luis', 'Dev');
const obj = { owner: p, worker: e, other: { nested: new Person('Mia') } };

const s = serialize(obj);
console.log('serialized:', s);

const restored = deserialize(s);
console.log('restored.owner instanceof Person?', restored.owner instanceof Person); // true
console.log('restored.worker instanceof Employee?', restored.worker instanceof Employee); // true
console.log('methods work:', restored.owner.greet(), restored.worker.describe());
