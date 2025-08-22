import React, { useState, useEffect, useRef } from 'react';
import { useMessages } from '../../context/MessagesContext';
import './Messages.css';

export default function Messages({ propertyId }) {
  const { conversations, sendMessage, simulateOwnerReply } = useMessages();
  const [message, setMessage] = useState('');
  const chatEndRef = useRef(null);

  const msgs = conversations[propertyId] || [];

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(propertyId, message, 'user');
      simulateOwnerReply(propertyId);
      setMessage('');
    }
  };

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [msgs]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Chat with Owner</h3>
      </div>

      <div className="chat-messages">
        {msgs.length > 0 ? (
          msgs.map(msg => (
            <div key={msg.id} className={`chat-msg ${msg.from}`}>
              <div className="bubble">
                <p>{msg.text}</p>
                <span className="timestamp">
                  {new Date(msg.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-messages">No messages yet. Start the conversation!</p>
        )}
        <div ref={chatEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
