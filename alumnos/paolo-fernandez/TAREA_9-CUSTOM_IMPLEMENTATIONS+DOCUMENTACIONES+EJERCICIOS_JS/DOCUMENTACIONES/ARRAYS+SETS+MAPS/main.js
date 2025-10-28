// ===============================
//        INICIO: ARRAYS
// ===============================

console.log(`===============================
       INICIO: ARRAYS
===============================`);

const numbers = [1, 2, 3, 4, 5];
const fruits = ['manzana', 'banana', 'naranja', 'uva'];
const mixed = [1, 'dos', true, null, { id: 1 }];
const nested = [1, [2, 3], [4, [5, 6]]];

console.log('=== ARRAYS INICIALES ===');
console.log('numbers:', numbers);
console.log('fruits:', fruits);
console.log('mixed:', mixed);
console.log('nested:', nested);
console.log('\n');

// *** INICIO: MÉTODOS ESTÁTICOS *** //
/*
  1. Array.from()
  2. fromAsync()
  3. Array.isArray()
  4. Array.of
*/


console.log('=== MÉTODOS ESTÁTICOS ===');

// 1. Array.from()
console.log('1. Array.from()');
const from1 = Array.from('Hola');
const from2 = Array.from([1, 2, 3], x => x * 2);
console.log(`\tArray.from('Hola'):`, from1);
console.log('\tArray.from([1,2,3], x => x * 2):', from2);

// 2. Array.fromAsync()
console.log('2. Array.fromAsync()');
console.log('\t(Requiere async/await - se ejecuta de forma asíncrona)');
// const fromAsync = await Array.fromAsync(asyncIterable);

// 3. Array.isArray()
console.log('3. Array.isArray()');
console.log('\tArray.isArray([1,2,3]):', Array.isArray([1, 2, 3]));
console.log('\tArray.isArray("texto"):', Array.isArray('texto'));
console.log('\tArray.isArray(null):', Array.isArray(null));

// 4. Array.of()
console.log('4. Array.of()');
const of1 = Array.of(7);
const of2 = Array.of(1, 2, 3, 4);
console.log('\tArray.of(7):', of1);
console.log('\tArray.of(1, 2, 3, 4):', of2);

console.log('\n');

// *** FIN: MÉTODOS ESTÁTICOS *** //

// *** INICIO: MÉTODOS DE INSTANCIA *** //
/*
  1. Array.prototype.at()
  2. Array.prototype.concat()
  3. Array.prototype.copyWithin()
  4. Array.prototype.entries()
  5. Array.prototype.every()
  6. Array.prototype.fill()
  7. Array.prototype.filter()
  8. Array.prototype.find()
  9. Array.prototype.findIndex()
  10. findLast()
  11. findLastIndex()
  12. Array.prototype.flat()
  13. Array.prototype.flatMap()
  14. Array.prototype.forEach()
  15. Array.prototype.includes()
  16. Array.prototype.indexOf()
  17. Array.prototype.join()
  18. Array.prototype.keys()
  19. Array.prototype.lastIndexOf()
  20. Array.prototype.map()
  21. Array.prototype.pop()
  22. Array.prototype.push()
  23. Array.prototype.reduce()
  24. Array.prototype.reduceRight()
  25. Array.prototype.reverse()
  26. Array.prototype.shift()
  27. Array.prototype.slice()
  28. Array.prototype.some()
  29. Array.prototype.sort()
  30. Array.prototype.splice()
  31. Array.prototype.toLocaleString()
  32. toReversed()
  33. Array.prototype.toSorted()
  34. toSpliced()
  35. Array.prototype.toString()
  36. Array.prototype.unshift()
  37. Array.prototype.values()
  38. with()
  39. Array.prototype[@@iterator]()
*/

console.log('=== MÉTODOS DE INSTANCIA ===');

// 1. Array.prototype.at()
console.log('1. Array.prototype.at()');
console.log('\tnumbers.at(0):', numbers.at(0));
console.log('\tnumbers.at(-1):', numbers.at(-1));

// 2. Array.prototype.concat()
console.log('2. Array.prototype.concat()');
const concat = numbers.concat([ 6, 7, 8 ]);
console.log('\tnumbers.concat([6, 7, 8]):', concat);

// 3. Array.prototype.copyWithin()
console.log('3. Array.prototype.copyWithin()');
const copyWithin = [ 1, 2, 3, 4, 5 ].copyWithin(0, 3);
console.log('\t[1,2,3,4,5].copyWithin(0, 3):', copyWithin);

// 4. Array.prototype.entries()
console.log('4. Array.prototype.entries()');
const arrEntries = [ ...fruits.entries() ];
console.log('\t[...fruits.entries()]:', arrEntries);

// 5. Array.prototype.every()
console.log('5. Array.prototype.every()');
console.log('\tnumbers.every(x => x > 0):', numbers.every(x => x > 0));
console.log('\tnumbers.every(x => x > 3):', numbers.every(x => x > 3));

// 6. Array.prototype.fill()
console.log('6. Array.prototype.fill()');
const fill = [ 1, 2, 3, 4, 5 ].fill(0, 2, 4);
console.log('\t[1,2,3,4,5].fill(0, 2, 4):', fill);

// 7. Array.prototype.filter()
console.log('7. Array.prototype.filter()');
const filter = numbers.filter(x => x > 2);
console.log('\tnumbers.filter(x => x > 2):', filter);

// 8. Array.prototype.find()
console.log('8. Array.prototype.find()');
const find = numbers.find(x => x > 3);
console.log('\tnumbers.find(x => x > 3):', find);

// 9. Array.prototype.findIndex()
console.log('9. Array.prototype.findIndex()');
const findIndex = numbers.findIndex(x => x > 3);
console.log('\tnumbers.findIndex(x => x > 3):', findIndex);

// 10. Array.prototype.findLast()
console.log('10. Array.prototype.findLast()');
const findLast = numbers.findLast(x => x > 2);
console.log('\tnumbers.findLast(x => x > 2):', findLast);

// 11. Array.prototype.findLastIndex()
console.log('11. Array.prototype.findLastIndex()');
const findLastIndex = numbers.findLastIndex(x => x > 2);
console.log('\tnumbers.findLastIndex(x => x > 2):', findLastIndex);

// 12. Array.prototype.flat()
console.log('12. Array.prototype.flat()');
const flat = nested.flat();
const flat2 = nested.flat(2);
console.log('\tnested.flat():', flat);
console.log('\tnested.flat(2):', flat2);

// 13. Array.prototype.flatMap()
console.log('13. Array.prototype.flatMap()');
const flatMap = [ 1, 2, 3 ].flatMap(x => [ x, x * 2 ]);
console.log('\t[1,2,3].flatMap(x => [x, x * 2]):', flatMap);

// 14. Array.prototype.forEach()
console.log('14. Array.prototype.forEach()');
console.log('\tfruits.forEach():');
fruits.forEach((fruit, index) => {
	console.log(`\t  [${index}]: ${fruit}`);
});

// 15. Array.prototype.includes()
console.log('15. Array.prototype.includes()');
console.log('\tfruits.includes("banana"):', fruits.includes('banana'));
console.log('\tfruits.includes("pera"):', fruits.includes('pera'));

// 16. Array.prototype.indexOf()
console.log('16. Array.prototype.indexOf()');
console.log('\tfruits.indexOf("naranja"):', fruits.indexOf('naranja'));
console.log('\tfruits.indexOf("pera"):', fruits.indexOf('pera'));

// 17. Array.prototype.join()
console.log('17. Array.prototype.join()');
const join = fruits.join(' - ');
console.log('\tfruits.join(" - "):', join);

// 18. Array.prototype.keys()
console.log('18. Array.prototype.keys()');
const arrKeys = [ ...fruits.keys() ];
console.log('\t[...fruits.keys()]:', arrKeys);

// 19. Array.prototype.lastIndexOf()
console.log('19. Array.prototype.lastIndexOf()');
const repeated = [ 1, 2, 3, 2, 1 ];
console.log('\t[1,2,3,2,1].lastIndexOf(2):', repeated.lastIndexOf(2));

// 20. Array.prototype.map()
console.log('20. Array.prototype.map()');
const map = numbers.map(x => x * 2);
console.log('\tnumbers.map(x => x * 2):', map);

// 21. Array.prototype.pop()
console.log('21. Array.prototype.pop()');
const popArray = [ 1, 2, 3, 4, 5 ];
const popped = popArray.pop();
console.log('\t[1,2,3,4,5].pop():', popped);
console.log('\tArray después del pop:', popArray);

// 22. Array.prototype.push()
console.log('22. Array.prototype.push()');
const pushArray = [ 1, 2, 3 ];
const newLength = pushArray.push(4, 5);
console.log('\t[1,2,3].push(4, 5) - nueva longitud:', newLength);
console.log('\tArray después del push:', pushArray);

// 23. Array.prototype.reduce()
console.log('23. Array.prototype.reduce()');
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log('\tnumbers.reduce((acc, curr) => acc + curr, 0):', sum);

// 24. Array.prototype.reduceRight()
console.log('24. Array.prototype.reduceRight()');
const reduceRight = [ 1, 2, 3, 4 ].reduceRight((acc, curr) => acc + curr);
console.log('\t[1,2,3,4].reduceRight((acc, curr) => acc + curr):', reduceRight);

// 25. Array.prototype.reverse()
console.log('25. Array.prototype.reverse()');
const reverseArray = [ 1, 2, 3, 4, 5 ];
reverseArray.reverse();
console.log('\t[1,2,3,4,5].reverse():', reverseArray);

// 26. Array.prototype.shift()
console.log('26. Array.prototype.shift()');
const shiftArray = [ 1, 2, 3, 4, 5 ];
const shifted = shiftArray.shift();
console.log('\t[1,2,3,4,5].shift():', shifted);
console.log('\tArray después del shift:', shiftArray);

// 27. Array.prototype.slice()
console.log('27. Array.prototype.slice()');
const slice = numbers.slice(1, 4);
console.log('\tnumbers.slice(1, 4):', slice);

// 28. Array.prototype.some()
console.log('28. Array.prototype.some()');
console.log('\tnumbers.some(x => x > 4):', numbers.some(x => x > 4));
console.log('\tnumbers.some(x => x > 10):', numbers.some(x => x > 10));

// 29. Array.prototype.sort()
console.log('29. Array.prototype.sort()');
const sortArray = [ 3, 1, 4, 1, 5, 9, 2 ];
sortArray.sort((a, b) => a - b);
console.log('\t[3,1,4,1,5,9,2].sort((a,b) => a - b):', sortArray);

// 30. Array.prototype.splice()
console.log('30. Array.prototype.splice()');
const spliceArray = [ 1, 2, 3, 4, 5 ];
const removed = spliceArray.splice(2, 2, 'a', 'b');
console.log('\t[1,2,3,4,5].splice(2, 2, "a", "b") - removidos:', removed);
console.log('\tArray después del splice:', spliceArray);

// 31. Array.prototype.toLocaleString()
console.log('31. Array.prototype.toLocaleString()');
const date = new Date();
const localeArray = [ 123456.789, date, 'texto' ];
console.log('\t[123456.789, date, "texto"].toLocaleString():', localeArray.toLocaleString());

// 32. Array.prototype.toReversed()
console.log('32. Array.prototype.toReversed()');
const toReversed = numbers.toReversed();
console.log('\tnumbers.toReversed():', toReversed);
console.log('\tnumbers (sin modificar):', numbers);

// 33. Array.prototype.toSorted()
console.log('33. Array.prototype.toSorted()');
const unsorted = [ 3, 1, 4, 1, 5 ];
const toSorted = unsorted.toSorted((a, b) => a - b);
console.log('\t[3,1,4,1,5].toSorted((a,b) => a - b):', toSorted);
console.log('\tArray original:', unsorted);

// 34. Array.prototype.toSpliced()
console.log('34. Array.prototype.toSpliced()');
const toSpliced = numbers.toSpliced(2, 2, 'x', 'y');
console.log('\tnumbers.toSpliced(2, 2, "x", "y"):', toSpliced);
console.log('\tnumbers (sin modificar):', numbers);

// 35. Array.prototype.toString()
console.log('35. Array.prototype.toString()');
console.log('\tnumbers.toString():', numbers.toString());

// 36. Array.prototype.unshift()
console.log('36. Array.prototype.unshift()');
const unshiftArray = [ 3, 4, 5 ];
const newLength2 = unshiftArray.unshift(1, 2);
console.log('\t[3,4,5].unshift(1, 2) - nueva longitud:', newLength2);
console.log('\tArray después del unshift:', unshiftArray);

// 37. Array.prototype.values()
console.log('37. Array.prototype.values()');
const arrValues = [ ...numbers.values() ];
console.log('\t[...numbers.values()]:', arrValues);

// 38. Array.prototype.with()
console.log('38. Array.prototype.with()');
const withArray = numbers.with(2, 999);
console.log('\tnumbers.with(2, 999):', withArray);
console.log('\tnumbers (sin modificar):', numbers);

// 39. Array.prototype[@@iterator]()
console.log('39. Array.prototype[@@iterator]()');
console.log('\tIterando numbers con for...of:');
for (const num of numbers) {
	console.log('\t-', num);
}

// *** FIN: MÉTODOS DE INSTANCIA *** //

console.log(`===============================
         FIN: ARRAYS
===============================`);

// ===============================
//          FIN: ARRAYS
// ===============================




// ===============================
//        INICIO: SETS
// ===============================

console.log(`===============================
       INICIO: SETS
===============================`);

const set1 = new Set([1, 2, 3, 4, 5]);
const set2 = new Set([4, 5, 6, 7, 8]);
const set3 = new Set(['a', 'b', 'c']);

console.log('=== SETS INICIALES ===');
console.log('set1:', set1);
console.log('set2:', set2);
console.log('set3:', set3);
console.log('\n');

// *** INICIO: MÉTODOS DE INSTANCIA *** //
/*
  1. Set.prototype.add()
  2. Set.prototype.clear()
  3. Set.prototype.delete()
  4. difference()
  5. Set.prototype.entries()
  6. forEach()
  7. Set.prototype.has()
  8. intersection()
  9. isDisjointFrom()
  10. isSubsetOf()
  11. isSupersetOf()
  12. keys()
  13. symmetricDifference()
  14. union()
  15. Set.prototype.values()
  16. Set.prototype[@@iterator]()
*/

console.log('=== MÉTODOS DE INSTANCIA ===');

// 1. Set.prototype.add()
console.log('1. Set.prototype.add()');
const addSet = new Set([ 1, 2, 3 ]);
addSet.add(4);
addSet.add(5);
console.log('\tnew Set([1,2,3]).add(4).add(5):', addSet);

// 2. Set.prototype.clear()
console.log('2. Set.prototype.clear()');
const clearSet = new Set([ 1, 2, 3 ]);
clearSet.clear();
console.log('\tnew Set([1,2,3]).clear():', clearSet);

// 3. Set.prototype.delete()
console.log('3. Set.prototype.delete()');
const deleteSet = new Set([ 1, 2, 3, 4, 5 ]);
const deleted = deleteSet.delete(3);
console.log('\tnew Set([1,2,3,4,5]).delete(3):', deleted);
console.log('\tSet después del delete:', deleteSet);

// 4. Set.prototype.difference()
console.log('4. Set.prototype.difference()');
const difference = set1.difference(set2);
console.log('\tset1.difference(set2):', difference);

// 5. Set.prototype.entries()
console.log('5. Set.prototype.entries()');
const setEntries = [ ...set3.entries() ];
console.log('\t[...set3.entries()]:', setEntries);

// 6. Set.prototype.forEach()
console.log('6. Set.prototype.forEach()');
console.log('\tset3.forEach():');
set3.forEach((value) => {
	console.log('\t-', value);
});

// 7. Set.prototype.has()
console.log('7. Set.prototype.has()');
console.log('\tset1.has(3):', set1.has(3));
console.log('\tset1.has(10):', set1.has(10));

// 8. Set.prototype.intersection()
console.log('8. Set.prototype.intersection()');
const intersection = set1.intersection(set2);
console.log('\tset1.intersection(set2):', intersection);

// 9. Set.prototype.isDisjointFrom()
console.log('9. Set.prototype.isDisjointFrom()');
console.log('\tset1.isDisjointFrom(set2):', set1.isDisjointFrom(set2));
console.log('\tset1.isDisjointFrom(set3):', set1.isDisjointFrom(set3));

// 10. Set.prototype.isSubsetOf()
console.log('10. Set.prototype.isSubsetOf()');
const subset = new Set([1, 2]);
console.log('\tnew Set([1,2]).isSubsetOf(set1):', subset.isSubsetOf(set1));
console.log('\tset1.isSubsetOf(set2):', set1.isSubsetOf(set2));

// 11. Set.prototype.isSupersetOf()
console.log('11. Set.prototype.isSupersetOf()');
console.log('\tset1.isSupersetOf(new Set([1,2])):', set1.isSupersetOf(new Set([1, 2])));
console.log('\tset1.isSupersetOf(set2):', set1.isSupersetOf(set2));

// 12. Set.prototype.keys()
console.log('12. Set.prototype.keys()');
const setKeys = [ ...set3.keys() ];
console.log('\t[...set3.keys()]:', setKeys);

// 13. Set.prototype.symmetricDifference()
console.log('13. Set.prototype.symmetricDifference()');
const symmetricDiff = set1.symmetricDifference(set2);
console.log('\tset1.symmetricDifference(set2):', symmetricDiff);

// 14. Set.prototype.union()
console.log('14. Set.prototype.union()');
const union = set1.union(set2);
console.log('\tset1.union(set2):', union);

// 15. Set.prototype.values()
console.log('15. Set.prototype.values()');
const setValues = [ ...set1.values() ];
console.log('\t[...set1.values()]:', setValues);

// 16. Set.prototype[@@iterator]()
console.log('16. Set.prototype[@@iterator]()');
console.log('\tIterando set3 con for...of:');
for (const value of set3) {
	console.log('\t-', value);
}

// *** FIN: MÉTODOS DE INSTANCIA *** //

console.log(`===============================
         FIN: SETS
===============================`);

// ===============================
//          FIN: SETS
// ===============================




// ===============================
//        INICIO: MAPS
// ===============================

console.log(`===============================
       INICIO: MAPS
===============================`);

const map1 = new Map([
	['nombre', 'Juan'],
	['edad', 25],
	['ciudad', 'Lima']
]);

const map2 = new Map([
	[1, 'uno'],
	[2, 'dos'],
	[3, 'tres']
]);

console.log('=== OBJETOS INICIALES ===');
console.log('map1:', map1);
console.log('map2:', map2);
console.log('\n');

// *** INICIO: MÉTODOS ESTÁTICOS *** //
/*
  1. Map.groupBy()
*/

console.log('=== MÉTODOS ESTÁTICOS ===');

// 1. Map.groupBy()
console.log('1. Map.groupBy()');
const items = [
	{ type: 'fruit', name: 'apple' },
	{ type: 'vegetable', name: 'carrot' },
	{ type: 'fruit', name: 'banana' }
];
const grouped = Map.groupBy(items, item => item.type);
console.log('\titems:', items);
console.log('\tMap.groupBy(items, item => item.type):', grouped);

console.log('\n');

// *** FIN: MÉTODOS DE INSTANCIA *** //

// *** INICIO: MÉTODOS DE INSTANCIA *** //
/*
  1. Map.prototype.clear()
  2. Map.prototype.delete()
  3. Map.prototype.entries()
  4. Map.prototype.forEach()
  5. Map.prototype.get()
  6. getOrInsert() (EXPERIMENTAL)
  7. getOrInsertComputed() (EXPERIMENTAL)
  8. Map.prototype.has()
  9. Map.prototype.keys()
  10. Map.prototype.set()
  11. Map.prototype.values()
  12. Map.prototype[Symbol.iterator]()
*/

console.log('=== MÉTODOS DE INSTANCIA ===');

// 1. Map.prototype.clear()
console.log('1. Map.prototype.clear()');
const clearMap = new Map([ ['a', 1], ['b', 2] ]);
clearMap.clear();
console.log(`\tnew Map([['a',1],['b',2]]).clear():`, clearMap);

// 2. Map.prototype.delete()
console.log('2. Map.prototype.delete()');
const deleteMap = new Map([ ['a', 1], ['b', 2], ['c', 3] ]);
const mapDeleted = deleteMap.delete('b');
console.log(`\tmap.delete('b'):`, mapDeleted);
console.log('\tMap después del delete:', deleteMap);

// 3. Map.prototype.entries()
console.log('3. Map.prototype.entries()');
const mapEntries = [ ...map1.entries() ];
console.log('\t[...map1.entries()]:', mapEntries);

// 4. Map.prototype.forEach()
console.log('4. Map.prototype.forEach()');
console.log('\tmap1.forEach():');
map1.forEach((value, key) => {
	console.log(`\t  ${key}: ${value}`);
});

// 5. Map.prototype.get()
console.log('5. Map.prototype.get()');
console.log('\tmap1.get("nombre"):', map1.get('nombre'));
console.log('\tmap1.get("apellido"):', map1.get('apellido'));

// 6. Map.prototype.getOrInsert() (EXPERIMENTAL)
console.log('6. Map.prototype.getOrInsert() (EXPERIMENTAL)');
console.log('\t(Método experimental - puede no estar disponible)');
// const getOrInsert = map1.getOrInsert('pais', 'Perú');

// 7. Map.prototype.getOrInsertComputed() (EXPERIMENTAL)
console.log('7. Map.prototype.getOrInsertComputed() (EXPERIMENTAL)');
console.log('\t(Método experimental - puede no estar disponible)');
// const getOrInsertComputed = map1.getOrInsertComputed('id', () => Date.now());

// 8. Map.prototype.has()
console.log('8. Map.prototype.has()');
console.log('\tmap1.has("nombre"):', map1.has('nombre'));
console.log('\tmap1.has("apellido"):', map1.has('apellido'));

// 9. Map.prototype.keys()
console.log('9. Map.prototype.keys()');
const mapKeys = [ ...map1.keys() ];
console.log('\t[...map1.keys()]:', mapKeys);

// 10. Map.prototype.set()
console.log('10. Map.prototype.set()');
const setMap = new Map();
setMap.set('a', 1);
setMap.set('b', 2);
setMap.set('c', 3);
console.log('\tmap.set("a",1).set("b",2).set("c",3):', setMap);

// 11. Map.prototype.values()
console.log('11. Map.prototype.values()');
const mapValues = [ ...map1.values() ];
console.log('\t[...map1.values()]:', mapValues);

// 12. Map.prototype[Symbol.iterator]()
console.log('12. Map.prototype[Symbol.iterator]()');
console.log('\tIterando map2 con for...of:');
for (const [key, value] of map2) {
	console.log(`\t  ${key}: ${value}`);
}

// *** FIN: MÉTODOS DE INSTANCIA *** //

console.log(`===============================
         FIN: MAPS
===============================`);

// ===============================
//          FIN: MAPS
// ===============================