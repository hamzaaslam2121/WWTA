import React from "react";
import {useEffect, useState, useCallback, useRef} from 'react'
import GoogleMapReact from 'google-map-react';
import SearchBox from './SearchBox'


const AnyReactComponent = ({ text }) => <div>{text}</div>;

const getWidth = () => {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    )
  }
  const mapOptionsCreator = (map) => {
	let zoomControlShow = getWidth() > 992
	console.log("zoomControlShow =", zoomControlShow)
	return {
		minZoomOverride: true,
		minZoom: 2.5,
		fullscreenControl: false,
		zoomControl: zoomControlShow,
		restriction: {
			latLngBounds: {
				north: 85,
				south: -85,
				west: -180,
				east: 180
			}
		},
		libraries: 'places',
	}
}

export default function Map(){
    const [gmap, setGmap] = useState()
	const [googlemaps, setGooglemaps] = useState()
	const [pins, setPins] = useState([])
	const pinsRef = useRef(pins)
	const [langFilter, setLangFilter] = useState()
	const [travelerFilter, setTravelerFilter] = useState()
	const [tripFilter, setTripFilter] = useState()
	const defaultCenter = {lat: 20.0, lng: 10.0}
	const defaultZoom = 2.5
	const [menuState, setMenuState] = useState(false)
	const [menuEditPost, setMenuEditPost] = useState(0)
	const [menuPostVerified, setMenuPostVerified] = useState(false)
	const [menuPosition, setMenuPosition] = useState({lat: 20.0, lng: 10.0})
	const [modalShow, setModalShow] = useState(0)
	const defaultProps = {
        center: {
          lat: 51.4934,
          lng: 0.0098
        },
        zoom: 5
      };
      const handleGoogleApiLoaded = (map, maps) => {
		setGmap(map)
	  setGooglemaps(maps)
	  maps.event.addListener(map, "contextmenu", function(ev) {
		  let latitude = parseFloat(ev.latLng.lat().toFixed(5))
		  let longitude = parseFloat(ev.latLng.lng().toFixed(5))
		  let elements = document.querySelectorAll(':hover')
		  let last = elements.item(elements.length-1)
		  let regex = /sc-bczRLJ \w+ marker(\d+)/g
		  let match = regex.exec(last.className)
		  let editId = match ? parseInt(match[1]) : 0
		  if (editId !== 0) {
				let editPin = pinsRef.current.find(item => item.id === editId)
			  setMenuPostVerified(editPin && editPin.verified)
		  }
		  setMenuEditPost(editId)
		  setMenuPosition({lat: latitude, lng: longitude})
			setMenuState(true)
	  })
	}

    const handleOnPlaceChanged = useCallback(e => {
		if (e && e.geometry) {
			const lat = e.geometry.location.lat()
			const lng = e.geometry.location.lng()
			gmap.setCenter({lat, lng})
			gmap.setZoom(10)
            }
        }, [gmap])


  return (
    <div className='position-relative h-100 w-100'>
                    <div style={{zIndex:'9'}} className='position-absolute w-auto top-0 start-0 px-1 py-3'>
                        <SearchBox maps={googlemaps}
                                onPlaceChanged={handleOnPlaceChanged}
                                placeholder='Find location...'/>
                    </div>
            <div style={{zIndex:'1'}} className='position-absolute w-100 h-100'>
            <GoogleMapReact 
                style={{position:'absolute', height:'100%', width:'100%'}}					
                data-testid='google-map-react'
                bootstrapURLKeys={{ key: "AIzaSyB_gADBq2dJuxcRKDwv8_N1b7CAFaQ5IY8",
                libraries:'places'
            }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={mapOptionsCreator}
					yesIWantToUseGoogleMapApiInternals
					onGoogleApiLoaded={({map, maps}) => handleGoogleApiLoaded(map, maps)}
            >
               
            </GoogleMapReact>
        </div>
    </div>
  );
}