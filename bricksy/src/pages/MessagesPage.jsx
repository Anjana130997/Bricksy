import React from 'react'
import MessageList from '../components/Messages/MessageList.jsx'
import MessageThread from '../components/Messages/MessageThread.jsx'


export default function MessagesPage(){
return (
<div className='container grid messages-page'>
<div>
<h2>Conversations</h2>
<MessageList/>
</div>
<div>
<h2>Chat</h2>
<MessageThread/>
</div>
</div>
)
}