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

// Ejercicio 1 — this en métodos vs funciones sueltas

// Tarea: Explica y demuestra con código qué valor tiene this cuando llamas user.getLabel() vs const f = user.getLabel; f();.
// Firma sugerida: no aplica (ejercicio explicativo).
// Pista: muestra cómo usar bind para que f() conserve this.

//tiene como this el mismo objeto user, ya que es quien invoca la funcion
console.log(user.getLabel());

//tiene como this window
const f = user.getLabel;
console.log(f());

//ASIGNAMOS USER PARA CONSERVAR EL MISMO THIS CON BIND
const fv2 = f.bind(user, true);
console.log(fv2());

// Ejercicio 2 — Arrow function y this

// Tarea: Crea un objeto con un método que dentro use un setTimeout para incrementar un contador en this. Implementa dos versiones: una con function y otra con =>. Muestra por qué una necesita bind o self = this.
// Firma: function createTimerObj() { } devuelve objeto con método start().

function createTimerObj() {
  const obj = {
    counter: 0,
    startArrow: null,
    startFn: null,
    report: function () {
      console.log(`[Timer] Contador actual: ${this.counter}`);
    },
  };

  const self = obj;

  obj.startArrow = () => {
    setTimeout(() => {
      self.counter++;
      self.report();
    }, 200);
  };

  obj.startFn = function () {
    setTimeout(() => {
      self.counter++;
      self.report();
    }, 200);
  };

  return obj;
}

const timerObjArrow = createTimerObj();

timerObjArrow.startArrow();
setTimeout(() => {
  console.log("Resultado Arrow: ", timerObjArrow.counter);
}, 200);

const timerObjFn = createTimerObj();
timerObjFn.startFn();
setTimeout(() => {
  console.log("Resultado FN: ", timerObjFn.counter);
});

const objectTimeOut = {
  counter: 0,
  start: function createTimerObj() {
    console.log(this);
    setTimeout(() => {
      this.counter++;
    }, 200);
  },
};

// Ejercicio 3 — Diferencia hoisting: function declaration vs function expression

// Tarea: Escribe un ejemplo que llame a una función antes de declararla usando function foo(){} y otro con const bar = function(){}; explica diferencias de hoisting.
// Firma: no aplica (ejemplo + explicación).

console.log(foo());
// console.log(bar());

function foo() {
  console.log("foo");
}

const bar = function () {
  console.log("foo bar");
};

/*El hoisting es el comportamiento de JavaScript que mueve declaraciones de variables tipo var o funciones que usan la palabra reservada function a la parte superior del scope, por lo que la function foo() pese a haberla llamado antes de su creacion no hubo problema en la ejecucion. Sin embargo bar al estar definido con const se eleva pero la funcion no se inicializa.*/

// Ejercicio 4 — call, apply, bind en práctica

// Tarea: Implementa invokeWithContext(fn, ctx, argsArray) que llame fn con ctx usando call, apply o bind según corresponda; demuestra con user.getLabel y con Logger.prototype.log.
// Firma: function invokeWithContext(fn, ctx, argsArray) {  }

function invokeWithContext(fn, ctx, argsArray, type) {
  if (type == "apply") {
    return fn.apply(ctx, argsArray);
  } else if (type == "call") {
    return fn.call(ctx, ...argsArray);
  } else if (type == "bind") {
    return fn.bind(ctx, ...argsArray);
  }
}

function getLabel(prefix, suffix) {
  return `${prefix}: ${this.name} (${this.age} años)${suffix}`;
}

const args1 = ["Usuario", " -> FIN"];

// Llamada: Establece 'user' como el 'this' de getLabel
const result1 = invokeWithContext(getLabel, user, args1, "apply");

console.log(`Resultado apply: ${result1}`);

const result2 = invokeWithContext(getLabel, user, args1, "call");
console.log(`Resultado call: ${result2}`);

const result3 = invokeWithContext(getLabel, user, args1, "bind");
console.log(`Resultado bin: ${result3}`);
const finalResult3 = result3();

console.log(`Paso 2: Resultado BIND (ejecutado): ${finalResult3}`);

// Ejercicio 5 — Paradoja de this con arrow methods en prototypes

// Tarea: Añade un método arrow a Logger.prototype y compara comportamiento con método normal al instanciar new Logger('> '). Explica por qué no funciona como se espera.
// Firma: no aplica (ejemplo + explicación).

// function Logger(prefix) {
//   this.prefix = prefix;
// }

// Logger.prototype.log = function (msg) {
//   console.log(this.prefix + msg);
// };
Logger.prototype.arrowLog = (msg) => {
  // 'this' NO es la instancia.
  // 'this' es el ámbito global (window o undefined/{} en estricto).
  console.log(this.prefix + msg);
};

const myLogger = new Logger("> ");
myLogger.arrowLog("Mensaje de prueba.");
myLogger.log("mensaje bien");

// Ejercicio 6 — Encadenamiento y this en métodos encadenables

// Tarea: Implementa Chainable que permita Chainable().step1().step2().value() usando this correctamente.
// Firma: function Chainable(initial) { }
// Pista: cada método debe retornar this excepto value().

function Chainable(initial) {
  this.currentValue = initial || 0;
  return this;
}
Chainable.prototype.step1 = function () {
  this.currentValue += 10;
  return this;
};

Chainable.prototype.step2 = function () {
  this.currentValue *= 2;
  return this;
};

Chainable.prototype.value = function () {
  return this.currentValue;
};

console.log(new Chainable(5).step1().step2().value());

// Ejercicio 7 — Closure + this

// Tarea: Crea createCounter(obj) que añade a obj dos métodos inc() y get() que compartan un contador privado. Asegura que el contador no pueda modificarse desde afuera y que this siga apuntando al objeto cuando se usa obj.inc() como callback.
// Firma: function createCounter(obj) { }

function createCounter(obj) {
  let _count = 0;
  obj.inc = function () {
    _count++;
  };

  obj.get = function () {
    return _count;
  };
}
const myObject = {
  id: "MyCounter",
};

createCounter(myObject);

console.log(`Falla por acceso privado: ${myObject._count}`);
myObject.inc();
myObject.inc();
console.log(`Valor actual: ${myObject.get()}`);

// Ejercicio 8 — Variables: var, let, const y bucles

// Tarea: Explica y demuestra con código por qué usar var en un for con setTimeout produce valores inesperados, y corrige usando let.
// Firma: no aplica (ejemplo + corrección).

console.log("USANDO VAR");
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log("var i:", i);
  }, 1000);
}

console.log("USANDO LET");
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log("let i:", i);
  }, 1000);
}

/*El error es que solamente se crea un var, y antes de que terminen las operaciones nuestro i ya llego a 5, entonces se imprime puros 5, caso contrario con let que se crea por cada iteracion*/

// Ejercicio 9 — Método que pierde this cuando se destruye el objeto

// Tarea: Dado const f = obj.method; obj = null; f() — muestra comportamiento y solución (por ejemplo bind o usar closure para capturar referencias).
// Firma: no aplica (ejemplo + solución).

let myObject9 = {
  value: 5,
  getValue: function () {
    return this.value;
  },
};

const f9 = myObject9.getValue;
myObject9 = null;

console.log("Valor esperado: 5");
try {
  const result = f9();
  console.log("Resultado de f(): " + result);
} catch (error) {
  console.log("Error de contexto: " + error.message);
}

myObject9 = {
  value: 5,
  getValue: function () {
    return this.value;
  },
};

const f9v2 = myObject9.getValue.bind(myObject9, true);
console.log("Valor esperado: 5");
try {
  const result = f9v2();
  console.log("Resultado de f(): " + result);
} catch (error) {
  console.log("Error de contexto: " + error.message);
}

// Ejercicio 10 — this en clases ES6 vs funciones constructoras

// Tarea: Implementa una clase CounterClass y una función constructora CounterConstructor con el mismo API. Demuestra diferencias cuando se omite new.
// Firma: class CounterClass {  } and function CounterConstructor() {  }
class CounterClass {
  constructor() {
    this.count = 0;
  }
}

function CounterConstructor() {
  this.count = 0;
}

const classInstance = new CounterClass();
const constructorInstance = new CounterConstructor();
console.log(`Clase (new): ${classInstance}`);

try {
  const classInstanceNotNew = CounterClass();
} catch (e) {
  console.log("Class Instance sin NEW:", e);
}
console.log(`Constructor (new): ${constructorInstance.count}`);
try {
  const constructorInstanceNotNew = CounterConstructor();
  console.log(`Constructor (not new): ${constructorInstanceNotNew}`);
} catch (e) {
  console.log("Constructor Instance sin NEW:", e);
}
//AL NO USAR EL NEW DA ERROR PORQUE NO SE PUEDE CREAR ASI LA CLASE, EN LA FUNCION CONSTRUCTORA USA EL SCOPE GLOBAL POR LO QUE AL TRATA DE ACCEDER A EL NOS DEVUELVE UNDEFINED

// Ejercicio 11 — Arrow functions como métodos en objetos literales

// Tarea: Crea un objeto con una propiedad arrow-method y otra función normal; compara this en ambos cuando se llaman desde el objeto y cuando se extraen a una variable.
// Firma: const o = { a: () => this, b() { return this } }.

const o = {
  a: () => this,
  b() {
    return this;
  },
};

console.log("o.a():", o.a()); //Tiene como contexto el scope global
console.log("o.b():", o.b()); //Tiene como contexto la instancia de o

const obj11a = o.a;

const obj11b = o.b;

console.log("obj11a:", obj11a());
console.log("obj11b:", obj11b());
//ambos ahora tienen como contexto al scope global, para recuperarlo se podria usar binding

// Ejercicio 12 — Rebinding con bind y creación de helpers

// Tarea: Implementa const once = (fn, ctx) => { // devuelve wrapper que solo ejecuta fn una vez con ctx }. Asegúrate de que this dentro de fn sea ctx si se provee.
// Firma: function once(fn, ctx) { }

const once = (fn, ctx) => {
  let hasRun = false;
  let result;

  return function (...args) {
    const finalContext = ctx || this;
    if (!hasRun) {
      result = fn.apply(finalContext, args);
      hasRun = true;
    }
    return result;
  };
};

const obj12 = {
  id: 1,
  counter: 0,
};

function increment() {
  this.counter += 1;
  return `Resultado ${this.counter}`;
}

const once12 = once(increment, obj12);

console.log("--- Primera Llamada ---");
let res1 = once12();
console.log(`[RETURN]: ${res1}`); //INCREMENTA EN 1 EL COOUNTER POR SER PRIMERA LLAMADA

console.log("--- Segunda Llamada ---");
let res2 = once12();
console.log(`[RETURN]: ${res2}`); //YA NO LO INCREMENTA POR QUE YA SE EJECUTO ANTES

console.log(`Contador en obj12: ${obj12.counter}`); // SE VERIFICA QUE LA SEGUNDA LLAMADA NO TUVO EFECTO

// Ejercicio 13 — Currying que respeta this

// Tarea: Implementa curryThis(fn) que permite currificar una función y que, al ejecutarse, respete el this del llamador. Ej: const c = curryThis(function(a,b){ return this.x + a + b }); objMethod = c(1); objMethod.call({x:10},2) → 13.
// Firma: function curryThis(fn) { }
// Pista: devuelve función parcialmente aplicada que usa apply con this.
function curryThis(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    const prevArgs = args;

    return function (...nextArgs) {
      return curried.apply(this, prevArgs.concat(nextArgs));
    };
  };
}

const c = curryThis(function (a, b) {
  return this.x + a + b;
});
const objMethod = c(1);
console.log(400, objMethod);
console.log(401, objMethod.call({ x: 10 }, 2));

// Ejercicio 14 — Mixins y this

// Tarea: Implementa mixin(target, source) que copie métodos del source al target.prototype preservando acceso a this del target (para clases). Muestra ejemplo con class A {} y const m = { greet() { return this.name } }.
// Firma: function mixin(targetClass, source) { }

function mixin(target, source) {
  return Object.assign(target.prototype, source);
}

class A {
  constructor(name) {
    this.name = name;
  }
}

const m = {
  greet() {
    return this.name;
  },
};

mixin(A, m);
console.log(m.greet()); // undefined

const classA = new A("Luis");
console.log("class a " + classA.greet());

// Ejercicio 15 — Evaluar this en strict vs non-strict mode

// Tarea: Crea ejemplos donde this sea undefined en strict mode y window (o global) en non-strict. Explica impacto en funciones sueltas y en callbacks.
// Firma: no aplica (ejemplo + explicación).

function normalFn() {
  console.log("This -> normal fn: ", this); //scope global
}

function callbackfn() {
  console.log("callback ", this);
}

function receiveCallback(fn) {
  fn();
}

normalFn();
receiveCallback(callbackfn); //scope global ya que el callback esta suelto

// Ejercicio 16 — this en eventos del DOM y addEventListener

// Tarea: Crea un componente DOM (elemento button) con un handler que use this. Muestra la diferencia entre el.addEventListener('click', obj.method) y el.addEventListener('click', obj.method.bind(obj)).
// Firma: no aplica (demo en DOM).

obj = {
  log() {
    console.log("log:", this);
  },
};
const el = document.createElement("button");
console.log("el");
el.innerHTML = "button";
const body = document.querySelector("body");
body.appendChild(el);
el.addEventListener("click", obj.log); //toma el button como this

el.addEventListener("click", obj.log.bind(obj)); //toma el obj como this

// const domElement2 = document.createElement("button");
// domElement2.addEventListener("click", excercise16.method.bind(excercise16));
// domElement2.innerHTML = "BOTON con bind";

// document.body.appendChild(domElement); //Su context es el elemento HTML
// document.body.appendChild(domElement2); //Su context es el objeto excercise16 vinculado con bind

// Ejercicio 17 — Variables y closures en loops asíncronos avanzados

// Tarea: Implementa asyncMap(arr, asyncFn) que itera arr, ejecuta asyncFn con índice y valor, y devuelve resultados en orden correcto. Demuestra problemas si no se captura bien i.
// Firma: async function asyncMap(arr, asyncFn) { }

async function asyncMap(arr, asyncFn) {
  let resultArr = [];
  for (let i = 0; i < arr.length; i++) {
    let res = await asyncFn(i, arr[i]);
    resultArr.push(res);
  }

  return resultArr;
}

async function asyncFn(idx, val) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return idx * val;
}

let arr17 = [1, 4, 5, 2, 1, 4];
const asyncArray = asyncMap(arr17, asyncFn).then((res) =>
  console.log("ejercicio 17 -> ", res)
);

// Ejercicio 18 — Shadowing y comportamiento de variables en scopes anidados

// Tarea: Escribe ejemplo con variable x en scope global, función A declara let x, función B interna declara var x y modifica; muestra cómo cambia y por qué. Explica hoisting y shadowing.
// Firma: no aplica (ejemplo + explicación).

var x = 10;
console.log("EJERCICIO 18, GLOBAL ", x);
function A18() {
  let x = 6;
  function B() {
    // hoisting mueve al prinicipio nuestras declariciones de funciones
    var x = 5;
    console.log("INSIDE B", x); //DEVUELVE 5 CONSIDERA EL SCOPE DE B
  }
  B();
}
//shadowing se da cuando usamos variables con el mismo nombre en un scope interno que tiene coincidencia con el nombre de la variable del scope externo, las variables internas aplican shadowing sobre las vaariables externas, evitando asi su uso

A18();
console.log("EJERICIO 18, GLOBAL ", x); //sigue en 10

// Ejercicio 19 — Transformar métodos que usan this para ser puramente funcionales

// Tarea: Dado un objeto con métodos que mutan estado usando this, escribe una función toPure(obj) que genere nuevas funciones puras (no mutan, reciben el estado y devuelven nuevo estado). Ejemplo: { inc() { this.count++ } } → inc(state) => newState.
// Firma: function toPure(obj) { }
// Pista: usa Object.entries, function.prototype.toString() solo si quieres; una implementación práctica puede requerir reescribir manualmente.

// Ejercicio 20 — Debug avanzado: identificar por qué this es undefined en un proyecto real

// Tarea: Te doy un snippet con fallo; debes localizar el porqué this es undefined y proponer 3 soluciones viables (bind, arrow, closure).
// Snippet (ejemplo):

class API {
  constructor() {
    this.token = "abc";
  }
  request() {
    return fetch("/x", { headers: { Authorization: this.token } });
  }
  bindedRequest() {
    console.log(`'/x', {headerss:{Authorization: ${this.token} } }`);
  }
}
const api = new API();
console.log(api.token); //si lee el valor del token bien
setTimeout(api.request.bind(api), 100);
setTimeout(api.bindedRequest.bind(api), 100); // si lee el token abc

setTimeout(() => api.bindedRequest(), 100); //si lee el token abc, hereda del entorno lexico

const closureBinded = api.bindedRequest.bind(api);
setTimeout(closureBinded, 500);
