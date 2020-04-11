import React, { Fragment } from 'react';
import Tilt from 'react-tilt'
import icon from '../media/icon.png'
import '../styles/Logo.css';

const Logo = () => {
  return (
    <Fragment>
      <Tilt className="logo Tilt" options={{ max: 50 }} style={{ height: 74, width: 74 }} >
        <div className="Tilt-inner"><img src={icon} alt="icon" /></div>
      </Tilt>
    </Fragment>
  );
}

export default Logo;