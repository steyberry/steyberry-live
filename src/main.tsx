import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { getAssetPath } from './utils/assets';

// Get base path - use '/steyberry-live' for production, '/' for development
const basename = import.meta.env.PROD ? '/steyberry-live' : '/';

// Set custom cursor
document.body.style.cursor = `url('${getAssetPath('cursor/color-pixels-mem-cats-pointer.png')}') 0 0, auto`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
