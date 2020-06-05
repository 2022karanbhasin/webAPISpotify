import React, {useState} from 'react';

import logo from './logo.svg';
import './App.css';
import Spotify from 'spotify-web-api-js';
const s = new Spotify();

function App() {
  function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  var hashParams=getHashParams()
  var temp=false;
  if( hashParams.access_token )
  {
    temp=true;
    s.setAccessToken(hashParams.access_token)
  }


  const [loggedIn, setLoggedIn]=useState(temp)
  const[nowPlaying, setNowPlaying]=useState({name: "not checked",image:""})
  
  function getNowPlaying(){
    s.getMyCurrentPlaybackState()
      .then((response)=>{
        // console.log(response)
        setNowPlaying({
          name: response.item.name,
          image: response.item.album.images[0].url
        })
      }
      )
  }
  return (
    <div className="App">
     
    {!loggedIn ? 
     <a href="http://localhost:8888">
      <button>Log in with spotify</button> 
      </a>:
      <div>
      <div> Now Playing {nowPlaying.name}
      </div>
      <div>
        <img src={nowPlaying.image} width="250" >
        </img>
      </div>
      <button onClick={()=>getNowPlaying()}>
        Check Now Playing
      </button>
      </div>
    }
    </div>
  );
}

export default App;
