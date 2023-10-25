import { Navigate, Route, Routes } from 'react-router-dom';

import Homepage from './pages/HomePage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import { CitiesContextProvider } from './contexts/CitiesContext';
import { AuthContextProvider } from './contexts/FakeAuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthContextProvider>
      <CitiesContextProvider>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route
            path="app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
            <Route index element={<Navigate to="cities" replace />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </CitiesContextProvider>
    </AuthContextProvider>
  );
}

export default App;
