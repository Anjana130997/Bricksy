import React from 'react';
import './PropertyList.css';
import PropertyCard from './PropertyCard.jsx';
import usePagination from '../../hooks/usePagination'; // Assuming your hook is in hooks folder

export default function PropertyList({ items }) {
  const { visible, canLoadMore, loadMore } = usePagination(items, 10); // Step = 8

  if (!items.length)
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
