import React from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/Property/PropertyCard.jsx';
import { properties } from '../data/properties.js';
import './pages.css';

export default function Home() {
  const featured = properties.slice(0, 6);

  return (
    <div className="homepage">
      
      {/* Hero Section */}
      <section className="hero luxury-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Invest in Your Future with <span>Luxury Homes</span></h1>
            <p>Premium properties in prime locations. Trusted by thousands.</p>
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

      {/* Why Invest Section */}
      <section className="why-invest container">
        <h2>Why Invest in Our Properties?</h2>
        <div className="invest-grid">
          <div className="invest-card">
            <img src="/icons/roi.png" alt="High ROI" />
            <h3>High ROI</h3>
            <p>Assured returns on premium investments.</p>
          </div>
          <div className="invest-card">
            <img src="/icons/location.png" alt="Prime Locations" />
            <h3>Prime Locations</h3>
            <p>Strategically located properties in top-rated neighborhoods.</p>
          </div>
          <div className="invest-card">
            <img src="/icons/security.png" alt="Secure" />
            <h3>Secure Transactions</h3>
            <p>Fully verified properties and transparent deals every time.</p>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="featured container">
        <h2>Featured Listings</h2>
        <div className="property-grid">
          {featured.map(p => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </div>
        <Link to="/properties" className="view-all-btn">View All Properties</Link>
      </section>

      {/* Luxury Banner */}
      <section className="luxury-banner">
        <div className="luxury-content">
          <h2>Experience Luxury Living</h2>
          <p>Exclusive homes designed for those who demand the best.</p>
          <Link to="/contact" className="cta-btn">Get in Touch</Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials container">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>“The best real estate experience I've ever had. Highly professional!”</p>
            <h4>- John D.</h4>
          </div>
          <div className="testimonial-card">
            <p>“Found my dream home in just 2 weeks. Amazing service!”</p>
            <h4>- Priya S.</h4>
          </div>
          <div className="testimonial-card">
            <p>“Transparent process and premium properties. Highly recommended.”</p>
            <h4>- Ahmed K.</h4>
          </div>
        </div>
      </section>

      {/* ✅ FAQ Section (Directly in Home Page) */}
      <section className="faq-section container">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <div className="faq-item">
            <h3>1. How can I invest in your properties?</h3>
            <p>You can browse listings, choose a property, and connect with our experts through the Contact page.</p>
          </div>
          <div className="faq-item">
            <h3>2. What is the minimum investment amount?</h3>
            <p>The minimum investment depends on the property, but generally starts at ₹50 lakhs.</p>
          </div>
          <div className="faq-item">
            <h3>3. Are the properties verified?</h3>
            <p>Yes, all our properties are legally verified and fully documented for safe transactions.</p>
          </div>
          <div className="faq-item">
            <h3>4. Can I schedule a property visit?</h3>
            <p>Absolutely! You can book a site visit through our Contact page or call our support team.</p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <h2>Ready to Find Your Perfect Home?</h2>
        <Link to="/contact" className="cta-btn">Contact Us Now</Link>
      </section>
    </div>
  );
}
