const route = (event) => {
  event.preventDefault();
  window.history.pushState({}, "", event.currentTarget.href);
  handleLocation();
};

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const routes = {
  404: "/pages/404.html",
  "/": "/pages/index.html",
  "/country/": "/pages/detail.html",
};

const confirmCountry = (str) => {
  if (!str.startsWith("/country/")) {
    return str;
  }
  return "/country/";
};

const handleLocation = async () => {
  // console.log(pathToRegex("/country/:id"));
  const path = window.location.pathname;
  // console.log(path);

  const route = routes[confirmCountry(path)] || routes[404];

  const html = await fetch(route).then((data) => data.text());
  setInnerHTML(document.getElementById("root"), html);
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
