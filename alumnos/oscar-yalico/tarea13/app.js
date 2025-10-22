console.log("INICIA SCRIPT"); // call stack
window.setTimeout(() => console.log("hola"), 2000); // macrotask callback queue
Promise.resolve().then(() => console.log("mundo")); // microtask callback queue
console.log("FIN DEL SCRIPT"); // call stack
// Ejercicio: Crear una función que simule la obtención de datos desde una base de datos utilizando un callback.

// * Si se anidan muchos callbacks, se puede caer en el "callback hell".
function obtenerDatos(callback) {
  console.log("Obtener datos...");

  setTimeout(() => {
    const datos = { nombre: "Oscar", edad: 25 };
    callback(datos);
  }, 3000);
}

obtenerDatos((datos) => {
  console.log("Datos obtenidos:", datos);
});

const arr = [1, 2, 3, 4, 5];

const transformar = (n) => {
  return n * 2;
};

arr.map(transformar); // se ejecuta antes que promise porque es síncrono y es un microtask

// * fetch
const promise = fetch("https://jsonplaceholder.typicode.com/posts/1");
promise
  .then((response) => response.json()) // convierte la respuesta en JSON
  .then((data) => console.log(data)) // maneja los datos obtenidos
  .catch((error) => console.error("Error:", error)) // maneja errores
  .finally(() => console.log("Operación finalizada")); // se ejecuta al final, haya habido error o no

// * callback con promesas

function obtenerDatosPromesas() {
  const promise = new Promise((resolve, reject) => {
    const exito = false;
    setTimeout(() => {
      if (exito) {
        const datos = { nombre: "Oscar", edad: 90 };
        resolve(datos);
      } else {
        // reject("Error al obtener los datos");
        const errorgeo = new Error(
          "Error al obtener los datos - problema de geolocalización"
        );
        reject(errorgeo);
      }
    }, 3000);
  });
  return promise;
}

obtenerDatosPromesas()
  .then((datos) => console.log("Datos obtenidos con promesas:", datos))
  .catch((error) => console.error(error));

// metodos estáticos de Promise
Promise.all([ // cuando no me interesa el valor individual, sino que todas se completen
  // Espera a que todas las promesas se resuelvan o una falle
  obtenerDatosPromesas(),
  fetch("https://jsonplaceholder.typicode.com/posts/1").then((response) =>
    response.json()
  ),
])
  .then(([datosPromesa, datosFetch]) => {
    console.log("Datos obtenidos con Promise.all:");
    console.log("Promesa:", datosPromesa);
    console.log("Fetch:", datosFetch);
  })
  .catch((error) => console.error("Error en Promise.all:", error));

Promise.race([
  // Devuelve la primera promesa que se resuelva o falle
  obtenerDatosPromesas(),
  fetch("https://jsonplaceholder.typicode.com/posts/1").then((response) =>
    response.json()
  ),
])
  .then((primerResultado) => {
    console.log("Primer resultado obtenido con Promise.race:", primerResultado);
  })
  .catch((error) => console.error("Error en Promise.race:", error));

Promise.resolve("Valor resuelto inmediatamente").then((valor) =>
  console.log(valor)
);

Promise.reject("Error rechazado inmediatamente").catch((error) =>
  console.error(error)
);

// * async/await
// Estamos obligados a usar try/catch para manejar errores
async function obtenerDatos() {
  try {
    const respuesta = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    throw new Error("Error al obtener los datos con async/await");   
  } finally {
    console.log("Operación finalizada con async/await");
  }
}

// usar el valor de un fetch para otro fetch
async function obtenerDatosAnidados() {
  try {
    const respuesta1 = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const datos1 = await respuesta1.json();
    console.log("Datos del primer fetch:", datos1);
    const respuesta2 = await fetch(
      `https://jsonplaceholder.typicode.com/users/${datos1.userId}`
    );
    const datos2 = await respuesta2.json();
    console.log("Datos del segundo fetch:", datos2);
  } catch (error) {
    console.error("Error en obtenerDatosAnidados:", error);
  } finally {
    console.log("Operación finalizada en obtenerDatosAnidados");
  }
}