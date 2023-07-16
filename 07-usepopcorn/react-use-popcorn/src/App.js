import { useEffect, useRef, useState } from 'react';

import StarRating from './components/StarRating';
import useMovies from './hooks/useMovies';
import useLocalStorage from './hooks/useLocalStorage';
import useKey from './hooks/useKey';

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const NavBar = ({ children }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
};

const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};

const SearchInput = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  useKey('Enter', (e) => {
    if (document.activeElement === inputEl.current) return;

    inputEl.current.focus();
    setQuery('');
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

const ResultsFound = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

const Main = ({ children }) => {
  return <main className="main">{children}</main>;
};

const MoviesList = ({ movies, onSelectMovie }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MoviesListItem
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
};

const MoviesListItem = ({ movie, onSelectMovie }) => {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

const SelectedMovie = ({ id, onCloseMovie, onClickAdd, watchedMovies }) => {
  const [movie, setMovie] = useState({});
  const [rating, setRating] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const countTotalDecisions = useRef(0);

  const watchedMovie = watchedMovies.find((movie) => movie.imdbID === id);

  const {
    Poster: poster,
    Title: title,
    Released: released,
    Runtime: runtime,
    Genre: genre,
    imdbRating,
    Plot: plot,
    Actors: actors,
    Director: director,
    Year: year,
  } = movie;

  const handleAdd = () => {
    const newMovie = {
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: runtime.split(' ').at(0),
      userRating: rating,
      imdbID: id,
      countTotalDecisions: countTotalDecisions.current,
    };

    onClickAdd(newMovie);
    onCloseMovie();
  };

  useEffect(() => {
    if (rating) countTotalDecisions.current++;
  }, [rating]);

  // Key listener
  useKey('Escape', onCloseMovie);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
        );

        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    // START
    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    document.title = `Movie | ${title}`;

    return () => (document.title = 'usePopcorn');
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div
              style={watchedMovie ? { pointerEvents: 'none' } : {}}
              className="rating">
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setRating}
                defaultRating={watchedMovie ? watchedMovie.userRating : 0}
              />

              {rating && !watchedMovie && (
                <button onClick={handleAdd} className="btn-add">
                  + Add to list
                </button>
              )}
            </div>

            <p>
              <em>{plot}</em>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </p>
          </section>
        </>
      )}
    </div>
  );
};

const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  );
};

const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

const WatchedMoviesList = ({ watched, onDeleteMovie }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMoviesListItem
          key={movie.imdbID}
          movie={movie}
          onDeleteMovie={onDeleteMovie}
        />
      ))}
    </ul>
  );
};

const WatchedMoviesListItem = ({ movie, onDeleteMovie }) => {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          onClick={() => onDeleteMovie(movie.imdbID)}
          className="btn-delete">
          &times;
        </button>
      </div>
    </li>
  );
};

const Loader = () => {
  return <p className="loader">Loading...</p>;
};

const Error = ({ message }) => {
  return (
    <p className="error">
      <span>⛔</span> {message}
    </p>
  );
};

const API_KEY = '687f849f';

export default function App() {
  const [query, setQuery] = useState('');
  // const [watched, setWatched] = useState(
  //   () => JSON.parse(localStorage.getItem('watched')) || []
  // );
  const [watched, setWatched] = useLocalStorage([], 'watched');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);

  const handleSelectMovie = (id) => {
    setSelectedMovieId((selectedId) => (selectedId === id ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedMovieId(null);
  };

  const handleClickAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleClickDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  // useEffect(() => {
  //   localStorage.setItem('watched', JSON.stringify(watched));
  // }, [watched]);

  return (
    <>
      <NavBar>
        <SearchInput query={query} setQuery={setQuery} />
        <ResultsFound movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <Error message={error} />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>

        <Box>
          {selectedMovieId ? (
            <SelectedMovie
              id={selectedMovieId}
              onCloseMovie={handleCloseMovie}
              onClickAdd={handleClickAddWatched}
              watchedMovies={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteMovie={handleClickDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
