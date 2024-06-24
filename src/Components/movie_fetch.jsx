import React, { useState, useEffect } from 'react';
import "./movie_fetch.css";

const FetchData = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        if (searchTerm.trim() !== '') {
          fetchMovies();
        } else {
          setMovies([]); // Clear search results if the search term is empty
        }
      }, 500);
  
      return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);
  
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(searchTerm)}&apikey=d8e12002`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        if (jsonData.Response === 'True') {
          setMovies(jsonData.Search);
          console.log(jsonData); // Log the fetched data to the console
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };

    const handleYearFilterChange = (event) => {
      setYearFilter(event.target.value);
    };
    
    const handleFavorite = (movie) => {
      if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
        setFavorites([...favorites, movie]);
      }
    };

    const handleRemoveFavorite = (movie) => {
      setFavorites(favorites.filter(fav => fav.imdbID !== movie.imdbID));
    };

    const filteredMovies = movies.filter(movie =>
      yearFilter === '' || movie.Year === yearFilter
    );

    return (
      <div>
        <h2>Movie Search</h2>
        <div>
          <input
            type="text"
            placeholder="Search movies by title..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {isLoading && <div>Loading...</div>}

        <h2>Favorites</h2>
        <div className="favorite-list">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="favorite-item">
              <img src={movie.Poster} alt={movie.Title} />
              <div>{movie.Title} ({movie.Year})</div>
              <button onClick={() => handleRemoveFavorite(movie)}>Remove from Favorites</button>
            </div>
          ))}
        </div>
        

        <h2>Search Results</h2>
        <div>
          <input
            type="text"
            placeholder="Filter by year..."
            value={yearFilter}
            onChange={handleYearFilterChange}
          />
        </div>
        <div className="movie-list">
          {filteredMovies.map((movie) => (
            <div key={movie.imdbID} className="movie-item">
              <img src={movie.Poster} alt={movie.Title} />
              <div>{movie.Title} ({movie.Year})</div>
              <button onClick={() => handleFavorite(movie)}>Mark as Favorite</button>
            </div>
          ))}
        </div>

       
      </div>
    );
};

export default FetchData;
