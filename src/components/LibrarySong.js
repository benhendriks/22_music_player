import React from 'react';
import styled from 'styled-components';

const LibrarySongStyle = styled.div`
  .library-song {
    display: flex;
    align-items: center;
    padding: 1rem 2rem 1rem 2rem;
    cursor: pointer;
    transition: background 0.5s ease;
    img {
      width: 50%;
    }
    &:hover {
      background: rgb(219, 236, 249);
    } 
    .song-description {
      padding-left: 8%;
    }
    h3 {
      font-size: 1rem;
    }
    h4 {
      padding-top: 5px;
      font-size: 0.7rem;
    }
  }
`;

const LibrarySong = ({ song, songs, setCurrentSong, id, audioRef, isPlaying, setSongs }) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    const newSongs = songs.map((song) => {
      if(song.id === id){
        return{
          ...song,
          active: true,
        }
      } else {
        return {
          ...song, 
          active: false,
        };
      }
    }); 
    setSongs(newSongs);
    if (isPlaying) audioRef.current.play();
  }
  return(
    <LibrarySongStyle>
      <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' :  ""}`}>
        <img src={song.cover} alt={song.name}></img>
        <div className="song-description">
          <h3>{song.name}</h3>
          <h4>{song.artist}</h4>
        </div>
      </div>
    </LibrarySongStyle>
  );
};

export default LibrarySong;