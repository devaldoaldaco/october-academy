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

/**
 * **************************************************************
 * EJERCICIO 1: Listado plano de contactos
 * **************************************************************
 * Tarea: crear getContacts(people) que devuelva un arreglo plano 
 * con objetos { id, name, email, city, primaryJob }, donde primaryJob 
 * es el title del job con mayor salary (si no hay jobs → null).
 * 
 * Salida esperada (parcial): 
 * { id:1, name:"Ana Ruiz", email:"ana.ruiz@example.com", 
 *   city:"Guadalajara", primaryJob:"Frontend Dev" }
 */

/**
 * @param {Array} people - Lista de personas
 * @returns {Array} Lista con información básica de cada persona
 */
function getContacts(people) {
  if (!Array.isArray(people)) {
    throw new TypeError('people debe ser un array');
  }

  const contacts = people.map(person => {
    let primaryJob = null;
    
    if (person.jobs.length > 0) {
      const bestJob = person.jobs.reduce((maxJob, currentJob) => {
        return currentJob.salary > maxJob.salary ? currentJob : maxJob;
      });
      primaryJob = bestJob.title;
    }

    const contact = {
      id: person.id,
      name: person.name,
      email: person.email,
      city: person.address.city,
      primaryJob: primaryJob
    };

    return contact;
  });

  return contacts;
}

console.log('********** EJERCICIO 1 **********');
console.log(getContacts(people));

/**
 * **************************************************************
 * EJERCICIO 2: Buscar por ciudad y ordenar por edad descendente
 * **************************************************************
 * Tarea: findByCity(people, city) → lista de personas en city, 
 * ordenadas por age desc.
 * 
 * Ejemplo: findByCity(people, "Guadalajara") devuelve Ana (34), 
 * Raúl (52) — orden correcto: Raúl, Ana.
 */

/**
 * @param {Array} people - Lista de personas
 * @param {string} city - Nombre de la ciudad
 * @returns {Array} Personas de esa ciudad ordenadas por edad
 */
function findByCity(people, city) {
  if (!Array.isArray(people)) {
    throw new TypeError('people debe ser un array');
  }

  const filtered = people.filter(person => person.address.city === city);
  const sorted = [...filtered].sort((a, b) => b.age - a.age);
  
  return sorted;
}

console.log('********** EJERCICIO 2 **********');
console.log(findByCity(people, 'Guadalajara'));

/**
 * **************************************************************
 * EJERCICIO 3: Total de salarios por persona (reduce + suma)
 * **************************************************************
 * Tarea: sumSalaries(person) → suma de salary en person.jobs. 
 * Luego totalSalariesAll(people) que devuelva array 
 * { id, name, totalSalary } y ordene por totalSalary desc.
 */

/**
 * @param {Object} person - Una persona
 * @returns {number} Total de salarios
 */
function sumSalaries(person) {
  const total = person.jobs.reduce((sum, job) => sum + job.salary, 0);
  return total;
}

/**
 * @param {Array} people - Lista de personas
 * @returns {Array} Lista con totales ordenados
 */
function totalSalariesAll(people) {
  if (!Array.isArray(people)) {
    throw new TypeError('people debe ser un array');
  }

  const salaries = people.map(person => {
    const salaryInfo = {
      id: person.id,
      name: person.name,
      totalSalary: sumSalaries(person)
    };
    return salaryInfo;
  });

  const sorted = [...salaries].sort((a, b) => b.totalSalary - a.totalSalary);
  
  return sorted;
}

console.log('********** EJERCICIO 3 **********');
console.log(totalSalariesAll(people));

/**
 * **************************************************************
 * EJERCICIO 4: Personas que tienen familiares menores de X años
 * **************************************************************
 * Tarea: withMinors(people, edad) → devuelve personas que tengan 
 * al menos un miembro family con age < edad.
 */

/**
 * @param {Array} people - Lista de personas
 * @param {number} age - Edad límite
 * @returns {Array} Personas con familiares menores
 */
function withMinors(people, age) {
  if (!Array.isArray(people)) {
    throw new TypeError('people debe ser un array');
  }

  const result = people.filter(person => {
    const hasMinor = person.family.some(relative => relative.age < age);
    return hasMinor;
  });

  return result;
}

console.log('********** EJERCICIO 4 **********');
console.log(withMinors(people, 18));

/**
 * **************************************************************
 * EJERCICIO 5: Agrupar personas por estado (groupBy)
 * **************************************************************
 * Tarea: groupByState(people) → objeto { JAL: [...], CDMX: [...], ... } 
 * con arrays de id o name.
 */

/**
 * @param {Array} people - Lista de personas
 * @returns {Object} Objeto con estados y sus personas
 */
function groupByState(people) {
  if (!Array.isArray(people)) {
    throw new TypeError('people debe ser un array');
  }

  const groups = people.reduce((acc, person) => {
    const state = person.address.state;

    if (!acc[state]) {
      acc[state] = [];
    }

    acc[state].push(person.name);
    return acc;
  }, {});

  return groups;
}

console.log('********** EJERCICIO 5 **********');
console.log(groupByState(people));

/**
 * **************************************************************
 * EJERCICIO 6: Balance de transacciones por persona (credit - debit)
 * **************************************************************
 * Tarea: transactionBalance(person) → suma: créditos restados o 
 * sumados según convenga. Específica: 
 * balance = sum(amount where type==='credit') - sum(amount where type==='debit').
 * Luego: balancesAll(people) con {id, name, balance} ordenado asc.
 */

/**
 * @param {Object} person - Una persona
 * @returns {number} Balance (créditos - débitos)
 */
function transactionBalance(person) {
  const balance = person.transactions.reduce((acc, transaction) => {
    if (transaction.type === 'credit') {
      return acc + transaction.amount;
    } else if (transaction.type === 'debit') {
      return acc - transaction.amount;
    }
    return acc;
  }, 0);

  return balance;
}

/**
 * @param {Array} people - Lista de personas
 * @returns {Array} Lista de balances ordenados
 */
function balancesAll(people) {
  if (!Array.isArray(people)) {
    throw new TypeError('people debe ser un array');
  }

  const balances = people.map(person => {
    const balanceInfo = {
      id: person.id,
      name: person.name,
      balance: transactionBalance(person)
    };
    return balanceInfo;
  });

  const sorted = [...balances].sort((a, b) => a.balance - b.balance);
  
  return sorted;
}

console.log('********** EJERCICIO 6 **********');
console.log(balancesAll(people));

/**
 * **************************************************************
 * EJERCICIO 7: Buscar el skill más común entre todas las personas
 * **************************************************************
 * Tarea: mostCommonSkill(people) → string (skill más frecuente). 
 * Usa reduce para contar ocurrencias y Object.entries para elegir máximo.
 */

/**
 * @param {Array} people - Lista de personas
 * @returns {string} Skill más frecuente
 */
function mostCommonSkill(people) {
  if (!Array.isArray(people)) {
    throw new TypeError('people debe ser un array');
  }

  const skillCount = people.reduce((counts, person) => {
    person.skills.forEach(skill => {
      counts[skill] = (counts[skill] || 0) + 1;
    });
    return counts;
  }, {});

  const entries = Object.entries(skillCount);
  
  if (entries.length === 0) {
    return null;
  }

  const mostCommon = entries.reduce((max, current) => {
    return current[1] > max[1] ? current : max;
  });

  const skillName = mostCommon[0];
  
  return skillName;
}

console.log('********** EJERCICIO 7 **********');
console.log(mostCommonSkill(people));

/**
 * **************************************************************
 * EJERCICIO 8: Sumar gastos por ciudad (reduce + flatten)
 * **************************************************************
 * Tarea: expensesByCity(people) → objeto { cityName: totalDebitAmount } 
 * (solo type==='debit').
 */

/**
 * @param {Array} people - Lista de personas
 * @returns {Object} Gastos por ciudad
 */
function expensesByCity(people) {
  if (!Array.isArray(people)) {
    throw new TypeError('people debe ser un array');
  }

  const expenses = people.reduce((acc, person) => {
    const city = person.address.city;

    const cityExpense = person.transactions.reduce((total, transaction) => {
      if (transaction.type === 'debit') {
        return total + transaction.amount;
      }
      return total;
    }, 0);

    acc[city] = (acc[city] || 0) + cityExpense;
    return acc;
  }, {});

  return expenses;
}

console.log('********** EJERCICIO 8 **********');
console.log(expensesByCity(people));

/**
 * **************************************************************
 * EJERCICIO 9: Obtener árbol familiar plano
 * **************************************************************
 * Tarea: flattenFamilies(people) → arreglo con objetos 
 * { personId, personName, relation, relativeName, relativeAge } 
 * para todos los familiares.
 */

/**
 * @param {Array} people - Lista de personas
 * @returns {Array} Lista de todos los familiares
 */
function flattenFamilies(people) {
  if (!Array.isArray(people)) {
    throw new TypeError('people debe ser un array');
  }

  const allRelatives = people.flatMap(person => {
    const relatives = person.family.map(relative => {
      const relativeInfo = {
        personId: person.id,
        personName: person.name,
        relation: relative.relation,
        relativeName: relative.name,
        relativeAge: relative.age
      };
      return relativeInfo;
    });
    return relatives;
  });

  return allRelatives;
}

console.log('********** EJERCICIO 9 **********');
console.log(flattenFamilies(people));

/**
 * **************************************************************
 * EJERCICIO 10: Encontrar personas "multi-job" con promedio salarial
 * **************************************************************
 * Tarea: multiJobAverages(people) → para quienes tienen más de 1 job, 
 * devolver { id, name, avgSalary }
 */

/**
 * @param {Array} people - Lista de personas
 * @returns {Array} Personas multi-job con promedio
 */
function multiJobAverages(people) {
  if (!Array.isArray(people)) {
    throw new TypeError('people debe ser un array');
  }

  const filtered = people.filter(person => person.jobs.length > 1);
  
  const result = filtered.map(person => {
    const totalSalary = person.jobs.reduce((sum, job) => sum + job.salary, 0);
    const avgSalary = totalSalary / person.jobs.length;

    const personInfo = {
      id: person.id,
      name: person.name,
      avgSalary: Math.round(avgSalary)
    };
    
    return personInfo;
  });

  return result;
}

console.log('********** EJERCICIO 10 **********');
console.log(multiJobAverages(people));

/**
 * **************************************************************
 * EJERCICIO 11: Filtrar emails válidos y formatearlos
 * **************************************************************
 * Tarea: validEmails(people) → lista de emails válidos (regExp simple) 
 * en minúsculas, sin duplicados.
 * Extras: quitar espacios, validar @ y dominio simple.
 */

/**
 * @param {Array} people - Lista de personas
 * @returns {Array} Lista de emails válidos únicos
 */
function validEmails(people) {
  if (!Array.isArray(people)) {
    throw new TypeError('people debe ser un array');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const cleanEmails = people.map(person => {
    const cleaned = person.email.trim().toLowerCase();
    return cleaned;
  });
  
  const validEmailsList = cleanEmails.filter(email => {
    const isValid = emailRegex.test(email);
    return isValid;
  });

  const uniqueEmails = [...new Set(validEmailsList)];
  
  return uniqueEmails;
}

console.log('********** EJERCICIO 11 **********');
console.log(validEmails(people));

/**
 * **************************************************************
 * EJERCICIO 13: Merge de transacciones duplicadas
 * **************************************************************
 * Tarea: mergeTransactions(person) → si una person.transactions 
 * contiene transacciones con el mismo id, unirlas sumando amount
 */

/**
 * @param {Object} person - Una persona
 * @returns {Array} Transacciones sin duplicados
 */
function mergeTransactions(person) {
  const merged = person.transactions.reduce((acc, transaction) => {
    const id = transaction.id;

    if (acc[id]) {
      acc[id].amount = acc[id].amount + transaction.amount;
    } else {
      acc[id] = { ...transaction };
    }

    return acc;
  }, {});

  const result = Object.values(merged);
  
  return result;
}

console.log('********** EJERCICIO 13 **********');
const testPerson = {
  transactions: [
    { id: "t1", date: "2025-01-05", amount: 200, type: "debit" },
    { id: "t1", date: "2025-01-05", amount: 100, type: "debit" },
    { id: "t2", date: "2025-02-10", amount: 150, type: "credit" }
  ]
};
console.log(mergeTransactions(testPerson));

/**
 * **************************************************************
 * EJERCICIO 15: Agrupar por decade de edad y contar
 * **************************************************************
 * Tarea: ageBuckets(people) → { '20s': 2, '30s': 3, ... }.
 */

/**
 * @param {Array} people - Lista de personas
 * @returns {Object} Conteo por década
 */
function ageBuckets(people) {
  if (!Array.isArray(people)) {
    throw new TypeError('people debe ser un array');
  }

  const buckets = people.reduce((acc, person) => {
    const decade = Math.floor(person.age / 10) * 10;
    const key = `${decade}s`;

    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return buckets;
}

console.log('********** EJERCICIO 15 **********');
console.log(ageBuckets(people));

/**
 * **************************************************************
 * EJERCICIO 16: Pipeline de transformación con funciones puras (compose)
 * **************************************************************
 * Tarea: Crear compose(...funcs) y usarlo en 
 * processPeople = compose(filterAdults, mapToSummary, sortByName) donde:
 * - filterAdults filtra age >= 18,
 * - mapToSummary transforma a { id, name, city },
 * - sortByName ordena alfabéticamente.
 */

/**
 * @param {...Function} funcs - Funciones a combinar
 * @returns {Function} Función combinada
 */
function compose(...funcs) {
  const composedFunction = (value) => {
    const result = funcs.reduceRight((acc, func) => func(acc), value);
    return result;
  };
  
  return composedFunction;
}

/**
 * @param {Array} people
 * @returns {Array}
 */
function filterAdults(people) {
  const adults = people.filter(person => person.age >= 18);
  return adults;
}

/**
 * @param {Array} people
 * @returns {Array}
 */
function mapToSummary(people) {
  const summaries = people.map(person => {
    const summary = {
      id: person.id,
      name: person.name,
      city: person.address.city
    };
    return summary;
  });
  
  return summaries;
}

/**
 * @param {Array} people
 * @returns {Array}
 */
function sortByName(people) {
  const sorted = [...people].sort((a, b) => a.name.localeCompare(b.name));
  return sorted;
}

const processPeople = compose(sortByName, mapToSummary, filterAdults);

console.log('********** EJERCICIO 16 **********');
console.log(processPeople(people));

/**
 * **************************************************************
 * EJERCICIO 17: Implementar groupBy genérico y usarlo
 * **************************************************************
 * Tarea: groupBy(list, fn) donde fn devuelve la clave. 
 * Usarlo para agrupar personas por primaryJobCompany 
 * (empresa del job con mayor salario). 
 * Si no tiene jobs → "unemployed".
 */

/**
 * @param {Array} list - Lista de elementos
 * @param {Function} fn - Función que retorna la clave
 * @returns {Object} Elementos agrupados
 */
function groupBy(list, fn) {
  if (!Array.isArray(list)) {
    throw new TypeError('list debe ser un array');
  }

  const groups = list.reduce((acc, item) => {
    const key = fn(item);

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item);
    return acc;
  }, {});

  return groups;
}

/**
 * @param {Object} person
 * @returns {string}
 */
function getPrimaryJobCompany(person) {
  if (person.jobs.length === 0) {
    return 'unemployed';
  }

  const bestJob = person.jobs.reduce((max, job) => {
    return job.salary > max.salary ? job : max;
  });

  const company = bestJob.company;
  
  return company;
}

console.log('********** EJERCICIO 17 **********');
console.log(groupBy(people, getPrimaryJobCompany));

/**
 * **************************************************************
 * EJERCICIO 19: Estadísticas por rango salarial
 * **************************************************************
 * Tarea: salaryStats(people) que calcule sobre todos los jobs:
 * min, max, avg, median, percentiles (25, 50, 75).
 * Cómo: extraer todos los salarios en un array, ordenarlo y 
 * calcular métricas (reduce, Math).
 */

/**
 * @param {Array} people - Lista de personas
 * @returns {Object} Estadísticas salariales
 */
function salaryStats(people) {
  if (!Array.isArray(people)) {
    throw new TypeError('people debe ser un array');
  }

  const allJobs = people.flatMap(person => person.jobs);
  const allSalaries = allJobs.map(job => job.salary);
  const sortedSalaries = allSalaries.sort((a, b) => a - b);

  if (sortedSalaries.length === 0) {
    return null;
  }

  const min = sortedSalaries[0];
  const max = sortedSalaries[sortedSalaries.length - 1];

  const sum = sortedSalaries.reduce((total, salary) => total + salary, 0);
  const avg = sum / sortedSalaries.length;

  const middleIndex = Math.floor(sortedSalaries.length / 2);
  const median = sortedSalaries.length % 2 === 0
    ? (sortedSalaries[middleIndex - 1] + sortedSalaries[middleIndex]) / 2
    : sortedSalaries[middleIndex];

  const getPercentile = (arr, percentile) => {
    const index = Math.ceil((percentile / 100) * arr.length) - 1;
    const value = arr[Math.max(0, index)];
    return value;
  };

  const p25 = getPercentile(sortedSalaries, 25);
  const p50 = median;
  const p75 = getPercentile(sortedSalaries, 75);

  const stats = {
    min: min,
    max: max,
    avg: Math.round(avg),
    median: median,
    percentiles: {
      p25: p25,
      p50: p50,
      p75: p75
    }
  };

  return stats;
}

console.log('********** EJERCICIO 19 **********');
console.log(salaryStats(people));