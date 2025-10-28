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

function decorateWithLogger(instance) {
    const handler = {
        get(target, prop, receiver) {
        const orig = Reflect.get(target, prop, receiver);
        if (typeof orig === 'function') {
            return function (...args) {
            const name = prop.toString();
            const start = Date.now();
            try {
                const result = orig.apply(target, args);
                if (result && typeof result.then === 'function') {
                return result.then(res => {
                    const end = Date.now();
                    console.log(`[LOG] ${name} args:${JSON.stringify(args)} - took ${end - start}ms (async)`);
                    return res;
                }).catch(err => {
                    const end = Date.now();
                    console.log(`[LOG] ${name} args:${JSON.stringify(args)} - threw after ${end - start}ms (async)`);
                    throw err;
                });
                } else {
                const end = Date.now();
                console.log(`[LOG] ${name} args:${JSON.stringify(args)} - took ${end - start}ms`);
                return result;
                }
            } catch (err) {
                const end = Date.now();
                console.log(`[LOG] ${name} args:${JSON.stringify(args)} - threw after ${end - start}ms`);
                throw err;
            }
            };
        }
        return orig;
        }
    };

    return new Proxy(instance, handler);
}

class SomeService {
    syncMethod(x) {
        for (let i = 0; i < 1e6; i++); 
        return x * 2;
    }

    async fetchData(n) {
        await new Promise(resolve => setTimeout(resolve, 50));
        return { n, data: [1, 2, 3] };
    }
}

const orig = new SomeService();
const d = decorateWithLogger(orig);
console.log('instanceof check:', d instanceof SomeService);
console.log('sync result:', d.syncMethod(5));
d.fetchData(1).then(res => console.log('async result', res));
