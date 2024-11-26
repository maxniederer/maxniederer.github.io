const darkModeIcon = document.getElementById("dark-mode-icon");
const darkModeText = document.getElementById("dark-mode-text");

let currThemeCookie = localStorage.getItem("theme");
const darkThemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
if (!currThemeCookie) {
  if (darkThemeQuery.matches) {
    currThemeCookie = "dark";
  } else {
    currThemeCookie = "light";
  }
}
changeThemeTo(currThemeCookie);

function changeThemeTo(str) {
  localStorage.setItem("theme", str);
  document.documentElement.setAttribute("data-theme", str);
  changeButtonTextTo(str);
}

function toggleTheme() {
  let currTheme = localStorage.getItem("theme");
  if (currTheme === "dark") {
    changeThemeTo("light");
  } else {
    changeThemeTo("dark");
  }
}

function changeButtonTextTo(str) {
  // if (str === "dark") {
  //   darkModeIcon.setAttribute("name", "sunny-outline");
  //   darkModeText.innerHTML = "Light Mode";
  // } else {
  //   darkModeIcon.setAttribute("name", "moon-outline");
  //   darkModeText.innerHTML = "Dark Mode";
  // }
}
