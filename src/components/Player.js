import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const PlayerStyle = styled.div`
  .player {
    min-height: 20vh; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .time-control {
    width: 50%;
    background: #fff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    input {
      width: 100%;
      -webkit-appearance: none;
      background: transparent;
      cursor: pointer;
    }
    p {
      padding: 1rem;
    }
  }
  .player-control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    width: 30%;
    svg {
      cursor: pointer;
    }
  }
  input[type='range']:focus {
    outline: none;
  }
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
  }
  input[type='range']::-moz-range-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
  }
  .track {
    background: rgb(200, 229, 252);
    height: 1rem;
    width: 100%;
    position: relative;
    border-radius: 1rem;   
    overflow: hidden;
  }
  .animate-track {
    background: rgb(204, 204, 204);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(0%);
    pointer-events: none;
  }
  @media screen and (max-width: 768px) {
    .time-control {
      width: 90%;
    }
    .player-control {
      width: 60%;
    }
  }
`;

const Player = ({ audioRef, currentSong, isPlaying, setIsPlaying, setSongInfo, setSongs, songInfo, songs, setCurrentSong }) => {
  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if(song.id === nextPrev.id){
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
  }
  const playSongHandler = () => {
    if(isPlaying){
      audioRef.current.pause(); 
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const getTime = (time) => {
    return(
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value })
  };
  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if(direction === 'skip-forward') {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    } 
    if(direction === 'skip-back') {
      if((currentIndex -1) % songs.length === -1){
        await setCurrentSong(songs[songs.length -1]); 
        activeLibraryHandler(songs[songs.length -1]);
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };
  const trackAnim = {
    transform: `
      translateX(${songInfo.animationPercentage}%)
    `
  };

  return(
    <PlayerStyle>
      <div className="player">
        <div className="time-control">
          <p>{getTime(songInfo.currentTime)}</p>
          <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
            <input 
              min={0} 
              max={songInfo.duration || 0} 
              value={songInfo.currentTime} 
              onChange={dragHandler}
              type="range" 
            />
            <div style={trackAnim} className="animate-track"></div>
          </div>
          <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
        </div>
        <div className="player-control">
          <FontAwesomeIcon 
            onClick={() => skipTrackHandler('skip-back')}   
            className="skip-back" 
            size="2x" 
            icon={faAngleLeft} 
          />
          <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
          <FontAwesomeIcon 
            onClick={() => skipTrackHandler('skip-forward')}
            className="skip-forward" 
            size="2x" 
            icon={faAngleRight} 
          />
        </div>
      </div> 
    </PlayerStyle>
  );
};

export default Player;