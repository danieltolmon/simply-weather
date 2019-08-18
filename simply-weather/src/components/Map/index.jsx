import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const googleMapsKey = process.env.REACT_APP_GOOGLE_MAPS_ID
debugger

function MapDisplay({ google, position, changePosition, showMyFavorites }) {
  const { latitude, longitude } = position;

  function onClickMap(mapProps, map, clickEvent) {
    const { latLng } = clickEvent;
    const latitude = latLng.lat();
    const longitude = latLng.lng();

    const newPosition = {
      latitude,
      longitude
    };

    changePosition(newPosition);
  }

  return (
    <div>
      <Map
        google={google}
        containerStyle={
          showMyFavorites
            ? { width: "60%", height: "80%", top: "10%" }
            : { width: "100%", height: "80%", top: "10%" }
        }
        style={{
          width: "100%",
          height: "100%"
        }}
        initialCenter={{
          lat: latitude,
          lng: longitude
        }}
        center={{
          lat: latitude,
          lng: longitude
        }}
        zoom={6}
        onClick={onClickMap}
      >
        <Marker position={{ lat: latitude, lng: longitude }} />
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: googleMapsKey
})(MapDisplay);
