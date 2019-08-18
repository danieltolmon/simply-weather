import React from "react";

import "./index.scss";

function CurrentWeather({ currentWeather }) {
  const icon = currentWeather.weather[0].icon;
  const iconPath = require(`../../weatherIcons/${icon}.png`);
  const temp = Number.parseInt(currentWeather.main.temp);
  const humidity = currentWeather.main.humidity;
  return (
    <div className="currentWeather">
      <h3 className="currentWeather__title">TODAY</h3>
      <img className="currentWeather__icon" alt={icon} src={iconPath} />
      <div className="currentWeather__info">
        <p className="currentWeather__info-tempNumber">{`${temp}ºC`}</p>
        <p className="currentWeather__info-humNumber">{`${humidity}%`}</p>
        <p className="currentWeather__info-tempLabel">temperature</p>
        <p className="currentWeather__info-humLabel">humidity</p>
      </div>
    </div>
  );
}

export default CurrentWeather;
