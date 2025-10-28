// 1. IMPLEMENTACIÓN DE map()
Array.prototype.customMap = function(callback) {
  if (typeof callback !== 'function') throw new TypeError('No es una función válida');

  const result = [];

  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }

  return result;
}

// 2. IMPLEMENTACIÓN DE filter()
Array.prototype.customFilter = function(callback) {
  if (typeof callback !== 'function') throw new TypeError('No es una función válida');

  const result = [];

  for (let i = 0; i < this.length; i++) {
		if (callback(this[i], i, this)) {
			result.push(this[i]);
		}
	}
	return result;
}

// 3. IMPLEMENTACIÓN DE reduce()
Array.prototype.customReduce = function(callback, initialValue) {
  if (typeof callback !== 'function') throw new TypeError('No es una función válida');

	let accumulator = initialValue === undefined ? this[0] : initialValue;
	let startIndex = initialValue === undefined ? 1 : 0;
	
	for (let i = startIndex; i < this.length; i++) {
		accumulator = callback(accumulator, this[i], i, this);
	}
	
	return accumulator;
};

console.log('===== FUNCIONES PERSONALIZADAS =====\n');
console.log('=== customMap() ===');
console.log(Array.prototype.customMap);
console.log('\n');

console.log('=== customFilter() ===');
console.log(Array.prototype.customFilter);
console.log('\n');

console.log('=== customReduce() ===');
console.log(Array.prototype.customReduce);
console.log('\n');


// ===== PRUEBAS =====
console.log('===== PRUEBAS DE IMPLEMENTACIONES PERSONALIZADAS =====\n');

const numbers = [1, 2, 3, 4, 5];

// PRUEBA customMap()
console.log('=== customMap() ===');
const doubled = numbers.customMap(x => x * 2);
console.log('Original:', numbers);
console.log('Duplicados:', doubled);
console.log('\n');

// PRUEBA customFilter()
console.log('=== customFilter() ===');
const evens = numbers.customFilter(x => x % 2 === 0);
console.log('Original:', numbers);
console.log('Pares:', evens);
console.log('\n');

// Prueba customReduce()
console.log('=== customReduce() ===');
const sum = numbers.customReduce((acc, curr) => acc + curr, 0);
const product = numbers.customReduce((acc, curr) => acc * curr, 1);
console.log('Original:', numbers);
console.log('Suma:', sum);
console.log('Producto:', product);
console.log('\n');

// Comparación con métodos nativos
console.log('=== COMPARACIÓN CON MÉTODOS NATIVOS ===');
console.log('customMap vs map:', 
	JSON.stringify(numbers.customMap(x => x * 2)) === JSON.stringify(numbers.map(x => x * 2))
);
console.log('customFilter vs filter:', 
	JSON.stringify(numbers.customFilter(x => x > 2)) === JSON.stringify(numbers.filter(x => x > 2))
);
console.log('customReduce vs reduce:', 
	numbers.customReduce((a, b) => a + b, 0) === numbers.reduce((a, b) => a + b, 0)
);