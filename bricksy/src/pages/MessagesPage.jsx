// UPDATED: maps conversation keys -> properties safely, auto-selects first, cleans 'undefined'
import React, { useEffect, useMemo, useState } from 'react';
import { properties } from '../data/properties.js';
import { useMessages } from '../context/MessagesContext.jsx';
import Messages from '../components/Messages/Messages.jsx';
import './pages.css';

export default function MessagesPage() {
  const { conversations, devRemoveUndefinedKey } = useMessages();
  const [selectedProperty, setSelectedProperty] = useState(null);

  const propertyMap = useMemo(() => {
    const map = new Map();
    (properties || []).forEach((p) => map.set(String(p.id), p));
    return map;
  }, []);

  const conversationKeys = useMemo(
    () => Object.keys(conversations || {}).filter((k) => k && k !== 'undefined'),
    [conversations]
  );

  useEffect(() => {
    if (!selectedProperty && conversationKeys.length > 0) {
      setSelectedProperty(conversationKeys[0]);
    }
  }, [conversationKeys, selectedProperty]);

  useEffect(() => {
    if (selectedProperty && !conversationKeys.includes(String(selectedProperty))) {
      setSelectedProperty(null);
    }
  }, [conversationKeys, selectedProperty]);

  const renderConversationItem = (pid) => {
    const property = propertyMap.get(String(pid));
    const active = String(selectedProperty) === String(pid);

    return (
      <div
        key={pid}
        className={`conversation-item ${active ? 'active' : ''}`}
        onClick={() => setSelectedProperty(pid)}
        role="button"
      >
        <h4 className="conv-title">
          {property ? property.title : `Unknown Property (ID: ${pid})`}
        </h4>
        <p className="conv-sub">
          {property ? (property.city || property.location) : 'City not available'}
        </p>
      </div>
    );
  };

  return (
    <div className="messages-page container msg-grid">
      {/* Left Sidebar */}
      <aside className="conversations-list card">
        <div className="conversations-header">
          <h2>Your Conversations</h2>

          {Object.prototype.hasOwnProperty.call(conversations || {}, 'undefined') && (
            <div className="warn-box">
              Found a broken thread with ID <code>undefined</code>.{' '}
              <button type="button" onClick={devRemoveUndefinedKey} className="link-btn">
                Click to remove
              </button>.
            </div>
          )}
        </div>

        {conversationKeys.length > 0 ? (
          conversationKeys.map(renderConversationItem)
        ) : (
          <p>No conversations yet.</p>
        )}
      </aside>

      {/* Chat Section */}
      <section className="chat-section card">
        {selectedProperty ? (
          <Messages propertyId={String(selectedProperty)} />
        ) : (
          <p className="muted center">Select a conversation to view messages</p>
        )}
      </section>
    </div>
  );
}
