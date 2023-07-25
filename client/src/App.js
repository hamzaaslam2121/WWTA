import React, {useState, useEffect} from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Map from './components/Map5.jsx'

import {Outlet} from 'react-router-dom'
import GoogleMapReact from 'google-map-react';
import greenwich_center from "./components/greenwich_center.js";
import styled from 'styled-components';
import { Loader } from "@googlemaps/js-api-loader"


const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;




const App = () => {

	return (   
      <Map>

      </Map>
	)
}

export default App