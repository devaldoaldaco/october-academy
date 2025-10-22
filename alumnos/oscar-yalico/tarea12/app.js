class Animal {
  constructor(color, alimentacion, nombre) {
    this.color = color;
    this.alimentacion = alimentacion;
    this.nombre = nombre;
  }

  hacerRuido() {
    if (this.nombre === "Perro") {
      console.log("Guau Guau");
    } else {
      console.log("hace ruido");
    }
  }
}

const kevin = new Animal("marron", "croquetas", "Perro");
kevin.hacerRuido();

// Sobrescribiendo el método hacerRuido para este objeto en particular
kevin.hacerRuido = function () {
  console.log("Woof Woof");
};

const pedro = new Animal("marron", "croquetas", "Perro");

// Sobrescribiendo el método hacerRuido para todos los objetos de la clase Animal
Animal.prototype.hacerRuido = function () {
  if (this.nombre === "Perro") {
    console.log("Guau Miau");
  } else {
    console.log("hace ruido");
  }
};

pedro.hacerRuido();

// existen 2 formas de crear objetos con clase litera y funcion constructora
class Animal2 {
  #color;
  #alimentacion;
  #nombre;
  constructor(color, alimentacion, nombre) {
    this.#color = color;
    this.#alimentacion = alimentacion;
    this.#nombre = nombre;
  }
  get nombre() {
    return this.#nombre;
  }
  set nombre(nuevoNombre) {
    this.#nombre = nuevoNombre;
  }
}

pedro.nombre;
pedro["nombre"]; // ambas formas son validas para acceder a las propiedades de un objeto
