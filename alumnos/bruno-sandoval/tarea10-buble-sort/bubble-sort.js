const arreglo = [4,3,8,1,5,7,2,9,6];

function algoritmo(arreglo){
    for(let i = 0; i<arreglo.length;i++){
        for(let j = 0; j< (arreglo.length)-i -1;j++){
            if(arreglo[j]>arreglo[j+1]){
                let temp = arreglo[j];
                arreglo[j] = arreglo[j+1];
                arreglo[j+1] = temp;
            }
        }
    }
    console.log(arreglo)
}

algoritmo(arreglo);