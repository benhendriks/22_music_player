import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const NavStyle = styled.nav`
  nav {
    min-height: 10vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    button {
      font-size: 1rem;
      background: transparent;
      border: none;
      cursor: pointer;
      border: 2px solid rgb(45, 63, 224);
      padding: 0.8rem;
      transition: all 0.3s ease;
      &:hover {
        background: rgb(36, 193, 199);
        color: white;
      }
    }
  }
  @media screen and (max-width: 768px) {
    nav {
      button {
        z-index: 10;
      }
    }
  }
`;

const Nav = ({ setLibraryStatus, libraryStatus }) => {
  return (
    <NavStyle>
      <nav>
        <h1>Waves</h1>
        <button onClick={() => setLibraryStatus (!libraryStatus)}>
          Library
          <FontAwesomeIcon icon={faMusic} />
        </button>
      </nav>
    </NavStyle>
  )
}

export default Nav;