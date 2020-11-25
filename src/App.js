import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Library from './components/Library';
import Player from './components/Player';
import Song from './components/Song';
import data from './util';

const PageStyle = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Lato:ital@0;1&display=swap');
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
  }
  h1,h2,h3,h4 {
    font-weight: 400;
    color: #6b6b6b;
  }
`; 

function App() {
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data()); 
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration })
  };
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  return (
    <PageStyle>
      <div className="App">
        <Song currentSong={currentSong} />
        <Player 
          audioRef={audioRef}
          isPlaying={isPlaying} 
          setIsPlaying={setIsPlaying} 
          currentSong={currentSong} 
          setSongInfo={setSongInfo}
          songInfo={songInfo}
        />
        <Library 
          songs={songs} 
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
        />
        <audio 
        onTimeUpdate={timeUpdateHandler} 
        onLoadedMetadata={timeUpdateHandler} 
        ref={audioRef} 
        src={currentSong.audio}
        ></audio>
      </div>
    </PageStyle>
  );
}

export default App;
