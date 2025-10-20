const bubleSort = (arr) => {
  let size = arr.length;

  for (let i = 0; i < size; i++) { // va a iterar 9 veces
    for (let j = 0; j < size; j++) { // va a iterar 9 veces
      if (arr[j] > arr[j + 1]) { // verifica si el valor actual es mayor al sgte
        let tmp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = tmp;
      }
    }
  }

  return arr;
};

const arr = [12, 43, 1, 24, 23, 67, 34, 23, 43]; // ? length = 9
// *        [0 ,  1, 2, 3 , 4 , 5 ,  6 , 7,  8]
  
console.log(bubleSort(arr));
