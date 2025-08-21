import React from 'react';
import './FilterBar.css';
import { useFiltersCtx } from '../../context/FilterContext.jsx';

export default function FilterBar() {
  const { filters, update, reset } = useFiltersCtx();

  const TABS = ['rent', 'sale', 'commercial'];

  return (
    <div className="filterbar card">
      <div className="tabs">
        {TABS.map(tab => (
          <button
            key={tab}
            className={filters.mode === tab ? 'active' : ''}
            onClick={() => update({ mode: tab })}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="controls">
        <select
          value={filters.type}
          onChange={e => update({ type: e.target.value })}
        >
          <option value="">Any Type</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="office">Office</option>
          <option value="villa">Villa</option>
        </select>

        <input
          type="text"
          placeholder="City, Area"
          value={filters.city}
          onChange={e => update({ city: e.target.value })}
        />

        <div className="range">
          <label>Price: ₹{filters.minPrice || 0}–₹{filters.maxPrice || 500000}</label>
          <input
            type="range"
            min="0"
            max="500000"
            step="5000"
            value={filters.minPrice || 0}
            onChange={e => update({ minPrice: +e.target.value })}
          />
          <input
            type="range"
            min="0"
            max="500000"
            step="5000"
            value={filters.maxPrice || 500000}
            onChange={e => update({ maxPrice: +e.target.value })}
          />
        </div>

        <div className="amenities">
          {['pool', 'garden', 'parking', 'gym', 'lift'].map(a => (
            <label key={a}>
              <input
                type="checkbox"
                checked={filters.amenities.includes(a)}
                onChange={() => {
                  const set = new Set(filters.amenities);
                  set.has(a) ? set.delete(a) : set.add(a);
                  update({ amenities: [...set] });
                }}
              />
              {a.charAt(0).toUpperCase() + a.slice(1)}
            </label>
          ))}
        </div>

        <div className="actions">
          <button onClick={reset} className="btn ghost">Clear</button>
        </div>
      </div>
    </div>
  );
}
