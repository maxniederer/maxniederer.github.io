const select = document.getElementById("region-select");
let currFilter = select.value;
let allCountries = document.getElementsByClassName("country-entry");

const search = document.getElementById("search-country-name");
search.addEventListener("keypress", (e) => {
  searchUpdate(e);
});

let regionArray = [
  document.getElementsByClassName("africa"),
  document.getElementsByClassName("americas"),
  document.getElementsByClassName("antarctic"),
  document.getElementsByClassName("asia"),
  document.getElementsByClassName("europe"),
  document.getElementsByClassName("oceania"),
];

function updateFilter() {
  hideAllCountries();
  currFilter = select.value;
  Array.from(regionArray[select.selectedIndex - 1]).forEach((element) => {
    element.classList.remove("hidden");
  });
}

function searchUpdate(event) {
  if (event.key == "Enter") {
    hideAllCountries();
    Array.from(allCountries).forEach((element) => {
      let countryName =
        element.childNodes[0].childNodes[3].childNodes[1].innerHTML.toLowerCase();
      if (countryName.includes(search.value.toLowerCase())) {
        element.classList.remove("hidden");
      }
    });
  }
}

function hideAllCountries() {
  Array.from(allCountries).forEach((element) => {
    element.classList.add("hidden");
  });
}
