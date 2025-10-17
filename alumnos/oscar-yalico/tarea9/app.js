
let pruebas = [12, '23', true, null, undefined, { nombre: 'Juan' }, [1, 2, 3]];
let alumnos = [1, 2, 3, 4, 5];

const transformar = (item) => item * 2;

const alumnosTransformados = alumnos.map(transformar);
console.log(alumnosTransformados);

let alumnos1 = new Array(1, 2, 3, 4, 5); // Crea un array con los elementos especificados
let alumnos2 = new Array(5); // Crea un array con 5 posiciones vacías

console.log(alumnos1);
console.log(alumnos2);