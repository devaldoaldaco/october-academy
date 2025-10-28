const hist = document.getElementById("history");
const tot = document.getElementById("total");
let curr = "";
let prev = null;
let operador = null;

function add(...nums) {
    return nums.reduce((a, b) => a + b, 0);
}

function sub(a, b) {
    return a - b;
}

function mul(...nums) {
    return nums.reduce((a, b) => a * b, 1);
}

function div(a, b) {
    return a / b;
}

function operate(op, ...nums) {
    if (op === "+") return add(...nums);
    if (op === "-") return sub(...nums);
    if (op === "*") return mul(...nums);
    if (op === "/") return div(...nums);
    return nums[0] || 0;
}

function render() {
    hist.textContent =
        prev !== null
        ? prev + (operador ? " " + operador : "") + (curr ? " " + curr : "")
        : curr || "";
    tot.textContent = curr || prev || "0";
}

document.getElementById("keyboard").addEventListener("click", function (e) {
    const btn = e.target.closest("button");
    if (!btn) return;
    const action = btn.dataset.action;

    if (action === "num") {
        const v = btn.textContent;
        if (v === "." && curr.includes(".")) return;
        curr = curr === "0" && v !== "." ? v : curr + v;
        render();
    } else if (action === "op") {
        const v = btn.dataset.value;
        if (v === "%") {
        if (curr) curr = String(Number(curr) / 100);
        else if (prev) prev = String(Number(prev) / 100);
        render();
        return;
        }
        if (curr === "" && prev === null) return;
        if (prev !== null && curr !== "") {
        const result = operate(operador, Number(prev), Number(curr));
        prev = String(result);
        curr = "";
        operador = v;
        } else {
        if (curr !== "") {
            prev = curr;
            curr = "";
        }
        operador = v;
        }
        render();
    } else if (action === "equals") {
        if (prev !== null && operador && curr !== "") {
        const r = operate(operador, Number(prev), Number(curr));
        prev = String(r);
        curr = "";
        operador = null;
        render();
        }
    } else if (action === "clear") {
        curr = "";
        prev = null;
        operador = null;
        render();
    } else if (action === "neg") {
        if (curr) curr = String(-Number(curr));
        else if (prev) prev = String(-Number(prev));
        render();
    }
});

render();
