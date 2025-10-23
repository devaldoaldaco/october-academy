
// const body1 = document.querySelector('body');
// console.log(body1.id);
// console.log(body1.__proto__);

// const body2 = document.querySelector('body');
// console.log(body2.getAttribute('id'))

// const body3 = document.getElementById('body');

// const button = document.createElement('button');
// button.id = 'mi-boton';
// button.textContent = 'Presióname';
// body1.appendChild(button);
// console.log(button);

// const section = document.createElement('section')
// section.id = 'mi-seccion';
// body1.appendChild(section);
// section.appendChild(button);
// console.log(section);

// const crearImagen = (url) => {
//     const img = document.createElement('img');
//     img.src = `${url}`;
//     section.appendChild(img);
// }

// button.addEventListener('click', () => crearImagen('https://placehold.co/600x400'))

// document.body.innerHTML = `<h1></h1>Hola mundo</h1>`

// * web components
// https://www.webcomponents.org
// https://www.webcomponents.org/introduction

// ?  Custom Elements
// Registro de un nuevo elemento HTML

window.customElements.define('nuevo-elemento', ElementoPersonalizado);

class ElementoPersonalizado extends HTMLElement {
    constructor() {
        super();
        console.log('Mi elemento ha sido creado');
    }
}

// * o 

window.customElements.define('product-card', class extends HTMLElement {
    constructor() {
        super();
        console.log('Mi elemento ha sido creado');
    }
});

// ? Shadow DOM
// Proteger a las etiquetas hijas de estilos externos
// protege el html y css interno del componente

this.attachShadow({ open: true }); // modo abierto
this.shadowRoot.querySelector('selector');

// ? ES Modules
// ? HTML Template
/// sirve
const template = document.querySelector('#miTemplate')
document.body.appendChild(template.content.cloneNode(true))
