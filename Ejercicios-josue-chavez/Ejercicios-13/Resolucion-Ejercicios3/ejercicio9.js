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

function benchmarkPrototypeVsInstance(iterations = 100000) {
    const { performance } = (typeof window !== 'undefined') ? window : require('perf_hooks');

    class ProtoClass {
        constructor(v) {
        this.v = v;
        }
        method() {
        return this.v;
        }
    }

    const t0 = performance.now();
    const arrProto = [];
    for (let i = 0; i < iterations; i++) {
        arrProto.push(new ProtoClass(i));
    }
    const t1 = performance.now();

    const propCountProto = Object.keys(arrProto[0]).length;

    class InstClass {
        constructor(v) {
        this.v = v;
        this.method = function () { return this.v; };
        }
    }

    const t2 = performance.now();
    const arrInst = [];
    for (let i = 0; i < iterations; i++) {
        arrInst.push(new InstClass(i));
    }
    const t3 = performance.now();

    const propCountInst = Object.keys(arrInst[0]).length;

    return {
        iterations,
        prototype: {
        timeMs: t1 - t0,
        ownProps: propCountProto
        },
        instance: {
        timeMs: t3 - t2,
        ownProps: propCountInst
        }
    };
}

console.log(benchmarkPrototypeVsInstance(100000));
