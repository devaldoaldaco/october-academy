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
  console.log("this de la funcion logger", this);
}

Logger.prototype.log = function (msg) {
  console.log(this.prefix + msg);
};

//Ejercicio 1 — this en métodos vs funciones sueltas
/*Tarea: Explica y demuestra con código qué valor tiene this cuando llamas user.getLabel() vs const f = user.getLabel; f();.
Firma sugerida: no aplica (ejercicio explicativo).
Pista: muestra cómo usar bind para que f() conserve this. */

// el this pertenece al objeto que llama a la funcion
console.log(user.getLabel());

//perdemos el contexto del objeto
const f = user.getLabel;

//ahora el this apunta al objeto persona
const thisUser = f.bind(user);
console.log(thisUser());

//Ejercicio 2 — Arrow function y this

/*Tarea: Crea un objeto con un método que dentro use un setTimeout para incrementar un contador en this. Implementa dos versiones: una con function y otra con =>. Muestra por qué una necesita bind o self = this.
Firma: function createTimerObj() { } devuelve objeto con método start().*/

function createTimerObj1() {
  return {
    contador: 0,
    start() {
      const self = this;
      return setTimeout(function () {
        self.contador++;
      }, 1000);
    },
  };
}

function createTimerObj2() {
  return {
    contador: 0,
    start() {
      return setTimeout(() => {
        this.contador++, this;
      }, 1000);
    },
  };
}

const obj1 = createTimerObj1();
const obj2 = createTimerObj2();

console.log(obj1.start());
console.log(obj2.start());

//Ejercicio 3 — Diferencia hoisting: function declaration vs function expresion
/* Tarea: Escribe un ejemplo que llame a una función antes de declararla usando function foo(){} y otro con const bar = function(){}; explica diferencias de hoisting.
Firma: no aplica (ejemplo + explicación).*/

foo();

function foo() {
  console.log("funcion foo");
}

function foo2() {
  console.log("funcion foo2 - funcionamiento de javaScript");
}

foo2();

//

/*bar();
const bar = function () {
  console.log("funcion bar");
};*/

//incorrecto
//const bar2;
//bar2();
/*bar2 = function () {
  console.log("funcion bar");
};*/

//Ejercicio 4 — call, apply, bind en práctica
/*Tarea: Implementa invokeWithContext(fn, ctx, argsArray) que llame fn con ctx usando call, apply o bind según corresponda; demuestra con user.getLabel y con Logger.prototype.log.
Firma: function invokeWithContext(fn, ctx, argsArray) {  } */

const objectLogger = { prefix: "computadora" };

function invokeWithContext(fn, ctx, argsArray) {
  return fn.apply(ctx, argsArray);
}

console.log(invokeWithContext(user.getLabel, user, [user.id, user.name]));
invokeWithContext(Logger.prototype.log, objectLogger, [" ya encendió"]);

const logger1 = new Logger("Danza: ");
logger1.log("Marinera Norteña");

//Ejercicio 5 — Paradoja de this con arrow methods en prototypes
/*Tarea: Añade un método arrow a Logger.prototype y compara comportamiento con método normal al instanciar new Logger('> '). Explica por qué no funciona como se espera.
Firma: no aplica (ejemplo + explicación).*/

// En el caso de las funciones, el this pertenece (o apunta) al objeto que ejecuta la función.
const logger2 = new Logger("Estadio: ");
logger2.log("local - Nacional");

// Aqui por trabajar con arrow functions, se hereda el this de donde fueron creadas.(contexto exterior)
Logger.prototype.log = (msg) => {
  console.log(this.prefix + msg);
};

const logger3 = new Logger(">: ");
logger3.log("HipHop"); //undefinedHipHop

//Ejercicio 6 — Encadenamiento y this en métodos encadenables

/*Tarea: Implementa Chainable que permita Chainable().step1().step2().value() usando this correctamente.
Firma: function Chainable(initial) { }
Pista: cada método debe retornar this excepto value().*/

function Chainable(initial) {
  return {
    valueChainable: 2 * initial,

    step1() {
      this.valueChainable += 1;
      return this;
    },

    step2() {
      this.valueChainable += 5;
      return this;
    },

    value() {
      return this.valueChainable;
    },
  };
}

console.log(Chainable(4).step1().step2().value());

//Ejercicio 7 — Closure + this
/*Tarea: Crea createCounter(obj) que añade a obj dos métodos inc() y get() que compartan un contador privado. Asegura que el contador no pueda modificarse desde afuera y que this siga apuntando al objeto cuando se usa obj.inc() como callback.
Firma: function createCounter(obj) { }*/

function createCounter(obj) {
  let counter = 0;

  function inc() {
    counter++;
    console.log("El this dentro de la funcion inc es: ", this);
  }

  function get() {
    return counter;
  }

  obj.inc = inc.bind(obj);
  obj.get = get.bind(obj);

  return obj;
}

careerAssistants = {};
createCounter(careerAssistants);

//Comporbar acceso a variable
console.log(careerAssistants.counter);

// ver contador
careerAssistants.inc();
careerAssistants.inc();
careerAssistants.inc();
careerAssistants.inc();
careerAssistants.inc();
console.log(careerAssistants.get());

// Incluso si pasamos inc como callback:
setTimeout(careerAssistants.inc, 1000);
console.log(careerAssistants.get());

//Ejercicio 8 — Variables: var, let, const y bucles
/*Tarea: Explica y demuestra con código por qué usar var en un for con setTimeout produce valores inesperados, y corrige usando let.
Firma: no aplica (ejemplo + corrección).*/

//var no tienen alcance de bloque sino más bien de función
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log("var en la posición:", i);
  }, 1000);
}

//let tiene alcance de función
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log("let en la posición:", i);
  }, 1000);
}

//Ejercicio 9 - Ejercicio 9 — Método que pierde this cuando se destruye el objeto

/*Tarea: Dado const f = obj.method; obj = null; f() — muestra comportamiento y solución (por ejemplo bind o usar closure para capturar referencias).
Firma: no aplica (ejemplo + solución).*/
obj = {
  cod: 1,
  method() {
    console.log("Buenos días, alumno con código: ", this.cod);
    //console.log("this: ", this); en el segundo llamado aparece error
  },
};

obj3 = {
  cod: 2,
  method() {
    console.log("Buenos días, alumno2 con código: ", this.cod);
    //console.log("this: ", this); en el segundo llamado aparece error
  },
};

const f2 = obj.method;

obj.method();
f2();

obj = null;
//obj.method(); Referencia eliminada aparece error
f2();

// Utilizando bind
const f3 = obj3.method.bind(obj3);
obj3 = null;
f3();

//Ejercicio 10 — this en clases ES6 vs funciones constructoras

/*Tarea: Implementa una clase CounterClass y una función constructora CounterConstructor con el mismo API. Demuestra diferencias cuando se omite new.
Firma: class CounterClass {  } and function CounterConstructor() {  }*/

class CounterClass {
  constructor(counter) {
    this.counter = counter || 0;
  }

  increment() {
    this.counter++;
    console.log("CounterClass:", this.counter);
  }
}

function CounterConstructor(counter) {
  this.counter = counter || 0;

  this.increment = function () {
    this.counter++;
    console.log("CounterConstructor:", this.counter);
  };
}

// Usando new
const c1 = new CounterClass(4);
c1.increment();
const c2 = new CounterConstructor(4);
c2.increment();

//Sin new
//const bad1 = CounterClass();
const bad2 = CounterConstructor(4);
console.log(bad2);

//Ejercicio 11 — Arrow functions como métodos en objetos literales

/*Tarea: Crea un objeto con una propiedad arrow-method y otra función normal; compara this en ambos cuando se llaman desde el objeto y cuando se extraen a una variable.
Firma: const o = { a: () => this, b() { return this } }.*/
const o = {
  a: () => this,
  b() {
    return this;
  },
};

console.log("El valor this en o.a() es: ", o.a());
console.log("El valor de this en o.b() :", o.b());

const arrowFunction = o.a;
const normalFunction = o.b;

console.log("El valor this en arrowFn() =>", arrowFunction());
console.log("El valor this en normalFn() =>", normalFunction());

//Ejercicio 12 — Rebinding con bind y creación de helpers
/*Tarea: Implementa const once = (fn, ctx) => { // devuelve wrapper que solo ejecuta fn una vez con ctx }. Asegúrate de que this dentro de fn sea ctx si se provee.
Firma: function once(fn, ctx) { }*/

function once(fn, ctx) {
  let isExecuted = false;
  return function (...args) {
    if (!isExecuted) {
      isExecuted = true;
      return fn.apply(ctx || this, args);
    } else {
      console.log("ya fue ejecutada la funcion");
    }
  };
}

const casa = {
  direccion: 331,
  referencia: "Antes del malecon",
  obtenerDireccion() {
    console.log(
      `Actualmente resido en la calle: ${this.direccion}, referencia: ${this.referencia}`
    );
  },
};

const referenciaCompleta = once(casa.obtenerDireccion, casa);

referenciaCompleta();
referenciaCompleta();

//Ejercicio 13 — Currying que respeta this
/*
Tarea: Implementa curryThis(fn) que permite currificar una función y que, al ejecutarse, respete el this del llamador. Ej: const c = curryThis(function(a,b){ return this.x + a + b }); objMethod = c(1); objMethod.call({x:10},2) → 13.
Firma: function curryThis(fn) { }
Pista: devuelve función parcialmente aplicada que usa apply con this*/

function curryThis(fn) {
  return function (...argsIniciales) {
    return function (...argsFinales) {
      return fn.apply(this, [...argsIniciales, ...argsFinales]);
    };
  };
}

const c = curryThis(function (a, b) {
  return this.x + a + b;
});

const objMethod = c(1);
console.log(objMethod.call({ x: 10 }, 2));

//Ejercicio 14 — Mixins y this

/*Tarea: Implementa mixin(target, source) que copie métodos del source al target.prototype preservando acceso a this del target (para clases). Muestra ejemplo con class A {} y const m = { greet() { return this.name } }.
Firma: function mixin(targetClass, source) { }*/

function mixin(targetClass, source) {
  for (const key of Object.keys(source)) {
    const prop = source[key];
    if (typeof prop === "function") {
      targetClass.prototype[key] = prop;
    }
  }
}

class A {
  constructor(name) {
    this.name = name;
  }
}

const m = {
  greet() {
    return `Hola, me llamo ${this.name}`;
  },
};

mixin(A, m);

const mixinResult = new A("Samuel");
console.log(mixinResult.greet());

//Ejercicio 15 — Evaluar this en strict vs non-strict mode
/*Tarea: Crea ejemplos donde this sea undefined en strict mode y window (o global) en non-strict. Explica impacto en funciones sueltas y en callbacks.
Firma: no aplica (ejemplo + explicación).*/

//funciones dentro de una funcion

const info = {
  nombre: "Luis",
  dni: 73325143,
  descripcion: "robo",
  adicional() {
    console.log(`Informacion detallada: nombre: ${this.nombre}`);
    function tiempo() {
      console.log("investigado desde hace 5 años", this);
    }
    tiempo();

    function antecedentes() {
      "use strict";
      console.log("Cuenta con antecedentes", this);
    }
    antecedentes();
  },
};

info.adicional();

// Función Suelta
function consejo() {
  console.log("el consejo es ... , this en funcion no estricta:", this); //contexto global
}
consejo();

function mostrar() {
  "use strict";
  console.log("mensaje mostrado... , this en funcion estricta:", this); // al ser estricta se vuelve undefined
}
mostrar();

//callbacks
const celular = {
  modelo: "iphoneX",
  condicionBateria(fs) {
    console.log("El porcentaje de bateria es del 45% ");
    fs();
  },
};

function mensajes() {
  console.log("Cambiar de equipo...", this);
}

function tiempo() {
  "use strict";
  console.log("Se podrá usar por meses...", this);
}

celular.condicionBateria(mensajes);
celular.condicionBateria(tiempo);

//Ejercicio 16 — this en eventos del DOM y addEventListener
/*Tarea: Crea un componente DOM (elemento button) con un handler que use this. Muestra la diferencia entre el.addEventListener('click', obj.method) y el.addEventListener('click', obj.method.bind(obj)).
Firma: no aplica (demo en DOM).*/

const animal = {
  tipo: "carnivoro",
  showType(event) {
    console.log("this en handler:", this);
    console.log("Tipo:", this.tipo);
    console.log("Evento:", event.type);
  },
};

const btnBind = document.getElementById("btnBind");
const btnnoBind = document.getElementById("btnnoBind");

btnBind.addEventListener("click", animal.showType.bind(animal));
btnnoBind.addEventListener("click", animal.showType);

//Ejercicio 17 — Variables y closures en loops asíncronos avanzados

/*Tarea: Implementa asyncMap(arr, asyncFn) que itera arr, ejecuta asyncFn con índice y valor, y devuelve resultados en orden correcto. Demuestra problemas si no se captura bien i.
Firma: async function asyncMap(arr, asyncFn) { }*/

//version con let
async function asyncMap(arr, asyncFn) {
  const results = [];

  for (let i = 0; i < arr.length; i++) {
    results[i] = await asyncFn(i, arr[i]);
  }

  return results;
}

//version con var
async function asyncMap2(arr, asyncFn) {
  const results = [];

  for (var i = 0; i < arr.length; i++) {
    setTimeout(() => {
      console.log("i:", i);
    }, 1000);
  }

  return results;
}

async function asyncFn(index, value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Valor: ${value}, Índice: ${index}`);
    }, 1000);
  });
}

(async () => {
  const arr = ["valor1", "valor2", "valor3"];
  const mapped = await asyncMap2(arr, asyncFn);
  console.log(mapped);
})();

//Ejercicio 18 — Shadowing y comportamiento de variables en scopes anidados
/*Tarea: Escribe ejemplo con variable x en scope global, función A declara let x, función B interna declara var x y modifica; muestra cómo cambia y por qué. Explica hoisting y shadowing.
Firma: no aplica (ejemplo + explicación).*/

var x = "valor de x global";

function AScope() {
  let x = "local let x-A";
  console.log("Dentro de A, x inicial:", x);

  function B() {
    //valor inicial
    var x = "local var x-B";
    console.log("Dentro de B, x inicial:", x);

    // valor modificado
    x = "local var modificado x-B";
    console.log("Dentro de B, x modificado:", x);
  }

  B();

  console.log("x en A, luego de los cambios en B:", x); // sin cambios
}

AScope();

console.log("x global:", x); // sin cambios

//Ejercicio 19 — Transformar métodos que usan this para ser puramente funcionales
/*Tarea: Dado un objeto con métodos que mutan estado usando this, escribe una función toPure(obj) que genere nuevas funciones puras (no mutan, reciben el estado y devuelven nuevo estado). Ejemplo: { inc() { this.count++ } } → inc(state) => newState.
Firma: function toPure(obj) { }
Pista: usa Object.entries, function.prototype.toString() solo si quieres; una implementación práctica puede requerir reescribir manualmente.*/

const cart = {
  items: [],
  add(item) {
    this.items.push(item); // muta el objeto original
  },
  remove(item) {
    this.items.pop();
  },
};

function toPure(obj) {
  const pureObj = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "function") {
      pureObj[key] = (curentStatus, ...args) => {
        const newState = { ...curentStatus, items: [...curentStatus.items] };
        value.call(newState, ...args);
        return newState;
      };
    }
  }

  return pureObj;
}

const pureCart = toPure(cart);
const state1 = { items: [] };

const state2 = pureCart.add(state1, "frutas");
console.log(state1);
console.log(state2);

//Ejercicio 20 — Debug avanzado: identificar por qué this es undefined en un proyecto real

/*Tarea: Te doy un snippet con fallo; debes localizar el porqué this es undefined y proponer 3 soluciones viables (bind, arrow, closure).
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
  }

  request() {
    return fetch("https://api.escuelajs.co/api/v1/products", {
      headers: { Authorization: this.token },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos recibidos:", data);
        console.log("Token usado:", this.token);
      })
      .catch((err) => console.error("Error en fetch:", err));
  }
}

const api = new API();
setTimeout(api.request.bind(api), 1000);
setTimeout(() => api.request(), 1000);
const self = api;
setTimeout(function () {
  self.request();
}, 1000);
