import React from 'react';
import './PropertyCard.css';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { useCompare } from '../../context/CompareContext.jsx';

export default function PropertyCard({ p }) {
  const { isFav, toggleFavorite } = useFavorites();
  const { inCompare, toggleCompare } = useCompare();

  return (
    <div className="property-card modern-card">
      {/* Image Section */}
      <div className="card-image">
        {/* Badges */}
        <div className="badges">
          {p.isNew && <span className="badge">New</span>}
          {p.isFurnished && <span className="badge">Furnished</span>}
          {p.isPetFriendly && <span className="badge">Pet Friendly</span>}
        </div>

        {/* Favorite Button */}
        <button
          className={`fav-btn ${isFav(p.id) ? 'active' : ''}`}
          onClick={() => toggleFavorite(p.id)}
        >
          ♥
        </button>

        {/* Compare Button */}
        <button
          className={`compare-btn ${inCompare(p.id) ? 'active' : ''}`}
          onClick={() => toggleCompare(p.id)}
        >
          ⇄ 
        </button>

        {/* Image */}
        <img
          src={p.images[0] || '/placeholder/placeholder.jpg'}
          alt={p.title}
          className="property-img"
        />
      </div>

      {/* Content Section */}
      <div className="card-body">
        {/* Price */}
        <div className="price">
          ₹ {p.price.toLocaleString()}
          <span className="price-subtext"> / month</span>
        </div>

        {/* Property Details */}
        <div className="details">
          <span>{p.bedrooms} Beds</span> • <span>{p.bathrooms} Baths</span>
        </div>

        {/* Title */}
        <h3 className="title">{p.title}</h3>

        {/* Location */}
        <div className="location">{p.city}</div>

        {/* CTA Button */}
        <Link className="btn check-btn" to={`/property/${p.id}`}>
          View Details
        </Link>
      </div>
    </div>
  );
}
