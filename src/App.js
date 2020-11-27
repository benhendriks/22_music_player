import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Library from './components/Library';
import Nav from './components/Nav';
import Player from './components/Player';
import Song from './components/Song';
import data from './data';

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
  .App {
    transition: all 0.5s ease;
  }
  .library-active {
    margin-left: 20%;
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
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({ 
      ...songInfo, 
      currentTime: current, 
      duration, 
      animationPercentage: animation, 
    });
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);  
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      if(isPlaying) audioRef.current.play(); 
  };
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  return (
    <PageStyle>
      <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
        <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
        <Song currentSong={currentSong} />
        <Player 
          songs={songs}
          audioRef={audioRef}
          isPlaying={isPlaying} 
          setIsPlaying={setIsPlaying} 
          currentSong={currentSong} 
          setSongInfo={setSongInfo}
          songInfo={songInfo}
          setCurrentSong={setCurrentSong}
          setSongs={setSongs}
        />
        <Library 
          songs={songs} 
          setCurrentSong={setCurrentSong}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setSongs={setSongs}
          libraryStatus={libraryStatus}
        />
        <audio 
        onTimeUpdate={timeUpdateHandler} 
        onLoadedMetadata={timeUpdateHandler} 
        ref={audioRef} 
        src={currentSong.audio}
        onEnded={songEndHandler}
        ></audio>
      </div>
    </PageStyle>
  );
}

export default App;
