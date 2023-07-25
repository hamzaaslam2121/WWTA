import React from 'react';

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = (err) => reject(err);
    document.body.appendChild(script);
  });

const MyMapComponent = ({ center, zoom, marker }) => {
  const ref = React.useRef();
  const src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`;

  React.useEffect(() => {
    loadScript(src)
      .then(() => {
        /*global google*/
        // console.log("Load script google: ", google)
        const map = new window.google.maps.Map(ref.current, {
          center,
          zoom,
        });
        new window.google.maps.Marker({
          position: {
            lat: -15.770,
            lng: -44.233
          },
          map
        });
      })
      .catch(console.error);
  }, [center, zoom, src]);

  return <div ref={ref} id="map" style={{ height: '100vh', width: '50vh' }} />;
};

function Maps() {
  const center = {
    lat: -15.770,
    lng: -44.233
  };
  const zoom = 10;

  return (
    <MyMapComponent
      center={center}
      zoom={zoom}
      marker={center}
    />
  );
}

export default Maps;
