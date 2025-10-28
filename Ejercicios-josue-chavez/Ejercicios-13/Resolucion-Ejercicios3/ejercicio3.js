/**
Ejercicio 3 — Agregación vs composición (modelado de relaciones)

Tarea: Modela una Library que agrega Books y compone Shelfs.

Book es un objeto independiente (puede existir fuera de la Library).

Shelf pertenece exclusivamente a una Library (si la Library se clona, sus Shelfs también deben clonarse).

Implementa métodos para: library.addBook(book), library.addShelf(shelf), library.moveBook(bookId, fromShelfId, toShelfId).
Firma sugerida: clases Book, Shelf, Library.
Restricción: demuestra la diferencia: clonar un Book compartido vs clonar la Library debe deep-clonar Shelfs.
Pista: para composición, usa clonación defensiva en el constructor de Library.
*/

class Book {
    constructor(id, title, author) {
        this.id = id;
        this.title = title;
        this.author = author;
    }
}

class Shelf {
    constructor(id) {
        this.id = id;
        this.bookIds = [];
    }

    addBook(book) {
        if (!this.bookIds.includes(book.id)) this.bookIds.push(book.id);
    }

    removeBook(bookId) {
        this.bookIds = this.bookIds.filter(id => id !== bookId);
    }

    clone() {
        const s = new Shelf(this.id + '_clone');
        s.bookIds = [...this.bookIds];
        return s;
    }
}

class Library {
    constructor(name, { cloneShelves = true } = {}) {
        this.name = name;
        this.books = new Map();
        this.shelves = new Map();
        this._cloneShelves = cloneShelves;
    }

    addBook(book) {
        if (!this.books.has(book.id)) this.books.set(book.id, book);
    }

    addShelf(shelf) {
        const s = shelf.clone ? shelf.clone() : new Shelf(shelf.id);
        this.shelves.set(s.id, s);
        return s;
    }

    moveBook(bookId, fromShelfId, toShelfId) {
        const from = this.shelves.get(fromShelfId);
        const to = this.shelves.get(toShelfId);
        if (!from) throw new Error('from shelf not found');
        if (!to) throw new Error('to shelf not found');
        from.removeBook(bookId);
        if (!to.bookIds.includes(bookId)) to.bookIds.push(bookId);
    }

    clone() {
        const lib = new Library(this.name + ' (clone)');
        for (const [id, book] of this.books) {
        lib.books.set(id, book);
        }
        for (const [id, shelf] of this.shelves) {
        lib.shelves.set(id, shelf.clone());
        }
        return lib;
    }
}

const b1 = new Book('b1', 'Clean Code', 'Robert C. Martin');
const shelfA = new Shelf('A');
shelfA.addBook(b1);

const lib1 = new Library('Central');
lib1.addBook(b1);
lib1.addShelf(shelfA);
const shelfInside = lib1.shelves.get('A_clone') || lib1.shelves.get('A');
console.log('Lib1 shelves:', [...lib1.shelves.keys()]);

const lib2 = lib1.clone();
console.log('Lib2 shelves:', [...lib2.shelves.keys()]);

const s2 = lib2.shelves.values().next().value;
s2.addBook(new Book('b2', 'You Don\'t Know JS', 'Kyle Simpson'));
console.log('lib2 shelf books:', s2.bookIds);
console.log('lib1 shelf books (should be original):', [...lib1.shelves.values()][0].bookIds);

console.log('Same Book object shared?', lib1.books.get('b1') === lib2.books.get('b1'));
