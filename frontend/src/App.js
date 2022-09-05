import * as React from 'react';
import {render} from 'react-dom';
import Map, {Marker} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX; // Set your mapbox token here

function App() {
  return (
    <Map
      initialViewState={{
        latitude: 	51.509865,
        longitude: -0.118092,
        zoom: 5
      }}
      style={{width: "100vw", height: "100vh",}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >

    </Map>
  );
}



export default App;