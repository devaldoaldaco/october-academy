/*
Ejercicio 5 — Clases con campos privados y prototype methods (interoperabilidad)

Tarea: Implementa BankAccount usando campos privados de clase (#balance) y métodos públicos en prototype (ej: deposit, withdraw, toString).

Asegura que el campo privado no sea accesible desde instancias ni desde prototype.

Añade un método estático BankAccount.transfer(from, to, amount) que use los métodos públicos.
Firma sugerida: class BankAccount { #balance = 0; constructor(...) { } ... }
Restricción: demostrar que BankAccount.prototype.hasOwnProperty('#balance') es false.
Pista: los campos privados no aparecen en el objeto ni en el prototipo; muestra pruebas.
*/

class BankAccount {
    #balance = 0; // campo privado

    constructor(owner, initial = 0) {
        this.owner = owner;
        this.#balance = initial;
    }

    deposit(amount) {
        if (amount <= 0) throw new Error('amount must be positive');
        this.#balance += amount;
        return this.#balance;
    }

    withdraw(amount) {
        if (amount <= 0) throw new Error('amount must be positive');
        if (amount > this.#balance) throw new Error('insufficient funds');
        this.#balance -= amount;
        return this.#balance;
    }

    toString() {
        return `BankAccount(${this.owner}): balance=${this.#balance}`;
    }

    _getBalanceForTest() {
        return this.#balance;
    }

    static transfer(from, to, amount) {
        if (!(from instanceof BankAccount) || !(to instanceof BankAccount)) {
        throw new Error('from and to must be BankAccount instances');
        }
        from.withdraw(amount);
        to.deposit(amount);
        return true;
    }
}

// Pruebas:
const a = new BankAccount('Alice', 100);
const b = new BankAccount('Bob', 50);
console.log(a.toString());
a.deposit(25);
console.log(a._getBalanceForTest());

BankAccount.transfer(a, b, 25);
console.log(a._getBalanceForTest(), b._getBalanceForTest()); 

console.log('Properties of instance:', Object.getOwnPropertyNames(a));
console.log('BankAccount.prototype has own "#balance"?', BankAccount.prototype.hasOwnProperty('#balance'));

console.log('own property names prototype:', Object.getOwnPropertyNames(BankAccount.prototype));
