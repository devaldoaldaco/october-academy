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
  // función constructora
  this.prefix = prefix;
}

Logger.prototype.log = function (msg) {
  console.log(this.prefix + msg);
};

// ! Ejercicio 1 — this en métodos vs funciones sueltas

// Tarea: Explica y demuestra con código qué valor tiene this cuando llamas user.getLabel() vs const f = user.getLabel; f();.
// Firma sugerida: no aplica (ejercicio explicativo).
// Pista: muestra cómo usar bind para que f() conserve this.

console.log(user.getLabel()); // Aldo (101)

// * this = user cuando se llama como método del objeto

const f = user.getLabel; // ? copiando la referencia a la función, pero no su contexto (this)
console.log(f()); // undefined

// * this = undefined (o window en non-strict) cuando se llama como función suelta

const fb = user.getLabel.bind(user); // ? bind crea una nueva función con this fijo a user
console.log(fb()); // Aldo (101)

// * Usar bind permite que f() conserve el contexto original de user

// ! Ejercicio 2 — Arrow function y this

// Tarea: Crea un objeto con un método que dentro use un setTimeout para incrementar un contador en this. Implementa dos versiones: una con function y otra con =>. Muestra por qué una necesita bind o self = this.
// Firma: function createTimerObj() { } devuelve objeto con método start().

function createTimerObj() {
  return {
    count: 0,
    start: function () {
      console.log("Iniciando contador...");

      // Si usamos function sin bind, this no apunta al objeto
      setTimeout(function () {
        // ! genera su propio contexto y pierde el this del objeto
        this.count++;
        console.log("Contador:", this.count);
      }, 1000);
    },

    startArrow: function () {
      console.log("Iniciando contador...");
      setTimeout(() => {
        // ? las arrow functions no generan su propio this, usan el del contexto padre
        this.count++;
        console.log("Contador:", this.count);
      }, 1000);
    },

    starWithBind: function () {
      console.log("Iniciando contador...");
      setTimeout(
        function () {
          this.count++;
          console.log("Contador:", this.count);
        }.bind(this),
        1000
      ); // ? bind fija el this correcto
    },

    startWithSelf: function () {
      console.log("Iniciando contador...");
      const self = this; // ? self captura el this correcto
      setTimeout(function () {
        self.count++;
        console.log("Contador:", self.count);
      }, 1000);
    },
  };
}

const timer1 = createTimerObj();
timer1.start(); // NaN, porque this.count es undefined
timer1.startArrow(); // Contador: 1, this apunta al objeto timer1
timer1.starWithBind(); // Contador: 2, this apunta al objeto timer1
timer1.startWithSelf(); // Contador: 3, self apunta al objeto timer1

// ! Ejercicio 3 — Diferencia hoisting: function declaration vs function expression

// Tarea: Escribe un ejemplo que llame a una función antes de declararla usando function foo(){} y otro con const bar = function(){}; explica diferencias de hoisting.
// Firma: no aplica (ejemplo + explicación).

// ? Hoisting = registro anticipado de declaraciones durante la fase de compilación.

foo(); // Funciona gracias al hoisting
function foo() {
  console.log("Ejecutando foo correctamente (hoisting funciona)");
}

// bar(); // ! ReferenceError: bar is not defined
const bar = function () {
  console.log("Ejecutando bar");
}; // Error: bar is not defined

// ! Ejercicio 4 — call, apply, bind en práctica

// Tarea: Implementa invokeWithContext(fn, ctx, argsArray) que llame fn con ctx usando call, apply o bind según corresponda; demuestra con user.getLabel y con Logger.prototype.log.
// Firma: function invokeWithContext(fn, ctx, argsArray) {  }

// ? usando apply

function invokeWithContextApply(fn, ctx, argsArray) {
  return fn.apply(ctx, argsArray);
}

console.log(invokeWithContextApply(user.getLabel, user, []));

const logger = new Logger("[INFO] ");
invokeWithContextApply(logger.log, logger, ["Sistema iniciado"]);

// ? usando call
function invokeWithContextCall(fn, ctx, argsArray) {
  return fn.call(ctx, ...argsArray);
}
invokeWithContextCall(logger.log, logger, ["Sistema iniciado"]);

// ? usando bind
function invokeWithContextBind(fn, ctx, argsArray) {
  const boundFn = fn.bind(ctx); // bind no ejecuta solo devuelve función
  return boundFn(...argsArray);
}

// ! Ejercicio 5 — Paradoja de this con arrow methods en prototypes

// Tarea: Añade un método arrow a Logger.prototype y compara comportamiento con método normal al instanciar new Logger('> '). Explica por qué no funciona como se espera.
// Firma: no aplica (ejemplo + explicación).

Logger.prototype.logNormal = function (msg) {
  console.log(this.prefix + msg);
};

Logger.prototype.logArrow = (msg) => {
  console.log(this.prefix + msg); // this no apunta a la instancia
};

logger.logNormal("Normal funciona correctamente");
logger.logArrow(" Arrow falla inesperadamente");

// ! Ejercicio 6 — Encadenamiento y this en métodos encadenables

// Tarea: Implementa Chainable que permita Chainable().step1().step2().value() usando this correctamente.
// Firma: function Chainable(initial) { }
// Pista: cada método debe retornar this excepto value().

function Chainable(initial = 0) {
  this.valueInternal = initial;

  this.step1 = function () {
    this.valueInternal += 1;
    return this; // permite encadenar
  };

  this.step2 = function () {
    this.valueInternal *= 2;
    return this; // permite encadenar
  };
  this.value = function () {
    return this.valueInternal;
  };
}

const chain = new Chainable(5);
const result = chain.step1().step2().value(); // (5 + 1) * 2 = 12
console.log(result); // 12

// ! Ejercicio 7 — Closure + this

// Tarea: Crea createCounter(obj) que añade a obj dos métodos inc() y get() que compartan un contador privado. Asegura que el contador no pueda modificarse desde afuera y que this siga apuntando al objeto cuando se usa obj.inc() como callback.
// Firma: function createCounter(obj) { }

function createCounter(obj) {
  let count = 0;

  obj.inc = function () {
    count++;
    return this;
  }.bind(obj);

  obj.get = function () {
    return count;
  }.bind(obj);

  return obj;
}

console.log("=== Ejercicio 7 ===");
const counter = createCounter({ name: "MiContador" });
counter.inc().inc();
console.log("Contador:", counter.get()); // 2

// Como callback mantiene el this correcto
const callback = counter.inc;
callback();
console.log("Despues de callback:", counter.get()); // 3

// ! Ejercicio 8 — Variables: var, let, const y bucles

// Tarea: Explica y demuestra con código por qué usar var en un for con setTimeout produce valores inesperados, y corrige usando let.
// Firma: no aplica (ejemplo + corrección).

console.log("=== Ejercicio 8 ===");
console.log("Problema con var:");
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var i:", i), 10);
}

// Da Imprime: 3, 3, 3, todas comparten la misma i

setTimeout(() => {
  console.log("\nSolucion con let:");
  for (let j = 0; j < 3; j++) {
    setTimeout(() => console.log("let j:", j), 10);
  }
  // Imprime: 0, 1, 2 (cada iteracion tiene su propia j)
}, 100);

// ! Ejercicio 9 — Método que pierde this cuando se destruye el objeto

// Tarea: Dado const f = obj.method; obj = null; f() — muestra comportamiento y solución (por ejemplo bind o usar closure para capturar referencias).
// Firma: no aplica (ejemplo + solución).

console.log("\n=== Ejercicio 9 ===");
let persona = {
  nombre: "Carlos",
  saludar() {
    console.log(`Hola, soy ${this.nombre}`);
  },
};

console.log("Llamada normal:");
persona.saludar(); // Funciona

console.log("Metodo extraido (problema):");
const funcionSuelta = persona.saludar;
// funcionSuelta(); // Error: this.nombre undefined

// Solucion 1: bind
const saludarBound = persona.saludar.bind(persona);
console.log("Con bind:");
saludarBound(); // Funciona

// Solucion 2: arrow wrapper
const saludarWrapper = () => persona.saludar();
console.log("Con wrapper:");
saludarWrapper(); // Funciona

// Solucion 3: closure que captura datos
function crearSaludador(obj) {
  const nombreCapturado = obj.nombre;
  return function () {
    console.log(`Hola, soy ${nombreCapturado}`);
  };
}
const saludarClosure = crearSaludador(persona);
persona = null; // Incluso si destruimos el objeto
console.log("Con closure:");
saludarClosure(); // Funciona

// ! Ejercicio 10 — this en clases ES6 vs funciones constructoras

// Tarea: Implementa una clase CounterClass y una función constructora CounterConstructor con el mismo API. Demuestra diferencias cuando se omite new.
// Firma: class CounterClass {  } and function CounterConstructor() {  }

class ContadorClase {
  constructor() {
    this.valor = 0;
  }

  incrementar() {
    this.valor++;
  }

  obtener() {
    return this.valor;
  }
}

function ContadorConstructor() {
  this.valor = 0;

  this.incrementar = function () {
    this.valor++;
  };

  this.obtener = function () {
    return this.valor;
  };
}

console.log("\n=== Ejercicio 10 ===");
const c1 = new ContadorClase();
c1.incrementar();
console.log("Clase con new:", c1.obtener()); // 1

// Clase sin new: ERROR
try {
  const c2 = ContadorClase(); // TypeError
} catch (e) {
  console.log("Clase sin new:", e.message);
}

const c3 = new ContadorConstructor();
c3.incrementar();
console.log("Constructor con new:", c3.obtener()); // 1

// Constructor sin new: crea propiedades globales (peligroso)
console.log("Constructor sin new: crea variables globales (no recomendado)");

// ! Ejercicio 11 — Arrow functions como métodos en objetos literales

// Tarea: Crea un objeto con una propiedad arrow-method y otra función normal; compara this en ambos cuando se llaman desde el objeto y cuando se extraen a una variable.
// Firma: const o = { a: () => this, b() { return this } }.

console.log("\n=== Ejercicio 11 ===");
const objeto = {
  nombre: "Objeto",
  arrowMethod: () => {
    return this; // this del scope superior (window/global)
  },
  normalMethod() {
    return this; // this del objeto
  },
};

console.log("Arrow this === objeto:", objeto.arrowMethod() === objeto); // false
console.log("Normal this === objeto:", objeto.normalMethod() === objeto); // true

const arrowExtraida = objeto.arrowMethod;
const normalExtraida = objeto.normalMethod;

console.log(
  "Arrow extraida (mismo this):",
  arrowExtraida() === objeto.arrowMethod()
);
console.log("Normal extraida (pierde this):", normalExtraida() === objeto); // false

// ! Ejercicio 12 — Rebinding con bind y creación de helpers

// Tarea: Implementa const once = (fn, ctx) => { // devuelve wrapper que solo ejecuta fn una vez con ctx }. Asegúrate de que this dentro de fn sea ctx si se provee.
// Firma: function once(fn, ctx) { }

function once(fn, ctx) {
  let ejecutada = false;
  let resultado;

  return function (...args) {
    if (!ejecutada) {
      const contexto = ctx !== undefined ? ctx : this;
      resultado = fn.apply(contexto, args);
      ejecutada = true;
    }
    return resultado;
  };
}

console.log("=== Ejercicio 12 ===");
const obj = {
  valor: 10,
  calcular(x) {
    console.log("Calculando...");
    return this.valor + x;
  },
};

const calcularUnaVez = once(obj.calcular, obj);
console.log("Primera llamada:", calcularUnaVez(5)); // 15
console.log("Segunda llamada:", calcularUnaVez(100)); // 15 (no ejecuta)

// ! Ejercicio 13 — Currying que respeta this

// Tarea: Implementa curryThis(fn) que permite currificar una función y que, al ejecutarse, respete el this del llamador. Ej: const c = curryThis(function(a,b){ return this.x + a + b }); objMethod = c(1); objMethod.call({x:10},2) → 13.
// Firma: function curryThis(fn) { }
// Pista: devuelve función parcialmente aplicada que usa apply con this.

function curryThis(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    return function (...nextArgs) {
      return curried.apply(this, [...args, ...nextArgs]);
    };
  };
}

console.log("\n=== Ejercicio 13 ===");
const sumarConThis = curryThis(function (a, b) {
  return this.x + a + b;
});

const sumarParcial = sumarConThis(1);
const resultado = sumarParcial.call({ x: 10 }, 2);
console.log("Resultado curry con this:", resultado); // 13

// ! Ejercicio 14 — Mixins y this

// Tarea: Implementa mixin(target, source) que copie métodos del source al target.prototype preservando acceso a this del target (para clases). Muestra ejemplo con class A {} y const m = { greet() { return this.name } }.
// Firma: function mixin(targetClass, source) { }

function mixin(targetClass, source) {
  Object.keys(source).forEach((key) => {
    if (typeof source[key] === "function") {
      targetClass.prototype[key] = source[key];
    }
  });
}

class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

const saludableMixin = {
  saludar() {
    return `Hola, soy ${this.nombre}`;
  },
  despedir() {
    return `Adios, firmado ${this.nombre}`;
  },
};

console.log("\n=== Ejercicio 14 ===");
mixin(Persona, saludableMixin);
const p = new Persona("Ana");
console.log(p.saludar()); // Hola, soy Ana
console.log(p.despedir()); // Adios, firmado Ana

// ! Ejercicio 15 — Evaluar this en strict vs non-strict mode

// Tarea: Crea ejemplos donde this sea undefined en strict mode y window (o global) en non-strict. Explica impacto en funciones sueltas y en callbacks.
// Firma: no aplica (ejemplo + explicación).

console.log("=== Ejercicio 15 ===");

// Non-strict (default en muchos contextos)
function noStrictFunction() {
  console.log("Non-strict this:", typeof this); // object (window/global)
}
noStrictFunction();

// Strict mode
(function () {
  "use strict";
  function strictFunction() {
    console.log("Strict this:", this); // undefined
  }
  strictFunction();
})();

// Impacto en callbacks
const objetoCallback = {
  nombre: "Test",
  metodo() {
    "use strict";
    console.log("Callback strict this:", this);
  },
};

setTimeout(objetoCallback.metodo, 100); // undefined en strict
setTimeout(() => objetoCallback.metodo(), 150); // funciona (arrow mantiene contexto)

// ! Ejercicio 16 — this en eventos del DOM y addEventListener

// Tarea: Crea un componente DOM (elemento button) con un handler que use this. Muestra la diferencia entre el.addEventListener('click', obj.method) y el.addEventListener('click', obj.method.bind(obj)).
// Firma: no aplica (demo en DOM).

console.log("\n=== Ejercicio 16 ===");
console.log("(Ver en navegador para DOM)");

const componenteDOM = {
  contador: 0,

  handleClickMalo(e) {
    this.contador++; // this seria el button, no componenteDOM
    console.log("Contador:", this.contador); // NaN
  },

  handleClickBueno(e) {
    this.contador++;
    console.log("Contador:", this.contador);
  },
};

// Simulacion (en navegador seria: button.addEventListener...)
const simularClick = (handler, contexto) => {
  const elementoFalso = { id: "button" };
  handler.call(elementoFalso, { target: elementoFalso });
};

console.log("Sin bind (this es elemento):");
simularClick(componenteDOM.handleClickMalo, componenteDOM);

console.log("Con bind (this es componente):");
const handlerBound = componenteDOM.handleClickBueno.bind(componenteDOM);
simularClick(handlerBound, componenteDOM);

// ! Ejercicio 17 — Variables y closures en loops asíncronos avanzados

// Tarea: Implementa asyncMap(arr, asyncFn) que itera arr, ejecuta asyncFn con índice y valor, y devuelve resultados en orden correcto. Demuestra problemas si no se captura bien i.
// Firma: async function asyncMap(arr, asyncFn) { }

async function asyncMap(arr, asyncFn) {
  const resultados = [];

  for (let i = 0; i < arr.length; i++) {
    // let crea nuevo scope por iteracion
    const resultado = await asyncFn(arr[i], i);
    resultados.push(resultado);
  }

  return resultados;
}

console.log("\n=== Ejercicio 17 ===");
(async () => {
  const nums = [1, 2, 3];
  const res = await asyncMap(nums, async (val, idx) => {
    await new Promise((r) => setTimeout(r, Math.random() * 50));
    return `Pos ${idx}: ${val * 2}`;
  });
  console.log("AsyncMap resultado:", res);
})();

// ! Ejercicio 18 — Shadowing y comportamiento de variables en scopes anidados

// Tarea: Escribe ejemplo con variable x en scope global, función A declara let x, función B interna declara var x y modifica; muestra cómo cambia y por qué. Explica hoisting y shadowing.
// Firma: no aplica (ejemplo + explicación).

console.log("\n=== Ejercicio 18 ===");
let x = "global";

function funcionA() {
  let x = "A"; // shadowing: oculta la x global
  console.log("En A:", x);

  function funcionB() {
    var x = "B"; // shadowing: oculta la x de A
    console.log("En B antes:", x);
    x = "B modificado";
    console.log("En B despues:", x);
  }

  funcionB();
  console.log("En A despues de B:", x); // sigue siendo 'A'
}

funcionA();
console.log("Global despues:", x); // sigue siendo 'global'

// ! Ejercicio 19 — Transformar métodos que usan this para ser puramente funcionales

// Tarea: Dado un objeto con métodos que mutan estado usando this, escribe una función toPure(obj) que genere nuevas funciones puras (no mutan, reciben el estado y devuelven nuevo estado). Ejemplo: { inc() { this.count++ } } → inc(state) => newState.
// Firma: function toPure(obj) { }
// Pista: usa Object.entries, function.prototype.toString() solo si quieres; una implementación práctica puede requerir reescribir manualmente.

function toPure(obj) {
  const puras = {};

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "function") {
      puras[key] = function (estado, ...args) {
        const temp = { ...estado };
        const boundMethod = obj[key].bind(temp);
        boundMethod(...args);
        return temp;
      };
    }
  });

  return puras;
}

console.log("\n=== Ejercicio 19 ===");
const contadorImpuro = {
  incrementar() {
    this.count = (this.count || 0) + 1;
  },
  decrementar() {
    this.count = (this.count || 0) - 1;
  },
};

const contadorPuro = toPure(contadorImpuro);
let estado = { count: 0 };

estado = contadorPuro.incrementar(estado);
estado = contadorPuro.incrementar(estado);
console.log("Estado despues de incrementar:", estado); // { count: 2 }

const nuevoEstado = contadorPuro.decrementar(estado);
console.log("Estado original:", estado); // { count: 2 } (inmutable)
console.log("Nuevo estado:", nuevoEstado); // { count: 1 }

// ! Ejercicio 20 — Debug avanzado: identificar por qué this es undefined en un proyecto real

// Tarea: Te doy un snippet con fallo; debes localizar el porqué this es undefined y proponer 3 soluciones viables (bind, arrow, closure).
// Snippet (ejemplo):

// class API {
//   constructor() { this.token = 'abc' }
//   request() { return fetch('/x', { headers: { Authorization: this.token } }) }
// }
// const api = new API();
// setTimeout(api.request, 1000); // falla: this.token undefined

console.log("\n=== Ejercicio 20 ===");

class API {
  constructor() {
    this.token = "abc123";
  }

  request() {
    console.log("Token:", this.token);
    // return fetch('/x', { headers: { Authorization: this.token } })
  }
}

const api = new API();

console.log("Problema: setTimeout pierde this");
// setTimeout(api.request, 100); // this.token seria undefined

console.log("\nSolucion 1: bind");
setTimeout(api.request.bind(api), 100);

console.log("Solucion 2: arrow function");
setTimeout(() => api.request(), 200);

console.log("Solucion 3: metodo arrow en la clase");
class APIFixed {
  constructor() {
    this.token = "xyz789";
    this.request = () => {
      console.log("Token (arrow):", this.token);
    };
  }
}

const apiFixed = new APIFixed();
setTimeout(apiFixed.request, 300); // funciona!