import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Homepage from './pages/HomePage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:8000/cities')
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
      })
      .catch(() => alert('Error while fetching data!'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="product" element={<Product />} />
      <Route path="pricing" element={<Pricing />} />
      <Route path="login" element={<Login />} />
      <Route path="app" element={<AppLayout />}>
        <Route index element={<Navigate to="cities" replace />} />
        <Route
          path="cities"
          element={<CityList cities={cities} isLoading={isLoading} />}
        />
        <Route path="cities/:id" element={<City isLoading={isLoading} />} />
        <Route
          path="countries"
          element={<CountryList cities={cities} isLoading={isLoading} />}
        />
        <Route path="form" element={<Form />} />
      </Route>

      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
