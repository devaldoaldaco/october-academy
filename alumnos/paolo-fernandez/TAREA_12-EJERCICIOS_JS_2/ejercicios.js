/**
const user = {
  id: 101,
  name: "Aldo",
  age: 34,
  address: { city: "CDMX", zip: "01120" },
  roles: ["dev", "lead"],
  stats: { commits: 120, reviews: 45 },
  getLabel() { return `${this.name} (${this.id})`; }
};

function Logger(prefix) {
  this.prefix = prefix;
}

Logger.prototype.log = function(msg) { console.log(this.prefix + msg); };

Ejercicio 1 — this en métodos vs funciones sueltas

Tarea: Explica y demuestra con código qué valor tiene this cuando llamas user.getLabel() vs const f = user.getLabel; f();.
Firma sugerida: no aplica (ejercicio explicativo).
Pista: muestra cómo usar bind para que f() conserve this.

Ejercicio 2 — Arrow function y this

Tarea: Crea un objeto con un método que dentro use un setTimeout para incrementar un contador en this. Implementa dos versiones: una con function y otra con =>. Muestra por qué una necesita bind o self = this.
Firma: function createTimerObj() { } devuelve objeto con método start().

Ejercicio 3 — Diferencia hoisting: function declaration vs function expression

Tarea: Escribe un ejemplo que llame a una función antes de declararla usando function foo(){} y otro con const bar = function(){}; explica diferencias de hoisting.
Firma: no aplica (ejemplo + explicación).

Ejercicio 4 — call, apply, bind en práctica

Tarea: Implementa invokeWithContext(fn, ctx, argsArray) que llame fn con ctx usando call, apply o bind según corresponda; demuestra con user.getLabel y con Logger.prototype.log.
Firma: function invokeWithContext(fn, ctx, argsArray) {  }

Ejercicio 5 — Paradoja de this con arrow methods en prototypes

Tarea: Añade un método arrow a Logger.prototype y compara comportamiento con método normal al instanciar new Logger('> '). Explica por qué no funciona como se espera.
Firma: no aplica (ejemplo + explicación).

Ejercicio 6 — Encadenamiento y this en métodos encadenables

Tarea: Implementa Chainable que permita Chainable().step1().step2().value() usando this correctamente.
Firma: function Chainable(initial) { }
Pista: cada método debe retornar this excepto value().

Ejercicio 7 — Closure + this

Tarea: Crea createCounter(obj) que añade a obj dos métodos inc() y get() que compartan un contador privado. Asegura que el contador no pueda modificarse desde afuera y que this siga apuntando al objeto cuando se usa obj.inc() como callback.
Firma: function createCounter(obj) { }

Ejercicio 8 — Variables: var, let, const y bucles

Tarea: Explica y demuestra con código por qué usar var en un for con setTimeout produce valores inesperados, y corrige usando let.
Firma: no aplica (ejemplo + corrección).

Ejercicio 9 — Método que pierde this cuando se destruye el objeto

Tarea: Dado const f = obj.method; obj = null; f() — muestra comportamiento y solución (por ejemplo bind o usar closure para capturar referencias).
Firma: no aplica (ejemplo + solución).

Ejercicio 10 — this en clases ES6 vs funciones constructoras

Tarea: Implementa una clase CounterClass y una función constructora CounterConstructor con el mismo API. Demuestra diferencias cuando se omite new.
Firma: class CounterClass {  } and function CounterConstructor() {  }

Ejercicio 11 — Arrow functions como métodos en objetos literales

Tarea: Crea un objeto con una propiedad arrow-method y otra función normal; compara this en ambos cuando se llaman desde el objeto y cuando se extraen a una variable.
Firma: const o = { a: () => this, b() { return this } }.

Ejercicio 12 — Rebinding con bind y creación de helpers

Tarea: Implementa const once = (fn, ctx) => { // devuelve wrapper que solo ejecuta fn una vez con ctx }. Asegúrate de que this dentro de fn sea ctx si se provee.
Firma: function once(fn, ctx) { }

Ejercicio 13 — Currying que respeta this

Tarea: Implementa curryThis(fn) que permite currificar una función y que, al ejecutarse, respete el this del llamador. Ej: const c = curryThis(function(a,b){ return this.x + a + b }); objMethod = c(1); objMethod.call({x:10},2) → 13.
Firma: function curryThis(fn) { }
Pista: devuelve función parcialmente aplicada que usa apply con this.

Ejercicio 14 — Mixins y this

Tarea: Implementa mixin(target, source) que copie métodos del source al target.prototype preservando acceso a this del target (para clases). Muestra ejemplo con class A {} y const m = { greet() { return this.name } }.
Firma: function mixin(targetClass, source) { }

Ejercicio 15 — Evaluar this en strict vs non-strict mode

Tarea: Crea ejemplos donde this sea undefined en strict mode y window (o global) en non-strict. Explica impacto en funciones sueltas y en callbacks.
Firma: no aplica (ejemplo + explicación).

Ejercicio 16 — this en eventos del DOM y addEventListener

Tarea: Crea un componente DOM (elemento button) con un handler que use this. Muestra la diferencia entre el.addEventListener('click', obj.method) y el.addEventListener('click', obj.method.bind(obj)).
Firma: no aplica (demo en DOM).

Ejercicio 17 — Variables y closures en loops asíncronos avanzados

Tarea: Implementa asyncMap(arr, asyncFn) que itera arr, ejecuta asyncFn con índice y valor, y devuelve resultados en orden correcto. Demuestra problemas si no se captura bien i.
Firma: async function asyncMap(arr, asyncFn) { }

Ejercicio 18 — Shadowing y comportamiento de variables en scopes anidados

Tarea: Escribe ejemplo con variable x en scope global, función A declara let x, función B interna declara var x y modifica; muestra cómo cambia y por qué. Explica hoisting y shadowing.
Firma: no aplica (ejemplo + explicación).

Ejercicio 19 — Transformar métodos que usan this para ser puramente funcionales

Tarea: Dado un objeto con métodos que mutan estado usando this, escribe una función toPure(obj) que genere nuevas funciones puras (no mutan, reciben el estado y devuelven nuevo estado). Ejemplo: { inc() { this.count++ } } → inc(state) => newState.
Firma: function toPure(obj) { }
Pista: usa Object.entries, function.prototype.toString() solo si quieres; una implementación práctica puede requerir reescribir manualmente.

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