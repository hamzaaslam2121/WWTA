import React, {useState, useEffect} from "react";

const App = () => {

	return (
		<div 
			className='map-container' style={{ height: '94vh', width: '100%' }}>
				{localStorage.getItem('splashScreenDismissed') ? null : <SplashScreenModal/>}
				<Outlet/>
				<SimpleMap/>
			</div>
	)
}

export default App