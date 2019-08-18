# simply-weather
Simply weather shows the current weather and the foreacst for the next 5 days from a city. 

The app search for your location to show you the current weather and the forecast. If yous location is unable, it shows Lisbon. The search can be made through pointing into a map or writing the name of the city. You can also save your favorite cities.

## [Live demo](http://www.simply-weather.surge.sh)

## Getting started to run the code in local

This app is made with React, so once you clone the repository you will need to install [Node.js](https://nodejs.org/en/)

Install the npm packages
```
npm install
```

You will need to get your free keys from [google maps api](https://developers.google.com/maps/documentation/) and [open weather api](https://openweathermap.org/api). And add them in a .env file in the root of the project, with the following variable names:

```
REACT_APP_OPEN_WEATHER_KEY
REACT_APP_GOOGLE_MAPS_ID
```

Then you can run the application using
```
npm run start
```
 
 Enjoy and hope you have good Weather!

