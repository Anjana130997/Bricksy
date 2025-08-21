import React from 'react'
import { useParams } from 'react-router-dom'
import { properties } from '../data/properties.js'
import PropertyDetails from '../components/Property/PropertyDetails.jsx'


export default function PropertyDetailsPage(){
const { id } = useParams()
const p = properties.find(x=> x.id===Number(id))
if(!p) return <div className='container' style={{padding:'1rem'}}>Property not found.</div>
return <PropertyDetails p={p}/>
}