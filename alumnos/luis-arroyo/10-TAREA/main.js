const numerosDesordenados = [
  85, 12, 99, 45, 76, 33, 58, 21, 64, 9, 100, 3, 50, 77, 18, 41, 92, 29, 6, 88,
  55, 14, 71, 2, 39, 95, 61, 24, 80, 7, 49, 16, 31, 8, 73,
];

/**
 * @param {Array} array
 * @returns {Array}
 */

const bubbleSort = (array, swapFn) => {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        swapFn(array, j, j + 1);
      }
    }
  }
  return array;
};

const swapFn = (array, idx1, idx2) => {
  const aux = array[idx1];
  array[idx1] = array[idx2];
  array[idx2] = aux;
};

console.log(bubbleSort(numerosDesordenados, swapFn));
