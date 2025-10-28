/**
 * Ordena un arreglo numérico usando el método burbuja.
 * @param {number[]} arreglo - Arreglo de números.
 * @returns {number[]} - Nuevo arreglo ordenado ascendentemente.
 */
function bubbleSort(arreglo) {
    if (!Array.isArray(arreglo)) throw new TypeError("Se esperaba un arreglo");

    const array = [...arreglo];
    const n = array.length;
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (array[i] > array[i + 1]) {
                const temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);

    return array;
}

const numeros = [5, 3, 8, 4, 2];
console.log(bubbleSort(numeros));
