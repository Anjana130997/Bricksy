import React from 'react'
import './App.css'
import AppRoutes from './routes/routes.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { CompareProvider } from './context/CompareContext.jsx'
import { FilterProvider } from './context/FilterContext.jsx'
import { MessagesProvider } from './context/MessagesContext.jsx'
import Navbar from './components/Layout/Navbar.jsx'


export default function App(){
return (
<FilterProvider>
<FavoritesProvider>
<CompareProvider>
<MessagesProvider>
<Navbar>
<AppRoutes />
</Navbar>
</MessagesProvider>
</CompareProvider>
</FavoritesProvider>
</FilterProvider>
)
}