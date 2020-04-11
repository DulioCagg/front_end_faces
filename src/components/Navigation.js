import React from 'react';
import '../styles/Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className="nav">
        <p onClick={() => onRouteChange("signin")} className="links">Sign out</p>
      </nav>
    );
  } else {
    return (
      <nav className="nav">
        <p onClick={() => onRouteChange("signin")} className="links">Sign In</p>
        <p onClick={() => onRouteChange("register")} className="links">Register</p>
      </nav>
    );
  }
}

export default Navigation;