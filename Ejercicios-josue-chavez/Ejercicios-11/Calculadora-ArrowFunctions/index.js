const hist = document.getElementById("history");
const tot = document.getElementById("total");
let current = "";
let previous = null;
let op = null;

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => a / b;

const compute = () => {
    if (previous === null || op === null || current === "") return;
    const a = Number(previous);
    const b = Number(current);
    let res = 0;
    if (op === "+") res = add(a, b);
    if (op === "-") res = sub(a, b);
    if (op === "*") res = mul(a, b);
    if (op === "/") res = div(a, b);
    previous = String(res);
    current = "";
    op = null;
    update();
    };

    const update = () => {
    hist.textContent = previous
        ? previous + (op ? " " + op : "") + (current ? " " + current : "")
        : current || "";
    tot.textContent = current || previous || "0";
    };

    document.getElementById("keyboard").addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const action = btn.dataset.action;

    if (action === "num") {
        const val = btn.textContent;
        if (val === "." && current.includes(".")) return;
        current = current === "0" && val !== "." ? val : current + val;
        update();
    } else if (action === "op") {
        const v = btn.dataset.value;
        if (v === "%") {
        if (current) current = String(Number(current) / 100);
        else if (previous) previous = String(Number(previous) / 100);
        update();
        return;
        }
        if (current === "" && previous === null) return;
        if (previous !== null && current !== "") {
        compute();
        op = v;
        } else {
        if (current !== "") {
            previous = current;
            current = "";
        }
        op = v;
        }
        update();
    } else if (action === "equals") {
        if (previous !== null && (op !== null || current !== "")) {
        if (op && current !== "") compute();
        update();
        }
    } else if (action === "clear") {
        current = "";
        previous = null;
        op = null;
        update();
    } else if (action === "neg") {
        if (current) current = String(-Number(current));
        else if (previous) previous = String(-Number(previous));
        update();
    }
});

update();
