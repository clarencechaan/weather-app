import weather from "./weather.js";
import displayController from "./displayController.js";

const API_KEY = "811da3a866d3da02c34a620dc35732a8";
let units = "metric";

async function getWeatherData(query) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=${units}`;
    const response = await fetch(url, { mode: "cors" });
    const currentWeatherData = await response.json();
    const lat = currentWeatherData.coord.lat;
    const lon = currentWeatherData.coord.lon;

    const oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`;
    const oneCallResponse = await fetch(oneCallURL, { mode: "cors" });
    const oneCallWeatherData = await oneCallResponse.json();

    weather.units = units;
    weather.setWeather(currentWeatherData, oneCallWeatherData);
    displayController.hideErrorMsg();
  } catch (err) {
    displayController.showErrorMsg();
  }
}

async function search() {
  const query = displayController.getSearchTerm();
  await getWeatherData(query);
  displayController.setWeather();
}

async function setDefaultWeather() {
  await getWeatherData("Toronto");
  displayController.setWeather();
}

async function changeUnits() {
  if (units === "metric") {
    units = "imperial";
  } else if (units === "imperial") {
    units = "metric";
  }
  const query = weather.location;
  await getWeatherData(query);
  displayController.toggleUnitSwitcherText();
  displayController.setWeather();
}

await setDefaultWeather();

// add event listener to search bar
const searchForm = document.querySelector("#search-form");
searchForm.onsubmit = () => {
  search();
  return false;
};

// add event listener to unit switcher
const unitSwitcher = document.querySelector("#change-units");
unitSwitcher.onclick = changeUnits;
