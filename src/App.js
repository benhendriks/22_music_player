import React, { useState } from 'react';
import styled from 'styled-components';
import Player from './components/Player';
import Song from './components/Song';
import data from './util';

const PageStyle = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`; 

function App() {
  const [songs, setSongs] = useState(data()); 
  const [currentSong, setCurrentSong] = useState(songs[7]);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <PageStyle>
      <div className="App">
        <Song currentSong={currentSong} />
        <Player 
          isPlaying={isPlaying} 
          setIsPlaying={setIsPlaying} 
          currentSong={currentSong} 
        />
      </div>
    </PageStyle>
  );
}

export default App;
