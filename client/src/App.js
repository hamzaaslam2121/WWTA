import React, {useState, useEffect} from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Map from './components/Map5.jsx'
import {Outlet} from 'react-router-dom'
import GoogleMapReact from 'google-map-react';
import greenwich_center from "./components/greenwich_center.js";
import styled from 'styled-components';
import { Loader } from "@googlemaps/js-api-loader"
import './App.css'




const App = () => {

	return (   
    <div className='App'>
			<header className='App-header'>
				<h1 style={{textAlign: 'center', fontSize:36, fontFamily: "Roboto", paddingTop:'4px', color:'white' }}>World Wide Travel Advisor</h1>
			</header>
    <div className='map-container' style={{ height: '94vh', width: '100%' }}>
      <Outlet/>
      <Map/>
     </div>

    </div>
	)
}

export default App