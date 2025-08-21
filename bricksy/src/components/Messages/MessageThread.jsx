import React, { useMemo, useState } from 'react'
import './MessageThread.css'
import { useLocation } from 'react-router-dom'
import { useMessages } from '../../context/MessagesContext.jsx'


function useQuery(){ const { search } = useLocation(); return useMemo(()=> Object.fromEntries(new URLSearchParams(search)),[search]) }


export default function MessageThread(){
const q = useQuery()
const pid = Number(q.pid)
const { conversations, sendMessage, simulateOwnerReply } = useMessages()
const list = conversations[pid] || []
const [text, setText] = useState('')


const onSend = ()=>{
if(!text.trim()) return
sendMessage(pid, text.trim(), 'user')
simulateOwnerReply(pid)
setText('')
}


if(!pid) return <div className='container' style={{padding:'1rem'}}>Select a conversation on the left.</div>


return (
<div className='container thread'>
<div className='bubble-wrap'>
{list.map(m=> (
<div key={m.id} className={'bubble '+(m.from==='user'?'me':'other')}>
<div className='text'>{m.text}</div>
<div className='time'>{new Date(m.ts).toLocaleTimeString()}</div>
</div>
))}
</div>
<div className='composer'>
<input placeholder='Type a message' value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=> e.key==='Enter' && onSend()} />
<button className='btn' onClick={onSend}>Send</button>
</div>
</div>
)
}