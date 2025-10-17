const people = [
  {
    id: 1,
    name: "Ana Ruiz",
    age: 34,
    email: "ana.ruiz@example.com",
    address: {
      city: "Guadalajara",
      state: "JAL",
      zip: "44100",
      street: "Av. Vallarta 1200",
    },
    jobs: [
      { company: "BBVA", title: "Frontend Dev", since: 2020, salary: 45000 },
      { company: "Freelance", title: "Consultant", since: 2018, salary: 12000 },
    ],
    family: [
      { relation: "spouse", name: "Luis Ruiz", age: 36 },
      { relation: "child", name: "Sofia Ruiz", age: 6 },
    ],
    skills: ["js", "lit", "css"],
    transactions: [
      { id: "t1", date: "2025-01-05", amount: 200, type: "debit" },
      { id: "t2", date: "2025-02-10", amount: 150, type: "credit" },
    ],
  },
  {
    id: 2,
    name: "Carlos Gómez",
    age: 45,
    email: "carlos.gomez@example.com",
    address: {
      city: "Ciudad de México",
      state: "CDMX",
      zip: "01000",
      street: "Insurgentes 200",
    },
    jobs: [
      { company: "TechCorp", title: "Backend Dev", since: 2016, salary: 60000 },
    ],
    family: [
      { relation: "spouse", name: "María López", age: 42 },
      { relation: "child", name: "Diego Gómez", age: 12 },
      { relation: "parent", name: "Rosa Gómez", age: 70 },
    ],
    skills: ["node", "sql", "aws"],
    transactions: [
      { id: "t3", date: "2025-03-01", amount: 1200, type: "debit" },
      { id: "t4", date: "2025-04-02", amount: 300, type: "debit" },
    ],
  },
  {
    id: 3,
    name: "Mariana Pérez",
    age: 29,
    email: "mariana.perez@example.com",
    address: {
      city: "Monterrey",
      state: "NLE",
      zip: "64000",
      street: "Av. Constitución 500",
    },
    jobs: [
      { company: "StartUpX", title: "Fullstack", since: 2021, salary: 38000 },
      { company: "DesignCo", title: "UI Engineer", since: 2019, salary: 18000 },
    ],
    family: [],
    skills: ["react", "ts", "design"],
    transactions: [
      { id: "t5", date: "2025-01-10", amount: 75, type: "credit" },
    ],
  },
  {
    id: 4,
    name: "Raúl Ortega",
    age: 52,
    email: "raul.ortega@example.com",
    address: {
      city: "Guadalajara",
      state: "JAL",
      zip: "44130",
      street: "Calle Hidalgo 45",
    },
    jobs: [
      {
        company: "Finances S.A.",
        title: "Analyst",
        since: 2010,
        salary: 70000,
      },
    ],
    family: [
      { relation: "child", name: "Lucia Ortega", age: 20 },
      { relation: "child", name: "Andrés Ortega", age: 17 },
    ],
    skills: ["excel", "finance"],
    transactions: [
      { id: "t6", date: "2025-03-15", amount: 5000, type: "debit" },
    ],
  },
  {
    id: 5,
    name: "Sofía Méndez",
    age: 40,
    email: "sofia.mendez@example.com",
    address: {
      city: "Querétaro",
      state: "QRO",
      zip: "76000",
      street: "Boulevard Central 100",
    },
    jobs: [
      {
        company: "EduTech",
        title: "Product Manager",
        since: 2017,
        salary: 52000,
      },
    ],
    family: [
      { relation: "spouse", name: "Pablo Méndez", age: 41 },
      { relation: "parent", name: "Carmen Méndez", age: 68 },
    ],
    skills: ["product", "ux"],
    transactions: [],
  },
  {
    id: 6,
    name: "Diego Fernández",
    age: 23,
    email: "diego.fernandez@example.com",
    address: {
      city: "Ciudad de México",
      state: "CDMX",
      zip: "03100",
      street: "Romero 12",
    },
    jobs: [],
    family: [{ relation: "parent", name: "Ana Fernández", age: 48 }],
    skills: ["js", "node"],
    transactions: [
      { id: "t7", date: "2025-04-20", amount: 50, type: "credit" },
      { id: "t8", date: "2025-04-21", amount: 25, type: "credit" },
    ],
  },
];

// * 1) Listado plano de contactos

// Tarea: crear getContacts(people) que devuelva un arreglo plano con objetos { id, name, email, city, primaryJob }, donde primaryJob es el title del job con mayor salary (si no hay jobs → null).
// Salida esperada (parcial): { id:1, name:"Ana Ruiz", email:"ana.ruiz@example.com", city:"Guadalajara", primaryJob:"Frontend Dev" }

function getContacts(people) {
  return people.map((person) => {
    let primaryJob = null;
    if (person.jobs.length > 0) {
      const bestJob = person.jobs.reduce((max, job) =>
        job.salary > max.salary ? job : max
      );
      primaryJob = bestJob.title;
    }

    return {
      id: person.id,
      name: person.name,
      email: person.email,
      city: person.address.city,
      primaryJob,
    };
  });
}

// console.log(getContacts(people));

// * 2) Buscar por ciudad y ordenar por edad descendente

// Tarea: findByCity(people, city) → lista de personas en city, ordenadas por age desc.
// Ejemplo: findByCity(people, "Guadalajara") devuelve Ana (34), Raúl (52) — orden correcto: Raúl, Ana.

const findByCity = (people, city) => {
  const habitantes = people.filter((p) => p.address.city === city);
  const sorted = habitantes.sort(function (a, b) {
    // sort((a, b) => b.age - a.age)
    if (a.age < b.name) {
      return 1;
    }
    if (a.age > b.age) {
      return -1;
    }

    return 0;
  });

  return sorted;
};

// console.log(findByCity(people, "Ciudad de México"));

// * 3) Total de salarios por persona (reduce + suma)

// Tarea: sumSalaries(person) → suma de salary en person.jobs. Luego totalSalariesAll(people) que devuelva array { id, name, totalSalary } y ordene por totalSalary desc.

const sumSalaries = (person) => {
  return person.jobs.reduce((acum, sgte) => acum + sgte.salary, 0);
};

// console.log(sumSalaries(people[0]));

const totalSalariesAll = (people) => {
  const newArray = people.map((person) => {
    const acumSalary = sumSalaries(person);
    return {
      id: person.id,
      name: person.name,
      acumSalary,
    };
  });

  const sorted = newArray.sort((a, b) => b.acumSalary - a.acumSalary);
  return sorted;
};

// console.log(totalSalariesAll(people));

// * 4) Personas que tienen familiares menores de X años

// Tarea: withMinors(people, edad) → devuelve personas que tengan al menos un miembro family con age < edad.

const withMinors = (people, edad) => {
  const filter = people.filter((person) => {
    return person.family.some((member) => member.age < edad);
  });
  return filter;
};

 // console.log(withMinors(people, 20));

// * 5) Agrupar personas por estado (groupBy)

// Tarea: groupByState(people) → objeto { JAL: [...], CDMX: [...], ... } con arrays de id o name.

const groupByState = (people) => {
  return people.reduce((acc, person) => {
    const state = person.address.state;
    if (!acc[state]) {
      // si no existe crea un arreglo
      acc[state] = [];
    }
    acc[state].push(person.name);
    return acc;
  }, {});
};

 console.log(groupByState(people));

// * 6) Balance de transacciones por persona (credit - debit)

// Tarea: transactionBalance(person) → suma: créditos restados o sumados según convenga. Específica: balance = sum(amount where type==='credit') - sum(amount where type==='debit').
// Luego: balancesAll(people) con {id, name, balance} ordenado asc.

const transactionBalance = (person) => {
  const sumCredits = person.transactions
    .filter((t) => t.type === "credit")
    .reduce((acum, t) => acum + t.amount, 0);

  const sumDebits = person.transactions
    .filter((t) => t.type === "debit")
    .reduce((acum, t) => acum + t.amount, 0);

  const balance = sumCredits - sumDebits;
  return balance;
};

// console.log(transactionBalance(people[1]));

const balancesAll = (people) => {
  return people
    .map(person => ({
      id: person.id,
      name: person.name,
      balance: transactionBalance(person)
    }))
    .sort((a, b) => a.balance - b.balance); // orden ascendente
};

// console.log(balancesAll(people));


// 7) Buscar el skill más común entre todas las personas

// Tarea: mostCommonSkill(people) → string (skill más frecuente). Usa reduce para contar ocurrencias y Object.entries para elegir máximo.

const mostCommonSkill = (people) => {
  const counts = people
    .flatMap(p => p.skills) // junta todos los arrays de skills
    .reduce((acc, skill) => {
      acc[skill] = (acc[skill] || 0) + 1;
      return acc;
    }, {});

  // Busca la skill con mayor valor
  return Object.entries(counts)
    .reduce((max, [skill, count]) => count > max[1] ? [skill, count] : max)[0];
};

// console.log(mostCommonSkill(people)); // ej: "js"


// 8) Sumar gastos por ciudad (reduce + flatten)

// Tarea: expensesByCity(people) → objeto { cityName: totalDebitAmount } (solo type==='debit').

const expensesByCity = (people) => {
  return people.reduce((acc, person) => {
    const city = person.address.city;

    const totalDebits = person.transactions
      .filter(t => t.type === "debit")
      .reduce((sum, t) => sum + t.amount, 0);

    acc[city] = (acc[city] || 0) + totalDebits;
    return acc;
  }, {});
};

// console.log(expensesByCity(people));


// 9) Obtener árbol familiar plano

// Tarea: flattenFamilies(people) → arreglo con objetos { personId, personName, relation, relativeName, relativeAge } para todos los familiares.

const flattenFamilies = (people) => {
  return people.flatMap(person =>
    person.family.map(member => ({
      personId: person.id,
      personName: person.name,
      relation: member.relation,
      relativeName: member.name,
      relativeAge: member.age
    }))
  );
};

// console.log(flattenFamilies(people));


// 10) Encontrar personas "multi-job" con promedio salarial

const multiJobAverages = (people) => {
  return people
    .filter(p => p.jobs.length > 1)
    .map(p => ({
      id: p.id,
      name: p.name,
      avgSalary: (
        p.jobs.reduce((sum, j) => sum + j.salary, 0) / p.jobs.length
      ).toFixed(2)
    }));
};

// console.log(multiJobAverages(people));


// Tarea: multiJobAverages(people) → para quienes tienen más de 1 job, devolver { id, name, avgSalary }

// 11) Filtrar emails válidos y formatearlos

// Tarea: validEmails(people) → lista de emails válidos (regExp simple) en minúsculas, sin duplicados.
// Extras: quitar espacios, validar @ y dominio simple.

const validEmails = (people) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return [...new Set( // elimina duplicados
    people
      .map(p => p.email.trim().toLowerCase())
      .filter(email => emailRegex.test(email))
  )];
};

// console.log(validEmails(people));


// 13) Merge de transacciones duplicadas

// Tarea: mergeTransactions(person) → si una person.transactions contiene transacciones con el mismo id, unirlas sumando amount

const mergeTransactions = (person) => {
  const merged = person.transactions.reduce((acc, t) => {
    if (!acc[t.id]) {
      acc[t.id] = { ...t };
    } else {
      acc[t.id].amount += t.amount;
    }
    return acc;
  }, {});
  return Object.values(merged);
};

// console.log(mergeTransactions({
//   transactions: [
//     { id: "t1", amount: 100, type: "debit" },
//     { id: "t1", amount: 50, type: "debit" },
//     { id: "t2", amount: 200, type: "credit" }
//   ]
// }));


// 15) Agrupar por decade de edad y contar

// Tarea: ageBuckets(people) → { '20s': 2, '30s': 3, ... }.

const ageBuckets = (people) => {
  return people.reduce((acc, p) => {
    const decade = Math.floor(p.age / 10) * 10; // ej. 34 -> 30
    const key = `${decade}s`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
};

// console.log(ageBuckets(people));


// 16) Pipeline de transformación con funciones puras (compose)

// Tarea: Crear compose(...funcs) y usarlo en processPeople = compose(filterAdults, mapToSummary, sortByName) donde:

// filterAdults filtra age >= 18,
// mapToSummary transforma a { id, name, city },
// sortByName ordena alfabéticamente.

const compose = (...funcs) => (input) =>
  funcs.reduceRight((acc, fn) => fn(acc), input);

// Funciones puras
const filterAdults = (people) => people.filter(p => p.age >= 18);

const mapToSummary = (people) =>
  people.map(p => ({ id: p.id, name: p.name, city: p.address.city }));

const sortByName = (people) =>
  [...people].sort((a, b) => a.name.localeCompare(b.name));

const processPeople = compose(sortByName, mapToSummary, filterAdults);

// console.log(processPeople(people));


// 17) Implementar groupBy genérico y usarlo

const groupBy = (array, keyFn) => {
  return array.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
};

// Ejemplo: agrupar por estado
const groupedByState = groupBy(people, p => p.address.state);
// console.log(groupedByState);
