const script = document.querySelector("body > script");
console.log(script.id);
script.id = "script.chido";
console.log(script.id);
console.log(script.__proto__);

const button = document.createElement("button");
button.id = "myButton";
console.log(button);

const section = document.createElement("section");
section.appendChild(button);
document.body.appendChild(section);
