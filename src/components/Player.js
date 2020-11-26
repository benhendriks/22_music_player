import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { playAudio } from '../util';

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

const Player = ({ audioRef, currentSong, isPlaying, setIsPlaying, setSongInfo, setSongs, songInfo, songs, setCurrentSong }) => {
  useEffect(() => {
    const newSongs = songs.map((song) => {
      if(song.id === currentSong.id){
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
  }, [currentSong]);
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
  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if(direction === 'skip-forward') {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    } 
    if(direction === 'skip-back') {
      if((currentIndex -1) % songs.length === -1){
        setCurrentSong(songs[songs.length -1]); 
        playAudio(isPlaying, audioRef);
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
    playAudio(isPlaying, audioRef);
  };

  return(
    <PlayerStyle>
      <div className="player">
        <div className="time-control">
          <p>{songInfo.duration ? getTime(songInfo.currentTime) : '0:00'}</p>
          <input 
            min={0} 
            max={songInfo.duration || 0} 
            value={songInfo.currentTime} 
            onChange={dragHandler}
            type="range" 
          />
          <p>{getTime(songInfo.duration)}</p>
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