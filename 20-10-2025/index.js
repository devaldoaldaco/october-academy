class Animal {
    constructor(nombre) {
        this.nombre = nombre ?? 'perrito';
    }

    hacerSonido() {
        console.log('Gerico ....');
    }
}

const murcielago = new Animal('asdjkjasdks');
murcielago.hacerSonido();

// class Perro extends Animal {
//     constructor(raza) {
//         super('kevin'); // Animal('kevin');
//         this.raza = raza;
//     }
// }




const mixini18n = (superClass) => class extends superClass {
    constructor(lang) {
        super();
        this.language = lang ?? 'EN';
    }
}

class Perro extends mixini18n(Animal) {
    constructor(raza) {
        super();
        this.raza = raza;
    }

    hacerSonido() {
        if(this.language === 'EN') {
            console.log('im pomeranian');
        } else {
            console.log('soy pomeranian');
        }
    }
}


const kevin = new Perro('Pomeranian');
console.log(kevin);
kevin.hacerSonido();

// 
class Motor {
    constructor() {
        this.numMotor = ''
    }

    encender() {
        console.log('RUN RUN RUN');
    }
}

class Auto {
    constructor(marca) {
        this.marca = marca ?? 'generico';
        this.modelo = '';
        this.cilindraje = '';
        this.motor = new Motor();
    }

    acelerar() {
        this.motor.encender();
        console.log('100kms/h');
    }
}




const bmw = new Auto('bmw');
bmw.motor.encender();
bmw.acelerar();


class Empresa {
    constructor(nombre) {
        this.nombre = nombre ?? 'PATITO SA de CV';
        this.departamentos = [];
    }

    agregarDepartamento(departamento) {
        this.departamentos.push(departamento);
    }
}

class Departamento {
    constructor(nombre) {
        this.nombre = nombre ?? 'TODOLOGIA'
    }
    tarea(task) {
        console.log(`Estoy haciendo: ${task}`);
    }
}

const ai = new Departamento('ai');
ai.tarea('quitar la chamba a los programadores');

const bbva = new Empresa('BBVA');
bbva.agregarDepartamento(ai);
bbva.departamentos[0].tarea('chambear');

console.log(bbva.departamentos)

class Curso {
    constructor(nombre) {
        this.nombre = nombre ?? 'DESARROLLO WEB';
    }

    get profe() {
        return this.profesor;
    }
}

const web = new Curso();

class Profesor {
    constructor() {
        this.experiencia = 0;
        this.nombre = 'SIN NOMBRE';
    }
}

const profe = new Profesor('aldo');

web.profesor = profe;

console.log(web.profe)