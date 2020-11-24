import React from 'react';

const Player = () => {
  return(
    <div className="player">
      <h1>Player</h1>
      <div className="time-control">
        <p>Start Time</p>
        <input type="range"/>
        <p>End Time</p>
      </div>
    </div>
  );
};

export default Player;