function infijo_a_postfijo(expresion) {
    const precedencia = { "+": 1, "-": 1, "*": 2, "/": 2 };

    let pila_operadores = [];
    let salida = [];

    let tokens = [];
    let numero = "";

    for (let i = 0; i < expresion.length; i++) {
        let char = expresion[i];

        if (!isNaN(char) && char !== " ") {
        numero += char;
        }
        else if (
        char === "+" ||
        char === "-" ||
        char === "*" ||
        char === "/" ||
        char === "(" ||
        char === ")"
        ) {
        if (numero !== "") {
            tokens.push(numero);
            numero = "";
        }
        tokens.push(char);
        }
        else if (char === " ") {
        if (numero !== "") {
            tokens.push(numero);
            numero = "";
        }
        }
    }

    if (numero !== "") {
        tokens.push(numero);
    }

    for (let token of tokens) {
        if (!isNaN(token)) {
        salida.push(token);
        }
        else if (token === "(") {
        pila_operadores.push(token);
        }
        else if (token === ")") {
        while (
            pila_operadores.length > 0 &&
            pila_operadores[pila_operadores.length - 1] !== "("
        ) {
            salida.push(pila_operadores.pop());
        }
        if (pila_operadores.length > 0) {
            pila_operadores.pop();
        }
        }
        else if (token in precedencia) {
        while (
            pila_operadores.length > 0 &&
            pila_operadores[pila_operadores.length - 1] !== "(" &&
            pila_operadores[pila_operadores.length - 1] in precedencia &&
            precedencia[pila_operadores[pila_operadores.length - 1]] >=
            precedencia[token]
        ) {
            salida.push(pila_operadores.pop());
        }
        pila_operadores.push(token);
        }
    }

    while (pila_operadores.length > 0) {
        salida.push(pila_operadores.pop());
    }

    return salida.join(" ");
}

function convertir() {
    const expresion = document.getElementById("expresion").value;

    if (expresion.trim() === "") {
        alert("Por favor ingresa una expresión");
        return;
    }

    try {
        const resultado = infijo_a_postfijo(expresion);
        document.getElementById("salida").textContent = resultado;
        document.getElementById("resultado").style.display = "block";
    } catch (error) {
        alert("Error al convertir la expresión");
    }
}

document.getElementById("expresion").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        convertir();
    }
});
