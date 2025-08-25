// UPDATED: reads optional state passed from Home search; uses useFilter hook for local filtering
import React from 'react';
import './pages.css';
import PropertyList from '../components/Property/PropertyList.jsx';
import { properties } from '../data/properties.js';
import useFilter from '../hooks/useFilter.js'
import { useLocation } from 'react-router-dom';

export default function Property() {
  const location = useLocation();
  const routeState = location.state || {};
  const { filteredProperties, filters, setFilters } = useFilter(properties);

  // If route passed a query, prefill local filters
  React.useEffect(() => {
    if (routeState.q) {
      setFilters((prev) => ({ ...prev, location: routeState.q }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeState.q]);

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2>Available Properties</h2>
      <PropertyList items={filteredProperties || properties} />
    </div>
  );
}
