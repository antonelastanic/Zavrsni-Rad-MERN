import { useEffect, useState } from "react";
import {render} from 'react-dom';
import Map, {Marker, Popup} from 'react-map-gl';  
import { LineAxisOutlined, Room, Star } from '@mui/icons-material';
import "./app.css";
import axios from "axios";

import 'mapbox-gl/dist/mapbox-gl.css';
import { getOffsetLeft } from '@mui/material';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX; // Set your mapbox token here

function App() {

  const [pins, setPins] = useState([]);
  const [showPopup, setShowPopup] = useState(true);


  useEffect(() => {
    const getPins = async () => {

      try{
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch(err){
        console.log(err)
      }

    };

    getPins();

  },[]);


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


      {pins.map(p => (

<>
    <Marker longitude={p.long} latitude={p.lat} anchor="bottom" >
      <Room style={{fontsize: "large",color: "slateblue"}}/>
    </Marker>

   {/*  <Popup longitude={-0.118092} latitude={51.509865}
        anchor="left"
        onClose={() => setShowPopup(false)}>
        <div className="card">
          <label>Place</label>
          <h4 className="place">London</h4>
          <label>Review</label>
          <p className="desc">Beautiful city. I love it.</p>
          <label>Rating</label>
          <div className="stars">

          <Star className="star"/>
          <Star className="star"/>
          <Star className="star"/>
          <Star className="star"/>
          <Star className="star"/>

        </div>
          <label>Information</label>
          <span className="username">Created by <b>nela</b></span>
          <span className="date">1 hour ago</span>
        </div>
      </Popup> */}
</>
      ))};

    </Map>
  );
}



export default App;