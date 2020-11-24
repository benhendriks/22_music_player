import React from 'react';
import styled from 'styled-components';

const SongStyle = styled.div`
  min-height: 60vh; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Song = () => {
  return(
    <SongStyle>
      <div className="song-container">
        <h1>Picture</h1>
        <h1>Song Name</h1>
        <h1>Artist</h1>
      </div>
    </SongStyle>
  );
};

export default Song;