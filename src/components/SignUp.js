import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './SignUp.css';

const SignUp = ({ history }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupMessage, setSignupMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post('https://flixshare-application-backend.onrender.com/api/signup', { email, username, password }, { withCredentials: true });
      setSignupMessage('User signed up successfully');
      setTimeout(() => {
        setSignupMessage('');
        history.push('/login');
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      {signupMessage && <p className="signup-message">{signupMessage}</p>}
      <form className="signup-form" onSubmit={handleSignUp}>
        <input
          type="email"
          className="signup-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="signup-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="signup-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
