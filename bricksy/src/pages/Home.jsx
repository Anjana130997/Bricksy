import React from 'react';
import './pages.css';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/Property/PropertyCard.jsx';
import { properties } from '../data/properties.js';

export default function Home() {
  const featured = properties.slice(0, 6);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Find Your Dream Home in Santa Barbara</h1>
            <p>Explore the best listings for rent and sale.</p>
            <div className="search-bar">
              <input type="text" placeholder="City, Neighborhood, or Zip" />
              <select>
                <option>Rent</option>
                <option>Buy</option>
              </select>
              <button>Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <Link to="/post-property" className="action-card">Post Your Property</Link>
        <Link to="/rentals" className="action-card">Browse Rentals</Link>
        <Link to="/sales" className="action-card">Explore Sales</Link>
      </section>

      {/* Featured Properties */}
      <section className="featured">
        <h2>Featured Listings</h2>
        <div className="property-grid">
          {featured.map(p => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="benefit">
          <h3>Trusted Listings</h3>
          <p>Verified properties from certified agents.</p>
        </div>
        <div className="benefit">
          <h3>Easy Posting</h3>
          <p>List your property in under 5 minutes.</p>
        </div>
        <div className="benefit">
          <h3>Transparent Pricing</h3>
          <p>No hidden charges—what you see is what you pay.</p>
        </div>
      </section>
    </div>
  );
}
