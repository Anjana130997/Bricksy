// FIXED: file path corrected and pagination usage; expects p.id numeric/string
import React from 'react';
import './PropertyList.css';
import PropertyCard from './PropertyCard.jsx';
import usePagination from '../../hooks/usePagination.js';

export default function PropertyList({ items }) {
  const { visible, canLoadMore, loadMore } = usePagination(items || [], 10);

  if (!items || items.length === 0)
    return <div className="container" style={{ padding: '1rem' }}>No properties found.</div>;

  return (
    <div className="container">
      <div className="grid property-grid">
        {visible.map((p) => (
          <PropertyCard key={p.id} p={p} />
        ))}
      </div>

      {canLoadMore && (
        <button className="load-more-btn" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
}
