import { useState, useEffect } from 'react';

const API_KEY = '687f849f';

export default function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error('Something went wrong');

        const data = await res.json();

        if (data.Response === 'False') throw new Error('Movie not found');

        setMovies(data.Search);
        setError('');
      } catch (err) {
        console.log(err);
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Start
    if (query.length < 3) return;

    fetchMovies();

    return () => controller.abort();
  }, [query]);

  return { movies, error, isLoading };
}
