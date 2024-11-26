async function getCountryDetails() {
  let currCountry = window.location.pathname.substring(9);
  const url = `https://restcountries.com/v3.1/name/${currCountry}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const json = await response.json();
    console.log(json);

    let nativeNameStr = getNativeNameStr(json[0].name.nativeName);
    let populationStr = json[0].population.toLocaleString();
    let subRegionStr = !json[0].subregion ? "N/A" : json[0].subregion;
    let capitalStr =
      json[0].capital.length == 0 ? "N/A" : json[0].capital.join(", ");
    let tldStr = json[0].tld.length == 0 ? "N/A" : json[0].tld.join(", ");
    let currenciesStr = getCurrenciesStr(json[0].currencies);
    let languagesStr = getLanguagesStr(json[0].languages);

    // problem: code is not waiting here it is moving on with empty string
    let bordersStr = await getBordersStr(json[0].borders);
    console.log(bordersStr);

    document.getElementById("details").innerHTML = `
      <img class="" src="${json[0].flags.png}" alt="${json[0].flags.alt}" />
      <div class="country-information">
        <h1>${json[0].name.common}</h1>
        <div class="country-details">
          <ul>
            <li>
              <strong>Native Name:</strong>
              ${nativeNameStr}
            </li>
            <li>
              <strong>Population:</strong>
              ${populationStr}
            </li>
            <li>
              <strong>Region:</strong>
              ${json[0].region}
            </li>
            <li>
              <strong>Sub-Region:</strong>
              ${subRegionStr}
            </li>
            <li>
              <strong>Capital:</strong>
              ${capitalStr}
            </li>
          </ul>
          <ul>
            <li>
              <strong>Top Level Domain:</strong>
              ${tldStr}
            </li>
            <li>
              <strong>Currencies:</strong>
              ${currenciesStr}
            </li>
            <li>
              <strong>Languages:</strong>
              ${languagesStr}
            </li>
          </ul>
        </div>
        <div class="neighbors">
          <strong>Border Countries:</strong>
          <ul class="neighbor-list">
            ${bordersStr}
          </ul>
        </div>
      </div>
    `;
  } catch (err) {
    console.error(err);
  }
}

function getLanguagesStr(obj) {
  if (obj.length < 1) {
    return "N/A";
  }
  let stringList = [],
    i = 0;
  for (x in obj) {
    stringList[i] = obj[x];
    i++;
  }
  return stringList.join(", ");
}

function getCurrenciesStr(obj) {
  if (obj.length < 1) {
    return "N/A";
  }
  let stringList = [],
    i = 0;
  for (x in obj) {
    obj[x].symbol
      ? (stringList[i] = obj[x].name + ` (${obj[x].symbol})`)
      : (stringList[i] = obj[x].name);
    i++;
  }
  return stringList.join(", ");
}

function getNativeNameStr(obj) {
  for (var x in obj) {
    return obj[x].official;
    break;
  }
}

async function getBordersStr(obj) {
  if (!obj) {
    return `<li class="no-neighbor">N/A</li>`;
  }

  let borders = "";

  for (const curr of obj) {
    try {
      const responseCode = await fetch(
        `https://restcountries.com/v3.1/alpha/${curr}?fields=name`
      );
      if (!responseCode.ok) {
        throw new Error(`${responseCode.status}`);
      }
      const jsonCode = await responseCode.json();

      let country = jsonCode.name.common;
      borders += `<li><a href="/country/${country.toLowerCase()}" class="btn ui-component neighbor-btn">${country}</a></li>`;
      // console.log(borders);
    } catch (err) {
      console.error(err);
    }
  }

  return borders;
}

getCountryDetails();
