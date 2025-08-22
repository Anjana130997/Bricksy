import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { properties } from '../data/properties.js';
import { useMessages } from '../context/MessagesContext.jsx';
import './pages.css';

export default function PropertyDetails() {
  const { id } = useParams();
  const property = properties.find(p => p.id === parseInt(id));
  const { conversations, sendMessage, simulateOwnerReply } = useMessages();

  const [message, setMessage] = useState('');

  if (!property) {
    return (
      <div className="container" style={{ padding: '1rem' }}>
        <h2>Property not found</h2>
        <Link to="/properties" className="back-btn">Back to Listings</Link>
      </div>
    );
  }

  const propertyMessages = conversations[property.id] || [];

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(property.id, message, 'user');
      simulateOwnerReply(property.id);
      setMessage('');
    }
  };

  return (
    <div className="property-details container">
      {/* Header */}
      <div className="property-header">
        <h1>{property.title}</h1>
        <p>{property.city}, {property.neighborhood}</p>
      </div>

      {/* Image Gallery */}
      <div className="property-gallery">
        <img src={property.image} alt={property.title} className="main-image" />
        {property.images && (
          <div className="thumb-gallery">
            {property.images.map((img, idx) => (
              <img key={idx} src={img} alt={`Thumbnail ${idx}`} />
            ))}
          </div>
        )}
      </div>

      {/* Property Info */}
      <div className="property-info-section">
        <h2>Price: ₹{property.price.toLocaleString()}</h2>
        <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
        <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
        <p><strong>Area:</strong> {property.area} sq ft</p>
        <p><strong>Year Built:</strong> {property.yearBuilt}</p>
        <p><strong>Type:</strong> {property.type}</p>

        <p><strong>Description:</strong>         {property.features && (
          <div className="features-list">
            {property.features.map((f, i) => (
              <span key={i} className="feature-badge">{f}</span>
            ))}
          </div>
        )}|| 'No description available.'</p>
      </div>

      {/* Chat Section */}
      <div className="chat-section">
        <h3>Chat with Owner</h3>
        <div className="chat-box">
          {propertyMessages.length > 0 ? (
            propertyMessages.map(msg => (
              <div key={msg.id} className={`chat-msg ${msg.from}`}>
                <p>{msg.text}</p>
                <span>{new Date(msg.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            ))
          ) : (
            <p className="no-messages">Start a conversation with the owner</p>
          )}
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

      {/* Action Buttons */}
      <div className="property-actions">
        <Link to="/messages" className="btn-primary">Go to All Messages</Link>
        <Link to="/properties" className="btn-secondary">Back to Listings</Link>
      </div>
    </div>
  );
}
