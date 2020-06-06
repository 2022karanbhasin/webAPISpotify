import React, {useState} from 'react';

import logo from './logo.svg';
import './App.css';
import Spotify from 'spotify-web-api-js';
const s = new Spotify();

function App() {
  function getHashParams() {
    var x=4
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
  const [artists,setArtists]=useState(['None'])
  
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
  function getTopArtists(){
    s.getMyTopArtists()
    .then((response)=>{
      console.log(response)
      
      setArtists(response.items)

    })
  }
  return (
    <div className="App">
     
    {!loggedIn ? 
     <a href= {"http://nearifyserver.herokuapp.com/login" }>
      <button>Log in with spotify</button> 
      </a>:
      <div>
      <div> Now Playing {nowPlaying.name}
      </div>
      <div>
        <img src={nowPlaying.image} width="250" >
        </img>
      </div>
      <div>{artists.map(obj=>obj['name'])}
      </div>
      <button onClick={()=>getNowPlaying()}>
        Check Now Playing
      </button>
      <button onClick={()=>getTopArtists()}>
        Check Top Artists
      </button>
      </div>
    }
    </div>
  );
}

export default App;
