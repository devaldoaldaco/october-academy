// ---------------- STRING ----------------
function stringInstancia() {
  const texto = "Hola Mundo JS";
  const resultado = `
          text.length ➜ ${texto.length}
          text.toUpperCase() ➜ ${texto.toUpperCase()}
          text.toLowerCase() ➜ ${texto.toLowerCase()}
          text.includes("Mundo") ➜ ${texto.includes("Mundo")}
          text.replace("Mundo", "Amigo") ➜ ${texto.replace("Mundo", "Amigo")}
          text.slice(0, 4) ➜ ${texto.slice(0, 4)}
          text.split(" ") ➜ ${texto.split(" ")}
          text.trim() ➜ "${"  Hola  ".trim()}"
      `;
  document.getElementById("stringResultado").textContent = resultado;
}

function stringEstaticos() {
  const resultado = `
          String.fromCharCode(72, 79, 76, 65) ➜ ${String.fromCharCode(72, 79, 76, 65)}
          String.raw\`Hola\\nMundo\` ➜ ${String.raw`Hola\nMundo`}
          String("123") === "123" ➜ ${String("123") === "123"}
      `;
  document.getElementById("stringResultado").textContent = resultado;
}

// ---------------- NUMBER ----------------
function numberInstancia() {
  const num = 1234.567;
  const resultado = `
          num.toFixed(2) ➜ ${num.toFixed(2)}
          num.toPrecision(6) ➜ ${num.toPrecision(6)}
          num.toString(16) ➜ ${num.toString(16)}
          num.valueOf() ➜ ${num.valueOf()}
      `;
  document.getElementById("numberResultado").textContent = resultado;
}

function numberEstaticos() {
  const resultado = `
            Number.isInteger(5) ➜ ${Number.isInteger(5)}
            Number.parseInt("100px") ➜ ${Number.parseInt("100px")}
            Number.parseFloat("3.14 metros") ➜ ${Number.parseFloat("3.14 metros")}
            Number.isNaN(NaN) ➜ ${Number.isNaN(NaN)}
            Number.MAX_VALUE ➜ ${Number.MAX_VALUE}
        `;
  document.getElementById("numberResultado").textContent = resultado;
}

// ---------------- OBJECT ----------------
function objectInstancia() {
  const persona = { nombre: "Josue", edad: 23 };
  const resultado = `
            persona.hasOwnProperty("nombre") ➜ ${persona.hasOwnProperty("nombre")}
            persona.toString() ➜ ${persona.toString()}
            persona.valueOf() ➜ ${JSON.stringify(persona.valueOf())}
        `;
  document.getElementById("objectResultado").textContent = resultado;
}

function objectEstaticos() {
  const persona = { nombre: "Josue", edad: 23 };
  const resultado = `
          Object.keys(persona) ➜ ${Object.keys(persona)}
          Object.values(persona) ➜ ${Object.values(persona)}
          Object.entries(persona) ➜ ${JSON.stringify(Object.entries(persona))}
          Object.assign({}, persona, { ciudad: "Trujillo" }) ➜ ${JSON.stringify(Object.assign({}, persona, { ciudad: "Trujillo" }))}
          Object.freeze(persona) ➜ ${JSON.stringify(Object.freeze({ ...persona }))}
      `;
  document.getElementById("objectResultado").textContent = resultado;
}
