import React, { createContext, useState } from 'react';

const RootContext = createContext();

function RootContextProvider({ children }) {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const [watchlist, setWatchlist] = useState(
    localStorage.getItem('watchlist')
      ? JSON.parse(localStorage.getItem('watchlist'))
      : []
  );
  const [watched, setWatched] = useState(
    localStorage.getItem('watched')
      ? JSON.parse(localStorage.getItem('watched'))
      : []
  );

  const searchMovie = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=6c95b5c8fd99ea472bb06ae3c2004c44&language=en-US&page=1&include_adult=false&query=${query}`
    );
    const data = await res.json();
    setSearchTerm(query);
    const watchlistIDs = watchlist.map((item) => item.id);
    const watchedIDs = watched.map((item) => item.id);
    const currentIDs = watchlistIDs.concat(watchedIDs);
    const newResults = data.results.filter(
      (item) => !currentIDs.includes(item.id)
    );
    setResults(newResults);
  };

  const addToWatchlist = (movie) => {
    setWatchlist((prevList) => {
      const newList = [...prevList, movie];
      localStorage.setItem('watchlist', JSON.stringify(newList));
      return newList;
    });
  };

  const removeFromWatchlist = (movie) => {
    setWatchlist((prevList) => {
      const newList = prevList.filter((item) => item.id !== movie.id);
      localStorage.setItem('watchlist', JSON.stringify(newList));
      return newList;
    });
  };

  const markAsWatched = (movie) => {
    removeFromWatchlist(movie);
    setWatched((prevWatched) => {
      const newWatched = [...prevWatched, movie];
      localStorage.setItem('watched', JSON.stringify(newWatched));
      return newWatched;
    });
  };

  const markAsUnwatched = (movie) => {
    setWatched((prevWatched) => {
      const newWatched = prevWatched.filter((item) => item.id !== movie.id);
      localStorage.setItem('watched', JSON.stringify(newWatched));
      return newWatched;
    });
    addToWatchlist(movie);
  };

  const removeFromWatched = (movie) => {
    setWatched((prevWatched) => {
      const newWatched = prevWatched.filter((item) => item.id !== movie.id);
      localStorage.setItem('watched', JSON.stringify(newWatched));
      return newWatched;
    });
  };

  const saveRating = (movie, rating) => {
    let newWatched = watched.map((item) => {
      if (item.id === movie.id) {
        return { ...item, rating: rating };
      } else {
        return item;
      }
    });
    localStorage.setItem('watched', JSON.stringify(newWatched));
    setWatched(newWatched);
  };

  return (
    <RootContext.Provider
      value={{
        query,
        setQuery,
        searchTerm,
        setSearchTerm,
        results,
        setResults,
        watchlist,
        setWatchlist,
        watched,
        setWatched,
        searchMovie,
        addToWatchlist,
        removeFromWatchlist,
        markAsWatched,
        markAsUnwatched,
        removeFromWatched,
        saveRating,
      }}
    >
      {children}
    </RootContext.Provider>
  );
}

export { RootContext, RootContextProvider };
