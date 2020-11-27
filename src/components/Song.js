import React from 'react';
import styled from 'styled-components';

const SongStyle = styled.div`
  .song-container {
    min-height: 60vh; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 360px;
      border-radius: 50%;
    }
    h2 {
      padding: 3rem 1rem 1rem 1rem;
    }
    h3 {
      font-size: 1rem;
    }
  }
  @media screen and (max-width: 768px) {
    .song-container {
      img {
        width: 60%;
      }
    }
  }
`;

const Song = ({ currentSong }) => {
  return(
    <SongStyle>
      <div className="song-container">
        <img src={currentSong.cover} alt={currentSong.name}></img>
        <h2>{currentSong.name}</h2>
        <h3>{currentSong.artist}</h3>
      </div>
    </SongStyle>
  );
};

export default Song;