//STRING
const cad = new String("string object created instance etc etc etc");
console.log(String.fromCharCode(51,665));
console.log(String.fromCodePoint(511,66));
// const path = `C:\Development\profile\about.html`; 
const path = String.raw`C:\Development\profile\about.html`; //UTILIZAR SOLO UN \ EN CADENAS NORMALES NO ES POSIBLE, CON STRING RAW SE SOLUCIONA

console.log(path)
console.log(path.at(1))
console.log(cad.charAt(4))
console.log(cad.charCodeAt(5))
console.log(cad.codePointAt(9))
console.log(cad.concat(" -> " + path))
console.log(cad.endsWith("etc"))
console.log(cad.includes("created"))
console.log(cad.indexOf("e"))
console.log("😀" + cad.isWellFormed());
console.log(cad.lastIndexOf("c"))
console.log(cad.length)
// console.log(cad.localeCompare("string object created instance etc etc etc"))
const regex = /^[A-Za-z\s]+$/
console.log(cad.match(regex))
console.log(cad.repeat(3))
console.log(cad.replace(cad,"system"))
console.log(cad.search("created"))
console.log(cad.slice(3,7))
console.log(cad.split(" "))
console.log(cad.startsWith("string"))
console.log(cad.substring(3,6))






//NUMBER

// Instance methods
const num = new Number("10230")
console.log(num.toExponential(3))
console.log(num.toFixed(3))
console.log(num.toLocaleString())
console.log(num.toPrecision(2))
console.log(num.toString())
console.log(num.valueOf())


//STATIC METHODS
console.log(Number.isFinite(3))
console.log(Number.isInteger(4))
console.log(Number.isNaN(NaN))
console.log(Number.isSafeInteger("2"))
console.log(Number.parseFloat("222.3"))
console.log(Number.parseInt("444"))

// Static properties
console.log(Number.EPSILON)
console.log(Number.MAX_SAFE_INTEGER)
console.log(Number.MAX_VALUE)
console.log(Number.MIN_SAFE_INTEGER)
console.log(Number.MIN_VALUE)
console.log(Number.NaN)
console.log(Number.NEGATIVE_INFINITY)
console.log(Number.POSITIVE_INFINITY)

//OBJECT
// Constructor
const person = new Object()
person.name = "Luis"
person.age = 25
person.email = "luisarroyo0330@gmail.com"

console.log(person)
const person2 = {name:"Josue"}
// Static methods
Object.assign(person,person2)
console.log(person)
Object.create(person2)
console.log(person2)
Object.defineProperties(person,{
    newProp:{
        value:"new"
    }
})
console.log(person)
// Object.defineProperty()
console.log(Object.entries(person))
Object.freeze(person)
person.name = "Cesar"
console.log(person.name) //no cambia porque se freezeo el object, no se puede restaurar
const personUnfreeze = {...person}
console.log(personUnfreeze)
personUnfreeze.name = "cesar"
console.log(personUnfreeze)

const entries = new Map([
  ["name", "Luis"],
  ["age", 25],
]);
console.log(Object.fromEntries(entries))

console.log(Object.getOwnPropertyDescriptor(personUnfreeze,"age"))
// Object.getOwnPropertyDescriptors()
console.log(Object.getOwnPropertyNames(personUnfreeze))
// Object.getOwnPropertySymbols()
console.log(Object.getPrototypeOf(personUnfreeze))
const people = [
    {
    name:"Jose",
    age:20
    },
    {
    name:"Fiorella",
    age:25
    },
    {
    name:"Mario",
    age:15
    },
    {
    name:"Luis",
    age:25
    },
    {
    name:"Maria",
    age:16
    },
]
// const res = Object.groupBy(people,({age}) => age >=18 ? "mayores":"menores");
// console.log(res.mayores)
// console.log(res.menores)

console.log(Object.hasOwn(personUnfreeze,"prop"))
console.log(Object.is(personUnfreeze,{}))
console.log(Object.isExtensible(personUnfreeze))
console.log(Object.isFrozen(person))
console.log(Object.isSealed(personUnfreeze))
console.log(Object.keys(personUnfreeze))
console.log(Object.preventExtensions(person))
console.log(Object.seal(person))
// console.log(Object.setPrototypeOf())
console.log(Object.values(personUnfreeze))


// Instance methods

console.log(person.hasOwnProperty())
console.log(person.isPrototypeOf())
console.log(person.propertyIsEnumerable())
console.log(person.toLocaleString())
console.log(person.toString())
console.log(person.valueOf())