/*
Ejercicio 7 — Herencia múltiple por agregación (delegación)

Tarea: JavaScript no soporta herencia múltiple directa. Implementa MultiRole que combine comportamientos de varias clases mediante delegación (no mixins).

Por ejemplo, crea CanFly, CanSwim, CanWalk como clases con métodos fly(), swim(), walk().

Crea class SuperAgent que agrega instancias de esas capacidades y delega llamadas (superAgent.fly() debe llamar internamente a this._flyer.fly() si existe).
Firma sugerida: class SuperAgent { constructor({flyer, swimmer, walker}) { ... } }
Restricción: delegación dinámica: si no se pasa swimmer, superAgent.swim() debe lanzar con mensaje claro.
Pista: usa Proxy opcionalmente para delegar automáticamente métodos no presentes.
*/

class CanFly {
    fly() {
        return `flying`;
    }
}

class CanSwim {
    swim() {
        return `swimming`;
    }
}

class CanWalk {
    walk() {
        return `walking`;
    }
}

// Delegación manual:
class SuperAgent {
    constructor({ flyer = null, swimmer = null, walker = null } = {}) {
        this._flyer = flyer;
        this._swimmer = swimmer;
        this._walker = walker;
    }

    fly(...args) {
        if (!this._flyer || typeof this._flyer.fly !== 'function') {
        throw new Error('This agent cannot fly (no flyer provided).');
        }
        return this._flyer.fly(...args);
    }

    swim(...args) {
        if (!this._swimmer || typeof this._swimmer.swim !== 'function') {
        throw new Error('This agent cannot swim (no swimmer provided).');
        }
        return this._swimmer.swim(...args);
    }

    walk(...args) {
        if (!this._walker || typeof this._walker.walk !== 'function') {
        throw new Error('This agent cannot walk (no walker provided).');
        }
        return this._walker.walk(...args);
    }
}

function createSuperAgentProxy(parts = {}) {
    const agent = { _parts: parts };
    return new Proxy(agent, {
        get(target, prop, receiver) {
        if (prop === '_parts') return target._parts;
        // First, return existing properties/methods on agent
        if (prop in target) return Reflect.get(target, prop, receiver);

        // Try to find the method in any part
        for (const partName of Object.keys(target._parts)) {
            const part = target._parts[partName];
            if (part && typeof part[prop] === 'function') {
            // bind 'this' of the part to the part itself (or to receiver if needed)
            return function (...args) {
                return part[prop].apply(part, args);
            };
            }
        }

        return undefined;
        }
    });
}

// Pruebas:
const flyer = new CanFly();
const swimmer = new CanSwim();

const sa = new SuperAgent({ flyer, swimmer });
console.log(sa.fly()); 
console.log(sa.swim());
try {
    console.log(sa.walk());
} catch (e) {
    console.log('expected error:', e.message);
}

// Proxy version:
const proxyAgent = createSuperAgentProxy({ flyer, swimmer });
console.log(proxyAgent.fly());
console.log(proxyAgent.swim());
console.log(typeof proxyAgent.walk);
