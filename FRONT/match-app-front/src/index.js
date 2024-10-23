// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Certifique-se de que o caminho está correto
import './index.css'; // Se você tiver um arquivo CSS

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
