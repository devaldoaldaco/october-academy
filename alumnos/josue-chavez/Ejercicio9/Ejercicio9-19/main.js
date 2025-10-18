/**
19) Estadísticas por rango salarial

Tarea: salaryStats(people) que calcule sobre todos los jobs:

min, max, avg, median, percentiles (25, 50, 75).
Cómo: extraer todos los salarios en un array, ordenarlo y calcular métricas (reduce, Math).*/

const people = [
{
    id: 1,
    name: "Ana Ruiz",
    age: 34,
    email: "ana.ruiz@example.com",
    address: { city: "Guadalajara", state: "JAL", zip: "44100", street: "Av. Vallarta 1200" },
    jobs: [
        { company: "BBVA", title: "Frontend Dev", since: 2020, salary: 45000 },
        { company: "Freelance", title: "Consultant", since: 2018, salary: 12000 }
    ],
    family: [
        { relation: "spouse", name: "Luis Ruiz", age: 36 },
        { relation: "child", name: "Sofia Ruiz", age: 6 }
    ],
    skills: ["js", "lit", "css"],
    transactions: [
        { id: "t1", date: "2025-01-05", amount: 200, type: "debit" },
        { id: "t2", date: "2025-02-10", amount: 150, type: "credit" }
    ]
},
{
    id: 2,
    name: "Carlos Gómez",
    age: 45,
    email: "carlos.gomez@example.com",
    address: { city: "Ciudad de México", state: "CDMX", zip: "01000", street: "Insurgentes 200" },
    jobs: [
        { company: "TechCorp", title: "Backend Dev", since: 2016, salary: 60000 }
    ],
    family: [
        { relation: "spouse", name: "María López", age: 42 },
        { relation: "child", name: "Diego Gómez", age: 12 },
        { relation: "parent", name: "Rosa Gómez", age: 70 }
    ],
    skills: ["node", "sql", "aws"],
    transactions: [
        { id: "t3", date: "2025-03-01", amount: 1200, type: "debit" },
        { id: "t4", date: "2025-04-02", amount: 300, type: "debit" }
    ]
},
{
    id: 3,
    name: "Mariana Pérez",
    age: 29,
    email: "mariana.perez@example.com",
    address: { city: "Monterrey", state: "NLE", zip: "64000", street: "Av. Constitución 500" },
    jobs: [
        { company: "StartUpX", title: "Fullstack", since: 2021, salary: 38000 },
        { company: "DesignCo", title: "UI Engineer", since: 2019, salary: 18000 }
    ],
    family: [],
    skills: ["react", "ts", "design"],
    transactions: [
        { id: "t5", date: "2025-01-10", amount: 75, type: "credit" }
    ]
},
{
    id: 4,
    name: "Raúl Ortega",
    age: 52,
    email: "raul.ortega@example.com",
    address: { city: "Guadalajara", state: "JAL", zip: "44130", street: "Calle Hidalgo 45" },
    jobs: [
        { company: "Finances S.A.", title: "Analyst", since: 2010, salary: 70000 }
    ],
    family: [
        { relation: "child", name: "Lucia Ortega", age: 20 },
        { relation: "child", name: "Andrés Ortega", age: 17 }
    ],
    skills: ["excel", "finance"],
    transactions: [
        { id: "t6", date: "2025-03-15", amount: 5000, type: "debit" }
    ]
},
{
    id: 5,
    name: "Sofía Méndez",
    age: 40,
    email: "sofia.mendez@example.com",
    address: { city: "Querétaro", state: "QRO", zip: "76000", street: "Boulevard Central 100" },
    jobs: [
        { company: "EduTech", title: "Product Manager", since: 2017, salary: 52000 }
    ],
    family: [
        { relation: "spouse", name: "Pablo Méndez", age: 41 },
        { relation: "parent", name: "Carmen Méndez", age: 68 }
    ],
    skills: ["product", "ux"],
    transactions: []
},
{
    id: 6,
    name: "Diego Fernández",
    age: 23,
    email: "diego.fernandez@example.com",
    address: { city: "Ciudad de México", state: "CDMX", zip: "03100", street: "Romero 12" },
    jobs: [],
    family: [
        { relation: "parent", name: "Ana Fernández", age: 48 }
    ],
    skills: ["js", "node"],
    transactions: [
        { id: "t7", date: "2025-04-20", amount: 50, type: "credit" },
        { id: "t8", date: "2025-04-21", amount: 25, type: "credit" }
    ]
}
];

//Funcion para validar si es un array
function validateArray(array){
    if (!Array.isArray(array)) {
        throw new TypeError("No es un arreglo.");
    }
}

//Funcion para mostrar estadisticas de todo el salario del array
function salaryStats(people) {
    const salaries = people.flatMap(p => p.jobs.map(j => j.salary)).sort((a, b) => a - b);
    const n = salaries.length;
    if (!n) return { min: 0, max: 0, avg: 0, median: 0, p25: 0, p50: 0, p75: 0 };

    const sum = salaries.reduce((a, b) => a + b, 0);
    const avg = sum / n;
    const median = n % 2 ? salaries[(n - 1) / 2] : (salaries[n / 2 - 1] + salaries[n / 2]) / 2;
    const percentile = p => salaries[Math.floor((p / 100) * (n - 1))];

    return {
        min: salaries[0],
        max: salaries[n - 1],
        avg,
        median,
        p25: percentile(25),
        p50: percentile(50),
        p75: percentile(75)
    };
}

console.log(salaryStats(people))
