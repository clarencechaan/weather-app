import weather from "./weather.js";

const displayController = (() => {
  const setDescription = () => {
    const description = document.querySelector("#weather-description");
    description.innerText = weather.weatherDesc;
  };

  const setLocation = () => {
    const location = document.querySelector("#location");
    location.innerText = weather.location;
  };

  const setDate = () => {
    const date = document.querySelector("#date");
    date.innerText = weather.date;
  };

  const setTime = () => {
    const time = document.querySelector("#time");
    time.innerText = weather.time;
  };

  const setTemp = () => {
    const temp = document.querySelector("#temp");
    temp.innerText = weather.temp;
    if (weather.units === "metric") {
      temp.innerText += " °C";
    } else if (weather.units === "imperial") {
      temp.innerText += " °F";
    }
  };

  const getImageURL = (id, isNight) => {
    let url = "images/";
    if (id < 300) {
      url += "thunder.png";
    } else if (id < 600 && id !== 511) {
      url += "rain.png";
    } else if (id < 700 || id === 511) {
      url += "snowflake.png";
    } else if (id < 800) {
      url += "mist.png";
    } else if (id === 800 && isNight) {
      url += "moon.png";
    } else if (id === 800) {
      url += "sun.png";
    } else if (id === 801 && isNight) {
      url += "moon-cloud.png";
    } else if (id === 801) {
      url += "sun-cloud.png";
    } else if (id < 900) {
      url += "cloud.png";
    }
    return url;
  };

  const setImage = () => {
    const weatherImg = document.querySelector("#weather-img");
    weatherImg.src = getImageURL(weather.id, weather.isNight);
  };

  const setFeelsLike = () => {
    const feelsLike = document.querySelector("#feels-like");
    feelsLike.innerText = weather.feelsLike;
    if (weather.units === "metric") {
      feelsLike.innerText += " °C";
    } else if (weather.units === "imperial") {
      feelsLike.innerText += " °F";
    }
  };

  const setHumidity = () => {
    const humidity = document.querySelector("#humidity");
    humidity.innerText = weather.humidity + " %";
  };

  const setChanceOfRain = () => {
    const chanceOfRain = document.querySelector("#chance-of-rain");
    chanceOfRain.innerText = weather.chanceOfRain + " %";
  };

  const setWindSpeed = () => {
    const windSpeed = document.querySelector("#wind-speed");
    windSpeed.innerText = weather.windSpeed;
    if (weather.units === "metric") {
      windSpeed.innerText += " m/s";
    } else if (weather.units === "imperial") {
      windSpeed.innerText += " mph";
    }
  };

  const setForecast = () => {
    const weekdays = document.querySelectorAll(".day-weekday");
    const highs = document.querySelectorAll(".day-high");
    const lows = document.querySelectorAll(".day-low");

    for (let i = 0; i < 7; i++) {
      weekdays[i].innerText = weather.days[i].weekday;
      highs[i].innerText = weather.days[i].high;
      lows[i].innerText = weather.days[i].low;
      if (weather.units === "metric") {
        highs[i].innerText += " °C";
        lows[i].innerText += " °C";
      } else if (weather.units === "imperial") {
        highs[i].innerText += " °F";
        lows[i].innerText += " °F";
      }
    }
  };

  const setForecastImages = () => {
    const images = document.querySelectorAll(".day-img");
    for (let i = 0; i < 7; i++) {
      images[i].src = getImageURL(weather.days[i].id, false);
    }
  };

  const setWeather = () => {
    setDescription();
    setLocation();
    setDate();
    setTime();
    setTemp();
    setImage();
    setFeelsLike();
    setHumidity();
    setChanceOfRain();
    setWindSpeed();
    setForecast();
    setForecastImages();
  };

  const getSearchTerm = () => {
    const query = document.querySelector("#search-bar").value;
    document.querySelector("#search-bar").value = "";
    return query;
  };

  const toggleUnitSwitcherText = () => {
    const unitSwitcher = document.querySelector("#change-units");
    if (unitSwitcher.innerText === "Display Imperial") {
      unitSwitcher.innerText = "Display Metric";
    } else if (unitSwitcher.innerText === "Display Metric") {
      unitSwitcher.innerText = "Display Imperial";
    }
  };

  const showErrorMsg = () => {
    const errorMsg = document.querySelector("#error-msg");
    errorMsg.style.display = "block";
  };

  const hideErrorMsg = () => {
    const errorMsg = document.querySelector("#error-msg");
    errorMsg.style.display = "none";
  };

  return {
    setWeather,
    getSearchTerm,
    toggleUnitSwitcherText,
    showErrorMsg,
    hideErrorMsg,
  };
})();

export default displayController;
