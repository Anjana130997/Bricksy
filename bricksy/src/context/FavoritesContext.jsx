// UPDATED: favorites persisted, returns isFav expecting numeric id checks
import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const FavoritesContext = createContext();
export const useFavorites = () => useContext(FavoritesContext);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('favorites', []); // store numeric ids

  const isFav = (id) => favorites.includes(Number(id));
  const toggleFavorite = (id) => {
    const n = Number(id);
    setFavorites((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFav, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
