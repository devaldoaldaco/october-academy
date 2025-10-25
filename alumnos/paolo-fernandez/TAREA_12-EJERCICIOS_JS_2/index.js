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

/*
  Ejercicio 1 — this en métodos vs funciones sueltas

  Tarea: Explica y demuestra con código qué valor tiene this cuando llamas user.getLabel() vs const f = user.getLabel; f();.
  Firma sugerida: no aplica (ejercicio explicativo).
  Pista: muestra cómo usar bind para que f() conserve this.
*/
console.log('=== EJERCICIO 1 ===');

console.log(`user.getLabel():`, user.getLabel());

const f = user.getLabel;

console.log(`** const f = user.getLabel() **`);
console.log(`f():`, f());

console.log('\n');
console.log('** SOLUCIÓN 1**');

const func = user.getLabel.bind(user);

console.log(`** const func = user.getLabel.bind(user) **`);
console.log(`func():`, func());

console.log('\n');
console.log('** SOLUCIÓN 2**');

console.log(`f.apply(user):`, f.apply(user));

console.log('\n');
console.log('** SOLUCIÓN 3**');

console.log(`f.call(user):`, f.call(user));

console.log('\n\n');

/*
  Ejercicio 2 — Arrow function y this

  Tarea: Crea un objeto con un método que dentro use un setTimeout para incrementar un contador en this. Implementa dos versiones: una con function y otra con =>. Muestra por qué una necesita bind o self = this.
  Firma: function createTimerObj() { } devuelve objeto con método start().
*/
console.log('=== EJERCICIO 2 ===');

console.log('\n');
console.log(`** Función declarada **`);

function createTimerObj() {
  return {
    count: 0,
    start: function() {
      const self = this;

      setTimeout(function() {
        self.count++;
        console.log('createTimerObj:', self.count);
      }, 1000);

      // setTimeout(function() {
      //   this.count++;
      //   console.log(this.count);
      // }.bind(this), 1000);
    }
  }
}

console.log(`createTimerObj:`, createTimerObj);

const timerObj = createTimerObj();

console.log(`** const timerObj = createTimerObj() **`);
console.log(`timerObj.count:`, timerObj.count);
console.log(`timerObj.start():`);
timerObj.start();

console.log('\n');
console.log(`** Función de flecha **`);

function createTimerObjArrow() {
  return {
    count: 0,
    start: function() {
      setTimeout(() => {
        this.count++;
        console.log('createTimerObjArrow:', this.count);
      }, 1000);
    }
  };
}

console.log(`createTimerObjArrow:`, createTimerObjArrow);

const timerObjArrow = createTimerObjArrow();

console.log(`** const timerObjArrow = createTimerObjArrow() **`);
console.log(`timerObjArrow.count:`, timerObjArrow.count);
console.log(`timerObjArrow.start():`);
timerObjArrow.start();

console.log('\n\n');

/*
  Ejercicio 3 — Diferencia hoisting: function declaration vs function expression

  Tarea: Escribe un ejemplo que llame a una función antes de declararla usando function foo(){} y otro con const bar = function(){}; explica diferencias de hoisting.
  Firma: no aplica (ejemplo + explicación).
*/
console.log('=== EJERCICIO 3 ===');

console.log('\n');
console.log(`** Function Declaration **`);

console.log(`foo antes de la declaración:`, foo);

function foo() {
  return 'foo';
}

console.log(`foo():`, foo());

console.log('\n');
console.log(`** Function Expression **`);

try {
  bar(); // --> ERROR
} catch (error) {
  console.log(error);
}

const bar = function() {
  return 'bar';
};

console.log(`** const bar = function() { return 'bar'; } **`);
console.log(`bar:`, bar);

console.log('\n');
console.log(`** EXPLICACIÓN **`);
console.log(`\t- Function declaration (foo): Se eleva completa, puede usarse antes de declararla`);
console.log(`\t- Function expression (bar): Solo se eleva la variable, no la función asignada`);
console.log(`\t- Por eso foo() funciona antes de su declaración, pero bar() daría error.`);

console.log('\n\n');

/*
  Ejercicio 4 — call, apply, bind en práctica

  Tarea: Implementa invokeWithContext(fn, ctx, argsArray) que llame fn con ctx usando call, apply o bind según corresponda; demuestra con user.getLabel y con Logger.prototype.log.
  Firma: function invokeWithContext(fn, ctx, argsArray) {  }
*/
console.log('=== EJERCICIO 4 ===');

function invokeWithContext(fn, ctx, argsArray) {
  return fn.apply(ctx, argsArray);
  // return fn.bind(ctx, ...argsArray)();
  // return fn.call(ctx, ...argsArray);
}

console.log(`invokeWithContext:`, invokeWithContext);

console.log('\n');
console.log(`** user.getLabel **`);

console.log(`invokeWithContext(user.getLabel, user, []):`, invokeWithContext(user.getLabel, user, []));

console.log('\n');
console.log(`** Logger.prototype.log **`);

const logger = new Logger('[INFO] ');

console.log(`** const logger = new Logger('[INFO] '); **`);
console.log(`invokeWithContext(Logger.prototype.log, logger, ['Sistema iniciado']):`);
invokeWithContext(Logger.prototype.log, logger, ['Sistema iniciado'])

console.log('\n\n');

/*
  Ejercicio 5 — Paradoja de this con arrow methods en prototypes

  Tarea: Añade un método arrow a Logger.prototype y compara comportamiento con método normal al instanciar new Logger('> '). Explica por qué no funciona como se espera.
  Firma: no aplica (ejemplo + explicación).
*/
console.log('=== EJERCICIO 5 ===');

console.log(`** const logger2 = new Logger('> ') **`);

console.log('\n');
console.log(`** Método normal en prototype **`);

const logger2 = new Logger('> ');

console.log(`logger2.log('Mensaje normal'):`);
logger2.log('Mensaje normal');

console.log('\n');
console.log(`** Método arrow en prototype **`);

Logger.prototype.logArrow = (msg) => { console.log(this.prefix + msg); };

console.log(`logger2.logArrow('Mensaje arrow'):`);
logger2.logArrow('Mensaje arrow');

console.log('\n');
console.log(`** EXPLICACIÓN **`);
console.log(`\t- El método normal usa 'this' dinámico: apunta a logger2`);
console.log(`\t- El arrow function captura 'this' del contexto donde se definió (scope global)`);
console.log(`\t- En el scope global, 'this.prefix' es undefined`);
console.log(`\t- Por eso las arrow functions NO deben usarse como métodos de prototype`);

console.log('\n\n');

/*
  Ejercicio 6 — Encadenamiento y this en métodos encadenables

  Tarea: Implementa Chainable que permita Chainable().step1().step2().value() usando this correctamente.
  Firma: function Chainable(initial) { }
  Pista: cada método debe retornar this excepto value().
*/
console.log('=== EJERCICIO 6 ===');

function Chainable(initial) {
  this.val = initial;

  this.step1 = function() {
    console.log(`step1: this.val -> ${ this.val } + 5`);
    this.val += 5;

    return this;
  };

  this.step2 = function() {
    console.log(`step2: this.val -> ${ this.val } * 2`);
    this.val *= 2;

    return this;
  };
  
  this.value = function() {
    return this.val;
  };
}

console.log(`Chainable:`, Chainable);

console.log(`** const result = new Chainable(10).step1().step2().value() **`);

const result = new Chainable(10).step1().step2().value();

console.log(`result:`, result);

console.log('\n\n');

/*
Ejercicio 7 — Closure + this

Tarea: Crea createCounter(obj) que añade a obj dos métodos inc() y get() que compartan un contador privado. Asegura que el contador no pueda modificarse desde afuera y que this siga apuntando al objeto cuando se usa obj.inc() como callback.
Firma: function createCounter(obj) { }
*/
console.log('=== EJERCICIO 7 ===');

function createCounter(obj) {
  let counter = 0; // <- CLOSURE

  obj.inc = function() {
    counter++;
    return this;
  }

  obj.get = function() {
    return counter;
  }

  return obj;
}

console.log(`createCounter:`, createCounter);

const myObj = {};
createCounter(myObj);

console.log(`** const myObj = {} **`);
console.log(`** createCounter(myObj) **`);

console.log(`myObj.get():`, myObj.get());

myObj.inc();
console.log(`myObj.inc() -> myObj.get():`, myObj.get());

myObj.inc().inc();
console.log(`myObj.inc().inc() -> myObj.get():`, myObj.get());

console.log('\n');
console.log(`** Intentar acceder al contador privado **`);
console.log(`myObj.counter:`, myObj.counter);

console.log('\n');
console.log(`** Uso como callback **`);

const myObj2 = { name: "objeto2" };
createCounter(myObj2);

setTimeout(myObj2.inc.bind(myObj2), 100);
setTimeout(() => {
  console.log(`Después de callback -> myObj2.get():`, myObj2.get());
}, 200);

console.log('\n');
console.log(`** EXPLICACIÓN **`);
console.log(`\t- 'counter' está en closure, no es accesible desde fuera`);
console.log(`\t- inc() y get() comparten la misma variable 'counter' por closure`);
console.log(`\t- Para usar como callback, se debe usar .bind(obj) o arrow functions`);

console.log('\n\n');

/*
  Ejercicio 8 — Variables: var, let, const y bucles

  Tarea: Explica y demuestra con código por qué usar var en un for con setTimeout produce valores inesperados, y corrige usando let.
  Firma: no aplica (ejemplo + corrección).
*/
console.log('=== EJERCICIO 8 ===');

console.log('\n');
console.log(`** Problema con VAR **`);
console.log(`Imprimirá después de 1 segundo...`);

for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(`var i: ${ i }`);
  }, 1000);
}

console.log('\n');
console.log(`** Solución con LET **`);
console.log(`Imprimirá después de 2 segundos...`);

setTimeout(() => {
  for (let j = 0; j < 5; j++) {
    setTimeout(function() {
      console.log(`let j: ${ j }`);
    }, 100);
  }
}, 2000);

console.log('\n');
console.log(`** Solución alternativa: IIFE con var **`);
console.log(`Imprimirá después de 3 segundos...`);

setTimeout(() => {
  for (var k = 0; k < 5; k++) {
    (function(valor) {
      setTimeout(function() {
        console.log(`IIFE k: ${ valor }`);
      }, 100);
    })(k); // <- CREA UN CLOSURE CON EL VALORA ACTUAL
  }
}, 3000);

console.log('\n');
console.log(`** EXPLICACIÓN **`);
console.log(`\t- 'var' tiene scope de FUNCIÓN, no de BLOQUE`);
console.log(`\t- Todas las funciones en setTimeout comparten la MISMA variable 'i'`);
console.log(`\t- Cuando setTimeout ejecuta, el bucle ya terminó e 'i' vale 5`);
console.log(`\t- 'let' tiene scope de BLOQUE, crea una NUEVA variable en cada iteración ✅`);
console.log(`\t- Cada setTimeout captura su PROPIO valor de 'j' por closure`);

console.log('\n\n');

/*
  Ejercicio 9 — Método que pierde this cuando se destruye el objeto

  Tarea: Dado const f = obj.method; obj = null; f() — muestra comportamiento y solución (por ejemplo bind o usar closure para capturar referencias).
  Firma: no aplica (ejemplo + solución).
*/
console.log('=== EJERCICIO 9 ===');

console.log('\n');
console.log(`** Problema: método pierde this **`);

let obj = {
  name: "MiObjeto",
  greet: function() {
    return `Hola desde ${ this.name }`;
  }
};

console.log(`obj:`, obj);
console.log(`obj.greet():`, obj.greet());

const f2 = obj.greet;
console.log(`** const f2 = obj.greet **`);

obj = null;
console.log(`Se destruye el objeto: obj = null`);

try {
  console.log(`f2():`, f2());
} catch(error) {
  console.log(error);
}

console.log('\n');
console.log(`** SOLUCIÓN 1: bind() **`);

let obj2 = {
  name: "Objeto2",
  greet: function() {
    return `Hola desde ${ this.name }`;
  }
};

console.log(`obj2:`, obj2);

const fBound = obj2.greet.bind(obj2);
console.log(`** const fBound = obj2.greet.bind(obj2) **`);

obj2 = null;
console.log(`Se destruye el objeto: obj2 = null`);
console.log(`fBound():`, fBound());

console.log('\n');
console.log(`** SOLUCIÓN 2: closure **`);

let obj3 = {
  name: "Objeto3",
  greet: function() {
    return `Hola desde ${ this.name }`;
  }
};

const fClosure = (function(o) {
  return function() {
    return o.greet();
  };
})(obj3);

console.log(`obj3:`, obj3);
console.log(`** const fClosure = closure que captura obj3 **`);

obj3 = null;
console.log(`Se destruye el objeto: obj3 = null`);
console.log(`fClosure():`, fClosure());

console.log('\n');
console.log(`** SOLUCIÓN 3: arrow function **`);

let obj4 = {
  name: "Objeto4",
  greet: function() {
    return `Hola desde ${ this.name }`;
  }
};
const obj4Copy = obj4;

console.log(`obj4:`, obj4);
console.log(`obj4 === obj4Copy:`, obj4 === obj4Copy);

const fArrow = () => obj4Copy.greet();
console.log(`** const obj4Copy = obj4 **`);
console.log(`** const fArrow = () => obj4Copy.greet() **`);

obj4 = null;
console.log(`Se destruye el objeto: obj4 = null`);
console.log(`fArrow():`, fArrow());

console.log('\n');
console.log(`** EXPLICACIÓN **`);
console.log(`\t- Cuando haces 'const f = obj.greet', solo guardas la función sin contexto`);
console.log(`\t- Al hacer 'obj = null', pierdes la referencia al objeto original`);
console.log(`\t- 'f()' se ejecuta sin 'this', por eso falla`);

console.log('\n\n');

/*
  Ejercicio 10 — this en clases ES6 vs funciones constructoras

  Tarea: Implementa una clase CounterClass y una función constructora CounterConstructor con el mismo API. Demuestra diferencias cuando se omite new.
  Firma: class CounterClass {  } and function CounterConstructor() {  }
*/
console.log('=== EJERCICIO 10 ===');

console.log('\n');
console.log(`** Clase ES6 **`);

class CounterClass {
  constructor(initial = 0) {
    this.count = initial;
  }
  
  increment() {
    this.count++;
    return this.count;
  }
  
  getValue() {
    return this.count;
  }
}

console.log(`** Uso correcto con 'new' **`);
const counter1 = new CounterClass(10);
console.log(`** const counter1 = new CounterClass(10) **`);
console.log(`counter1:`, counter1);
console.log(`counter1.increment():`, counter1.increment());
console.log(`counter1.getValue():`, counter1.getValue());

console.log('\n');
console.log(`** Uso SIN 'new' en clase **`);

try {
  console.log(`** const counter2 = CounterClass(5) **`);
  const counter2 = CounterClass(5);
} catch(error) {
  console.log(error);
  console.log(`Las clases PROTEGEN contra olvido de 'new'`);
}

console.log('\n');
console.log(`** Función Constructora **`);

function CounterConstructor(initial = 0) {
  this.count = initial;
  
  this.increment = function() {
    this.count++;
    return this.count;
  };
  
  this.getValue = function() {
    return this.count;
  };
}

console.log(`** Uso correcto con 'new' **`);
const counter3 = new CounterConstructor(20);
console.log(`** const counter3 = new CounterConstructor(20) **`);
console.log(`counter3:`, counter3);
console.log(`counter3.increment():`, counter3.increment());
console.log(`counter3.getValue():`, counter3.getValue());

console.log('\n');
console.log(`** Uso SIN 'new' en función constructora **`);
const counter4 = CounterConstructor(30);
console.log(`** const counter4 = CounterConstructor(30) **`);
console.log(`counter4:`, counter4);
console.log(`No da error pero contamina scope global o devuelve undefined`);

if (typeof count !== 'undefined') {
  console.log(`Variable 'count' en scope global:`, count);
}

console.log('\n');
console.log(`** EXPLICACIÓN **`);
console.log(`CLASE ES6:`);
console.log(`\t- DEBE usarse con 'new', sino lanza error`);
console.log(`\t- Protección automática contra errores`);
console.log(`\t- Sintaxis más moderna y clara`);
console.log(`FUNCIÓN CONSTRUCTORA:`);
console.log(`\t- Si olvidas 'new', NO da error`);
console.log(`\t- 'this' apunta al scope global (window/global)`);
console.log(`\t- Puede contaminar variables globales`);
console.log(`\t- Devuelve 'undefined' si no hay return explícito`);

console.log('\n\n');

/*
  Ejercicio 11 — Arrow functions como métodos en objetos literales

  Tarea: Crea un objeto con una propiedad arrow-method y otra función normal; compara this en ambos cuando se llaman desde el objeto y cuando se extraen a una variable.
  Firma: const o = { a: () => this, b() { return this } }.
*/
console.log('=== EJERCICIO 11 ===');

console.log('\n');
console.log(`** Objeto con arrow function y función normal **`);

const o = {
  name: "MiObjeto",
  
  arrowMethod: () => {
    console.log(`arrowMethod - this:`, this);
    return this;
  },
  
  normalMethod() {
    console.log(`normalMethod - this:`, this);
    return this;
  }
};

console.log(`\n** Llamar métodos directamente desde el objeto **`);

console.log(`o.arrowMethod():`);
const resultArrow1 = o.arrowMethod();
console.log(`\tRetorna:`, resultArrow1);
console.log(`\t\t'this' NO es el objeto, es el scope global/undefined`);

console.log(`\no.normalMethod():`);
const resultNormal1 = o.normalMethod();
console.log(`\tRetorna:`, resultNormal1);
console.log(`\t\t'this' ES el objeto`);

console.log(`\n** Extraer métodos a variables **`);

const extractedArrow = o.arrowMethod;
const extractedNormal = o.normalMethod;

console.log(`\nconst extractedArrow = o.arrowMethod;`);
console.log(`extractedArrow():`);
const resultArrow2 = extractedArrow();
console.log(`\tRetorna:`, resultArrow2);
console.log(`\t\tSigue siendo scope global (igual que antes)`);

console.log(`\nconst extractedNormal = o.normalMethod;`);
console.log(`extractedNormal():`);
const resultNormal2 = extractedNormal();
console.log(`\tRetorna:`, resultNormal2);
console.log(`\t\tAhora 'this' también es undefined (perdió contexto)`);

console.log('\n\n');

/*
  Ejercicio 12 — Rebinding con bind y creación de helpers

  Tarea: Implementa const once = (fn, ctx) => { // devuelve wrapper que solo ejecuta fn una vez con ctx }. Asegúrate de que this dentro de fn sea ctx si se provee.
  Firma: function once(fn, ctx) { }
*/
console.log('=== EJERCICIO 12 ===');

console.log(`** Implementación de once() **`);
console.log('once:', once);

function once(fn, ctx) {
  let executed = false; // ← Flag en closure
  let result;
  
  return function(...args) {
    if (!executed) {
      executed = true;
      result = ctx ? fn.apply(ctx, args) : fn(...args);
    }
    return result;
  };
}

console.log('\n');
console.log(`** Ejemplo 1: Función simple sin contexto **`);

let counter = 0;

function increment() {
  counter++;
  console.log(`increment() ejecutado, counter = ${counter}`);
  return counter;
}

const incrementOnce = once(increment);

console.log(`** const incrementOnce = once(increment) **`);
console.log(`incrementOnce():`, incrementOnce());
console.log(`incrementOnce():`, incrementOnce()); 
console.log(`incrementOnce():`, incrementOnce()); 
console.log(`Solo se ejecuta una vez`);

console.log('\n');
console.log(`** Ejemplo 2: Método con contexto **`);

const obj5 = {
  name: "MiObjeto",
  value: 100,
  multiply(factor) {
    console.log(`multiply() ejecutado en ${ this.name }`);
    this.value *= factor;
    return this.value;
  }
};

console.log('obj5:', obj5);
const multiplyOnce = once(obj5.multiply, obj5);

console.log(`** const multiplyOnce = once(obj5.multiply, obj5) **`);
console.log(`multiplyOnce(2):`, multiplyOnce(2));
console.log(`obj5.value:`, obj5.value);
console.log(`multiplyOnce(5):`, multiplyOnce(5));
console.log(`obj5.value:`, obj5.value);
console.log(`Solo se ejecutó una vez con el contexto correcto`);

console.log('\n');
console.log(`** Ejemplo 3: Sin contexto, pierde this **`);

const multiplyOnceNoCtx = once(obj5.multiply); // ← Sin contexto

console.log(`** const multiplyOnceNoCtx = once(obj.multiply) **`);

try {
  const result = multiplyOnceNoCtx(3);
  console.log(`** const result = multiplyOnceNoCtx(3) **`);
  console.log(`result:`, result);
} catch(error) {
  console.log(error);
  console.log(`Sin contexto, 'this' es undefined`);
}

console.log('\n');
console.log(`** EXPLICACIÓN **`);
console.log(`\t- once() crea un closure con una variable 'executed'`);
console.log(`\t- La primera vez que se llama, ejecuta 'fn' y guarda el resultado`);
console.log(`\t- Las siguientes veces, devuelve el resultado guardado sin ejecutar`);
console.log(`\t- Si se pasa 'ctx', usa .apply() para fijar 'this'`);
console.log(`\t- Sin 'ctx', ejecuta la función sin contexto específico`);

console.log('\n\n');

/*
  Ejercicio 13 — Currying que respeta this

  Tarea: Implementa curryThis(fn) que permite currificar una función y que, al ejecutarse, respete el this del llamador. Ej: const c = curryThis(function(a,b){ return this.x + a + b }); objMethod = c(1); objMethod.call({x:10},2) → 13.
  Firma: function curryThis(fn) { }
  Pista: devuelve función parcialmente aplicada que usa apply con this.
*/
console.log('=== EJERCICIO 13 ===');

function curryThis(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...nextArgs) {
      return curried.apply(this, [...args, ...nextArgs]);
    };
  };
}

console.log(`curryThis:`, curryThis);

console.log(`** Ejemplo 1: Función que usa this **`);

const sumWithThis = curryThis(function(a, b) {
  return this.x + a + b;
});

const partial = sumWithThis(5);
console.log(`** const partial = sumWithThis(5) **`);

const result1 = partial.call({ x: 10 }, 3);
console.log(`partial.call({ x: 10 }, 3):`, result1); // 18

console.log('\n');
console.log(`** Ejemplo 2: Método de objeto **`);

const obj6 = {
  multiplier: 2,
  calculate: curryThis(function(a, b, c) {
    return this.multiplier * (a + b + c);
  })
};

const step1 = obj6.calculate(1);
const step2 = step1(2);
const result2 = step2.call(obj6, 3);

console.log(`** obj6.calculate(1)(2).call(obj6, 3) **`);
console.log(`Resultado:`, result2); // 12

console.log('\n');
console.log(`** EXPLICACIÓN **`);
console.log(`\t- curryThis permite aplicar argumentos parcialmente`);
console.log(`\t- Usa apply(this) para respetar el contexto del llamador`);
console.log(`\t- Cada función parcial conserva 'this' dinámico`);
console.log(`\t- Permite usar .call() o .apply() en cualquier paso`);

console.log('\n\n');

/*
  Ejercicio 14 — Mixins y this

  Tarea: Implementa mixin(target, source) que copie métodos del source al target.prototype preservando acceso a this del target (para clases). Muestra ejemplo con class A {} y const m = { greet() { return this.name } }.
  Firma: function mixin(targetClass, source) { }
*/
console.log('=== EJERCICIO 14 ===');

function mixin(targetClass, source) {
  for (const key of Object.keys(source)) {
    targetClass.prototype[key] = source[key];
  }
}

console.log(`** Ejemplo: Agregar métodos a una clase **`);

class Person {
  constructor(name) {
    this.name = name;
  }
}

const greetingMixin = {
  greet() {
    return `Hola, soy ${ this.name }`;
  },
  farewell() {
    return `Adiós de ${ this.name }`;
  }
};

const person = new Person('Pedro');
console.log(`** const person = new Person('Pedro') **`);
try {
  console.log(`person.greet():`, person.greet());
} catch (error) {
  console.log(`person.greet():`,error);
}

console.log('\n');
mixin(Person, greetingMixin);
console.log(`** mixin(Person, greetingMixin) **`);

console.log('\n');
const person1 = new Person('Juan');
console.log(`** const person1 = new Person('Juan') **`);
console.log(`person1.greet():`, person1.greet());
console.log(`person1.farewell():`, person1.farewell());

console.log('\n');
const person2 = new Person('María');
console.log(`** const person2 = new Person('María') **`);
console.log(`person2.greet():`, person2.greet());

console.log('\n');
console.log(`** EXPLICACIÓN **`);
console.log(`\t- mixin copia métodos del source al prototype del target`);
console.log(`\t- Los métodos acceden a 'this' de cada instancia correctamente`);
console.log(`\t- Todas las instancias comparten los métodos del mixin`);

console.log('\n\n');

/*
  Ejercicio 15 — Evaluar this en strict vs non-strict mode

  Tarea: Crea ejemplos donde this sea undefined en strict mode y window (o global) en non-strict. Explica impacto en funciones sueltas y en callbacks.
  Firma: no aplica (ejemplo + explicación).
*/
console.log('=== EJERCICIO 15 ===');

console.log(`** Non-strict mode (sin 'use strict') **`);

function nonStrictFunction() {
  console.log(`\tthis en non-strict:`, this);
  return this;
}
console.log(`nonStrictFunction:`, nonStrictFunction);

const resultNonStrict = nonStrictFunction();
console.log(`** const resultNonStrict = nonStrictFunction() **`)
console.log(`typeof resultNonStrict:`, typeof resultNonStrict);
console.log(`resultNonStrict:`, resultNonStrict);

console.log('\n');
console.log(`** Strict mode (con 'use strict') **`);

function strictFunction() {
  'use strict';
  console.log(`this en strict:`, this);
  return this;
}
console.log(`strictFunction:`, strictFunction);

const resultStrict = strictFunction();
console.log(`** const resultStrict = strictFunction() **`)
console.log(`typeof resultStrict:`, typeof resultStrict);
console.log(`resultStrict:`, resultStrict);

console.log('\n');
console.log(`** Callbacks **`);

function executeCallback(callback) {
  callback();
}

function callbackNonStrict() {
  console.log(`Callback non-strict - this:`, this);
}

function callbackStrict() {
  'use strict';
  console.log(`Callback strict - this:`, this);
}

executeCallback(callbackNonStrict);
executeCallback(callbackStrict);

console.log('\n');
console.log(`** EXPLICACIÓN **`);
console.log(`\t- En non-strict mode: 'this' en funciones sueltas apunta al objeto global`);
console.log(`\t- En strict mode: 'this' en funciones sueltas es undefined`);
console.log(`\t- Strict mode previene acceso accidental al objeto global`);
console.log(`\t- Arrow functions no se ven afectadas, siempre capturan 'this' del scope`);

console.log('\n\n');

/*
  Ejercicio 16 — this en eventos del DOM y addEventListener

  Tarea: Crea un componente DOM (elemento button) con un handler que use this. Muestra la diferencia entre el.addEventListener('click', obj.method) y el.addEventListener('click', obj.method.bind(obj)).
  Firma: no aplica (demo en DOM).
*/
console.log('=== EJERCICIO 16 ===');

console.log(`** Creando botones en el DOM **`);

const button1 = document.createElement('button');
button1.textContent = 'Botón sin bind';
button1.id = 'btn1';
document.body.appendChild(button1);

const button2 = document.createElement('button');
button2.textContent = 'Botón con bind';
button2.id = 'btn2';
document.body.appendChild(button2);

const counter2 = {
  count: 0,
  increment: function() {
    this.count++;
    console.log(`\tContador: ${ this.count }, this:`, this);
  }
};
console.log('counter2:', counter2);

console.log('\n');
button1.addEventListener('click', counter2.increment);
console.log(`** button1.addEventListener('click', counter2.increment) **`);
console.log(`** Sin bind: this apunta al elemento DOM **`);

console.log('\n');
button2.addEventListener('click', counter2.increment.bind(counter2));
console.log(`** button2.addEventListener('click', counter2.increment.bind(counter2)) **`);
console.log(`** Con bind: this apunta al objeto counter2 **`);

console.log('\n');
console.log(`** EXPLICACIÓN **`);
console.log(`\t- Sin bind: 'this' es el elemento que disparó el evento (button)`);
console.log(`\t- Con bind: 'this' es el objeto al que se hizo bind (counter2)`);
console.log(`\t- addEventListener siempre pasa el elemento como 'this' por defecto`);

console.log('\n\n');

/*
  Ejercicio 17 — Variables y closures en loops asíncronos avanzados

  Tarea: Implementa asyncMap(arr, asyncFn) que itera arr, ejecuta asyncFn con índice y valor, y devuelve resultados en orden correcto. Demuestra problemas si no se captura bien i.
  Firma: async function asyncMap(arr, asyncFn) { }
*/
console.log('=== EJERCICIO 17 ===');

async function asyncMap(arr, asyncFn) {
  const results = [];
  for (let i = 0; i < arr.length; i++) {
    results[i] = await asyncFn(arr[i], i);
  }
  return results;
}
console.log(`asyncMap:`, asyncMap);

console.log('\n');
console.log(`** Implementación incorrecta con var **`);

async function asyncMapIncorrect(arr, asyncFn) {
  const results = [];
  for (var i = 0; i < arr.length; i++) {
    setTimeout(async () => {
      results[i] = await asyncFn(arr[i], i);
    }, 100);
  }
  return results;
}
console.log(`asyncMapIncorrect:`, asyncMapIncorrect);

console.log('\n');
console.log(`** Ejemplo de uso **`);

const numbers = [1, 2, 3, 4];
console.log(`** const numbers = [1, 2, 3, 4] **`);

const mockAsyncFn = (val, idx) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(val * 2), 50);
  });
};
console.log(`mockAsyncFn:`, mockAsyncFn);

asyncMap(numbers, mockAsyncFn).then(results => {
  console.log(`asyncMap con let:`, results);
});

asyncMapIncorrect(numbers, mockAsyncFn).then(results => {
  setTimeout(() => {
    console.log(`asyncMapIncorrect con var:`, results);
  }, 200);
});

console.log('\n');
console.log(`** EXPLICACIÓN **`);
console.log(`\t- Con 'let': cada iteración captura su propio índice correctamente`);
console.log(`\t- Con 'var': todas las iteraciones comparten la misma variable 'i'`);
console.log(`\t- Al ejecutarse los callbacks, 'i' ya tiene el valor final del loop`);
console.log(`\t- Usar 'let' o await en el loop garantiza orden y valores correctos`);

console.log('\n\n');

/*
  Ejercicio 18 — Shadowing y comportamiento de variables en scopes anidados

  Tarea: Escribe ejemplo con variable x en scope global, función A declara let x, función B interna declara var x y modifica; muestra cómo cambia y por qué. Explica hoisting y shadowing.
  Firma: no aplica (ejemplo + explicación).
*/
console.log('=== EJERCICIO 18 ===');

var x = 'global';
console.log(`** Variable global **`);
console.log(`x en global:`, x);

function A() {
  let x = 'en A';
  console.log(`\tx en A (después de declarar):`, x);
  
  function B() {
    console.log(`\tx en B (antes de declarar):`, x);
    var x = 'en B';
    console.log(`\tx en B (después de declarar):`, x);
  }
  
  B();
  console.log(`\tx en A (después de llamar B):`, x);
}

A();
console.log(`x en global (después de llamar A):`, x);

console.log('\n');
console.log(`** Ejemplo con modificación **`);

var y = 100;

function outer() {
  let y = 200;
  console.log(`\ty en outer:`, y);
  
  function inner() {
    var y;
    console.log(`\ty en inner (hoisted, undefined):`, y);
    y = 300;
    console.log(`\ty en inner (asignado):`, y);
  }
  
  inner();
  console.log(`\ty en outer (sin cambios):`, y);
}

outer();
console.log(`y en global (sin cambios):`, y);

console.log('\n');
console.log(`** EXPLICACIÓN **`);
console.log(`\t- Shadowing: variable interna oculta, variable del scope externo`);
console.log(`\t- var se eleva (hoisting), la declaración sube pero el valor no`);
console.log(`\t- let/const también se elevan pero están en zona muerta temporal`);
console.log(`\t- Cada scope tiene su propia variable x independiente`);
console.log(`\t- Modificar variable interna NO afecta scopes externos`);

console.log('\n\n');

/*
  Ejercicio 19 — Transformar métodos que usan this para ser puramente funcionales

  Tarea: Dado un objeto con métodos que mutan estado usando this, escribe una función toPure(obj) que genere nuevas funciones puras (no mutan, reciben el estado y devuelven nuevo estado). Ejemplo: { inc() { this.count++ } } → inc(state) => newState.
  Firma: function toPure(obj) { }
  Pista: usa Object.entries, function.prototype.toString() solo si quieres; una implementación práctica puede requerir reescribir manualmente.
*/
console.log('=== EJERCICIO 19 ===');

console.log('\n');
console.log(`** Objeto con métodos que mutan estado **`);

const counter5 = {
  count: 0,
  increment() {
    this.count++;
  },
  add(n) {
    this.count += n;
  },
  reset() {
    this.count = 0;
  }
};

console.log(`counter5:`, counter5);

console.log('\n');
console.log(`** Versiones puras manuales **`);

const pureCounter = {
  increment(state) {
    return { ...state, count: state.count + 1 };
  },
  add(state, n) {
    return { ...state, count: state.count + n };
  },
  reset(state) {
    return { ...state, count: 0 };
  }
};

let state = { count: 0 };
console.log(`Estado inicial:`, state);

state = pureCounter.increment(state);
console.log(`Después de increment:`, state);

state = pureCounter.add(state, 5);
console.log(`Después de add(5):`, state);

state = pureCounter.reset(state);
console.log(`Después de reset:`, state);

console.log('\n');
console.log(`** EXPLICACIÓN **`);
console.log(`\t- Métodos impuros usan 'this' y mutan el objeto directamente`);
console.log(`\t- Funciones puras reciben estado como parámetro`);
console.log(`\t- Retornan nuevo estado sin modificar el original`);
console.log(`\t- Usan spread operator {...state} para crear copias`);
console.log(`\t- Más predecibles y fáciles de testear`);

console.log('\n\n');

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
console.log('=== EJERCICIO 20 ===');

console.log('\n');
console.log(`** Código con error **`);

class API {
  constructor() {
    this.token = 'abc';
  }

  request(url) {
    console.log(`\t${ url } - this.token:`, this.token);
    return `Request a ${url} con token: ${this.token}`;
  }
}

const api = new API();

console.log(`Llamada directa (funciona):`);
console.log(api.request('/users'));

console.log(`\nComo callback en setTimeout (falla):`);
setTimeout(api.request, 100, '/posts');

console.log('\n');
console.log(`** SOLUCIÓN 1: bind() **`);

setTimeout(api.request.bind(api), 200, '/comments');

console.log('\n');
console.log(`** SOLUCIÓN 2: arrow function wrapper **`);

setTimeout(() => api.request('/photos'), 300);

console.log('\n');
console.log(`** SOLUCIÓN 3: método arrow en la clase **`);

class APIFixed {
  constructor() {
    this.token = 'xyz';
  }

  request = (url) => {
    console.log(`\t${ url } - this.token:`, this.token);
    return `Request a ${url} con token: ${this.token}`;
  }
}

const apiFix = new APIFixed();
setTimeout(apiFix.request, 400, '/albums');

console.log('\n');
console.log(`** EXPLICACIÓN **`);
console.log(`\t- Problema: al pasar 'api.request' se pierde el contexto de 'this'`);
console.log(`\t- setTimeout ejecuta la función sin el objeto api`);
console.log(`\t- Solución 1: .bind(api) amarra 'this' permanentemente`);
console.log(`\t- Solución 2: arrow wrapper mantiene el contexto`);
console.log(`\t- Solución 3: método arrow como propiedad de instancia`);

console.log('\n\n');