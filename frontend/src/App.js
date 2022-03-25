import * as React from 'react';
import { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import StarIcon from '@mui/icons-material/Star';
import 'mapbox-gl/dist/mapbox-gl.css';
import './app.css';
import axios from "axios";
import {format} from "timeago.js";
import Register from "./components/Register";
import Login from "./components/Login";
import Header from "./components/Header";

function App() {

  const myStorage = window.localStorage;

  const [currentUser, setCurrentUser] = useState(myStorage.getItem("user"));;

  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);

  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);


  const [showPopup, setShowPopup] = React.useState(true);

  const [viewState, setViewState] = useState({
    // width: "70vh",
    // height: "100vh",
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 12
  });
    
  useEffect(() => {
    const getPins = async ()=> {
      try {
        const res = await axios.get("/pins");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getPins();
  }, []);

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewState({...viewState, latitude: lat, longitude: long});
  }

  const handleAddClick = (e) => {
    // const [long, lat] = e.lngLat; // this is before
    const long = e.lngLat.lng;
    const lat = e.lngLat.lat;

    setNewPlace({
      lat,
      long,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long
    }
    try {
      const res = await axios.post("/pins", newPin);
      setPins([...pins, res.data]);
      setNewPlace(null);
    } catch (err) {
      console.log(err);
    }
  }
  
  const handleLogout = () => {
    myStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <div className="App">
      <Header/>
      <Map
        // initialViewState={{
        //   latitude: 40.7128,
        //   longitude: -74.006,
        //   zoom: 12
        // }}
        {...viewState}
        style={{width: "100vw", height: "100vh"}}
        mapStyle="mapbox://styles/sonnynomnom/cl140ktw8000c15qyyzbezy1u"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onMove={evt => setViewState(evt.viewState)}
        onDblClick={handleAddClick}
        // transitionDuration="2000"
      >
        {pins.map(p => (
          <>
          <Marker 
            latitude={p.lat}
            longitude={p.long}
            offsetLeft={-viewState.zoom*1.5}
            offsetTop={-viewState.zoom*3}
          >
            <FmdGoodIcon 
              style={{
                fontSize: viewState.zoom * 3, 
                color: p.username === currentUser ? "tomato" : "slateblue", 
                cursor: "pointer"}}
              onClick={()=>handleMarkerClick(p._id, p.lat, p.long)}
            />
          </Marker>
          {p._id === currentPlaceId && (
            <Popup 
              latitude={p.lat}
              longitude={p.long}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
              anchor="left"
            >
              <div className="card">
                <label>Place</label>
                <h4 className="place">{p.title}</h4>

                <label>Review</label>
                <p className="desc">{p.desc}</p>

                <label>Rating</label>
                <div className="stars">
                  {Array(p.rating).fill("💩")}
                </div>
                <label>Information</label>
                <span className="username">Created by <b>{p.username}</b></span>
                <span className="date">{format(p.createdAt)}</span>
              </div>
            </Popup>
            )
          }
          </>
        ))}
        {newPlace && (<Popup
          latitude={newPlace.lat}
          longitude={newPlace.long}
          closeButton={true}
          closeOnClick={false}
          anchor="left"
          onClose={() => setCurrentPlaceId(null)}
        >
          <div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input 
                placeholder="Enter a title" 
                onChange={(e)=>setTitle(e.target.value)}
              />

              <label>Review</label>
              <textarea 
                placeholder="Say us something about this restroom." 
                onChange={(e)=>setDesc(e.target.value)}
              />

              <label>Rating</label>
              <select onChange={(e)=>setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button className="submitButton" type="submit">Add Pin</button>
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
              onClick={() => setShowLogin(true)}>
                Login
            </button>
            <button 
              className="button register"
              onClick = {() => setShowRegister(true)}>
                Register
            </button>
          </div>
        )}
        <h1>Welp</h1>
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login 
            setShowLogin={setShowLogin} 
            myStorage={myStorage} 
            setCurrentUser={setCurrentUser}
          />
        )}
      </Map>
      
      // <div className="App">
      //   {/* <Map
      //     {...viewport}
      //     mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
      //     onViewportChange={nextViewport => setViewport(nextViewport)}
      //   /> */}
      // </div>
    </div>
  );
}

export default App;
