import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link, useHistory } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');
  const history = useHistory();

  const fetchSearchResults = async (page) => {
    try {
      const apiKey = '372fe1d8072866f68ffee270c8a79f80'; // Replace with your TMDB API key

      // Fetch movies and TV shows based on search query and page
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${searchQuery}&page=${page}`
      );

      setSearchResults(response.data.results.slice(0, 10)); // Limit to top 10 search results
      setTotalPages(response.data.total_pages); // Update the total number of pages

      // Update the URL with the current page number
      history.push(`?query=${searchQuery}&page=${page}`);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    fetchSearchResults(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, currentPage, history]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container">
      <h1>Search Results</h1>
      {/* Render search results */}
      <div className="movies-container">
        {searchResults.map((result) => (
          <div key={result.id} className="movie">
            {result.media_type === 'movie' ? (
              <Link to={`/movie/${result.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                  alt={result.title || result.name}
                />
              </Link>
            ) : (
              <Link to={`/tv/${result.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                  alt={result.title || result.name}
                />
              </Link>
            )}
            <div className="movie-title">{result.title || result.name}</div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {/* Render pagination buttons */}
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Back
        </button>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
