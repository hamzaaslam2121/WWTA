import React, { useMemo } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import GoogleMapReact from 'google-map-react';

import './map.css'

const Map = () => {
    
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const center = useMemo(() => ({ lat: 51.4769, lng: 0.0005 }), []);

    const defaultProps = {
      center: {
        lat: 51.4769,
        lng: 0.0005
      },
      zoom: 11
      }

    const onLoad = (map) => {
        const bounds = new window.google.maps.LatLngBounds();
        markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        map.fitBounds(bounds);
      };
    
    const markers = [{ lat: 51.4769, lng: 0.0005 },
                    { lat: 51.4769, lng: 0.0005 },
                    { lat: 51.4769, lng: 0.0005 }];
    

     
    return (
      <div className="App">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={5}
          onLoad={onLoad}>
        {markers.map(({ lat, lng }) => (
        <Marker position={{ lat: 51.4769, lng: 0.0005 }} /> //latitude and longitude used here represent greenwich observatory as this is the prime meridian of global time
        ))}
      </GoogleMap>
    )}
    </div>
  );
  
};
  export default Map;

  
