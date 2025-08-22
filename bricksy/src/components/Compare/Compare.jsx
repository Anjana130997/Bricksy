import React from 'react';
import './Compare.css';
import { useCompare } from '../../context/CompareContext.jsx';
import { properties } from '../../data/properties.js';

export default function Compare() {
  const { compareIds, clearCompare } = useCompare();

  // Filter properties using numeric IDs
  const items = properties.filter((p) => compareIds.includes(Number(p.id)));

  if (!items.length)
    return (
      <div className='container' style={{ padding: '1rem', textAlign: 'center' }}>
        Add properties to compare.
      </div>
    );

  return (
    <div className='container card compare'>
      <div className='head'>
        <h2>Compare Properties</h2>
        <button className='btn ghost' onClick={clearCompare}>
          Clear
        </button>
      </div>

      <div className='table'>
        <div className='row header'>
          <div>Title</div>
          <div>Price</div>
          <div>Type</div>
          <div>Bedrooms</div>
          <div>Sqft</div>
          <div>Amenities</div>
        </div>

        {items.map((p) => (
          <div className='row' key={p.id}>
            <div>{p.title}</div>
            <div>₹ {p.price.toLocaleString()}</div>
            <div>{p.type}</div>
            <div>{p.bedrooms}</div>
            <div>{p.sqft}</div>
            <div>{p.amenities?.slice(0, 5).join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
