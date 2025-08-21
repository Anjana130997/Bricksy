import React from 'react'
import './MessageList.css'
import { Link } from 'react-router-dom'
import { useMessages } from '../../context/MessagesContext.jsx'
import { properties } from '../../data/properties.js'


export default function MessageList(){
const { conversations } = useMessages()
const ids = Object.keys(conversations)
if(!ids.length) return <div className='container' style={{padding:'1rem'}}>No messages yet. Use "Contact Agent" on a property to start a chat.</div>
return (
<div className='container grid msg-grid'>
{ids.map(id=>{
const p = properties.find(x=> x.id===+id)
const thread = conversations[id]
const last = thread[thread.length-1]
return (
<Link to={`/messages?pid=${id}`} key={id} className='card msg-card'>
<div className='msg-head'>
<div className='title'>{p? p.title: 'Property '+id}</div>
<div className='time'>{new Date(last.ts).toLocaleString()}</div>
</div>
<div className='preview'>{last.from}: {last.text.slice(0,80)}</div>
</Link>
)
})}
</div>
)
}