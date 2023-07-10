import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import StarRating from './components/StarRating';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating defaultRating={5} size={24} color="green" />
    <StarRating
      maxRating={5}
      messages={['terrbile', 'bad', 'okay', 'good', 'amazing']}
    /> */}
  </React.StrictMode>
);
