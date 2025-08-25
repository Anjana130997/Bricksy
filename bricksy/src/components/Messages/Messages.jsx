// UPDATED: stricter guards + smooth scroll + clean UX when not logged in/invalid pid
import React, { useState, useEffect, useRef } from 'react';
import { useMessages } from '../../context/MessagesContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import './Messages.css';

export default function Messages({ propertyId }) {
  const { conversations, sendMessage, simulateOwnerReply } = useMessages();
  const { isAuthenticated } = useAuth();
  const [message, setMessage] = useState('');
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  const pidKey = propertyId != null ? String(propertyId) : '';
  const msgs = pidKey ? conversations?.[pidKey] || [] : [];

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  const handleSend = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/property/${pidKey}` } } });
      return;
    }
    if (!pidKey) return;

    const trimmed = message.trim();
    if (!trimmed) return;

    sendMessage(pidKey, trimmed, 'user');
    simulateOwnerReply(pidKey);
    setMessage('');
  };

  const disabledReason = !isAuthenticated
    ? 'Login to send messages'
    : !pidKey
    ? 'Select a property to start chatting'
    : 'Type a message...';

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h4>Chat</h4>
        <small className="muted">{pidKey ? `Property ID: ${pidKey}` : 'No property selected'}</small>
      </div>

      <div className="chat-messages">
        {msgs.length > 0 ? (
          msgs.map((msg) => (
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
          placeholder={disabledReason}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!isAuthenticated || !pidKey}
        />
        <button type="submit" disabled={!isAuthenticated || !pidKey || !message.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
