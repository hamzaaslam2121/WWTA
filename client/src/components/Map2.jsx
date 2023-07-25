import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Outlet } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import greenwich_center from "./greenwich_center.js";
import { Loader } from "@googlemaps/js-api-loader";

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map isLoaded={isLoaded} />; // Pass the isLoaded variable as a prop
}

function Map({ isLoaded }) {
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap zoom={10} center={greenwich_center} mapContainerClassName="map-container">
        
      {/* Add your map content here */}
    </GoogleMap>
  );
}
