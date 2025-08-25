// UPDATED: mount all context providers here so every component can access them
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import { AuthProvider } from './context/AuthContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { CompareProvider } from './context/CompareContext.jsx';
import { MessagesProvider } from './context/MessagesContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <FavoritesProvider>
        <CompareProvider>
        
            <MessagesProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </MessagesProvider>
         
        </CompareProvider>
      </FavoritesProvider>
    </AuthProvider>
  </React.StrictMode>
);
