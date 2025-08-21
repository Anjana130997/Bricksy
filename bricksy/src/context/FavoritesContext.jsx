import React, { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'


const FavoritesContext = createContext()
export const useFavorites = ()=> useContext(FavoritesContext)


export function FavoritesProvider({children}){
const [favorites, setFavorites] = useLocalStorage('favorites', [])
const isFav = id => favorites.includes(id)
const toggleFavorite = id => setFavorites(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id])
return (
<FavoritesContext.Provider value={{favorites, isFav, toggleFavorite}}>
{children}
</FavoritesContext.Provider>
)
}