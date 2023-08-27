import React from 'react';
import MovieList from './MovieList';
import './Home.css';

const Home = () => {
  return (
    <div className="container">
      <h1 className="title">Flixshare</h1>
      <MovieList />
    </div>
  );
};

export default Home;
