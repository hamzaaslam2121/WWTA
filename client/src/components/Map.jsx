import React from 'react'
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import './map.css'

const Map = () => {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.AIzaSyB_gADBq2dJuxcRKDwv8_N1b7CAFaQ5IY8,
    });
    const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);
  
    const onLoad = (map) => {
        const bounds = new google.maps.LatLngBounds();
        markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
        map.fitBounds(bounds);
      };


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
            <Marker position={{ lat, lng }} />
          ))}
        </GoogleMap>
      )}
      </div>
    );

      
  };
  
  export default App;

  
