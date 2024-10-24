import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>LOGO</div>
      <div style={styles.navItems}>
        <Link to="/" style={styles.navLink}>
          <button style={styles.button}>Home</button>
        </Link>
        <Link to="/issues" style={styles.navLink}>
          <button style={styles.button}>Issues</button>
        </Link>
        <Link to="/report" style={styles.navLink}>
          <button style={styles.button}>Report</button>
        </Link>
        <Link to="/profile" style={styles.navLink}>
          <button style={styles.button}>Profile</button>
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#f8f9fa',
    padding: '10px 20px',
    borderBottom: '1px solid #ddd',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navItems: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    textDecoration: 'none',
  },
  button: {
    padding: '10px 20px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Navbar;
