import React from "react";

import "./index.scss";

function ForecastWeather({ forecast }) {
  return (
    <div className="forecastWeather">
      {forecast &&
        forecast.length &&
        forecast.map((forecast, index) => {
          const iconPath = require(`../../weatherIcons/${forecast.icon}.png`);
          return (
            <div className="forecastWeather__forecast" key={index}>
              <p className="forecastWeather__forecast-day">{`${forecast.day}/${
                forecast.month
              }`}</p>
              <img
                className="forecastWeather__forecast-icon"
                alt={forecast.icon}
                src={iconPath}
              />
              <p className="forecastWeather__forecast-temp">{`${
                forecast.tempMin
              }/${forecast.tempMax} ºC`}</p>
              <p className="forecastWeather__forecast-humidity">{`${
                forecast.humidity
              }%`}</p>
            </div>
          );
        })}
    </div>
  );
}

export default ForecastWeather;
