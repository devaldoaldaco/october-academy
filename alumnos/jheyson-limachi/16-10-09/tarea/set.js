const set = new Set();
const setConDatos = new Set([1, 2, 3, 4, 5]);
console.log(setConDatos);

// MÉTODOS DE INSTANCIA

//(no duplicados)
set.add(10);
set.add(1);
console.log(set);

console.log(set.has(10));
console.log(set.has(30)); 

set.delete(10);
console.log(set);

set.clear();
console.log(set);

const set2 = new Set(['a', 'b', 'c']);
console.log([...set2.values()]);

console.log([...set2.keys()]); 

console.log([...set2.entries()]);

set2.forEach(valor => console.log(valor));

console.log([...set2]);


const A = new Set([1, 2, 3, 4]);
const B = new Set([3, 4, 5, 6]);

const union = A.union(B);
console.log([...union]);

const interseccion = A.intersection(B);
console.log([...interseccion]);

const diferencia = A.difference(B);
console.log([...diferencia]);

const difSimetrica = A.symmetricDifference(B);
console.log([...difSimetrica]); 

const C = new Set([3, 4]);
console.log(C.isSubsetOf(A));
console.log(A.isSubsetOf(C));

console.log(A.isSupersetOf(C));
console.log(C.isSupersetOf(A)); 

const D = new Set([7, 8, 9]);
console.log(A.isDisjointFrom(D)); 
console.log(A.isDisjointFrom(B)); 
