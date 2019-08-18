import React, { useEffect, useState } from "react";

import Map from "../Map";
import WeatherDisplay from "../WeatherDisplay";
import Header from "../Header";
import Favorites from "../Favorites";
import Feedback from "../FeedBack";
import Loading from "../Loading";

import "./index.scss";
import logic from "../../logic";

function App() {
  const [position, setPosition] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const [showMyFavorites, setShowMyFavorites] = useState(false);
  const [isFavorite, setIsFavorite] = useState(null);
  const [favorites, setFavorites] = useState(null);

  const [feedbackMessage, setFeedBackMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    let longitude, latitude;
    navigator.geolocation.getCurrentPosition(position => {
      latitude = position ? position.coords.latitude : 38.7259284;
      longitude = position ? position.coords.longitude : -9.137382;
    });

    if (!longitude || !latitude) {
      latitude = 38.7259284;
      longitude = -9.137382;
    }

    const position = {
      latitude,
      longitude
    };

    setPosition(position);

    const favorites = logic.getFavorites();
    setFavorites(favorites);

    getWeatherAndForecastFromPosition(position);
  }, []);

  async function getWeatherAndForecastFromPosition(position) {
    setPosition(position);
    setIsLoading(true)
    try {
      const currentWeather = await logic.getCurrentWeather(
        position.latitude,
        position.longitude
      );
      setCurrentWeather(currentWeather);
      const isFavorite = logic.isFavorite(currentWeather.id);
      setIsFavorite(isFavorite);

    } catch (err) {
      setFeedBackMessage(err.message);
    }

    try {
      const forecastWeather = await logic.getForecastWeather(
        position.latitude,
        position.longitude
      );
      setForecastWeather(forecastWeather);
    } catch (err) {
      setFeedBackMessage(err.message);
    }

    setIsLoading(false)
  }

  async function getWeatherAndForecastFromSearch(query) {
    setIsLoading(true)

    try {
      const currentWeather = await logic.getCurrentWeatherFromCity(query);
      setCurrentWeather(currentWeather);
      setPosition({
        latitude: currentWeather.coord.lat,
        longitude: currentWeather.coord.lon
      });
      const isFavorite = logic.isFavorite(currentWeather.id);
      setIsFavorite(isFavorite);
    } catch (err) {
      setFeedBackMessage(err.message);
    }

    try {
      const forecastWeather = await logic.getForecastWeatherFromCity(query);
      setForecastWeather(forecastWeather);
    } catch (err) {
      setFeedBackMessage(err.message);
    }

    setIsLoading(false)
  }

  async function getWeatherAndForecastFromId(id) {
    setIsLoading(true)
    try {
      const currentWeather = await logic.getCurrentWeatherFromId(id);
      setCurrentWeather(currentWeather);
      setPosition({
        latitude: currentWeather.coord.lat,
        longitude: currentWeather.coord.lon
      });
      const isFavorite = logic.isFavorite(currentWeather.id);
      setIsFavorite(isFavorite);
    } catch (err) {
      setFeedBackMessage(err.message);
    }

    try {
      const forecastWeather = await logic.getForecastWeatherFromId(id);
      setForecastWeather(forecastWeather);
    } catch (err) {
      setFeedBackMessage(err.message);
    }

    setIsLoading(false)
  }

  function handleShowMyFavorites(isOnShowMyFavorites) {
    setShowMyFavorites(isOnShowMyFavorites);
  }

  function handleToggleFavorite(id, title) {
    logic.toggleFavorite(id, title);
    const isFavorite = logic.isFavorite(id);
    const favorites = logic.getFavorites();
    setIsFavorite(isFavorite);
    setFavorites(favorites);
  }

  return (
    <div className="app">
      <Header
        isOnShowFavorites={showMyFavorites}
        onClickMyFavorites={handleShowMyFavorites}
        onSumbitSearch={getWeatherAndForecastFromSearch}
      />
      {showMyFavorites && (
        <Favorites
          onFavorite={handleToggleFavorite}
          favorites={favorites}
          onClickLocation={getWeatherAndForecastFromId}
        />
      )}
      {position && (
        <Map
          position={position}
          changePosition={getWeatherAndForecastFromPosition}
          showMyFavorites={showMyFavorites}
        />
      )}
      {isLoading && <Loading />}
      {currentWeather && (
        <WeatherDisplay
          currentWeather={currentWeather}
          forecast={forecastWeather}
          position={position}
          isFavorite={isFavorite}
          onFavorite={handleToggleFavorite}
        />
      )}
      {feedbackMessage && (
        <Feedback
          message={feedbackMessage}
          onCross={() => setFeedBackMessage(null)}
        />
      )}
    </div>
  );
}

export default App;
