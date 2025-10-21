console.log('INICIA EL SCRIPT'); // call stack

window.setTimeout(() => console.log('setimout'), 0); // callback qeue

Promise.resolve().then(() => console.log('promise')); // callback qeue

console.log('FIN DEL SCRIPT'); // call stack

function obtenerDatos(callbackExito, callbackFracaso) {
    console.log('Obteniendo datos ....');
    setTimeout(() => {
        const datos = {nombre: 'Aldo'};
        if(Object.keys(datos).length) {
            callbackExito(datos);
        } else {
            callbackFracaso(datos);
        }
    }, 3000);
}

obtenerDatos((datos) => {console.log(datos)});

const arr = [1,2,3,4,5,6,7,8];

const transformar = (number) => {
    return number * 2;
}

console.log(arr.map(transformar));


const promise = fetch("https://jsonplaceholder.typicode.com/users/1");
promise
.then(informacion => informacion.json())
.then(datos => console.log(datos))
.then()
.catch(error => console.log(`ERROR: ${error}`))
.finally(() => {console.log('Se ejecuta siempre, no importa si la promesa fallo o fue exitosa')})

function obtenerDatos() {
    const promise = new Promise((_, reject) => {
        const exito = true; // aqui sucede la tarea asincrona dom, fetch, WEB Api
        setTimeout(() => {
            const error = new Error('error-geo');
            reject(error);
        }, 12000);
    });
    
    return promise;
}

obtenerDatos()
.then(exito => console.log(exito))
.catch(error => {console.log(error)});


// Promise.all([fetch(),fetch()])
// Promise.race([Geolocation.getCurrentPosition(), simulatePromise()]).catch(error => {});
// Promise.resolve()
// Promise.reject()

const obtenerUsuario = async () => {
    try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const response = await Promise.all([await fetch().then(),await fetch()]);
        const datos = await respuesta.json();
        console.log(datos);
    } catch(error) {
        console.log(error)
    } finally {
        console.log('siempre se ejecutara');
    }
}

obtenerUsuario();


Promise.all([fetch("https://jsonplaceholder.typicode.com/users/1"), fetch("https://jsonplaceholder.typicode.com/users/2")])
.then(iterableResponses => console.log(iterableResponses));

