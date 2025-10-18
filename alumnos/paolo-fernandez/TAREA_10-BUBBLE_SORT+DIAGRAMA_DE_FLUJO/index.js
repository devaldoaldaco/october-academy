function bubbleSort(list) {
  if (!Array.isArray(list)) throw new TypeError(`El argumento "list" no es un arreglo válido`);

  const sortedList = [ ...list ];

  for (let i = 0; i < sortedList.length - 1; i++) {
    const offset = i + 1;

    for (let j = 0; j < sortedList.length - offset; j++) {
      if (sortedList[j] > sortedList[j + 1]) {
        const aux = sortedList[j];
        sortedList[j] = sortedList[j + 1];
        sortedList[j + 1] = aux;
      }
    }
  }
  
  return sortedList;
}

console.log(bubbleSort([14, 1, 133, 9, 5, 15, 8, 132, 12, 13, 8, 7, 8]));
console.log(bubbleSort([3, 1, 2]));
