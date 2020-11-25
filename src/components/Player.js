import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
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
      padding: 1rem 2rem;
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
  return(
    <PlayerStyle>
      <div className="player">
        <div className="time-control">
          <p>Start Time</p>
          <input type="range"/>
          <p>End Time</p>
        </div>
        <div className="player-control">
          <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
          <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={faPlay} />
          <FontAwesomeIcon className="skip-forward" size="2x" icon={faAngleRight} />
        </div>
      </div> 
      <audio ref={audioRef} src={currentSong.audio}></audio>
    </PlayerStyle>
  );
};

export default Player;