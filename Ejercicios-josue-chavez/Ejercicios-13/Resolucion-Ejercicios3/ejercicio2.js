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

function EventEmitterMixin(Base) {
    return class extends Base {
        constructor(...args) {
        super(...args);
        this._events = new Map();
        }

        on(event, handler) {
        if (!this._events.has(event)) this._events.set(event, []);
        this._events.get(event).push(handler);
        }

        off(event, handler) {
        if (!this._events.has(event)) return;
        const arr = this._events.get(event).filter(h => h !== handler);
        this._events.set(event, arr);
        }

        emit(event, ...args) {
        if (!this._events.has(event)) return;
        for (const h of Array.from(this._events.get(event))) {
            try { h.apply(this, args); } catch (e) { console.error(e); }
        }
        }
    };
}

function SerializableMixin(Base) {
    return class extends Base {
        toJSON() {
        const obj = {};
        for (const key of Object.keys(this)) {
            obj[key] = this[key];
        }
        return { __type: this.constructor.name, data: obj };
        }

        static toJSON(instance) {
        return JSON.stringify(instance.toJSON());
        }

        static fromJSON(jsonStrOrObj) {
        const parsed = typeof jsonStrOrObj === 'string' ? JSON.parse(jsonStrOrObj) : jsonStrOrObj;
        const ctor = this;
        const inst = new ctor(parsed.data && parsed.data.id ? parsed.data.id : undefined);
        if (parsed.data) {
            for (const k of Object.keys(parsed.data)) {
            inst[k] = parsed.data[k];
            }
        }
        return inst;
        }
    };
}

function applyMixins(BaseClass, mixins = []) {
    return mixins.reduce((acc, mixin) => mixin(acc), BaseClass);
}

class BaseDevice {
    constructor(id) {
        this.id = id;
    }
}

class Device extends applyMixins(BaseDevice, [EventEmitterMixin, SerializableMixin]) {
    constructor(id, meta = {}) {
        super(id);
        this.meta = meta;
    }
}

const d = new Device('sensor-1', { location: 'lab' });
d.on('change', data => console.log('change event', data, 'this.id=', d.id));
d.emit('change', { value: 42 });

const json = Device.toJSON(d);
console.log('Device.toJSON ->', json);

const d2 = Device.fromJSON(json);
console.log('reconstructed', d2, d2 instanceof Device);
