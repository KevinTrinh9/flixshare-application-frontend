import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://flixshare-application-backend.onrender.com/api/login', { username, password }, { withCredentials: true });
      const { token } = response.data;
      console.log('User logged in successfully');
  
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
  
      const decodedToken = jwtDecode(token);
      const { username: decodedUsername } = decodedToken;
  
      history.push(`/dashboard?username=${decodedUsername}`);
    } catch (error) {
      console.error(error);
      setErrorMessage('Incorrect username or password');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
