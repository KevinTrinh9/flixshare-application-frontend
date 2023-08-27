import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import './TVDashboard.css';

const TVDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [favoriteLists, setFavoriteLists] = useState([]);
  const [currentList, setCurrentList] = useState('');
  const [selectedTVShow, setSelectedTVShow] = useState(null);
  const [showAddToList, setShowAddToList] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const storedLists = localStorage.getItem('favoriteTVShowLists');
    if (storedLists) {
      setFavoriteLists(JSON.parse(storedLists));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteTVShowLists', JSON.stringify(favoriteLists));
  }, [favoriteLists]);

  const handleSearch = async (e, page = 1) => {
    e.preventDefault();

    if (!searchTerm) {
      setSearchResults([]);
      return; // Skip search if the search term is empty
    }

    try {
      const apiKey = '372fe1d8072866f68ffee270c8a79f80'; // Replace with your TMDB API key

      // Fetch TV shows based on the search term and page
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${searchTerm}&page=${page}`
      );

      setSearchResults(response.data.results.slice(0, 10)); // Limit to top 10 search results
      setTotalPages(response.data.total_pages); // Update the total number of pages

      // Update the URL with the current search term and page number
      history.push(`?query=${searchTerm}&page=${page}`);
    } catch (error) {
      console.error('Error searching for TV shows:', error);
    }
  };

  const handleAddFavorite = () => {
    if (!selectedTVShow || !currentList) {
      return; // Skip adding favorite if TV show or current list is not selected
    }

    const listIndex = favoriteLists.findIndex((list) => list.title === currentList);
    if (listIndex === -1) {
      setFavoriteLists([...favoriteLists, { title: currentList, TVShows: [selectedTVShow] }]);
    } else {
      const isTVShowAlreadyAdded = favoriteLists[listIndex].TVShows.some(
        (TVShow) => TVShow.id === selectedTVShow.id
      );

      if (isTVShowAlreadyAdded) {
        alert('This TV show is already added to the list.');
      } else {
        const updatedLists = [...favoriteLists];
        updatedLists[listIndex].TVShows.push(selectedTVShow);
        setFavoriteLists(updatedLists);
      }
    }

    setSelectedTVShow(null);
    setCurrentList('');
    setShowAddToList(false);
  };

  const handleEditList = (listTitle) => {
    const newListTitle = prompt('Enter a new title for the list:', listTitle);

    if (newListTitle && newListTitle.trim() !== '') {
      const updatedLists = favoriteLists.map((list) => {
        if (list.title === listTitle) {
          return { ...list, title: newListTitle };
        }
        return list;
      });

      setFavoriteLists(updatedLists);
    }
  };

  const handleDeleteTVShow = (listTitle, TVShowId) => {
    const updatedLists = favoriteLists.map((list) => {
      if (list.title === listTitle) {
        const updatedTVShows = list.TVShows.filter((TVShow) => TVShow.id !== TVShowId);
        return { ...list, TVShows: updatedTVShows };
      }
      return list;
    });

    setFavoriteLists(updatedLists);
  };

  const handleDeleteList = (listTitle) => {
    const updatedLists = favoriteLists.filter((list) => list.title !== listTitle);
    setFavoriteLists(updatedLists);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      handleSearch({ preventDefault: () => {} }, nextPage);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      setCurrentPage(previousPage);
      handleSearch({ preventDefault: () => {} }, previousPage);
    }
  };

  const handleAddToListClick = (TVShow) => {
    setSelectedTVShow(TVShow);
    setShowAddToList(true);
  };

  return (
    <div className="container">
      <h2>TV Shows</h2>

      <form onSubmit={(e) => handleSearch(e)}>
        <h3>Search TV Shows</h3>
        <input
          type="text"
          placeholder="Search TV shows..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {searchResults.length > 0 && (
        <>
          <h3>Search Results</h3>
          <div className="search-results">
            {searchResults.map((TVShow) => (
              <div key={TVShow.id} className="TVShow-result">
                <Link to={`/tv/${TVShow.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${TVShow.poster_path}`}
                    alt={TVShow.name}
                  />
                </Link>
                <div>{TVShow.name}</div>
                <button onClick={() => handleAddToListClick(TVShow)}>Add to Favorites</button>
                {selectedTVShow && selectedTVShow.id === TVShow.id && showAddToList && (
                  <div>
                    <input
                      type="text"
                      placeholder="Enter list title..."
                      className="favorite-list-input"
                      value={currentList}
                      onChange={(e) => setCurrentList(e.target.value)}
                    />
                    <button className="add-to-list-button" onClick={handleAddFavorite}>
                      Add to List
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div>
            <button className="previous-button" onClick={goToPreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <button className="next-button" onClick={goToNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}

      {favoriteLists.length > 0 && (
        <>
          <h3>Favorite TV Show Lists</h3>
          {favoriteLists.map((list) => (
            <div key={list.title}>
              <div className="favorite-list-title">
                <h4>{list.title}</h4>
                <div>
                  <button className="edit-button" onClick={() => handleEditList(list.title)}>
                    Edit Title
                  </button>
                  <button className="delete-list-button" onClick={() => handleDeleteList(list.title)}>
                    Delete List
                  </button>
                </div>
              </div>
              <div className="TVShow-list">
                {list.TVShows.map((TVShow) => (
                  <div key={TVShow.id} className="TVShow-item">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${TVShow.poster_path}`}
                      alt={TVShow.name}
                    />
                    <div>{TVShow.name}</div>
                    <button onClick={() => handleDeleteTVShow(list.title, TVShow.id)}>
                      Delete TV Show
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default TVDashboard;
