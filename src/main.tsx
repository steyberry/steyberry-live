import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Get base path from the HTML base tag or default to '/'
const basename = document.querySelector('base')?.getAttribute('href') || '/';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename.endsWith('/') ? basename.slice(0, -1) : basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
