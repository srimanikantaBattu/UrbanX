import React from 'react';
import './Button.css'
import { Link } from 'react-router-dom';

const Button = () => {
  return (
    <div className="animated-button-container">
      <Link to="/target-path" className="link-button">
        <span>Click</span>
        <div className="liquid"></div>
      </Link>
    </div>
  );
};

export default Button;