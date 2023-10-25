import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false,
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'error':
      return { ...state, error: action.payload, isLoading: false };

    case 'cities/loaded':
      return { ...state, cities: action.payload, isLoading: false };

    case 'city/get':
      return { ...state, currentCity: action.payload, isLoading: false };

    case 'city/created':
      return {
        ...state,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
        isLoading: false,
      };

    case 'city/deleted':
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };

    default:
      throw new Error('Unknown action type!');
  }
};

function CitiesContextProvider({ children }) {
  const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchCities = async () => {
      try {
        dispatch({ type: 'loading' });
        const res = await axios.get('http://localhost:8000/cities');

        dispatch({ type: 'cities/loaded', payload: res.data });
      } catch (err) {
        dispatch({
          type: 'error',
          payload: 'There was an error while fetching cities!',
        });
        console.log(err);
      }
    };

    fetchCities();
  }, []);

  const getCity = async (id) => {
    try {
      dispatch({ type: 'loading' });
      const res = await axios.get(`http://localhost:8000/cities/${id}`);

      dispatch({ type: 'city/get', payload: res.data });
    } catch (err) {
      dispatch({
        type: 'error',
        payload: 'There was an error while fetching a city!',
      });
      console.log(err);
    }
  };

  const addCity = async (city) => {
    try {
      dispatch({ type: 'loading' });
      const res = await axios.post(`http://localhost:8000/cities`, city);

      dispatch({ type: 'city/created', payload: res.data });
    } catch (err) {
      dispatch({
        type: 'error',
        payload: 'There was an error while adding a city!',
      });
      console.log(err);
    }
  };

  const deleteCity = async (id) => {
    try {
      dispatch({ type: 'loading' });
      await axios.delete(`http://localhost:8000/cities/${id}`);

      dispatch({ type: 'city/deleted', payload: id });
    } catch (err) {
      dispatch({
        type: 'error',
        payload: 'There was an error while deleting a city!',
      });
      console.log(err);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        error,
        currentCity,
        getCity,
        addCity,
        deleteCity,
      }}>
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesContextProvider, CitiesContext };
