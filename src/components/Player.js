import React, { useRef, useState } from 'react';
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
    input {
      width: 100%;
      padding: 1rem 0;
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
`;

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
  const playSongHandler = () => {
    if(isPlaying){
      audioRef.current.pause(); 
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration })
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
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  return(
    <PlayerStyle>
      <div className="player">
        <div className="time-control">
          <p>{getTime(songInfo.currentTime)}</p>
          <input 
            min={0} 
            max={songInfo.duration} 
            value={songInfo.currentTime} 
            onChange={dragHandler}
            type="range" 
          />
          <p>{getTime(songInfo.duration)}</p>
        </div>
        <div className="player-control">
          <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
          <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
          <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
        </div>
      </div> 
      <audio onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </PlayerStyle>
  );
};

export default Player;