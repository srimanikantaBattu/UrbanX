import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">LOGO</div>
      <div className="nav-items">
        <Link to="/homewater" className="nav-link">
          Home
        </Link>
        <Link to="/issues" className="nav-link">
          Issues
        </Link>
        <Link to="/report" className="nav-link">
          Report
        </Link>
        <Link to="/profile" className="nav-link">
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
