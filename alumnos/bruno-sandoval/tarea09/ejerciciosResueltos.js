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
    skills: ["js", "node","lit"],
    transactions: [
      { id: "t7", date: "2025-04-20", amount: 50, type: "credit" },
      { id: "t8", date: "2025-04-21", amount: 25, type: "credit" }
    ]
  }
];


// 1) Listado plano de contactos
/**
 * @param {Array} people - array de personas
 * @returns {Array} - array de objetos con id, name, email, city , primaryJob
 */
function getContacts(people) {
  validateData(people);
  return people.map(persona => {
    const primaryJob = persona.jobs.length > 0 ? persona.jobs.reduce((prev, current) => (prev.salary > current.salary) ? prev : current).title : null;
    return {
      id: persona.id,
      name: persona.name,
      email: persona.email,
      city: persona.address.city,
      primaryJob: primaryJob
    }
  })
}
// console.log(getContacts(people));

// 2) Buscar por ciudad y ordenar por edad descendente
/** 
* @param {Array} people - array de personas
* @param {String} city - ciudad a filtrar
* @returns {Array} - Array de personas
*/
function findByCity(people,city){
  validateData(people);
  if(city === null || city===undefined || city===''){
    throw new Error("Ingrese una ciudad correcta");
  }
  const personCity = people.filter(person=> person.address.city = city).sort((a,b)=> b.age - a.age);

  return personCity
}
// console.log(findByCity(people,"Ciudad de México"));

// 3) Total de salarios por persona (reduce + suma)
/**
 * @param {*} person -- objeto persona
 * @returns -- Retonar la suma de los salarios de los respectivos trabajos
 */
function sumSalaries(person){
  return person.jobs.reduce((sumSalaries,job) => sumSalaries + job.salary , 0);
}
/**
 * 
 * @param {*} people -- Array de objetos personas 
 * @returns -- retonar una array personalizado y ordenando de forma desc
 */
function totalSalariesAll(people){
  validateData(people);
  return people.map(person =>{
    return{
      id: person.id,
      name: person.name,
      totalSalary: sumSalaries(person)
    }
  }).sort((a,b)=> b.totalSalary - a.totalSalary);
}
// console.log(totalSalariesAll(people));

// 4) Personas que tienen familiares menores de X años
/**
 * 
 * @param {*} people -- array de personas
 * @param {*} edad  -- edad que funcionara como filtro
 * @returns -- retorna una array filtrando que almenos un familiar de la persona sea menor al numero dado
 */
function withMinors(people,edad){
  validateData(people);
  if(!Number.isInteger(edad) || edad<=0){
    throw new Error("La edad debe ser un número entero positivo.");  }
  return people.filter(person =>{
    return person.family.some(fa => fa.age < edad);
  })
}
// console.log(withMinors(people,30));

// 5) Agrupar personas por estado (groupBy)
/**
 * 
 * @param {*} people --array de personas
 * @returns  --retornar un array con las personas agrupadas por estado
 */
function groupByState(people){
  validateData(people);
  return people.reduce((dataTransform, current)=> {
    const currentState = current.address.state;
    const currentValue = current.name;
    if(!dataTransform[currentState]){
      dataTransform[currentState]= [];
    }
    if(!dataTransform[currentState].includes(currentValue)){
      dataTransform[currentState].push(currentValue);
    }
    return dataTransform;
  },{})
}
// console.log(groupByState(people));

// 6) Balance de transacciones por persona (credit - debit)
/**
 * 
 * @param {*} person --Objeto de un array
 * @returns --retorna el balance de una persona
 */
function transactionBalance(person){
  let credito = person.transactions.filter(t => t.type == "credit").reduce((sum,current)=>sum +=current.amount,0);
  let debito = person.transactions.filter(t => t.type == "debit").reduce((sum,current)=>sum +=current.amount,0);
  return credito - debito;
}
/**
 * 
 * @param {*} people --Array de objeto persona
 * @returns --retonar un array personalizado, ordenado de forma desc en relacion al balance
 */
function balancesAll(people){
  validateData(people);
  return people.map(person =>{
    return {
      id: person.id,
      name: person.name,
      balance: transactionBalance(person)
    }
  }).sort((a,b)=> b.balance - a.balance)
}
// console.log(balancesAll(people));

// 7) Buscar el skill más común entre todas las personas

// Tarea: mostCommonSkill(people) → string (skill más frecuente). Usa reduce para contar ocurrencias y Object.entries para elegir máximo.

/**
 * 
 * @param {*} people --recibe un array de personas
 * @returns  -- retorna los skills que mas se repiten
 */
function mostCommonSkill(people){
  validateData(people);
  const allSkills = people.flatMap(person => person.skills);
  
  const skillCounts = allSkills.reduce((counts,skill)=>{
    counts[skill] = (counts[skill]||0)+1;
    return counts;
  },{})

  const skillEntries = Object.entries(skillCounts);
  const maxSkill = skillEntries.reduce((maxs,current)=> {
    if(maxs.length === 0){
      return [current]
    }

    const maxCount = maxs[0][1];
    const currentCount = current[1];

    if(currentCount > maxCount){
      return [current];
    } else if(currentCount === maxCount){
      maxs.push(current);
      return maxs;
    }
    return maxs;
  },[])
  return maxSkill.map(skil=>skil[0]);
}
// console.log(mostCommonSkill(people));

// 8) Sumar gastos por ciudad (reduce + flatten)
/**
 * 
 * @param {*} people --recibe un array de personas
 * @returns --Retorna un objeto, de los datos de gastos por ciudad
 */
function expensesByCity(people){
  validateData(people);
  return people.reduce((dataTransform, people)=>{
    const city = people.address.city;
    const value = people.transactions
        .filter(t => t.type === 'debit')
        .reduce((sum,t)=>sum + t.amount,0);

    const currentCityExpenses = dataTransform[city] || 0;
    dataTransform[city] = currentCityExpenses + value;

    return dataTransform
  },{})
}
// console.log(expensesByCity(people));

// 9) Obtener árbol familiar plano
/**
 * 
 * @param {*} people 
 * @returns --retornar un array personalizado
 */
function flattenFamilies(people){
  validateData(people);
  return people.flatMap(person=>{
    return person.family.map(familiar => {
      return {
        personId: person.id,
        personName: person.name,
        relation: familiar.relation,
        relativeName: familiar.name,
        relativeAge: familiar.age
      };
    });
  })
}
// console.log(flattenFamilies(people));

// 10) Encontrar personas "multi-job" con promedio salarial
/**
 * 
 * @param {*} people 
 * @returns -- se retorna una lista de las personas multitrabajo y un objeto personalizado
 */
function multiJobAverages(people){
  const personMultiJob = people.filter(person => person.jobs.length > 1);
  return personMultiJob.map(person =>{
    const avgSalary = person.jobs.reduce((sum,job)=>sum+job.salary,0);
    return{
      id: person.id,
      name: person.name,
      avgSalary: avgSalary
    }
  });
}
// console.log(multiJobAverages(people));

// 11) Filtrar emails válidos y formatearlos
/**
 * 
 * @param {*} people 
 * @returns --retorna la lista de emails validos
 */
function validEmails(people){
  validateData(people);
  const format = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const emailsValid = people.reduce((emails, person)=>{
    const emailTransform = person.email.trim().toLowerCase();
    if(format.test(emailTransform)){
      emails.push(emailTransform);
    }
    return emails;

  },[]);
  return [...emailsValid]

}
// console.log(validEmails(people));

// 13) Merge de transacciones duplicadas

// Tarea: mergeTransactions(person) → si una person.transactions contiene transacciones con el mismo id, unirlas sumando amount
/**
 * 
 * @param {*} person 
 * @returns --retorna un objeto de las transacciones
 */
function mergeTransactions(person){
  const transactions = person.transactions.reduce((acc, currentTransaction)=>{
    const transactionId = currentTransaction.id;
    if(acc[transactionId]){
      acc[transactionId] += currentTransaction.amount;
    }else{
      acc[transactionId] = currentTransaction;
    }
    return acc;
  },{})
  return Object.values(transactions);
}
// console.log(mergeTransactions(people[0]));

// 15) Agrupar por decade de edad y contar
/**
 * 
 * @param {*} people 
 * @returns --retonar un objeto, agrupando por edad y contando
 */
function ageBuckets(people){
  validateData(people);
  const response = people.reduce((edades,person)=>{
    const indice = person.age - (person.age%10);
    const key = `${indice}s`

    edades[key] = (edades[key] || 0) + 1;
    
    return edades;
  },{})
  return response;
}
// console.log(ageBuckets(people));

// 16) Pipeline de transformación con funciones puras (compose)

// Tarea: Crear compose(...funcs) y usarlo en processPeople = compose(filterAdults, mapToSummary, sortByName) donde:

// filterAdults filtra age >= 18,
// mapToSummary transforma a { id, name, city },
// sortByName ordena alfabéticamente.

function filterAdults(people){
  return people.filter(p => p.age>=18);
}
function mapToSummary(people){
  return people.map(p => {
    return{
      id: p.id,
      name: p.name,
      city: p.address.city
    }
  })
}
function sortByName(people){
  return people.sort((a,b) => a.name.localeCompare(b.name));
}
const compose = (...funcs) =>
  (initialValue)=>
    funcs.reduceRight(
      (currentValue,currentFunc) => currentFunc(currentValue)
      ,initialValue
    );
  const processPeople = compose(
    sortByName,     // 3. Se ejecuta al final
    mapToSummary,   // 2. Se ejecuta en medio
    filterAdults      // 1. Se ejecuta primero
  );

  const result = processPeople(people);
  console.log(result);


// 19) Estadísticas por rango salarial

// Tarea: salaryStats(people) que calcule sobre todos los jobs:

// min, max, avg, median, percentiles (25, 50, 75).
// Cómo: extraer todos los salarios en un array, ordenarlo y calcular métricas (reduce, Math).
function salaryStats(people){
  validateData(people);
  
}

function validateData(people) {
    if(!Array.isArray(people) || people.length === 0){
        throw new Error("Data invalida: se espera un array no vacío");
    }
    return true;
}

