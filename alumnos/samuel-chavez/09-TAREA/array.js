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

//RESOLUCION ejercicio 1
/**
 * Obtiene un arreglo con información de contacto y el trabajo principal de cada persona.
 * @param {Array} persons - Arreglo de personas.
 * @returns {Array} Array de objetos con id, name, email, city y primaryJob.
 */
function getContacts(persons) {
  if (!Array.isArray(persons))
    throw new TypeError("El valor ingresado debe ser un array_Ejercicio01");
  let arrayPersons = [];
  let jobTitle = "";
  persons.forEach((p) => {
    if (p.jobs.length !== 0) {
      if (p.jobs.length > 1) {
        let salaryJobs = 0;
        p.jobs.forEach((j) => {
          if (salaryJobs < j.salary) {
            salaryJobs = j.salary;
          }
        });
        const job = p.jobs.find((j) => j.salary == salaryJobs);
        jobTitle = job.title;
      } else {
        jobTitle = p.jobs[0].title;
      }
    } else {
      jobTitle = "null";
    }

    arrayPersons.push({
      id: p.id,
      name: p.name,
      email: p.email,
      city: p.address.city,
      primaryJob: jobTitle,
    });
  });

  return arrayPersons;
}
console.log(getContacts(people));

//RESOLUCION ejercicio 2
/**
 * Filtra personas por ciudad, ordena por edad descendente y retorna nombre y edad.
 * @param {Array} persons - Arreglo de personas.
 * @param {string} city - Nombre de la ciudad a filtrar.
 * @returns {Array} Arreglo de strings con nombre y edad de cada persona.
 */
function findByCity(persons, city) {
  if (!Array.isArray(persons))
    throw new TypeError(
      "El primer valor ingresado debe ser un array _Ejercicio02"
    );
  if (typeof city !== "string")
    throw new TypeError(
      "el segundo valor ingresado debe ser un string_Ejercicio02"
    );
  const personsOrderByCityAge = persons
    .filter((p) => p.address.city === city)
    .sort((a, b) => b.age - a.age)
    .map((p) => `${p.name}(${p.age})`);
  return personsOrderByCityAge;
}

console.log(findByCity(people, "Ciudad de México"));

//RESOLUCION ejercicio 3

/**
 * Calcula la suma de salarios de cada persona.
 * @param {Array} persons - Arreglo de personas.
 * @returns {Array<number>} Array de totales de salarios por persona.
 */
function sumSalaries(persons) {
  if (!Array.isArray(persons))
    throw new TypeError(
      "el valor ingresado en la función sumSalaries debe ser un array_Ejercicio03"
    );
  return persons.map((p) =>
    p.jobs.reduce((total, job) => total + job.salary, 0)
  );
}

/**
 * Retorna arreglo con información de salarios totales de todas las personas, ordenado de mayor a menor.
 * @param {Array} persons - Arreglo de personas.
 * @returns {Array<Object>} Array de objetos {id, name, totalSalary}.
 */
function totalSalariesAll(persons) {
  if (!Array.isArray(persons))
    throw new TypeError(
      " el valor ingresado en la funcion totalSalariesAll debe ser un array_Ejercicio03"
    );
  const totalSalaries = sumSalaries(persons);
  const totalSalariesAllArray = [...persons]
    .map((p, index) => ({
      id: p.id,
      name: p.name,
      totalSalary: totalSalaries[index],
    }))
    .sort((a, b) => b.totalSalary - a.totalSalary);
  return totalSalariesAllArray;
}

console.log(totalSalariesAll(people));

//RESOLUCION ejercicio 4
/**
 * Devuelve nombres de personas que tengan familiares menores a cierta edad.
 * @param {Array} persons - Arreglo de personas.
 * @param {number} edad - Edad límite para considerar menores.
 * @returns {Array<string>} Array de nombres de personas.
 */
function withMinors(persons, edad) {
  if (!Array.isArray(persons))
    throw new TypeError("el primer valor debe ser un array_Ejercicio04");
  if (typeof edad !== "number")
    throw new TypeError("el segundo valor edad debe ser un número_Ejercicio04");
  return persons
    .filter((p) => p.family.some((f) => f.age < edad))
    .map((pf) => pf.name);
}

console.log(withMinors(people, 36));
//RESOLUCION ejercicio 5
/**
 * Agrupa personas por estado y retorna solo sus nombres.
 * @param {Array} persons - Arreglo de personas.
 * @returns {Object} Objeto con keys como estados y valores como array de nombres.
 */
function groupByState(persons) {
  if (!Array.isArray(persons))
    throw new TypeError("el valor ingresado debe ser un array_Ejercicio05");
  const statePersons = Object.groupBy(persons, (p) => p.address.state);
  for (const state in statePersons) {
    statePersons[state] = statePersons[state].map((p) => p.name);
  }
  return statePersons;
}

console.log(groupByState(people));

//RESOLUCION ejercicio 6
/**
 * Calcula el balance acumulado de transacciones de una persona.
 * @param {Array} persons - Arreglo de personas.
 * @returns {Array<number>} Arreglo con balances individuales de cada persona.
 */
function transactionBalance(persons) {
  if (!Array.isArray(persons))
    throw new TypeError(
      "el valor ingresado en la funcion transactionBalance debe ser un array_Ejercicio06"
    );
  let totalCredit = 0;
  let totalDebit = 0;
  return persons.map((p) => {
    return p.transactions.reduce((total, t) => {
      if (t.type === "debit") {
        totalDebit += t.amount;
      } else if (t.type === "credit") {
        totalCredit += t.amount;
      }
      total = totalCredit - totalDebit;
      return total;
    }, 0);
  });
}

/**
 * Retorna un arreglo de objetos con id, name y balance total.
 * @param {Array} persons - Arreglo de personas.
 * @returns {Array<Object>} Array con {id, name, balance}.
 */
function balancesAll(persons) {
  if (!Array.isArray(persons))
    throw new TypeError(
      "el valor ingresado en la funcion balancesAll debe ser un array_Ejercicio06"
    );
  const balance = transactionBalance(persons);
  return persons.map((p, index) => ({
    id: p.id,
    name: p.name,
    balance: balance[index],
  }));
}

console.log(balancesAll(people));

//RESOLUCION ejercicio 7
/**
 * Encuentra las habilidades más comunes entre todas las personas.
 * @param {Array} persons - Arreglo de personas.
 * @returns {Array<string>} Array con los nombres de las habilidades más comunes.
 */
function mostCommonSkill(persons) {
  if (!Array.isArray(persons))
    throw new TypeError("el valor ingresado debe ser un array_Ejercicio07");
  const skills = persons
    .map((p) => {
      return p.skills;
    })
    .flat()
    .reduce((acumulator, s) => {
      acumulator[s] = (acumulator[s] || 0) + 1;
      return acumulator;
    }, {});

  const maxValor = Math.max(...Object.values(skills));

  const maxSkills = Object.entries(skills)
    .filter((ms) => ms[1] === maxValor)
    .map((s) => s[0]);

  return maxSkills;
}

console.log(mostCommonSkill(people));

//RESOLUCION ejercicio 8

/**
 * Calcula gastos (debit) por ciudad sumando todas las transacciones.
 * @param {Array} persons - Arreglo de personas.
 * @returns {Object} Objeto con claves: ciudades y valores: sumatoria de gastos.
 */
function expensesByCity(persons) {
  if (!Array.isArray(persons))
    throw new TypeError("el valor ingresado debe ser un array_Ejercicio08");
  const expensesByCityArray = persons.flatMap((p) => {
    return p.transactions
      .filter((t) => t.type === "debit")
      .map((t) => ({ city: p.address.city, amount: t.amount }));
  });

  return expensesByCityArray.reduce((acumulator, e) => {
    acumulator[e.city] = (acumulator[e.city] || 0) + e.amount;
    return acumulator;
  }, {});
}
console.log(expensesByCity(people));

//RESOLUCION ejercicio 9

/**
 * Devuelve un arreglo con información de todos los familiares de cada persona.
 * @param {Array} persons - Arreglo de personas.
 * @returns {Array<Object>} Array de objetos con información de la persona y su familiar.
 */
function flattenFamilies(persons) {
  if (!Array.isArray(persons))
    throw new TypeError("el valor ingresado debe ser un array_Ejercicio09");
  return persons
    .map((p) =>
      p.family.map((f) => ({
        personId: p.id,
        personName: p.name,
        relation: f.relation,
        relativeName: f.name,
        relativeAge: f.age,
      }))
    )
    .flat();
}
console.log(flattenFamilies(people));

//RESOLUCION ejercicio 10

/**
 * Calcula el promedio de salarios por persona considerando múltiples trabajos.
 * @param {Array} persons - Arreglo de personas.
 * @returns {Array<Object>} Array con {id, name, avgSalary}.
 */
function multiJobAverages(persons) {
  if (!Array.isArray(persons))
    throw new TypeError("el valor ingresado debe ser un array_Ejercicio10");

  return persons.map((p) => {
    let avg = 0;
    if (p.jobs.length > 1) {
      avg =
        p.jobs.reduce((acumulator, j) => {
          return (acumulator += j.salary);
        }, 0) / p.jobs.length;
    } else if (p.jobs.length === 1) {
      avg = p.jobs[p.jobs.length - 1].salary;
    } else {
      avg = 0;
    }
    return { id: p.id, name: p.name, avgSalary: avg };
  });
}
console.log(multiJobAverages(people));

//RESOLUCION ejercicio 11
/**
 * Retorna un arreglo de correos válidos y únicos.
 * @param {Array} persons - Arreglo de personas con email.
 * @returns {Array<string>} Array de correos electrónicos válidos.
 */
function validEmails(persons) {
  const emailsNoRepeat = new Set();
  persons.forEach((p) => {
    if (p.email) {
      const email = p.email.trim().toLowerCase();

      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailsNoRepeat.add(email);
      }
    }
  });

  return [...emailsNoRepeat];
}
console.log(validEmails(people));

//RESOLUCION ejercicio 13

/**
 * Fusiona transacciones repetidas de cada persona sumando sus montos.
 * @param {Array} persons - Arreglo de personas con transacciones.
 * @returns {Array} El mismo arreglo de personas con transacciones combinadas.
 */
function mergeTransactions(persons) {
  const mergeTransactionsPerson = [];
  if (!Array.isArray(persons))
    throw new TypeError("el valor ingresado debe ser un array_Ejercicio13");
  persons.forEach((p) => {
    const merged = {};

    p.transactions.forEach((t) => {
      if (merged[t.id]) {
        merged[t.id].amount += t.amount;
      } else {
        merged[t.id] = { ...t };
      }
    });
    mergeTransactionsPerson.push({ ...p, transactions: Object.values(merged) });
  });

  return mergeTransactionsPerson;
}
console.log(mergeTransactions(people));

//RESOLUCION ejercicio 15
/**
 * Agrupa personas por rango de edad (decadas) y cuenta cuántas personas hay en cada grupo.
 * @param {Array} persons - Arreglo de personas.
 * @returns {Object} Objeto con keys como '20s', '30s', etc. y valores como cantidad de personas.
 */
function ageBuckets(persons) {
  if (!Array.isArray(persons))
    throw new TypeError("el valor ingresado debe ser un array_Ejercicio15");

  const ageObject = Object.groupBy(persons, (p) => {
    return Math.floor(p.age / 10) * 10 + "s";
  });

  const ageArraycounts = {};
  for (const [decade, amount] of Object.entries(ageObject).sort()) {
    ageArraycounts[decade] = amount.length;
  }

  return ageArraycounts;
}
console.log(ageBuckets(people));

//RESOLUCION ejercicio 16

/**
 * Filtra personas adultas (edad >= 18).
 * @param {Array} persons - Arreglo de personas.
 * @returns {Array} Arreglo de personas adultas.
 */
function filterAdults(persons) {
  if (!Array.isArray(persons))
    throw new TypeError(
      "el valor ingresado en la funcion filterAdults debe ser un array_Ejercicio16"
    );
  return persons.filter((p) => p.age >= 18);
}

/**
 * Mapea un arreglo de personas a objetos resumidos {id, name, city}.
 * @param {Array} persons - Arreglo de personas.
 * @returns {Array<Object>} Arreglo de objetos resumidos.
 */
function mapToSummary(persons) {
  if (!Array.isArray(persons))
    throw new TypeError(
      "el valor ingresado en la funcion mapToSummary debe ser un array_Ejercicio16"
    );
  return persons.map((p) => ({ id: p.id, name: p.name, city: p.address.city }));
}

/**
 * Ordena un arreglo de personas por nombre.
 * @param {Array} persons - Arreglo de personas.
 * @returns {Array} Arreglo de personas ordenadas por nombre.
 */
function sortByName(persons) {
  if (!Array.isArray(persons))
    throw new TypeError(
      "el valor ingresado en la funcion sortByName debe ser un array_Ejercicio16"
    );
  return [...persons].sort((a, b) => a.name.localeCompare(b.name));
}
/**
 * Ejecuta las funciones en orden sobre los datos.
 * @param  {...Function} functions - Funciones a ejecutar.
 * @returns {Function} Función resultante de la composición.
 */
function compose(...functions) {
  return (data) => {
    return functions.reduce((acc, func) => func(acc), data);
  };
}

const processPeople = compose(filterAdults, mapToSummary, sortByName);

console.log(processPeople(people));

//RESOLUCION ejercicio 17
/**
 * Agrupa un arreglo según la función proporcionada.
 * @param {Array} list - Arreglo a agrupar.
 * @param {Function} fn - Función que retorna la clave de agrupamiento.
 * @returns {Object} Objeto agrupado.
 */
function groupBy(list, fn) {
  if (!Array.isArray(list))
    throw new TypeError("list debe ser un array_Ejercicio17");
  if (typeof fn !== "function")
    throw new TypeError("fn debe ser una función_Ejercicio17");
  return list.reduce((acc, item) => {
    const key = fn(item);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});
}

/**
 * Devuelve la compañía del trabajo con mayor salario de una persona.
 * @param {Object} persons - Objeto personas con trabajos.
 * @returns {string} Nombre de la compañía del trabajo con mayor salario o de lo contrario 'unemployed'.
 */
function primaryJobCompany(persons) {
  if (!persons.jobs || persons.jobs.length === 0) {
    return "unemployed";
  }

  const jobMaxSalary = persons.jobs.reduce((max, job) => {
    if (job.salary > max.salary) {
      return job;
    } else {
      return max;
    }
  });

  return jobMaxSalary.company;
}

console.log(groupBy(people, primaryJobCompany));

//RESOLUCION ejercicio 19

/**
 * Calcula percentil p de un arreglo de números.
 * @param {Array<number>} arr - Arreglo de números.
 * @param {number} num - Percentil ingresado.
 * @returns {number} Valor del percentil.
 */
function percentile(arr, num) {
  if (!Array.isArray(arr))
    throw new TypeError("arr debe ser un array de números_Ejercicio19");
  if (typeof num !== "number")
    throw new TypeError("num debe ser un número_Ejercicio19");
  const index = (num / 100) * (arr.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;
  return arr[lower] * (1 - weight) + arr[upper] * weight;
}

/**
 * Calcula estadísticas salariales: min, max, promedio, mediana y percentiles.
 * @param {Array} persons - Arreglo de personas.
 * @returns {Object} Objeto con {min, max, avg, median, p25, p50, p75}.
 */
function salaryStats(persons) {
  if (!Array.isArray(persons))
    throw new TypeError(
      "el valor ingresado en la funcion salaryStats debe ser un array_Ejercicio19"
    );
  const salariesArray = persons.flatMap((p) => p.jobs.map((job) => job.salary));

  const salariesOrder = salariesArray.sort((a, b) => a - b);

  const min = salariesOrder[0];
  const max = salariesOrder[salariesOrder.length - 1];

  const avg =
    salariesOrder.reduce((sum, s) => sum + s, 0) / salariesOrder.length;

  const mid = Math.floor(salariesOrder.length / 2);
  let median = 0;
  if (salariesOrder.length % 2 === 0) {
    median = (salariesOrder[mid - 1] + salariesOrder[mid]) / 2;
  } else {
    median = salariesOrder[mid];
  }

  const p25 = percentile(salariesOrder, 25);
  const p50 = percentile(salariesOrder, 50);
  const p75 = percentile(salariesOrder, 75);

  return { min, max, avg, median, p25, p50, p75 };
}

console.log(salaryStats(people));
