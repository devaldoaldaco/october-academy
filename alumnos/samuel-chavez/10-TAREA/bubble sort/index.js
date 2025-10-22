const arrayPrueba = [7, 5, 2, 8];

for (let i = 0; i < arrayPrueba.length; i++) {
  let aux = 0;
  for (let j = 0; j < arrayPrueba.length-i-1; j++) {
    if (arrayPrueba[j + 1] < arrayPrueba[j]) {
      aux = arrayPrueba[j + 1];
      arrayPrueba[j + 1] = arrayPrueba[j];
      arrayPrueba[j] = aux;
    }
  }
}

console.log("el valor de menor a mayor es: ", arrayPrueba);
