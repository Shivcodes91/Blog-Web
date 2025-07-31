import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || decoded.email || 'User');
      } catch (err) {
        console.error('Invalid token:', err);
        setUserName('');
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/signin');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.brand}>Shiv Blogs</Link>
        <div style={styles.links}>
          {token ? (
            <>
              <span style={styles.welcome}>Welcome, {userName}</span>
              <Link to="/create" style={styles.buttonSuccess}>New Post</Link>
              <button onClick={handleLogout} style={styles.buttonOutlineDanger}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" style={styles.buttonOutlinePrimary}>Sign In</Link>
              <Link to="/signup" style={styles.buttonPrimary}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    background: 'linear-gradient(120deg, #ece6e6ff 0%, #ebedee 100%)',
    borderBottom: '1px solid #ddd',
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  brand: {
    fontSize: '1.7rem',
    fontWeight: 'bold',
    textDecoration: 'none',
    color: '#121212ff',
    transition: 'color 0.3s'
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flexWrap: 'wrap'
  },
  welcome: {
    marginRight: '1rem',
    fontWeight: 500,
    color: '#555'
  },
  buttonPrimary: {
    padding: '0.4rem 1rem',
    background: '#0d0f12ff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    textDecoration: 'none',
    transition: 'background 0.3s ease',
    cursor: 'pointer'
  },
  buttonOutlinePrimary: {
    padding: '0.4rem 1rem',
    background: 'transparent',
    color: '#111315ff',
    border: '1px solid #1b1d1fff',
    borderRadius: '4px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  buttonSuccess: {
    padding: '0.4rem 1rem',
    background: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    textDecoration: 'none',
    transition: 'background 0.3s ease',
    cursor: 'pointer'
  },
  buttonOutlineDanger: {
    padding: '0.4rem 1rem',
    background: 'transparent',
    color: '#dc3545',
    border: '1px solid #dc3545',
    borderRadius: '4px',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  }
};
