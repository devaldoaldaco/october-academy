const hist = document.getElementById("history");
const tot = document.getElementById("total");

let inputBuffer = "";
let tokens = [];

const precedence = (op) => {
    if (op === "+" || op === "-") return 1;
    if (op === "*" || op === "/") return 2;
    return 0;
};

const isOp = (t) => ["+", "-", "*", "/", "%"].includes(t);

function shuntingYard(infixTokens) {
    const out = [];
    const stack = [];
    for (const t of infixTokens) {
        if (typeof t === "number") out.push(t);
        else if (isOp(t)) {
        while (
            stack.length &&
            isOp(stack[stack.length - 1]) &&
            precedence(stack[stack.length - 1]) >= precedence(t)
        ) {
            out.push(stack.pop());
        }
        stack.push(t);
        }
    }
    while (stack.length) out.push(stack.pop());
    return out;
}

function evalPostfix(postfix) {
    const s = [];
    for (const t of postfix) {
        if (typeof t === "number") s.push(t);
        else if (isOp(t)) {
        const b = s.pop();
        const a = s.pop();
        let r = 0;
        if (t === "+") r = a + b;
        if (t === "-") r = a - b;
        if (t === "*") r = a * b;
        if (t === "/") r = a / b;
        if (t === "%") r = a % b;
        s.push(r);
        }
    }
    return s.length ? s[0] : 0;
}

function updateView() {
    const histText = tokens
        .map((t) => (typeof t === "number" ? String(t) : t))
        .join(" ");
    hist.textContent = (histText + (inputBuffer ? " " + inputBuffer : "")).trim();
    tot.textContent =
        inputBuffer || (tokens.length ? String(tokens[tokens.length - 1]) : "0");
}

document.getElementById("keyboard").addEventListener("click", function (e) {
    const btn = e.target.closest("button");
    if (!btn) return;
    const action = btn.dataset.action;

    if (action === "num") {
        const v = btn.textContent;
        if (v === "." && inputBuffer.includes(".")) return;
        inputBuffer = inputBuffer === "0" && v !== "." ? v : inputBuffer + v;
        updateView();
    } else if (action === "op") {
        const v = btn.dataset.value;
        if (v === "%") {
        if (inputBuffer) inputBuffer = String(Number(inputBuffer) / 100);
        else if (tokens.length)
            tokens[tokens.length - 1] = Number(tokens[tokens.length - 1]) / 100;
        updateView();
        return;
        }
        if (inputBuffer === "" && tokens.length === 0) return;
        if (inputBuffer !== "") tokens.push(Number(inputBuffer));
        tokens.push(v);
        inputBuffer = "";
        updateView();
    } else if (action === "equals") {
        if (inputBuffer !== "") tokens.push(Number(inputBuffer));
        if (tokens.length === 0) return;
        const postfix = shuntingYard(tokens);
        const res = evalPostfix(postfix);
        tokens = [res];
        inputBuffer = "";
        updateView();
    } else if (action === "clear") {
        tokens = [];
        inputBuffer = "";
        updateView();
    } else if (action === "neg") {
        if (inputBuffer) inputBuffer = String(-Number(inputBuffer));
        else if (tokens.length)
        tokens[tokens.length - 1] = -Number(tokens[tokens.length - 1]);
        updateView();
    }
});

updateView();
