// UPDATED: central routes file. Uses RequireAuth for protected pages.
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Property from './pages/Property.jsx';
import PropertyDetailsPage from './pages/PropertyDetailsPage.jsx';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import MessagesPage from './pages/MessagesPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import ComparePage from './pages/ComparePage.jsx';

import RequireAuth from './routes/RequireAuth.jsx';
import Navbar from './components/Layout/Navbar.jsx';

export default function App() {
  return (
    <>
      <Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/property"
            element={
              <RequireAuth>
                <Property />
              </RequireAuth>
            }
          />

          <Route
            path="/property/:id"
            element={
              /* Allow viewing details publicly, but we'll enforce login when sending inquiries/messages.
                 For stricter behavior, wrap this with RequireAuth */
                <PropertyDetailsPage />
            }
          />

          <Route
            path="/messages"
            element={
              <RequireAuth>
                <MessagesPage />
              </RequireAuth>
            }
          />

          <Route
            path="/favorites"
            element={
              <RequireAuth>
                <FavoritesPage />
              </RequireAuth>
            }
          />

          <Route
            path="/compare"
            element={
              <RequireAuth>
                <ComparePage />
              </RequireAuth>
            }
          />

          {/* fallback route could be added */}
        </Routes>
      </Navbar>
    </>
  );
}
