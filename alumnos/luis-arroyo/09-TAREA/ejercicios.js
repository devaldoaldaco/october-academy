// EJERCICIOS TAREA

/**
 * @typedef {object} Job
 * @property {string} company - Nombre de la empresa.
 * @property {string} title - Título del puesto de trabajo.
 * @property {number} since - Año de inicio en el puesto.
 * @property {number} salary - Salario mensual (ejemplo).
 */

/**
 * @typedef {object} Job
 * @property {string} company - Nombre de la empresa.
 * @property {string} title - Título del puesto de trabajo.
 * @property {number} since - Año de inicio en el puesto.
 * @property {number} salary - Salario mensual (ejemplo).
 */

/**
 * @typedef {object} FamilyMember
 * @property {('spouse'|'child'|'parent')} relation - Relación familiar.
 * @property {string} name - Nombre del familiar.
 * @property {number} age - Edad del familiar.
 */

/**
 * @typedef {object} Transaction
 * @property {string} id - Identificador único de la transacción (ej: "t1").
 * @property {string} date - Fecha de la transacción en formato YYYY-MM-DD.
 * @property {number} amount - Monto de la transacción.
 * @property {('debit'|'credit')} type - Tipo de transacción.
 */

/**
 * @typedef {object} Address
 * @property {string} city - Ciudad de residencia.
 * @property {string} state - Estado/Provincia (código de 3 letras).
 * @property {string} zip - Código postal.
 * @property {string} street - Calle y número.
 */

/**
 * @typedef {object} Person
 * @property {number} id - Identificador único de la persona.
 * @property {string} name - Nombre completo de la persona.
 * @property {number} age - Edad de la persona.
 * @property {string} email - Correo electrónico.
 * @property {Address} address - Información detallada de la dirección.
 * @property {Job[]} jobs - Arreglo de los trabajos actuales o pasados de la persona.
 * @property {FamilyMember[]} family - Arreglo de los miembros de la familia.
 * @property {string[]} skills - Arreglo de habilidades técnicas.
 * @property {Transaction[]} transactions - Arreglo de transacciones financieras recientes.
 */

/**
 * @type {Person[]}
 */

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
    email: "diego. dfern andez@example.com",
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
      { id: "t7", date: "2025-04-20", amount: 100, type: "credit" },
      { id: "t8", date: "2025-04-21", amount: 25, type: "credit" },
    ],
  },
];

// { personId, personName, relation, relativeName, relativeAge }

// 1) Listado plano de contactos

// Tarea: crear getContacts(people) que devuelva un arreglo plano con objetos { id, name, email, city, primaryJob }, donde primaryJob es el title del job con mayor salary (si no hay jobs → null).
// Salida esperada (parcial): { id:1, name:"Ana Ruiz", email:"ana.ruiz@example.com", city:"Guadalajara", primaryJob:"Frontend Dev" }

/**
 *
 * @param {Person[]} people
 * @returns {Person[]}
 */

const getContacts = (people) => {
  if (!Array.isArray(people)) {
    throw new TypeError("El argumento 'people' debe ser un arreglo (Array).");
  }
  // =====
  return people
    .map((person) => {
      let maxSalaryJob = null;
      if (person.jobs && person.jobs.length > 0) {
        maxSalaryJob = person.jobs.reduce((maxJob, currentJob) => {
          if (!maxJob || currentJob.salary > maxJob.salary) {
            return currentJob;
          }
          return maxJob;
        }, null);
      }

      if (!maxSalaryJob) return null;
      return {
        id: person.id,
        name: person.name,
        email: person.email,
        city: person.address.city,
        primaryJob: person.jobs,
      };
    })
    .filter(Boolean);
};

console.log({ ...getContacts(people) });

// 2) Buscar por ciudad y ordenar por edad descendente

// Tarea: findByCity(people, city) → lista de personas en city, ordenadas por age desc.
// Ejemplo: findByCity(people, "Guadalajara") devuelve Ana (34), Raúl (52) — orden correcto: Raúl, Ana.

/**
 *
 * @param {Person[]} people
 * @param {string} city
 * @returns {Array}
 */

const findByCity = (people, city) => {
  if (!Array.isArray(people)) {
    throw new TypeError("El argumento 'people' debe ser un arreglo (Array).");
  }
  return people
    .filter((person) => person.address.city == city)
    .sort((a, b) => a.age - b.age)
    .map((person) => `${person.name} (${person.age})`);
  x;
};
console.log([...findByCity(people, "Guadalajara")]);

// 3) Total de salarios por persona (reduce + suma)

// Tarea: sumSalaries(person) → suma de salary en person.jobs. Luego totalSalariesAll(people) que devuelva array { id, name, totalSalary } y ordene por totalSalary desc.

/**
 * @param {Person} person
 * @returns {Number}
 */
function sumSalaries(person) {
  let sum = 0;
  person.jobs.forEach((job) => {
    sum += job.salary;
  });
  return sum;
}

/**
 * @param {Person[]} people
 * @returns {Array}
 */
const totalSalariesAll = (people) => {
  if (!Array.isArray(people)) {
    throw new TypeError("El argumento 'people' debe ser un arreglo (Array).");
  }
  return people.map((person) => {
    return {
      id: person.id,
      name: person.name,
      totalSalary: sumSalaries(person),
    };
  });
};

console.log(totalSalariesAll(people));

// 4) Personas que tienen familiares menores de X años

// Tarea: withMinors(people, edad) → devuelve personas que tengan al menos un miembro family con age < edad.

/**
 * @param {Person[]} people
 * @param {number} edad
 * @returns {Array}
 */

const withMinors = (people, edad) => {
  if (!Array.isArray(people)) {
    throw new TypeError("El argumento 'people' debe ser un arreglo (Array).");
  }
  return people
    .filter((person) => {
      return person.family.some((familyMember) => familyMember.age < edad);
    })
    .map((person) => {
      const minorsInFamily = person.family.filter(
        (familyMember) => familyMember.age < edad
      );
      return {
        ...person,
        family: minorsInFamily,
      };
    });
};

console.log(withMinors(people, 18));

// 5) Agrupar personas por estado (groupBy)

// Tarea: groupByState(people) → objeto { JAL: [...], CDMX: [...], ... } con arrays de id o name.

/**
 * @param {Person[]} people
 * @returns {Array}
 */
const groupByState = (people) => {
  if (!Array.isArray(people)) {
    throw new TypeError("El argumento 'people' debe ser un arreglo (Array).");
  }
  return people.reduce((acum, current) => {
    const key = current.address.state;
    console.log(key);
    if (!acum[key]) {
      acum[key] = [current.name];
      console.log(acum[key]);
    } else {
      acum[key].push(current.name);
    }
    return acum;
  }, {});
};

console.log(groupByState(people));
// 6) Balance de transacciones por persona (credit - debit)

// Tarea: transactionBalance(person) → suma: créditos restados o sumados según convenga. Específica: balance = sum(amount where type==='credit') - sum(amount where type==='debit').
// Luego: balancesAll(people) con {id, name, balance} ordenado asc.

/**
 * @param {Person} person
 * @returns {object}
 */

const transactionBalance = (person) => {
  return {
    id: person.id,
    name: person.name,
    balance: person.transactions.reduce((acum, current) => {
      if (current.type == "credit") acum += current.amount;
      else acum -= current.amount;
      return acum;
    }, 0),
  };
};

/**
 * @param {Person[]} people
 * @returns {Array}
 */
const balancesAll = (people) => {
  if (!Array.isArray(people)) {
    throw new TypeError("El argumento 'people' debe ser un arreglo (Array).");
  }
  return people.map((person) => transactionBalance(person));
};
console.log(balancesAll(people));

// 7) Buscar el skill más común entre todas las personas

// Tarea: mostCommonSkill(people) → string (skill más frecuente). Usa reduce para contar ocurrencias y Object.entries para elegir máximo.

/**
 * @param {Person[]} people
 * @returns {string}
 */
const mostCommonSkill = (people) => {
  if (!Array.isArray(people)) {
    throw new TypeError("El argumento 'people' debe ser un arreglo (Array).");
  }
  const skillCounts = people
    .flatMap((person) => person.skills)
    .reduce((acum, skill) => {
      if (!acum[skill]) {
        acum[skill] = 1;
      } else {
        acum[skill]++;
      }
      return acum;
    }, {});
  const entries = Object.entries(skillCounts);

  const [mostFrequentSkill, maxCount] = entries.reduce((acum, current) => {
    const count = current[1];
    const max = acum[1];
    return count > max ? current : acum;
  });

  return mostFrequentSkill;
};

console.log(mostCommonSkill(people));

// 8) Sumar gastos por ciudad (reduce + flatten)

// Tarea: expensesByCity(people) → objeto { cityName: totalDebitAmount } (solo type==='debit').

/**
 * @param {Person[]} people
 * @returns {object}
 */
const expensesByCity = (people) => {
  if (!Array.isArray(people)) {
    throw new TypeError("El argumento 'people' debe ser un arreglo (Array).");
  }
  const todasLasTransacciones = people.flatMap((person) => [
    { address: person.address, transactions: person.transactions },
  ]);
  return todasLasTransacciones.reduce((accumulator, person) => {
    const totalDebit = person.transactions.reduce((sum, expense) => {
      if (expense.type === "debit") {
        return sum + expense.amount;
      }
      return sum;
    }, 0);

    const city = person.address.city;

    accumulator[city] = (accumulator[city] || 0) + totalDebit;
    return accumulator;
  }, {});
};
console.log({ ...expensesByCity(people) });
// 9) Obtener árbol familiar plano

// Tarea: flattenFamilies(people) → arreglo con objetos { personId, personName, relation, relativeName, relativeAge } para todos los familiares.

/**
 * @param {Person[]} people
 * @returns {Array}
 */

const flattenFamilies = (people) => {
  if (!Array.isArray(people)) {
    throw new TypeError("El argumento 'people' debe ser un arreglo (Array).");
  }
  return people.map((person) => {
    const familyArray = person.family.map((familyMember) => {
      return {
        relation: familyMember.relation,
        relativeName: familyMember.name,
        relativeAge: familyMember.age,
      };
    });
    return {
      personId: person.id,
      name: person.name,
      relatives: [...familyArray],
    };
  });
};

console.log(flattenFamilies(people));

// 10) Encontrar personas "multi-job" con promedio salarial

// Tarea: multiJobAverages(people) → para quienes tienen más de 1 job, devolver { id, name, avgSalary }

/**
 * @param {Person[]} people
 * @returns {Array}
 */

const multiJobAverages = (people) => {
  if (!Array.isArray(people)) {
    throw new TypeError("El argumento 'people' debe ser un arreglo (Array).");
  }
  //recorrer people
  //recorrer jobs tal vez con reduce y ese resultado dividirlo entre su count
  return people
    .map((person) => {
      const jobs = person.jobs;
      if (jobs.length <= 1) return null;
      const sumSalary = person.jobs.reduce((acum, curr) => {
        return acum + curr.salary;
      }, 0);
      return {
        id: person.id,
        name: person.name,
        avgSalary: sumSalary / jobs.length,
      };
    })
    .filter(Boolean);
};

console.log(multiJobAverages(people));

// 11) Filtrar emails válidos y formatearlos

// Tarea: validEmails(people) → lista de emails válidos (regExp simple) en minúsculas, sin duplicados.
// Extras: quitar espacios, validar @ y dominio simple.
/**
 * @param {Person[]} people
 * @returns {Array}
 */

const validEmails = (people) => {
  if (!Array.isArray(people)) {
    throw new TypeError("El argumento 'people' debe ser un arreglo (Array).");
  }
  //recorrer people, validar regex, formatear email
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
  return people.flatMap((person) => {
    if (!pattern.test(person.email)) {
      return {
        currentEmail: person.email,
        formattedEmail: person.email.replaceAll(" ", ""),
      };
    }
    return [];
  });
};

console.log(validEmails(people));

// 13) Merge de transacciones duplicadas

// Tarea: mergeTransactions(person) → si una person.transactions contiene transacciones con el mismo id, unirlas sumando amount
/**
 * @param {Person} person
 * @returns {Array}
 */
const mergeTransactions = (person) => {
  const transactions = person.transactions;
  const transactionsMap = new Map();
  transactions.forEach((t) => {
    if (transactionsMap.has(t.id)) {
      let value = transactionsMap.get(t.id);
      transactionsMap.set(t.id, t.amount + value);
    } else {
      transactionsMap.set(t.id, t.amount);
    }
  });

  return transactionsMap;
};
// console.log(people[5]);
const mergedTransactions = mergeTransactions(people[5]);
for (const [key, value] of mergedTransactions.entries()) {
  console.log(
    `Transaccion repetida ${key} el monto acumulado es ${JSON.stringify(value)}`
  );
}
// 15) Agrupar por decade de edad y contar

// Tarea: ageBuckets(people) → { '20s': 2, '30s': 3, ... }.
/**
 * @param {Person[]} people
 * @returns {Array}
 */

const ageBuckets = (people) => {
  if (!Array.isArray(people)) {
    throw new TypeError("El argumento 'people' debe ser un arreglo (Array).");
  }
  return people.reduce((acum, current) => {
    const inicioDecada = Math.floor(current.age / 10) * 10;

    const claveDecada = `${inicioDecada}'s`;

    if (!acum[claveDecada]) {
      acum[claveDecada] = 1;
    } else {
      acum[claveDecada]++;
    }

    return acum;
  }, {});
};
// console.log({ ...ageBuckets(people) });

// 16) Pipeline de transformación con funciones puras (compose)

// Tarea: Crear compose(...funcs) y usarlo en processPeople = compose(filterAdults, mapToSummary, sortByName) donde:

// filterAdults filtra age >= 18,
// mapToSummary transforma a { id, name, city },
// sortByName ordena alfabéticamente.

/**
 *
 * @param {...function} funcs
 * @returns {function}
 */
const compose =
  (...funcs) =>
  (initialValue) => {
    return funcs.reduceRight((composedValue, func) => {
      return func(composedValue);
    }, initialValue);
  };

/**
 * @param {Person[]} people
 * @returns {Array}
 */
const filterAdults = (people) => {
  if (!Array.isArray(people)) {
    throw new TypeError("El argumento debe ser un arreglo (Array).");
  }
  return people.filter((person) => person.age >= 18);
};

/**
 * @param {Person[]} people
 * @returns {Array}
 */
const mapToSummary = (people) => {
  return people.map((person) => ({
    id: person.id,
    name: person.name,
    city: person.address.city,
  }));
};

/**
 * @param {Person[]} people
 * @returns {Array}
 */
const sortByName = (people) => {
  // Creamos una copia para evitar mutar el arreglo original (buena práctica)
  return [...people].sort((a, b) => a.name.localeCompare(b.name));
};

const processPeople = compose(sortByName, mapToSummary, filterAdults);

// Ejecutar el pipeline completo con el arreglo 'people'
const processedData = processPeople(people);

console.log(processedData);

// 17) Implementar groupBy genérico y usarlo

// Tarea: groupBy(list, fn) donde fn devuelve la clave. Usarlo para agrupar personas por primaryJobCompany (empresa del job con mayor salario). Si no tiene jobs → "unemployed".
/**
 * @param {Person[]} people
 * @param {Function} fn
 * @returns {Array}
 */
const groupBy = (people, fn) => {
  return people.map((person) => {
    return {
      name: person.name,
      primaryJobCompany: primaryJobCompany(person),
    };
  });
};

/**
 * @param {Person} person
 * @returns {string}
 */
const primaryJobCompany = (person) => {
  if (person.jobs.length == 0) return "unemployed";
  let maxSalary = 0;
  let primaryComapany = "";
  person.jobs.forEach((p) => {
    if (p.salary > maxSalary) {
      maxSalary = p.salary;
      primaryComapany = p.company;
    }
  });
  return primaryComapany;
};

console.log(groupBy(people, primaryJobCompany));

// 19) Estadísticas por rango salarial

// Tarea: salaryStats(people) que calcule sobre todos los jobs:

// min, max, avg, median, percentiles (25, 50, 75).
// Cómo: extraer todos los salarios en un array, ordenarlo y calcular métricas (reduce, Math).

/**
 * @param {Person[]} people
 * @returns {Array}
 */
const salaryStats = (people) => {
  if (!Array.isArray(people)) {
    throw new TypeError("El argumento 'people' debe ser un arreglo.");
  }

  const salaries = people
    .flatMap((person) => person.jobs.map((job) => job.salary))
    .sort((a, b) => a - b);

  const count = salaries.length;

  if (count === 0) {
    return { min: 0, max: 0, avg: 0, median: 0, p25: 0, p75: 0 };
  }

  const calculatePercentile = (p) => {
    const index = (p / 100) * count;

    if (Number.isInteger(index)) {
      if (index === count) {
        return salaries[count - 1];
      }
      return (salaries[index - 1] + salaries[index]) / 2;
    } else {
      return salaries[Math.ceil(index) - 1];
    }
  };

  const min = salaries[0];
  const max = salaries[count - 1];

  const sum = salaries.reduce((acc, salary) => acc + salary, 0);
  const avg = parseFloat((sum / count).toFixed(2));

  const median = calculatePercentile(50);
  const p25 = calculatePercentile(25);
  const p75 = calculatePercentile(75);

  return {
    min: min,
    max: max,
    avg: avg,
    median: median,
    p25: p25,
    p75: p75,
  };
};
console.log(salaryStats(people));

// Restricciones

// Para todos los ejercicios: evita mutar el people original (usa copias si modificas).
// Usa métodos funcionales (map, filter, reduce, flatMap) cuando aplique;
// Añade validación de entrada (por ejemplo, si people no es array → lanzar TypeError).
// Documenta las funciones con comentarios JSDoc si vas a entregarlas en un repo.
