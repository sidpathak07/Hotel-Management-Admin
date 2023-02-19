import React, { useContext, useState, useRef, useMemo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";

const center = {
  lat: 16.705,
  lng: 74.2433,
};
const containerStyle = {
  width: "80vw",
  height: "50vh",
};
export const CheckMaps = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [position, setPosition] = useState(() => {
    return { lat: 16.705, lng: 74.2433 };
  });
  const [address, setAddress] = useState(() => {
    return "";
  });
  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const searchForAddress = (e) => {
    e.preventDefault();
    console.log(searchForAddress);
    axios(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBSO9Gcpkh_BW51kJ7OMpd4G_XugjW6_6k`
    )
      .then((response) => {
        console.log(response);
        console.log(
          response.data.results[0].geometry.location.lat,
          response.data.results[0].geometry.location.lng
        );
        setPosition({
          lat: response.data.results[0].geometry.location.lat,
          lng: response.data.results[0].geometry.location.lng,
        });
        map.panTo({
          lat: response.data.results[0].geometry.location.lat,
          lng: response.data.results[0].geometry.location.lng,
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {isLoaded ? (
        <>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={position}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <></>
            <Marker position={position} />
          </GoogleMap>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
