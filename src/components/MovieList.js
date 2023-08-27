import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import Details from './Details';
import SearchResults from './SearchResults';
import './MovieList.css';

const MovieList = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [redirectToResults, setRedirectToResults] = useState(false);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const apiKey = '372fe1d8072866f68ffee270c8a79f80'; // Replace with your TMDB API key
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        setPopularMovies(response.data.results.slice(0, 10));
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    const fetchPopularTVShows = async () => {
      try {
        const apiKey = '372fe1d8072866f68ffee270c8a79f80'; // Replace with your TMDB API key
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
        );
        setPopularTVShows(response.data.results.slice(0, 10));
      } catch (error) {
        console.error('Error fetching popular TV shows:', error);
      }
    };

    fetchPopularMovies();
    fetchPopularTVShows();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setRedirectToResults(true);
  };

  if (redirectToResults) {
    return <Redirect to={`/search-results?query=${searchQuery}`} />;
  }

  return (
    <BrowserRouter>
      <div className="container">
        <nav className="nav">
          <ul>
            <li>
              <Link to="/movies">Popular Movies</Link>
            </li>
            <li>
              <Link to="/tvshows">Popular TV Shows</Link>
            </li>
          </ul>
        </nav>

        <div className="search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for a movie or TV show"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>

        <Route path="/movies">
          <div>
            <h1>Popular Movies</h1>
            <div className="movies-container">
              {/* Render popular movies */}
              {popularMovies.map((movie) => (
                <div key={movie.id} className="movie">
                  <Link to={`/movie/${movie.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                    />
                  </Link>
                  <div className="movie-title">{movie.title}</div>
                </div>
              ))}
            </div>
          </div>
        </Route>

        <Route path="/tvshows">
          <div>
            <h1>Popular TV Shows</h1>
            <div className="tvshows-container">
              {/* Render popular TV shows */}
              {popularTVShows.map((tvShow) => (
                <div key={tvShow.id} className="tvshow">
                  <Link to={`/tv/${tvShow.id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${tvShow.poster_path}`}
                      alt={tvShow.name}
                    />
                  </Link>
                  <div className="tvshow-title">{tvShow.name}</div>
                </div>
              ))}
            </div>
          </div>
        </Route>

        <Route path="/search-results">
          <SearchResults />
        </Route>

        <Route path="/movie/:id" component={Details} />
        <Route path="/tv/:id" component={Details}/>

        <Redirect to="/" />
      </div>
    </BrowserRouter>
  );
};

export default MovieList;
