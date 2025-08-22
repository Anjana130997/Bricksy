import React, { useState } from 'react';
import { properties } from '../data/properties.js';
import { useMessages } from '../context/MessagesContext.jsx';
import Messages from '../components/Messages/Messages.jsx';
import './pages.css'

export default function MessagesPage() {
  const { conversations } = useMessages();
  const [selectedProperty, setSelectedProperty] = useState(null);

  const conversationKeys = Object.keys(conversations);

  return (
    <div className="messages-page container">
      <div className="conversations-list">
        <h2>Your Conversations</h2>
        {conversationKeys.length > 0 ? (
          conversationKeys.map(pid => {
            const property = properties.find(p => p.id === parseInt(pid));
            return (
              <div
                key={pid}
                className={`conversation-item ${selectedProperty === pid ? 'active' : ''}`}
                onClick={() => setSelectedProperty(pid)}
              >
                <h4>{property?.title || 'Property ' + pid}</h4>
                <p>{property?.city}</p>
              </div>
            );
          })
        ) : (
          <p>No conversations yet.</p>
        )}
      </div>

      <div className="chat-section-full">
        {selectedProperty ? (
          <Messages propertyId={selectedProperty} />
        ) : (
          <p>Select a conversation to view messages</p>
        )}
      </div>
    </div>
  );
}
