import React, { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'


/* messages shape in localStorage
{
[propertyId]: [
{ id:'m1', from:'user', text:'Hello!', ts: 1710000000000 },
{ id:'m2', from:'owner', text:'Hi!', ts: 1710000001111 }
], ...
}
*/
const MessagesContext = createContext()
export const useMessages = ()=> useContext(MessagesContext)


export function MessagesProvider({children}){
const [conversations, setConversations] = useLocalStorage('messages', {})


const sendMessage = (propertyId, text, from='user') => {
const ts = Date.now()
const msg = { id: `${propertyId}-${ts}`, from, text, ts }
setConversations(prev=> ({
...prev,
[propertyId]: [...(prev[propertyId]||[]), msg]
}))
}


// Simple simulated owner auto-reply (frontend only)
const simulateOwnerReply = (propertyId) => {
setTimeout(()=>{
sendMessage(propertyId, 'Thanks for reaching out! I\'ll get back to you soon.', 'owner')
}, 600)
}


return (
<MessagesContext.Provider value={{conversations, sendMessage, simulateOwnerReply}}>
{children}
</MessagesContext.Provider>
)
}