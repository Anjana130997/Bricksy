// UPDATED: robust image gallery + consistent image path handling + inquiry/login gate kept
import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { properties } from '../data/properties.js';
import './pages.css';
import { useAuth } from '../context/AuthContext.jsx';
import Messages from '../components/Messages/Messages.jsx';

function normalizeImage(img) {
  if (!img) return null;
  if (typeof img !== 'string') return null;
  if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) return img;
  if (img.startsWith('/')) return img;            // already a public path (/images/..., /assets/...)
  return `/images/${img}`;                        // assume placed in public/images
}

export default function PropertyDetailsPage() {
  const { isAuthenticated, user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const property = useMemo(
    () => properties.find((p) => String(p.id) === String(id)),
    [id]
  );

  const [inquiry, setInquiry] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!property) {
    return (
      <div className="container" style={{ padding: '2rem 0', textAlign: 'center' }}>
        <h2>Property Not Found</h2>
        <Link to="/property" style={{ color: '#C7A27C', textDecoration: 'underline' }}>
          Back to Properties
        </Link>
      </div>
    );
  }

  // Build a clean gallery array from either property.images[] or single property.image
  const gallery = useMemo(() => {
    let imgs = [];
    if (Array.isArray(property.images) && property.images.length) {
      imgs = property.images.map(normalizeImage).filter(Boolean);
    } else if (property.image) {
      const one = normalizeImage(property.image);
      if (one) imgs = [one];
    }
    if (!imgs.length) imgs = ['/placeholder/placeholder.jpg']; // final safety fallback
    return imgs;
  }, [property]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = gallery[Math.min(activeIndex, gallery.length - 1)];

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/property/${id}` } } });
      return;
    }
    if (!inquiry.trim()) return;

    const existingInquiries = JSON.parse(localStorage.getItem('inquiries')) || [];
    const newInquiry = {
      propertyId: String(property.id),
      message: inquiry.trim(),
      date: new Date().toISOString(),
      user: user?.name || user?.email || 'User',
    };
    localStorage.setItem('inquiries', JSON.stringify([...existingInquiries, newInquiry]));
    setSubmitted(true);
    setInquiry('');
  };

  return (
    <div className="container property-details">
      <div className="details-header">
        <h1>{property.title}</h1>
        <p>{property.location || property.city}</p>
      </div>

      <div className="details-main">
        {/* Image Gallery */}
        <div className="details-gallery">
          <div className="details-main-image-wrap">
            <img
              src={activeImage}
              alt={`${property.title} - image ${activeIndex + 1}`}
              className="details-image"
              loading="eager"
            />
          </div>

          {gallery.length > 1 && (
            <div className="details-thumbs">
              {gallery.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  className={`thumb ${i === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Show image ${i + 1}`}
                >
                  <img src={src} alt={`thumb ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="details-info">
          <h2>Price: ₹{property.price?.toLocaleString?.() ?? property.price}</h2>
          <p>{property.description}</p>
          <ul>
            <li><strong>Bedrooms:</strong> {property.bedrooms}</li>
            <li><strong>Bathrooms:</strong> {property.bathrooms}</li>
            <li><strong>Area:</strong> {property.area} sq.ft</li>
          </ul>

          <Link to="/property" className="cta-btn" style={{ display: 'inline-block', marginTop: 16 }}>
            Back to Listings
          </Link>
        </div>
      </div>

    

      {/* Inline chat with owner (optional – uses the same MessagesContext, keys by property id) */}
      <div className="inline-messages">
        <h3>Chat with Owner</h3>
        <Messages propertyId={String(property.id)} />
      </div>
    </div>
  );
}
