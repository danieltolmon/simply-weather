// require('dotenv').config()
const openWeatherKey= process.env.REACT_APP_OPEN_WEATHER_KEY

const openWeatherApi = {
  proxyUrl: "https://cors-anywhere.herokuapp.com/",
  url: `https://api.openweathermap.org/data/2.5`,

  getCurrentWeatherWithCoordinates(latitude, longitude) {
    debugger;
    return fetch(
      `${this.proxyUrl +
        this
          .url}/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${openWeatherKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())

      .then(response => {
        if (response.cod === 200) {
          return response;
        } else throw Error(response.message);
      });
  },

  getForecastWithCoordinates(latitude, longitude) {
    return fetch(
      `${this.proxyUrl +
        this
          .url}/forecast?lat=${latitude}&lon=${longitude}&units=metric&APPID=${openWeatherKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())

      .then(response => {
        if (response.cod === "200") {
          return response.list;
        } else throw Error(response.message);
      });
  },

  getCurrentWeatherWithCityName(city) {
    return fetch(
      `${this.proxyUrl +
        this.url}/weather?q=${city}&units=metric&APPID=${openWeatherKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())

      .then(response => {
        if (response.cod === 200) {
          return response;
        } else throw Error(response.message);
      });
  },

  getForecastWeatherWithCityName(city) {
    return fetch(
      `${this.proxyUrl +
        this.url}/forecast?q=${city}&units=metric&APPID=${openWeatherKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())

      .then(response => {
        if (response.cod === "200") {
          return response.list;
        } else throw Error(response.message);
      });
  },

  getCurrentWeatherFromId(id) {
    return fetch(
      `${this.proxyUrl +
        this.url}/weather?id=${id}&units=metric&APPID=${openWeatherKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())

      .then(response => {
        if (response.cod === 200) {
          return response;
        } else throw Error(response.message);
      });
  },

  getForecastWeatherFromId(id) {
    return fetch(
      `${this.proxyUrl +
        this.url}/forecast?id=${id}&units=metric&APPID=${openWeatherKey}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())

      .then(response => {
        if (response.cod === "200") {
          return response.list;
        } else throw Error(response.message);
      });
  }
};

export default openWeatherApi;
