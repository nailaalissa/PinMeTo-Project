import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import MapContainer from './pages/MapContainer';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Map from './pages/Map';
import Widget from './pages/Widget';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <h1>SORROY.........</h1>,
  },
  {
    path: '/Home',
    element: <Home />,
  },

  {
    path: '/Map',
    element: <Map />,
  },
  {
    path: '/widget',
    element: <Widget />,
  },
  {
    path: '/MapContainer',
    element: <MapContainer />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>,
);

reportWebVitals();
