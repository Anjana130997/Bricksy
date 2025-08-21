import React from 'react';
import './pages.css';
import PropertyList from '../components/Property/PropertyList.jsx';
import usePagination from '../hooks/usePagination.js';
import { properties } from '../data/properties.js';
import useFilter from "../hooks/useFilter.js";

export default function Property() {
  const { filteredProperties } = useFilter(properties);

  return (
    <>
      
<PropertyList items={filteredProperties || []} />

    </>
  );
}
