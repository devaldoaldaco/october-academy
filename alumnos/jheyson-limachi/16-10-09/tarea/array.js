//  MÉTODOS DE INSTANCIA 

// 1. set() - Añade pares clave-valor
const mapa = new Map();
mapa.set('nombre', 'Ana');
mapa.set('edad', 25);
console.log(mapa);

// Obtiene valor
console.log(mapa.get('nombre'));
console.log(mapa.get('noExiste'));
// Verifica si existe
console.log(mapa.has('edad'));
console.log(mapa.has('ciudad'));
mapa.delete('edad');
console.log(mapa);
mapa.clear();
console.log(mapa);
const mapa2 = new Map([['a', 1], ['b', 2]]);
console.log([...mapa2.entries()]);
console.log([...mapa2.keys()]);
console.log([...mapa2.values()])

mapa2.forEach((valor, clave) => console.log(clave, valor));

// MÉTODO ESTÁTICO

// Agrupa elementos de un array
const productos = [
  { categoria: 'frutas', nombre: 'manzana' },
  { categoria: 'frutas', nombre: 'pera' },
  { categoria: 'verduras', nombre: 'lechuga' }
];

const porCategoria = Map.groupBy(productos, p => p.categoria);
console.log(porCategoria.get('frutas')); 
console.log(porCategoria.get('verduras')); 