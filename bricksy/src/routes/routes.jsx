import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Property from '../pages/Property.jsx'
import ComparePage from '../pages/ComparePage.jsx'
import FavoritesPage from '../pages/FavoritesPage.jsx'
import MessagesPage from '../pages/MessagesPage.jsx'
import PropertyDetailsPage from '../pages/PropertyDetailsPage.jsx'
import Home from "../pages/Home.jsx"
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup.jsx'

export default function AppRoutes(){
return (
<Routes>
<Route path="/" element={<Home/>} />
<Route path="/property" element={<Property/>} />
<Route path="/property/:id" element={<PropertyDetailsPage/>} />
<Route path="/favorites" element={<FavoritesPage/>} />
<Route path="/compare" element={<ComparePage/>} />
<Route path="/messages" element={<MessagesPage/>} />
<Route path="/login" element={<Login/>} />
<Route path="/signup" element={<Signup/>} />

<Route path="*" element={<div className='container' style={{padding:'2rem 0'}}>Not Found</div>} />
</Routes>
)
}