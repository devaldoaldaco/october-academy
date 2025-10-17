//Métodos estáticos y de instancia de Number

// EPSILON - La diferencia más pequeña entre dos números representables en JavaScript
console.log(Number.EPSILON);// 2.220446049250313e-16

// comparar decimales con precisión
const suma = 0.1 + 0.2;
console.log(suma === 0.3);// false (por imprecisión de punto flotante)
console.log(Math.abs(suma - 0.3) < Number.EPSILON);// true (comparación correcta)



// MAX_SAFE_INTEGER - El número entero más grande que se puede representar de forma segura
console.log(Number.MAX_SAFE_INTEGER);// 9007199254740991
console.log(Number.MAX_SAFE_INTEGER + 1);// 9007199254740992
console.log(Number.MAX_SAFE_INTEGER + 2);// 9007199254740992 (pierde precisión, da el mismo resultado)



// MAX_VALUE - El número más grande representable en JavaScript
console.log(Number.MAX_VALUE);// 1.7976931348623157e+308
console.log(Number.MAX_VALUE * 2);// Infinity (excede el límite)


// MIN_SAFE_INTEGER - El número entero más pequeño (más negativo) que se puede representar de forma segura
console.log(Number.MIN_SAFE_INTEGER);// -9007199254740991
console.log(Number.MIN_SAFE_INTEGER - 1);// -9007199254740992
console.log(Number.MIN_SAFE_INTEGER - 2);// -9007199254740992 (pierde precisión)



// MIN_VALUE - El número positivo más pequeño (cercano a cero) representable en JavaScript
console.log(Number.MIN_VALUE);// 5e-324
console.log(Number.MIN_VALUE / 2);// 0 (demasiado pequeño para representar)



// NaN - Representa "Not-a-Number" (No es un Número)
console.log(Number.NaN);// NaN
console.log(0 / 0);// NaN
console.log(Number.NaN === Number.NaN);// false (NaN no es igual a sí mismo)
console.log(Number.isNaN(Number.NaN));// true (forma correcta de verificar)



// NEGATIVE_INFINITY - Representa infinito negativo
console.log(Number.NEGATIVE_INFINITY);// -Infinity
console.log(-1 / 0);// -Infinity
console.log(Number.NEGATIVE_INFINITY < Number.MIN_SAFE_INTEGER);// true (es menor que cualquier número)


// POSITIVE_INFINITY - Representa infinito positivo
console.log(Number.POSITIVE_INFINITY);// Infinity
console.log(1 / 0);// Infinity
console.log(Number.POSITIVE_INFINITY > Number.MAX_VALUE);// true (es mayor que cualquier número)
console.log(Number.POSITIVE_INFINITY + 1);// Infinity (infinito + cualquier cosa = infinito)




//Metodos de instancia con Number
//El método toExponential() devuelve una cadena con el número en notación científica
console.log((12345).toExponential(2)); //"1.23e+4"

//El método toFixed() devuelve una cadena con el número con un número fijo de decimales
console.log((3.14159).toFixed(2)); //"3.14"

//El método toLocaleString() devuelve el número formateado según la configuración local
console.log((1234567.89).toLocaleString("es-PE")); //"1,234,567.89" (en formato peruano)

//El método toPrecision() devuelve una cadena con el número con una precisión total de cifras
console.log((123.456).toPrecision(4)); //"123.5"

//El método toString() devuelve una cadena que representa el número
console.log((255).toString(16)); //"ff" (representación hexadecimal)

//El método valueOf() devuelve el valor primitivo del objeto Number
console.log((123).valueOf()); //123

