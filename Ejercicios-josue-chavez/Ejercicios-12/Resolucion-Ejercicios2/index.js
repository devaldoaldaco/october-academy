//Datos Iniciales
const user = {
    id: 101,
    name: "Aldo",
    age: 34,
    address: { city: "CDMX", zip: "01120" },
    roles: ["dev", "lead"],
    stats: { commits: 120, reviews: 45 },
    getLabel() {
        return `${this.name} (${this.id})`;
    },
};

function Logger(prefix) {
    this.prefix = prefix;
}
Logger.prototype.log = function (msg) {
    console.log(this.prefix + msg);
};

/**
Ejercicio 1 — this en métodos vs funciones sueltas

Tarea: Explica y demuestra con código qué valor tiene this cuando llamas user.getLabel() vs const f = user.getLabel; f();.
Firma sugerida: no aplica (ejercicio explicativo).
Pista: muestra cómo usar bind para que f() conserve this.
 */

// this cuando - user.getLabel()
console.log(user.getLabel()); // "Aldo (101)"

// this cuando - const f = user.getLabel; f();
const f = user.getLabel;
try {
    console.log(f());
} catch (e) {
    console.log('Error al llamar f():', e.message);
}

// Solución con bind:
const g = user.getLabel.bind(user);
console.log(g());

/*
Ejercicio 2 — Arrow function y this

Tarea: Crea un objeto con un método que dentro use un setTimeout para incrementar un contador en this. Implementa dos versiones: una con function y otra con =>. Muestra por qué una necesita bind o self = this.
Firma: function createTimerObj() { } devuelve objeto con método start().
*/

function createTimerObj_function() {
    return {
        count: 0,
        start() {
        setTimeout(function() {
            console.log('function callback this:', this);
        }, 0);
        }
    };
}

function createTimerObj_functionBound() {
    return {
        count: 0,
        start() {
        const self = this;
        setTimeout(function() {
            self.count += 1;
            console.log('functionBound: count =', self.count);
        }, 0);
        }
    };
}

function createTimerObj_functionBind() {
    return {
        count: 0,
        start() {
        setTimeout(function() {
            this.count += 1;
            console.log('functionBind: count =', this.count);
        }.bind(this), 0);
        }
    };
}

function createTimerObj_arrow() {
    return {
        count: 0,
        start() {
        setTimeout(() => {
            this.count += 1;
            console.log('arrow: count =', this.count);
        }, 0);
        }
    };
}

const a = createTimerObj_functionBound();
a.start();

const b = createTimerObj_functionBind();
b.start();

const c = createTimerObj_arrow();
c.start();

/*
Ejercicio 3 — Diferencia hoisting: function declaration vs function expression

Tarea: Escribe un ejemplo que llame a una función antes de declararla usando function foo(){} y otro con const bar = function(){}; explica diferencias de hoisting.
Firma: no aplica (ejemplo + explicación).
*/

console.log(square(4));
function square(x) { return x * x; }

try {
    console.log(double(3)); 
} catch (e) {
    console.log('Error:', e.message);
}
const double = function(n) { return n * 2; };
console.log(double(3));

try {
    console.log(triple(2));
} catch (e) {
    console.log('Error var:', e.message);
}
var triple = function(n) { return n * 3; };
console.log(triple(2)); 

/*
Ejercicio 4 — call, apply, bind en práctica

Tarea: Implementa invokeWithContext(fn, ctx, argsArray) que llame fn con ctx usando call, apply o bind según corresponda; demuestra con user.getLabel y con Logger.prototype.log.
Firma: function invokeWithContext(fn, ctx, argsArray) {  }
*/

function invokeWithContext(fn, ctx, argsArray) {
    if (!Array.isArray(argsArray)) {
    return fn.call(ctx);
}
    return fn.apply(ctx, argsArray);
}

console.log(invokeWithContext(user.getLabel, user));
console.log(invokeWithContext(Logger.prototype.log, new Logger('> '), ['Hola']));

/*
Ejercicio 5 — Paradoja de this con arrow methods en prototypes

Tarea: Añade un método arrow a Logger.prototype y compara comportamiento con método normal al instanciar new Logger('> '). Explica por qué no funciona como se espera.
Firma: no aplica (ejemplo + explicación).
*/


Logger.prototype.logArrow = (msg) => {
    console.log('arrow this prefix:', this && this.prefix, 'msg:', msg);
};

const L1 = new Logger('> ');
L1.log('normal: hola'); 
L1.logArrow('hola arrow'); 

Logger.prototype.logNormal = function(msg) {
    console.log('normal this prefix:', this.prefix, 'msg:', msg);
};
L1.logNormal('hola normal');

/*
Ejercicio 6 — Encadenamiento y this en métodos encadenables

Tarea: Implementa Chainable que permita Chainable().step1().step2().value() usando this correctamente.
Firma: function Chainable(initial) { }
Pista: cada método debe retornar this excepto value().
*/

function Chainable(initial) {
    const state = { value: initial };
    return {
        step1() { state.value += 1; return this; },
        step2() { state.value *= 2; return this; },
        add(n) { state.value += n; return this; },
        value() { return state.value; }
    };
}

const chain = Chainable(3).step1().add(4).step2();
console.log(chain.value());

/*
Ejercicio 7 — Closure + this

Tarea: Crea createCounter(obj) que añade a obj dos métodos inc() y get() que compartan un contador privado. Asegura que el contador no pueda modificarse desde afuera y que this siga apuntando al objeto cuando se usa obj.inc() como callback.
Firma: function createCounter(obj) { }
*/
function createCounter(obj) {
    let count = 0;

    obj.inc = function() {
        count += 1;
        return count;
    };
    obj.get = function() {
        return count;
    };

    obj.incBound = function() {
        count += 1;
        console.log('incBound this.name =', this.name);
        return count;
    }.bind(obj);
    return obj;
}

const o = { name: 'MiObj' };
createCounter(o);
console.log(o.get());
o.inc();
console.log(o.get());

setTimeout(o.inc, 10);  
setTimeout(o.incBound, 20);

/*
Ejercicio 8 — Variables: var, let, const y bucles

Tarea: Explica y demuestra con código por qué usar var en un for con setTimeout produce valores inesperados, y corrige usando let.
Firma: no aplica (ejemplo + corrección).
*/
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log('var i =', i), 10);
}
// resultado: 'var i = 3' tres veces

for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log('let i =', i), 10);
}
// resultado: let i = 0, let i = 1, let i = 2

/*
Ejercicio 9 — Método que pierde this cuando se destruye el objeto

Tarea: Dado const f = obj.method; obj = null; f() — muestra comportamiento y solución (por ejemplo bind o usar closure para capturar referencias).
Firma: no aplica (ejemplo + solución).
*/

let obj = { val: 100, method() { console.log(this.val); } };
const fBound = obj.method.bind(obj);
obj = null;
fBound(); // 100

let obj3 = { val: 7, method() { console.log(this.val); } };
const fClosure = (function (s) {
    return function () {
        return s.method();
    };
})(obj3);
obj3 = null;
fClosure(); // 7


/*
Ejercicio 10 — this en clases ES6 vs funciones constructoras

Tarea: Implementa una clase CounterClass y una función constructora CounterConstructor con el mismo API. Demuestra diferencias cuando se omite new.
Firma: class CounterClass {  } and function CounterConstructor() {  }
*/
class CounterClass {
    constructor() {
        this.count = 0;
    }
    inc() { this.count += 1; return this.count; }
}

function CounterConstructor() {
    if (!(this instanceof CounterConstructor)) {
        return new CounterConstructor();
    }
    this.count = 0;
}
CounterConstructor.prototype.inc = function() { this.count += 1; return this.count; };

const A = new CounterClass();
console.log(A.inc()); // 1

const B = new CounterConstructor();
console.log(B.inc()); // 1

try {
    const C = CounterClass();
} catch (e) {
    console.log('Error al invocar class sin new:', e.message);
}
const D = CounterConstructor(); 
console.log(D.inc());


/*
Ejercicio 11 — Arrow functions como métodos en objetos literales

Tarea: Crea un objeto con una propiedad arrow-method y otra función normal; compara this en ambos cuando se llaman desde el objeto y cuando se extraen a una variable.
Firma: const o = { a: () => this, b() { return this } }.
*/

const objectExample = {
    name: 'Obj',
    a: () => this, 
    b() { return this }
};

console.log("objectExample.a() === global this?", objectExample.a()); 
console.log("objectExample.b() === objectExample?", objectExample.b());

const aCopy = objectExample.a;
const bCopy = objectExample.b;
console.log('aCopy():', aCopy());
console.log('bCopy() without callsite:', bCopy());
console.log('bCopy.call({x:1}):', bCopy.call({x:1}));

/*
Ejercicio 12 — Rebinding con bind y creación de helpers

Tarea: Implementa const once = (fn, ctx) => { // devuelve wrapper que solo ejecuta fn una vez con ctx }. Asegúrate de que this dentro de fn sea ctx si se provee.
Firma: function once(fn, ctx) { }
*/

function once(fn, ctx) {
    let done = false;
    let result;
    return function(...args) {
        if (!done) {
        done = true;
        result = fn.apply(ctx, args);
        }
        return result;
    };
}

const objCtx = { x: 10 };
function add(a, b) { return this.x + a + b; }
const addOnce = once(add, objCtx);
console.log(addOnce(1,2));
console.log(addOnce(5,5));

/*
Ejercicio 13 — Currying que respeta this

Tarea: Implementa curryThis(fn) que permite currificar una función y que, al ejecutarse, respete el this del llamador. Ej: const c = curryThis(function(a,b){ return this.x + a + b }); objMethod = c(1); objMethod.call({x:10},2) → 13.
Firma: function curryThis(fn) { }
Pista: devuelve función parcialmente aplicada que usa apply con this.
*/

function curryThis(fn) {
    return function(...presetArgs) {
        return function(...laterArgs) {
        return fn.apply(this, [...presetArgs, ...laterArgs]);
        };
    };
}

const cd = curryThis(function(a, b){ return this.x + a + b; });
const objMethod = cd(1);
console.log(objMethod.call({x:10}, 2));


/*
Ejercicio 14 — Mixins y this

Tarea: Implementa mixin(target, source) que copie métodos del source al target.prototype preservando acceso a this del target (para clases). Muestra ejemplo con class A {} y const m = { greet() { return this.name } }.
Firma: function mixin(targetClass, source) { }
*/

function mixin(targetClass, source) {
    Object.keys(source).forEach(key => {
        if (typeof source[key] === 'function') {
        targetClass.prototype[key] = source[key];
        } else {
        Object.defineProperty(targetClass.prototype, key, {
            value: source[key],
            writable: true,
            configurable: true
        });
        }
    });
}

// Ejemplo
class Abc {
    constructor(name) { this.name = name; }
}
const m = {
    greet() { return `Hola ${this.name}`; }
};
mixin(A, m);
const abc = new Abc("Josue");
console.log(abc.greet());


/*
Ejercicio 15 — Evaluar this en strict vs non-strict mode

Tarea: Crea ejemplos donde this sea undefined en strict mode y window (o global) en non-strict. Explica impacto en funciones sueltas y en callbacks.
Firma: no aplica (ejemplo + explicación).
*/

// Non-strict (script global) -> `this` en función suelta es global (window en navegador)
function notStrict() {
    return this;
}
console.log('notStrict():', notStrict()); // window/global

// Strict mode:
function strictFunc() {
    'use strict';
    return this;
}
console.log('strictFunc():', strictFunc()); // undefined

const obj15 = {
    val: 1,
    getVal: function() {
        'use strict';
        return this.val;
    }
};
const f15 = obj15.getVal;
try {
    console.log(f15());
} catch(e) {
    console.log('Error al usar callback en strict mode:', e.message);
}


/*
Ejercicio 16 — this en eventos del DOM y addEventListener

Tarea: Crea un componente DOM (elemento button) con un handler que use this. Muestra la diferencia entre el.addEventListener('click', obj.method) y el.addEventListener('click', obj.method.bind(obj)).
Firma: no aplica (demo en DOM).
*/

//Esta en el HTML

/*
Ejercicio 17 — Variables y closures en loops asíncronos avanzados

Tarea: Implementa asyncMap(arr, asyncFn) que itera arr, ejecuta asyncFn con índice y valor, y devuelve resultados en orden correcto. Demuestra problemas si no se captura bien i.
Firma: async function asyncMap(arr, asyncFn) { }
*/

async function asyncMap(arr, asyncFn) {
    const promises = arr.map((v, i) =>
        Promise.resolve().then(() => asyncFn(v, i))
    );
    return Promise.all(promises);
}

async function asyncDouble(v, i) {
  await new Promise((r) => setTimeout(r, Math.random() * 50));
  return { i, v: v * 2 };
}

(async () => {
    const res = await asyncMap([1, 2, 3, 4], asyncDouble);
    console.log(res);
})();

/*
Ejercicio 18 — Shadowing y comportamiento de variables en scopes anidados

Tarea: Escribe ejemplo con variable x en scope global, función A declara let x, función B interna declara var x y modifica; muestra cómo cambia y por qué. Explica hoisting y shadowing.
Firma: no aplica (ejemplo + explicación).
*/

let x = 'global';
function A18() {
    let x = 'A';
    function B() {
        var x = 'B';
        x = 'B-modified';
        console.log('Dentro B:', x);
    }
    B();
    console.log('Dentro A18:', x);
}
A18();
console.log('Global:', x);

/*
Ejercicio 19 — Transformar métodos que usan this para ser puramente funcionales

Tarea: Dado un objeto con métodos que mutan estado usando this, escribe una función toPure(obj) que genere nuevas funciones puras (no mutan, reciben el estado y devuelven nuevo estado). Ejemplo: { inc() { this.count++ } } → inc(state) => newState.
Firma: function toPure(obj) { }
Pista: usa Object.entries, function.prototype.toString() solo si quieres; una implementación práctica puede requerir reescribir manualmente.
*/

function toPure(obj) {
    const pure = {};
    Object.entries(obj).forEach(([k, v]) => {
        if (typeof v === 'function') {
        pure[k] = function(state, ...args) {
            const clone = Array.isArray(state) ? state.slice() : { ...state };
            v.apply(clone, args);
            return clone;
        };
        }
    });
    return pure;
}

const mutating = {
    inc() { this.count = (this.count || 0) + 1; },
    add(n) { this.count = (this.count || 0) + n; }
};
const pure = toPure(mutating);
const s0 = { count: 1 };
const s1 = pure.inc(s0);
console.log(s0, s1);

/*
Ejercicio 20 — Debug avanzado: identificar por qué this es undefined en un proyecto real

Tarea: Te doy un snippet con fallo; debes localizar el porqué this es undefined y proponer 3 soluciones viables (bind, arrow, closure).
Snippet (ejemplo):

class API {
    constructor() { this.token = 'abc' }
    request() { return fetch('/x', { headers: { Authorization: this.token } }) }
}
const api = new API();
setTimeout(api.request, 1000); // falla: this.token undefined
*/

class API {
    constructor() {
        this.token = "abc";
        this.request = this.request.bind(this);
    }
    request() {
        return fetch("/x", { headers: { Authorization: this.token } });
    }
}

const api = new API();
setTimeout(api.request, 1000);