//number
//Metodos estaticos
console.log(Number.isFinite(123));//retorna true si el valor es un numero finito
console.log(Number.isInteger(123.4));//retorna true si el valor es un entero
console.log(Number.isNaN(NaN));//retorna true si el valor es NaN
console.log(Number.isSafeInteger(9007199254741991));//retorna true si el valor es un entero seguro
console.log(Number.parseFloat("123.45abc"));//convierte una cadena a un numero de punto flotante
console.log(Number.parseInt("123.45abc"));//convierte una cadena a un entero
//Metodos de instancia
let num = 123.456789;
console.log(num.toExponential(2));//convierte el numero a notacion exponencial con los decimales especific
console.log(num.toFixed(2));//convierte el numero a una cadena con los decimales especific
console.log(num.toLocaleString("en-US"));//convierte el numero a una cadena con formato local
console.log(num.toPrecision(5));//convierte el numero a una cadena con la precision especific
console.log(num.toString());//convierte el numero a una cadena
console.log(num.valueOf());//devuelve el valor primitivo del numero
