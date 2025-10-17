const searchCountries = async (name) => {
  const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  const data = await res.json();
  return data;
};
const countries = document.getElementById("countries");
const input = document.getElementById("input");

const updateDatalist = async (name) => {
  const data = await searchCountries(name);
  const countryNames = data.map((country) => country.name.common).slice(0, 10);
  console.log(countryNames);

  countries.innerHTML = "";

  countryNames.forEach((name) => {
    const p = document.createElement("option");
    p.value = name;
    p.textContent = name;
    countries.appendChild(p);
  });
};

input.addEventListener("input", (event) => {
  event.preventDefault();
  updateDatalist(event.target.value);
});
