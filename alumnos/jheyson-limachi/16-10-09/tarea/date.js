// ==================== CREAR UN DATE ====================
const ahora = new Date();
const fecha = new Date('2024-03-15');
const fechaCompleta = new Date(2024, 2, 15, 10, 30, 0);
console.log(ahora);

// MÉTODOS ESTÁTICO
console.log(Date.now());

console.log(Date.parse('2024-03-15'));

console.log(Date.UTC(2024, 2, 15, 10, 30));

// MÉTODOS DE INSTANCIA

const fecha1 = new Date('2024-03-15T14:30:45.500');

console.log(fecha1.getFullYear());
console.log(fecha1.getMonth());
console.log(fecha1.getDate());
console.log(fecha1.getDay());
console.log(fecha1.getHours());
console.log(fecha1.getMinutes());
console.log(fecha1.getSeconds());
console.log(fecha1.getMilliseconds());
console.log(fecha1.getTime());
console.log(fecha1.getTimezoneOffset());

console.log(fecha1.getUTCFullYear());
console.log(fecha1.getUTCMonth());
console.log(fecha1.getUTCDate());
console.log(fecha1.getUTCDay());
console.log(fecha1.getUTCHours());
console.log(fecha1.getUTCMinutes());
console.log(fecha1.getUTCSeconds());
console.log(fecha1.getUTCMilliseconds());


const fecha2 = new Date('2024-03-15T10:30:00');

fecha2.setFullYear(2025);
console.log(fecha2);

fecha2.setMonth(5);
console.log(fecha2.getMonth());

fecha2.setDate(20);
console.log(fecha2.getDate());

fecha2.setHours(15);
console.log(fecha2.getHours());

fecha2.setMinutes(45);
console.log(fecha2.getMinutes());

fecha2.setSeconds(30);
console.log(fecha2.getSeconds());

fecha2.setMilliseconds(250);
console.log(fecha2.getMilliseconds());

fecha2.setTime(1710460800000);
console.log(fecha2);

fecha2.setUTCFullYear(2026);
fecha2.setUTCMonth(7);
fecha2.setUTCDate(25);
fecha2.setUTCHours(12);
fecha2.setUTCMinutes(0);
fecha2.setUTCSeconds(0);
fecha2.setUTCMilliseconds(0);

const fecha3 = new Date('2024-03-15T14:30:45.500');

console.log(fecha3.toString());
console.log(fecha3.toDateString());
console.log(fecha3.toTimeString());
console.log(fecha3.toISOString());
console.log(fecha3.toUTCString());
console.log(fecha3.toJSON());
console.log(fecha3.toLocaleString('es-PE'));
console.log(fecha3.toLocaleDateString('es-PE'));
console.log(fecha3.toLocaleTimeString('es-PE'));
console.log(fecha3.valueOf());
