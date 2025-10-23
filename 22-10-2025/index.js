// Buscar elementos dentro del DOM
import * as calculadora from './calculator.js';

// const { Component } = require("react");

// const script = document.querySelector('body > script');
// console.log(script.id);
// script.id = 'scriptChido';
// console.log(script.id);
// console.log(script.__proto__);
// // const body = document.getElementsByName('body');
// // const body = document.getElementById('cuerpoDocumento');
// // const body = document.getElementsByClassName('azul');

// // LOOKING ELEMENTS
// const button = document.createElement('button');
// button.id = "myButton";
// console.log(button);
// // CREATING ELEMENTS
// let section = document.createElement('section');
// // ADDING ELEMENTS
// document.body.appendChild(section);

// section.appendChild(button);

// // MODIFYNG ELEMENTS
// button.value = 'CLICK';
// button.innerText = 'CLICK';
// console.log(button.value);
// button.style.backgroundColor = 'red';
// button.style.color = 'white';

// // REMOVING ELEMENTS
// // section.removeChild(button);
// // section.innerHTML = ``;

// function createImage (url) {
//     const img = document.createElement('img');
//     img.src = `${url}`;

//     document.body.append(img);
// }


// button.addEventListener('click', () => createImage('https://placehold.co/600x400'));

// document.body.innerHTML = `<h1>TITULO</h1>`;

// dispatchEvent(new CustomEvent('paso-algo', {bubbles: false, composed: true, detail: 'asas'}));

function render(name) {
    return `<p>${name}</p>`;
}

function root(root, tpl) {
    root.innerHTML += tpl;
}

root(document.body.querySelector('#myApp'), render('aldo'));

// // CUSTOM ELEMENTS
// window.customElements.define('product-card', ProductCard);

// // SHADOW DOM
// this.attachShadow({open: 'true'});
// this.shadowRoot.querySelector('div');

// ES Modules
console.log(calculadora.suma(1,2)); // 3

console.log(calculadora.resta(2,1))// 1

const template = document.querySelector('#tpl');

document.body.appendChild(template.content.cloneNode(true))