import React, { createContext, useContext, useMemo } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';

const FilterContext = createContext();
export const useFilterCtx = () => useContext(FilterContext);

export function FilterProvider({ children }) {
  const defaultFilters = {
    mode: 'rent', // NEW: rent / sale / commercial
    q: '',
    type: [], // multi-select: apartment, house, office
    minPrice: 0,
    maxPrice: 2000000,
    bedrooms: [1, 5],
    sqft: [300, 5000],
    city: '',
    amenities: [], // multi-select
    sort: 'new'
  };

  const [filters, setFilters] = useLocalStorage('filters', defaultFilters);

  const update = (patch) => setFilters((prev) => ({ ...prev, ...patch }));

  const toggleArrayValue = (key, value) => {
    setFilters((prev) => {
      const arr = new Set(prev[key]);
      arr.has(value) ? arr.delete(value) : arr.add(value);
      return { ...prev, [key]: [...arr] };
    });
  };

  const reset = () => setFilters(defaultFilters);

  const value = useMemo(
    () => ({ filters, update, toggleArrayValue, reset }),
    [filters]
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}
