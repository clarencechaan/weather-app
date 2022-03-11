import fm from "./formatting.js";

const weather = (() => {
  let weatherDesc;
  let location;
  let date;
  let time;
  let temp;
  let feelsLike;
  let humidity;
  let chanceOfRain;
  let windSpeed;
  let id;
  let isNight;
  let units = "metric";
  let days = [];

  const setWeather = (currentWeatherData, oneCallWeatherData) => {
    const date = fm.convertUTCToDate(
      currentWeatherData.dt + currentWeatherData.timezone + 18000
    );

    weather.location = currentWeatherData.name;
    weather.lat = currentWeatherData.coord.lat;
    weather.lon = currentWeatherData.coord.lon;
    weather.weatherDesc = fm.capitalizeEachWord(
      currentWeatherData.weather[0].description
    );
    weather.date = fm.formatDate(date);
    weather.time = fm.formatTime(date);
    weather.temp = Math.round(currentWeatherData.main.temp);
    weather.feelsLike = Math.round(currentWeatherData.main.feels_like);
    weather.humidity = currentWeatherData.main.humidity;
    weather.chanceOfRain = oneCallWeatherData.daily[0].pop;
    weather.windSpeed = Math.round(currentWeatherData.wind.speed * 10) / 10;
    weather.id = currentWeatherData.weather[0].id;
    weather.isNight = date.getHours() < 6 || date.getHours() > 18;

    for (let i = 0; i < 7; i++) {
      const weekday = fm.formatWeekday(
        fm.convertUTCToDate(oneCallWeatherData.daily[i + 1].dt + 18000)
      );
      const high = Math.round(oneCallWeatherData.daily[i + 1].temp.max);
      const low = Math.round(oneCallWeatherData.daily[i + 1].temp.min);
      const id = oneCallWeatherData.daily[i + 1].weather[0].id;
      days[i] = { weekday, high, low, id };
    }
  };

  return {
    weatherDesc,
    location,
    date,
    time,
    temp,
    feelsLike,
    humidity,
    chanceOfRain,
    windSpeed,
    id,
    isNight,
    units,
    days,
    setWeather,
  };
})();

export default weather;
