import React, { useMemo } from 'react'
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import './map.css'

const Map = () => {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.AIzaSyB_gADBq2dJuxcRKDwv8_N1b7CAFaQ5IY8,
    });
    const center = useMemo(() => ({ lat: 51.4769, lng: 0.0005 }), []);
  
    const onLoad = (map) => {
        const bounds = new window.google.maps.LatLngBounds();
        markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        map.fitBounds(bounds);
      };
    
    const markers = [{ lat: 51.4769, lng: 0.0005 },
                    { lat: 51.4769, lng: 0.0005 },
                    { lat: 51.4769, lng: 0.0005 }]

    return (
      <div className="App">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={50}
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

  
