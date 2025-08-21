import React from 'react'
import './Favorites.css'
import { useFavorites } from '../../context/FavoritesContext.jsx'
import { properties } from '../../data/properties.js'
import PropertyList from '../Property/PropertyList.jsx'


export default function Favorites(){
const { favorites } = useFavorites()
const items = properties.filter(p=> favorites.includes(p.id))
return (
<div className='container'>
<h2>Favorites</h2>
<PropertyList items={items} />
</div>
)
}