import React from 'react';
import styled from 'styled-components';
import LibrarySong from './LibrarySong';

const LibaryStyle = styled.div`
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(155, 155, 155, 0.5) transparent;
  }
  *::-webkit-scrollbar {
    width: 5px
  }
  *::-webkit-scrollbar-track {
    background: transparent;
  }
  *::-webkit-scrollbar-thumb {
    background-color: rgba(155, 155, 155, 0.5);
    border-radius: 20px;
    border: transparent;
  }
  .library {
    position: fixed;
    top: 0;
    left: 0;
    width: 20rem;
    height: 100%;
    box-shadow: 2px 2px 20px rgb(0, 0, 0, 0.3);
    overflow: scroll;
    text-align: center;
    transform: translateX(-100%);
    transition: all 0.5s ease; 
    opacity: 0;
      h2 {
        padding-top: 8%;
      }
  }
    .selected {
      background: #c8e5fc;
    }
    .active-library {
      transform: translateX(0%);
      opacity: 1;
    }
`;

const Library = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus }) => {
  return (
    <LibaryStyle>
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
          <h2>Library</h2>
          <div className="library-songs">
            {songs.map((song) => (
              <LibrarySong 
                songs={songs}
                setCurrentSong={setCurrentSong} 
                song={song} 
                id={song.id}
                key={song.id}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setSongs={setSongs}
              />
              ))}
          </div>
        </div>
    </LibaryStyle>
  )
}

export default Library;