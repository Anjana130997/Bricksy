// UPDATED: homepage public. Search navigates to /property with state to prefill filters (if desired)
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/Property/PropertyCard.jsx';
import { properties } from '../data/properties.js';
import './pages.css';
import { useAuth } from '../context/AuthContext.jsx';

export default function Home() {
  const featured = properties.slice(0, 6);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [q, setQ] = useState('');
  const [mode, setMode] = useState('rent');

  const onSearch = () => {
    // navigate to property listing, pass filter via state (Property page can read location.state)
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/property' } } });
      return;
    }
    navigate('/property', { state: { q, mode } });
  };

  return (
    <div className="homepage">
      <section className="hero luxury-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Invest in Your Future with <span>Luxury Homes</span></h1>
            <p>Premium properties in prime locations. Trusted by thousands.</p>
            <div className="search-bar">
              <input type="text" placeholder="City, Neighborhood, or Zip" value={q} onChange={(e)=>setQ(e.target.value)} />
              <select value={mode} onChange={(e)=>setMode(e.target.value)}>
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
              <button onClick={onSearch}>Search</button>
            </div>
          </div>
        </div>
      </section>

      <section className="why-invest container">
        <h2>Why Invest with Us?</h2>
        <div className="invest-grid">
          <div className="invest-card">
            <img src="https://thumbs.dreamstime.com/b/wooden-blocks-word-roi-up-arrow-money-bag-high-level-business-profitability-return-investment-invested-capital-146375446.jpg" alt="ROI" />
            <h3>High ROI</h3>
            <p>Assured returns on premium investments.</p>
          </div>
          <div className="invest-card">
            <img src="https://www.shutterstock.com/image-photo/concept-meetings-voters-campaigning-travel-260nw-483933949.jpg" alt="Location" />
            <h3>Prime Locations</h3>
            <p>Strategically located in top-rated neighborhoods.</p>
          </div>
          <div className="invest-card">
            <img src="https://www.shutterstock.com/image-photo/business-people-signing-contract-making-260nw-2479557449.jpg" alt="Secure" />
            <h3>Secure Deals</h3>
            <p>Verified properties and 100% transparent transactions.</p>
          </div>
        </div>
      </section>

      <section className="featured container">
        <h2>Featured Listings</h2>
        <div className="property-grid">
          {featured.map(p => <PropertyCard key={p.id} p={p} />)}
        </div>
        <Link
          to="/property"
          className={`view-all-btn ${!isAuthenticated ? 'disabled-link' : ''}`}
          onClick={(e) => { if (!isAuthenticated) { e.preventDefault(); navigate('/login', { state: { from: { pathname: '/property' } } }); } }}
        >
          View All Properties
        </Link>
      </section>

      <section className="luxury-banner">
        <div className="luxury-content">
          <h2>Experience Luxury Living</h2>
          <p>Exclusive homes designed for those who demand the best.</p>
          <Link
            to="/contact"
            className="cta-btn"
            onClick={(e) => { if (!isAuthenticated) { e.preventDefault(); navigate('/login', { state: { from: { pathname: '/contact' } } }); } }}
          >
            Get in Touch
          </Link>
        </div>
      </section>

      <section className="faq-section container">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <div className="faq-item">
            <h3>1. How can I invest?</h3>
            <p>Browse listings, choose a property, and connect with our experts.</p>
          </div>
          <div className="faq-item">
            <h3>2. What is the minimum investment?</h3>
            <p>Starts at ₹50 lakhs depending on property type.</p>
          </div>
          <div className="faq-item">
            <h3>3. Are properties verified?</h3>
            <p>Yes, all are legally verified with full documentation.</p>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <h2>Ready to Find Your Perfect Home?</h2>
        <Link
          to="/contact"
          className="cta-btn"
          onClick={(e) => { if (!isAuthenticated) { e.preventDefault(); navigate('/login', { state: { from: { pathname: '/contact' } } }); } }}
        >
          Contact Us Now
        </Link>
      </section>
    </div>
  );
}
