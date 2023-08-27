import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Details.css';

const Details = () => {
  const [details, setDetails] = useState(null);
  const [isMovie, setIsMovie] = useState(true); // Determine if the details belong to a movie or TV show
  const { id } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const apiKey = '372fe1d8072866f68ffee270c8a79f80';
        let response;
        
        if (isMovie) {
          response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
          );
        } else {
          response = await axios.get(
            `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`
          );
        }
        
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie/TV show details:', error);
      }
    };

    fetchDetails();
  }, [id, isMovie]);

  useEffect(() => {
    setIsMovie(!window.location.pathname.includes('/tv/')); // Check if the URL includes "/tv/" to determine if it's a movie or TV show
  }, []);

  if (!details) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className={isMovie ? 'movie-title' : 'tvshow-title'}>{isMovie ? details.title : details.name}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w200${details.poster_path}`}
        alt={isMovie ? details.title : details.name}
        className="poster"
      />
      <p className="overview">{details.overview}</p>
      {/* Display other details as needed */}
    </div>
  );
};

export default Details;
