import React from "react";

import "./index.scss";
import CurrentWeather from "../CurrentWeather";
import ForecastWeather from "../ForecastWeather";
import Footer from "../Footer";

function WeatherDisplay({
  currentWeather,
  forecast,
  isFavorite,
  onFavorite
}) {
  const title = currentWeather.name? `${currentWeather.name}, ${currentWeather.sys.country}`: 'No place found'
  const id = currentWeather.id;

  return (
    <div className="weatherDisplay">
      <div className="weatherDisplay__container">
        <div className="weatherDisplay__title-container">
          <h2 className="weatherDisplay__title">{title}</h2>
          <span className="weatherDisplay__title-favorite">
            <i
              onClick={() => onFavorite(id, title)}
              className={isFavorite ? "fas fa-heart" : "far fa-heart"}
            />
          </span>
        </div>
        <div className="weatherDisplay__weather">
          <CurrentWeather currentWeather={currentWeather} />
          <ForecastWeather forecast={forecast} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default WeatherDisplay;
