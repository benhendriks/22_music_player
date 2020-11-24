import React from 'react';
import styled from 'styled-components';
import Player from './components/Player';
import Song from './components/Song';

const PageStyle = styled.div`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`; 

function App() {
  return (
    <PageStyle>
      <div className="App">
        <Song />
        <Player />
      </div>
    </PageStyle>
  );
}

export default App;
