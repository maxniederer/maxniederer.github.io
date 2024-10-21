const hamburger = document.getElementById("hamburger");
const navbar = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  if (navbar.getAttribute("aria-expanded") === "false") {
    navbar.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("data-expanded", "true");
  } else {
    navbar.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("data-expanded", "false");
  }
});
