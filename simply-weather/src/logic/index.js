import openWeatherAPI from "../openWeatherAPI";

import moment from "moment";

const storage = window.localStorage;

const logic = {
  getCurrentWeather: function(latitude, longitude) {
    if (typeof latitude !== "number")
      throw TypeError(`${latitude} is not a Number`);
    if (typeof longitude !== "number")
      throw TypeError(`${longitude} is not a Number`);

    return openWeatherAPI.getCurrentWeatherWithCoordinates(latitude, longitude);
  },

  getForecastWeather: async function(latitude, longitude) {
    if (typeof latitude !== "number")
      throw TypeError(`${latitude} is not a Number`);
    if (typeof longitude !== "number")
      throw TypeError(`${longitude} is not a Number`);

    let result = await openWeatherAPI.getForecastWithCoordinates(
      latitude,
      longitude
    );
    const forecastByDays = mapForecastByHouresToDays(result);
    const forecastByDaysAverage = averageWeatherParams(forecastByDays);
    return forecastByDaysAverage;
  },

  getCurrentWeatherFromCity: function(city) {
    if (typeof city !== "string")
      throw TypeError(`${city} is not a String`);
   
    return openWeatherAPI.getCurrentWeatherWithCityName(city);
  },

  getForecastWeatherFromCity: async function(city) {
    if (typeof city !== "string")
      throw TypeError(`${city} is not a String`);

    let result = await openWeatherAPI.getForecastWeatherWithCityName(city)

    const forecastByDays = mapForecastByHouresToDays(result);
    const forecastByDaysAverage = averageWeatherParams(forecastByDays);
    return forecastByDaysAverage;
  },

  getCurrentWeatherFromId: async function(id){
    if (typeof id !== "number")
      throw TypeError(`${id} is not a Number`);

      return await openWeatherAPI.getCurrentWeatherFromId(id)
  },

  getForecastWeatherFromId: async function(id) {
    if (typeof id !== "number")
      throw TypeError(`${id} is not a Number`);

    let result = await openWeatherAPI.getForecastWeatherFromId(id)

    const forecastByDays = mapForecastByHouresToDays(result);
    const forecastByDaysAverage = averageWeatherParams(forecastByDays);
    return forecastByDaysAverage;
  },

  toggleFavorite: function(id, title) {
    if (!storage.getItem("favorites")) {
      const firstFavoritesJSON = JSON.stringify([]);
      storage.setItem("favorites", firstFavoritesJSON);
    }
    const favoritesJSON = storage.getItem("favorites");
    const favorites = JSON.parse(favoritesJSON);

    const index = favorites.findIndex(favorite => favorite.id === id);

    if (index === -1) {
      favorites.push({ id, title });
    } else {
      favorites.splice(index, 1);
    }

    if (favorites.length) {
      const updatedFavoritesJSON = JSON.stringify(favorites);
      storage.setItem("favorites", updatedFavoritesJSON);
    } else {
      storage.removeItem("favorites");
    }
  },

  isFavorite: function(id) {
    if (storage.getItem("favorites")) {
      const favoritesJSON = storage.getItem("favorites");
      const favorites = JSON.parse(favoritesJSON);

      return !!favorites.find(favorite => favorite.id === id);
    } else {
      return false;
    }
  },

  getFavorites: function() {
    if (storage.getItem("favorites")) {
      const favoritesJSON = storage.getItem("favorites");
      return JSON.parse(favoritesJSON);
    } else {
      return [];
    }
  }
};

function mapForecastByHouresToDays(forecastByHoures) {
  let forecastByDays = [
    {
      moment: moment(),
      tempMin: [],
      tempMax: [],
      humidity: [],
      icons: []
    }
  ];

  for (let i = 0; i < forecastByHoures.length; i++) {
    let currentForecast = forecastByHoures[i];
    let forecastLastDay = forecastByDays[forecastByDays.length - 1];

    const momentCurrentValue = moment.unix(currentForecast.dt);

    if (momentCurrentValue.isSame(forecastLastDay.moment, "day")) {
      forecastLastDay = {
        ...forecastLastDay,
        tempMin: forecastLastDay.tempMin.push(currentForecast.main.temp_min),
        tempMax: forecastLastDay.tempMax.push(currentForecast.main.temp_max),
        humidity: forecastLastDay.humidity.push(currentForecast.main.humidity),
        icons: forecastLastDay.icons.push(currentForecast.weather[0].icon)
      };
    } else {
      forecastByDays.push({
        moment: momentCurrentValue,
        tempMin: [currentForecast.main.temp_min],
        tempMax: [currentForecast.main.temp_max],
        humidity: [currentForecast.main.humidity],
        icons: [currentForecast.weather[0].icon]
      });
    }
  }
  return forecastByDays;
}

function averageWeatherParams(forecastByDays) {
  return forecastByDays.map(forecast => ({
    day: forecast.moment.date(),
    month: forecast.moment.month() + 1, //moment give moonths from 0 to 1
    tempMin: getMinimum(forecast.tempMin),
    tempMax: getMaximum(forecast.tempMax),
    humidity: getAverage(forecast.humidity),
    icon: getMostRepitedIcon(forecast.icons)
  }));
}

function getMinimum(arr) {
  const minimum = arr.reduce((accum, currentValue) =>
    accum < currentValue ? accum : currentValue
  );

  return Number.parseInt(minimum);
}

function getMaximum(arr) {
  const maximum = arr.reduce((accum, currentValue) =>
    accum > currentValue ? accum : currentValue
  );

  return Number.parseInt(maximum);
}

function getAverage(arr) {
  return Number.parseInt(
    arr.reduce((accum, current) => current + accum) / arr.length
  );
}

function getMostRepitedIcon(arr) {
  let counter = {};
  arr.forEach(icon => {
    const iconsFounded = Object.keys(counter);
    const iconWitoutDayOrNight = icon.substring(0, 2); //most repited icon without considering day or night
    const repitedIcon = iconsFounded.find(
      iconFound => iconFound === iconWitoutDayOrNight
    );
    if (repitedIcon) {
      counter[repitedIcon] = +1;
    } else {
      counter[iconWitoutDayOrNight] = 1;
    }
  });

  const mostRepitedIcon = Object.keys(counter).reduce((accum, currentValue) =>
    counter[accum] > counter[currentValue] ? accum : currentValue
  );

  return mostRepitedIcon + "d"; //adding day to icon in order to be rendered
}

export default logic;
