import React, {useState, useEffect} from "react";
import Map from './components/Map.jsx'
import {Outlet} from 'react-router-dom'



const App = () => {

	return (
    <div>
      <Outlet/>

      <Map/>
    </div>
	)
}

export default App