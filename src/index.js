import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Assuming you have an App component
import './index.css'; // Optional: for global CSS styling

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
