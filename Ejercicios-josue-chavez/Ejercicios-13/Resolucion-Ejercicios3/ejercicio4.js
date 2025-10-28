/*
Ejercicio 4 — Prototypal inheritance manual (Object.create)

Tarea: Sin usar class ni function constructora, crea objetos que formen una cadena prototípica: animalProto → mammalProto → human.

animalProto tiene método eat().

mammalProto añade warmBlooded: true.

human debe crearse con Object.create(mammalProto) y añadir propiedades propias.
Firma sugerida: no aplica (usa Object.create).
Restricción: muestra cómo hasOwnProperty distingue propiedades propias vs heredadas.
Ejemplo:

human.eat(); // funciona
console.log(human.warmBlooded); // true
console.log(human.hasOwnProperty('warmBlooded')); // false
*/

const animalProto = {
    eat() {
        return `${this.name || 'animal'} is eating`;
    }
};

const mammalProto = Object.create(animalProto);
mammalProto.warmBlooded = true;

const human = Object.create(mammalProto);
human.name = 'Ana';
human.language = 'es';

console.log(human.eat());
console.log(human.warmBlooded);
console.log(human.hasOwnProperty('warmBlooded'));
console.log(human.hasOwnProperty('name'));
console.log(Object.getPrototypeOf(human) === mammalProto);
console.log(Object.getPrototypeOf(mammalProto) === animalProto);