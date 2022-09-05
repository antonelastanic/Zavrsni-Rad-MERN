import { useEffect, useState } from "react";
import Map, {Marker, Popup} from 'react-map-gl';  
import { Room, Star } from '@mui/icons-material';
import "./app.css";
import axios from "axios";
import { format } from 'timeago.js';

import 'mapbox-gl/dist/mapbox-gl.css';
import { getOffsetLeft } from '@mui/material';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX; // Set your mapbox token here

function App() {
  const currentUser = "nela";
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);


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

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
  }

  const handleAddClick= (e) => {
    console.log(e);
    const [lat, long] = e.lngLat;
    setNewPlace({
      lat:lat,
      long:long,
    });
  }


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
      onDblClick = {handleAddClick}
    >


      {pins.map(p => (

<>
    <Marker longitude={p.long} latitude={p.lat} anchor="bottom" >
      <Room 
      style = {{color: p.username === currentUser ? "slateblue" : "tomato", cursor: "pointer"}}
      onClick = {() => handleMarkerClick(p._id)}
      />
    </Marker>
    {p._id === currentPlaceId && (
    <Popup 
      longitude={p.long} 
      latitude={p.lat}
      anchor="left"
      onClose={() => setCurrentPlaceId(null)}
      >
        <div className="card">
          <label>Place</label>
          <h4 className="place">{p.title}</h4>
          <label>Review</label>
          <p className="desc">{p.desc}</p>
          <label>Rating</label>
          <div className="stars">

          <Star className="star"/>
          <Star className="star"/>
          <Star className="star"/>
          <Star className="star"/>
          <Star className="star"/>

        </div>
          <label>Information</label>
          <span className="username">Created by <b>{p.username}</b></span>
          <span className="date">{format(p.createdAt)}</span>
        </div>
      </Popup>
    )}
</>
      ))}
      {newPlace && (
      <Popup 
        latitude={newPlace.lat}
        longitude={newPlace.long} 
        closeButton = {true}
        closeOnClick = {false}
        anchor="left"
        onClose={() => setCurrentPlaceId(null)}
      >
        hello
      </Popup>
    )}
    </Map>
  );
}



export default App;