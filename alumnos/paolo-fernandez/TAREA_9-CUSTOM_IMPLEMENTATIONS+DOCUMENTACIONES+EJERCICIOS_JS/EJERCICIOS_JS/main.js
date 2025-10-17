document.addEventListener('DOMContentLoaded', () => {
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

  /*
    1) Listado plano de contactos

    Tarea: crear getContacts(people) que devuelva un arreglo plano con objetos { id, name, email, city, primaryJob }, donde primaryJob es el title del job con mayor salary (si no hay jobs → null).
    Salida esperada (parcial): { id:1, name:"Ana Ruiz", email:"ana.ruiz@example.com", city:"Guadalajara", primaryJob:"Frontend Dev" }
  */
  /**
   * Obtiene un listado plano de contactos con información básica
   * @param {Array<Object>} people - Array de personas
   * @returns {Array<Object>} Array de contactos con id, name, email, city y primaryJob
   * @throws {TypeError} Si people no es un array
   */
  function getContacts(people) {
    if (!Array.isArray(people)) throw new TypeError('No es un arreglo válido');

    return people.map(person => {
      const contact = {
        id: person.id,
        name: person.name,
        email: person.email,
        city: person.address.city
      };

      for (const job of person.jobs) {
        if (!contact.primaryJob) contact.primaryJob = job;

        if (job.salary > contact.primaryJob.salary) contact.primaryJob = job;
      }
      
      contact.primaryJob = contact.primaryJob?.title || null;

      return contact;
    });
  }
  // console.log(getContacts(people));

  /*
    2) Buscar por ciudad y ordenar por edad descendente

    Tarea: findByCity(people, city) → lista de personas en city, ordenadas por age desc.
    Ejemplo: findByCity(people, "Guadalajara") devuelve Ana (34), Raúl (52) — orden correcto: Raúl, Ana.
  */
  /**
   * Busca personas por ciudad y las ordena por edad descendente
   * @param {Array<Object>} people - Array de personas
   * @param {string} city - Nombre de la ciudad a buscar
   * @returns {Array<Object>|undefined} Personas en la ciudad ordenadas por edad (mayor a menor)
   * @throws {TypeError} Si people no es un array o city no es string
   */
  function findByCity(people, city) {
    if (!Array.isArray(people)) throw new TypeError('No es un arreglo válido');

    if (typeof city !== 'string') throw new TypeError('No es una ciudad válida válido');

    const filteredPeople = people.filter(person => person.address.city === city);

    if (filteredPeople.length === 0) {
      console.warn(`No se encontró ninguna persona en la ciudad ${ city }`);
      return;
    }

    // EL NÚMERO RETORNADO EN EL CALLBACK INDICA EL ORDEN
    return filteredPeople.sort((prevValue, currValue) => currValue.age - prevValue.age);
  }
  // console.log(findByCity(people, 'Guadalajara'));
 
  /*
    3) Total de salarios por persona (reduce + suma)

    Tarea: sumSalaries(person) → suma de salary en person.jobs. Luego totalSalariesAll(people) que devuelva array { id, name, totalSalary } y ordene por totalSalary desc.
  */
  /**
   * Suma todos los salarios de los trabajos de una persona
   * @param {Object} person - Objeto persona con propiedad jobs
   * @returns {number} Suma total de salarios
   */
  function sumSalaries(person) {
    if (!Array.isArray(person.jobs) || person.jobs.length === 0) return 0;

    return person.jobs.reduce((prevValue, currValue) => prevValue + currValue.salary, 0);
  }
  // console.log(sumSalaries(people[2]));

  /**
   * Calcula el total de salarios por persona y ordena descendentemente
   * @param {Array<Object>} people - Array de personas
   * @returns {Array<Object>} Array con id, name y totalSalary ordenado
   * @throws {TypeError} Si people no es un array
   */
  function totalSalariesAll(people) {
    if (!Array.isArray(people)) throw new TypeError('No es un arreglo válido');

    const peopleArray = people.map(person => (
      {
        id: person.id,
        name: person.name,
        totalSalary: sumSalaries(person)
      }
    ));

    return peopleArray.sort(
      (prevValue, currValue) => currValue.totalSalary - prevValue.totalSalary
    );
  }
  // console.log(totalSalariesAll(people));

  /*
    4) Personas que tienen familiares menores de X años

    Tarea: withMinors(people, edad) → devuelve personas que tengan al menos un miembro family con age < edad.
  */
  /**
   * Filtra personas que tienen familiares menores de cierta edad
   * @param {Array<Object>} people - Array de personas
   * @param {number} edad - Edad límite para filtrar
   * @returns {Array<Object>} Personas con al menos un familiar menor a la edad especificada
   * @throws {TypeError} Si people no es un array
   */
  function withMinors(people, edad) {
    if (!Array.isArray(people)) throw new TypeError('No es un arreglo válido');

    return people.filter(person => person.family.some(relative => relative.age < edad));
  }
  // console.log(withMinors(people, 18));
 
  /*
    5) Agrupar personas por estado (groupBy)

    Tarea: groupByState(people) → objeto { JAL: [...], CDMX: [...], ... } con arrays de id o name.
  */
  /**
   * Agrupa personas por estado
   * @param {Array<Object>} people - Array de personas
   * @returns {Object} Objeto con estados como llaves y arrays de IDs como valores
   * @throws {TypeError} Si people no es un array
   */
  function groupByState(people) {
    if (!Array.isArray(people)) throw new TypeError('No es un arreglo válido');

    const peopleByState = Object.groupBy(people, (person) => person.address.state);

    for (const state in peopleByState) {
      peopleByState[state] = peopleByState[state].map(person => person.id);
      // peopleByState[state] = peopleByState[state].map(person => person.name);
    }

    return peopleByState;
  }
  // console.log(groupByState(people));
  
  /*
    6) Balance de transacciones por persona (credit - debit)

    Tarea: transactionBalance(person) → suma: créditos restados o sumados según convenga. Específica: balance = sum(amount where type==='credit') - sum(amount where type==='debit').
    Luego: balancesAll(people) con {id, name, balance} ordenado asc.
  */
  /**
   * Calcula el balance de transacciones de una persona (créditos - débitos)
   * @param {Object} person - Objeto persona con propiedad transactions
   * @returns {number} Balance total (ingresos - gastos)
   */
  function transactionBalance(person) {
    return person.transactions.reduce((prevValue, currValue) => {
      if (currValue.type === 'credit') {
        return prevValue + currValue.amount;
      } else if (currValue.type === 'debit') {
        return prevValue - currValue.amount;
      }
    }, 0);
  }
  // console.log(transactionBalance(people[5]));
  
  /**
   * Calcula el balance de transacciones para todas las personas
   * @param {Array<Object>} people - Array de personas
   * @returns {Array<Object>} Array con id, name y balance ordenado ascendentemente
   * @throws {TypeError} Si people no es un array
   */
  function balancesAll(people) {
    if (!Array.isArray(people)) throw new TypeError('No es un arreglo válido');

    const peopleArray = people.map(person => (
      {
        id: person.id,
        name: person.name,
        balance: transactionBalance(person)
      }
    ));

    return peopleArray.sort((prevValue, currValue) => prevValue.balance - currValue.balance); 
  }
  // console.log(balancesAll(people));

  /*
    7) Buscar el skill más común entre todas las personas

    Tarea: mostCommonSkill(people) → string (skill más frecuente). Usa reduce para contar ocurrencias y Object.entries para elegir máximo.
  */
  /**
   * Encuentra el skill más común entre todas las personas
   * @param {Array<Object>} people - Array de personas
   * @returns {string} Skill más frecuente, o lista separada por comas si hay empate
   * @throws {TypeError} Si people no es un array
   */
  function mostCommonSkill(people) {
    if (!Array.isArray(people)) throw new TypeError('No es un arreglo válido');

    const skillCount = people.reduce((prevValue, currValue) => {
      for (const skill of currValue.skills) {
        prevValue[skill] = (prevValue[skill] || 0) + 1;
      }

      return prevValue;
    }, { });
    
    const maxCount = Math.max(...Object.values(skillCount));

    const mostCommonSkills = Object.entries(skillCount)
      .filter(skill => skill[1] === maxCount)
      .map(skill => skill[0]);

    return mostCommonSkills.join(', ');
  }
  // console.log(mostCommonSkill(people));

  /*
    8) Sumar gastos por ciudad (reduce + flatten)

    Tarea: expensesByCity(people) → objeto { cityName: totalDebitAmount } (solo type==='debit').
  */
  /**
   * Suma los gastos (débitos) por ciudad
   * @param {Array<Object>} people - Array de personas
   * @returns {Object} Objeto con ciudades como llaves y totales de débitos como valores
   * @throws {TypeError} Si people no es un array
   */
  function expensesByCity(people) {
    if (!Array.isArray(people)) throw new TypeError('No es un arreglo válido');

    return people.reduce((prevValue, currValue) => {
      const city = currValue.address.city;

      const personDebits = currValue.transactions
        .filter(transaction => transaction.type === 'debit')
        .reduce((prev, curr) => prev + curr.amount, 0);

      prevValue[city] = (prevValue[city] || 0) + personDebits;

      return prevValue;
    }, { });
  }
  // console.log(expensesByCity(people));

  /*
    9) Obtener árbol familiar plano

    Tarea: flattenFamilies(people) → arreglo con objetos { personId, personName, relation, relativeName, relativeAge } para todos los familiares.
  */
  /**
   * Aplana el árbol familiar de todas las personas
   * @param {Array<Object>} people - Array de personas
   * @returns {Array<Object>} Array plano con información de cada relación familiar
   * @throws {TypeError} Si people no es un array
   */
  function flattenFamilies(people) {
    if (!Array.isArray(people)) throw new TypeError('No es un arreglo válido');

    return people.flatMap(person => 
      person.family.map(relative => (
        {
          personId: person.id,
          personName: person.name,
          relation: relative.relation,
          relativeName: relative.name,
          relativeAge: relative.age
        }
      ))
    );
  }
  // console.log(flattenFamilies(people));

  /*
    10) Encontrar personas "multi-job" con promedio salarial

    Tarea: multiJobAverages(people) → para quienes tienen más de 1 job, devolver { id, name, avgSalary }
  */
  /**
   * Calcula el salario promedio de personas con múltiples trabajos
   * @param {Array<Object>} people - Array de personas
   * @returns {Array<Object>} Array con id, name y avgSalary para personas con más de 1 trabajo
   * @throws {TypeError} Si people no es un array
   */
  function multiJobAverages(people) {
    if (!Array.isArray(people)) throw new TypeError('No es un arreglo válido');

    const multiJobPeople = people.filter(person => person.jobs.length > 1);

    return multiJobPeople.map(person => {
      const jobs = person.jobs;

      const totalSalary = jobs.reduce((prevValue, currValue) => prevValue + currValue.salary, 0);
      const avgSalary =  totalSalary / jobs.length;

      return {
        id: person.id,
        name: person.name,
        avgSalary
      };
    })
  }
  // console.log(multiJobAverages(people));

  /*
    11) Filtrar emails válidos y formatearlos

    Tarea: validEmails(people) → lista de emails válidos (regExp simple) en minúsculas, sin duplicados.
    Extras: quitar espacios, validar @ y dominio simple.
  */
  /**
   * Filtra y formatea emails válidos
   * @param {Array<Object>} people - Array de personas
   * @returns {Array<string>} Array de emails únicos en minúsculas y válidos
   * @throws {TypeError} Si people no es un array
   */
  function validEmails(people) {
    if (!Array.isArray(people)) throw new TypeError('No es un arreglo válido');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validEmailsList = people
      .map(person => person.email.trim().toLowerCase())
      .filter(email => emailRegex.test(email));

    return [ ...new Set(validEmailsList) ];
  }
  // console.log(validEmails(people));

  /*
    13) Merge de transacciones duplicadas

    Tarea: mergeTransactions(person) → si una person.transactions contiene transacciones con el mismo id, unirlas sumando amount
  */
  /**
   * Une transacciones duplicadas sumando sus montos
   * @param {Object} person - Objeto persona con propiedad transactions
   * @returns {Object} Nueva persona con transacciones consolidadas
   */
  function mergeTransactions(person) {
    const mergedById = person.transactions.reduce((prevValue, currValue) => {
      const id = currValue.id;

      if (prevValue[id]) {
        prevValue[id].amount += currValue.amount;
      } else {
        prevValue[id] = { ...currValue };
      }
      
      return prevValue;
    }, { });

    return {
      ...person,
      transactions: Object.values(mergedById)
    };
  }
  // console.log(mergeTransactions(people[0]));
  
  /*
    15) Agrupar por decade de edad y contar

    Tarea: ageBuckets(people) → { '20s': 2, '30s': 3, ... }.
  */
  /**
   * Agrupa personas por décadas de edad
   * @param {Array<Object>} people - Array de personas
   * @returns {Object} Objeto con décadas como llaves y conteos como valores
   * @throws {TypeError} Si people no es un array
   */
  function ageBuckets(people) {
    if (!Array.isArray(people)) throw new TypeError('No es un arreglo válido');

    return people.reduce((prevValue, currValue) => {
      const residue = currValue.age % 10;

      const decade = `${ currValue.age - residue }s`;
      const decadeCount = prevValue[decade] || 0;

      prevValue[decade] = decadeCount + 1;

      return prevValue;
    }, { });
  }
  // console.log(ageBuckets(people));

  /*
    16) Pipeline de transformación con funciones puras (compose)

    Tarea: Crear compose(...funcs) y usarlo en processPeople = compose(filterAdults, mapToSummary, sortByName) donde:

    filterAdults filtra age >= 18,
    mapToSummary transforma a { id, name, city },
    sortByName ordena alfabéticamente.
  */
  /**
   * Compone múltiples funciones en un pipeline
   * @param {...Function} funcs - Funciones a componer
   * @returns {Function} Función que ejecuta todas las funciones en secuencia
   */
  function compose(...funcs) {
    return function(data) {
      return funcs.reduce((result, func) => func(result), data)
    }
  }

  /**
   * Filtra personas adultas (18+ años)
   * @param {Array<Object>} people - Array de personas
   * @returns {Array<Object>} Personas con edad >= 18
   * @throws {TypeError} Si people no es un array
   */
  function filterAdults(people) {
    if (!Array.isArray(people)) throw new TypeError('No es un arreglo válido');

    return people.filter(people => people.age >= 18);
  }

  /**
   * Transforma personas a formato resumen
   * @param {Array<Object>} people - Array de personas
   * @returns {Array<Object>} Array con id, name y city
   * @throws {TypeError} Si people no es un array
   */
  function mapToSummary(people) {
    if (!Array.isArray(people)) throw new TypeError('No es un arreglo válido');

    return people.map(person => (
      {
        id: person.id,
        name: person.name,
        city: person.address.city
      }
    ));
  }

  /**
   * Ordena personas alfabéticamente por nombre
   * @param {Array<Object>} people - Array de personas
   * @returns {Array<Object>} Personas ordenadas alfabéticamente
   * @throws {TypeError} Si people no es un array
   */
  function sortByName(people) {
    if (!Array.isArray(people)) throw new TypeError('No es un arreglo válido');

    return people.toSorted((prevValue, currValue) => prevValue.name.localeCompare(currValue.name));
  }

  const processPeople = compose(filterAdults, mapToSummary, sortByName);
  // console.log(processPeople(people));
  
  /*
    17) Implementar groupBy genérico y usarlo

    Tarea: groupBy(list, fn) donde fn devuelve la clave. Usarlo para agrupar personas por primaryJobCompany (empresa del job con mayor salario). Si no tiene jobs → "unemployed".
  */
  /**
   * Agrupa elementos de un array según una función de clave
   * @param {Array} list - Array a agrupar
   * @param {Function} fn - Función que devuelve la clave de agrupación
   * @returns {Object} Objeto con llaves y arrays de elementos agrupados
   * @throws {TypeError} Si list no es un array o fn no es una función
   */
  function groupBy(list, fn) {
    if (!Array.isArray(list)) throw new TypeError('No es un arreglo válido');

    if (typeof fn !== 'function') throw new TypeError('No es una función válida');

    return list.reduce((prevValue, currValue) => {
      const key = fn(currValue);

      if (!prevValue[key]) prevValue[key] = [];

      prevValue[key].push(currValue);

      return prevValue;
    }, { });
  }

  const groupByCompany = groupBy(people, person => {
    if (!person.jobs || person.jobs.length === 0) return "unemployed";
    
    const bestJob = person.jobs.reduce((prevValue, currValue) => 
      currValue.salary > prevValue.salary ? currValue : prevValue
    );
    
    return bestJob.company;
  });
  // console.log(groupByCompany);

  /*
    19) Estadísticas por rango salarial

    Tarea: salaryStats(people) que calcule sobre todos los jobs:

    min, max, avg, median, percentiles (25, 50, 75).
    Cómo: extraer todos los salarios en un array, ordenarlo y calcular métricas (reduce, Math).
  */
  /**
   * Calcula un percentil específico de un array ordenado
   * @param {Array<number>} list - Array de números ordenados
   * @param {number} percentile - Percentil a calcular (0-100)
   * @returns {number} Valor del percentil
   */
  function getPercentile(list, percentile) {
    const index = Math.floor((percentile / 100) * (list.length - 1));
    return list[index];
  }

  /**
   * Calcula estadísticas salariales de todos los trabajos
   * @param {Array<Object>} people - Array de personas
   * @returns {Object|null} Objeto con min, max, avg, median, p25, p50, p75 o null si no hay salarios
   * @throws {TypeError} Si people no es un array
   */
  function salaryStats(people) {
    if (!Array.isArray(people)) throw new TypeError('No es un arreglo válido');

    const allSalaries = people
      .flatMap(person => person.jobs)
      .map(job => job.salary)
      .toSorted((prevValue, currValue) => prevValue - currValue);

    if (allSalaries.length === 0) return null;

    const min = allSalaries[0];
    const max = allSalaries.at(-1);

    const sum = allSalaries.reduce((prevValue, currValue) => prevValue + currValue, 0);
    const avg = sum / allSalaries.length;
  
    const p25 = getPercentile(allSalaries, 25);
    const median = getPercentile(allSalaries, 50);
    const p75 = getPercentile(allSalaries, 75);
  
    return {
      min,
      max,
      avg: Math.round(avg),
      median,
      p25,
      p50: median,
      p75
    };
  }
  // console.log(salaryStats(people));
});