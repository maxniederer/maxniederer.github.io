async function getFullCountryList() {
  const url =
    "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region"; // fields for home page
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const json = await response.json();
    console.log(json);

    json.forEach((e) => {
      const newCountry = document.createElement("li");
      newCountry.classList.add("country-entry");

      let populationStr = e.population.toLocaleString();
      let regionStr = e.region;
      let capitalStr = e.capital.length == 0 ? "N/A" : e.capital.join(", ");

      newCountry.classList.add(regionStr.toLowerCase());

      newCountry.innerHTML = `<a href="/country/${getSlug(
        e.name.common
      )}" class="country-link" data-link>
          <img class="country-flag" src="${e.flags.png}" alt="${e.flags.alt}" />
          <div class="country-desc">
            <h2>${e.name.common}</h2>
            <ul class="country-stats">
              <li>
                <strong>Population:</strong>
                ${populationStr}
              </li>
              <li>
                <strong>Region:</strong>
                ${regionStr}
              </li>
              <li>
                <strong>Capital:</strong>
                ${capitalStr}
              </li>
            </ul>
          </div>
        </a>`;

      document.getElementById("country-list").appendChild(newCountry);
    });

    const countryLinks = document.getElementsByClassName("country-link");
    Array.from(countryLinks).forEach((e) => {
      e.addEventListener("click", route);
    });
  } catch (err) {
    console.error(err);
  }
}

function getSlug(str) {
  return str.toLowerCase();
}

getFullCountryList();

//json.borders[]

// let link = document.createElement("a");
// link.href = "#";
// link.classList.add("country-link");

// let flag = document.createElement("img");
// flag.src = e.flags.png;
// flag.alt = e.flags.alt;
// flag.classList.add("country-flag");

// let desc = document.createElement("div");
// desc.classList.add("country-desc");

// let name = document.createElement("h2");
// name.innerHTML = e.name.common;

// let stats = document.createElement("ul");
// stats.classList.add("country-stats");

// let population = document.createElement("li");
// let populationVar = e.population;
// population.innerHTML = `<strong>Population:</strong> ${populationVar}`;

// let region = document.createElement("li");
// let regionVar = e.region;
// region.innerHTML = `<strong>Region:</strong> ${regionVar}`;

// let capital = document.createElement("li");
// let capitalVar = e.capital[0];
// capital.innerHTML = `<strong>Capital:</strong> ${capitalVar}`;

// stats.appendChild(population);
// stats.appendChild(region);
// stats.appendChild(capital);
// desc.appendChild(name);
// desc.appendChild(stats);
// link.appendChild(flag);
// link.appendChild(desc);
