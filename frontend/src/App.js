import { useEffect, useState } from "react";
import Map, { Marker, Popup } from 'react-map-gl';  
import { Room, Star } from '@mui/icons-material';
import "./app.css";
import axios from "axios";
import { format } from 'timeago.js';
import Register from "./components/Register";
import Login from "./components/Login";
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX; // Set your mapbox token here

function App() {
  const myStorage = window.localStorage;

  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));

  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);

  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [imgURL, setImgURL] = useState(null);
  const [rating, setRating] = useState(0);

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);


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

  const handleMarkerClick = (id,lat,long) => {
    setCurrentPlaceId(id);
  }

  const handleAddClick = (e) => {
    console.log(e);
    const longitude = e.lngLat.lng
    const latitude = e.lngLat.lat
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
      imgURL,
    }
    try{
        const res = await axios.post("/pins", newPin)
        setPins([...pins, res.data])
        setNewPlace(null);
    } catch(err){
        console.log(err);
    }
  }


  const handleLogout =() => {
    myStorage.removeItem("user");
    setCurrentUser(null);
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
      onClick = {() => handleMarkerClick(p._id,p.lat,p.log)}
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

          {Array(p.rating).fill(<Star className="star"/>)}
          </div>
          <label>Image</label>
          <img 
            className="image"
            src={p.imgURL}
            alt="new"
            />
          <label>Information</label>
          <span className="username">Created by <b>{p.username}</b></span>
          <span className="date">{format(p.createdAt)}</span>

        </div>
      </Popup>
    )}
</>
      ))}

      {(newPlace && currentUser) && (
          
       <Popup 
          latitude={newPlace.lat}
          longitude={newPlace.long} 
          closeButton = {true}
          closeOnClick = {false}
          anchor="left"
          onClose={() => setNewPlace(null)}
        >
          <div >
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input placeholder="Enter a title.." onChange={(e) => setTitle(e.target.value)}/>

              <label>Review</label>
              <textarea placeholder="Write something about this place.." onChange={(e) => setDesc(e.target.value)}/>

              <label>Rating</label>
              <select onChange={(e) => setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <label>Image</label>
              <textarea placeholder=" Enter Image URL.." onChange={(e) => setImgURL(e.target.value)}/>
            

              <button className="submitButton">Add Pin</button>

            </form>
         </div>
       </Popup>
      
    )}

      {currentUser ? (
      <button className="button logout" onClick={handleLogout}>Log out</button>
      ) : (
        <div className="buttons">

          <button 
          className="button login" 
          onClick={() => setShowLogin(true)}
          >
            Login
          </button>

          <button 
          className="button register" 
          onClick={() => setShowRegister(true)}
          >
            Register
          </button>
        </div>
      )}
      
        {showRegister && <Register setShowRegister={setShowRegister}/>}
        {showLogin && <Login setShowLogin={setShowLogin} myStorage={myStorage} setCurrentUser={setCurrentUser}/>}
        
    </Map>
  );
}



export default App;