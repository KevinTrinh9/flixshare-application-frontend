import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './Header.css';

const Header = () => {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // New state variable

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }

    setIsLoading(false); // Set isLoading to false once user data is fetched
  }, []);

  const handleLogout = async () => {
    try {
      // Clear the token from local storage
      localStorage.removeItem('token');
      console.log('User logged out successfully');
      setIsLoggedIn(false);
      setUser(null);
      history.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Display a loading state while user data is being fetched
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <h2 className="title">Welcome, {isLoggedIn && user ? user.username : 'Guest!'}</h2>
      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link> {/* Render the "Dashboard" link only when logged in */}
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/">Home</Link> {/* Added link to the home page */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
