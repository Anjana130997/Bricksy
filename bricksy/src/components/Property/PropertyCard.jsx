// UPDATED: consistent image handling + allow viewing details without login; login only for fav/compare
import React from 'react';
import './PropertyCard.css';
import { Link, useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { useCompare } from '../../context/CompareContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

function normalizeImage(img) {
  if (!img) return null;
  if (typeof img !== 'string') return null;
  if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) return img;
  if (img.startsWith('/')) return img; // already a public path
  return `/images/${img}`;
}

export default function PropertyCard({ p }) {
  const { isFav, toggleFavorite } = useFavorites();
  const { inCompare, toggleCompare } = useCompare();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleFav = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate('/login', { state: { from: { pathname: '/favorites' } } });
      return;
    }
    toggleFavorite(p.id);
  };

  const handleCompare = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate('/login', { state: { from: { pathname: '/compare' } } });
      return;
    }
    toggleCompare(p.id);
  };

  const cardImage =
    (Array.isArray(p.images) && p.images.length && normalizeImage(p.images[0])) ||
    normalizeImage(p.image) ||
    '/placeholder/placeholder.jpg';

  return (
    <div className="property-card modern-card">
      <div className="card-image">
        <div className="badges">
          {p.isNew && <span className="badge">New</span>}
          {p.isFurnished && <span className="badge">Furnished</span>}
          {p.isPetFriendly && <span className="badge">Pet Friendly</span>}
        </div>

        <button
          className={`fav-btn ${isFav(p.id) ? 'active' : ''}`}
          onClick={handleFav}
          aria-disabled={!isAuthenticated}
          title={!isAuthenticated ? 'Login to favorite' : 'Toggle favorite'}
        >
          ♥
        </button>

        <button
          className={`compare-btn ${inCompare(p.id) ? 'active' : ''}`}
          onClick={handleCompare}
          aria-disabled={!isAuthenticated}
          title={!isAuthenticated ? 'Login to compare' : 'Toggle compare'}
        >
          ⇄
        </button>

        <img
          src={cardImage}
          alt={p.title}
          className="property-img"
          loading="lazy"
        />
      </div>

      <div className="card-body">
        <div className="price">
          ₹ {p.price.toLocaleString?.() ?? p.price}
          <span className="price-subtext"> / month</span>
        </div>

        <div className="details">
          <span>{p.bedrooms} Beds</span> • <span>{p.bathrooms} Baths</span>
        </div>

        <h3 className="title">{p.title}</h3>
        <div className="location">{p.city || p.location}</div>

        {/* View Details should NOT require login */}
        <Link className="btn check-btn" to={`/property/${p.id}`}>
          View Details
        </Link>
      </div>
    </div>
  );
}
