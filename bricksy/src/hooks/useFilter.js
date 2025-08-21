
import { useState, useEffect } from "react";

export default function useFilter(properties) {
  const [filters, setFilters] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
  });
  const [filteredProperties, setFilteredProperties] = useState(properties);

  useEffect(() => {
    let result = properties;

    if (filters.location) {
      result = result.filter((p) =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minPrice) {
      result = result.filter((p) => p.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= Number(filters.maxPrice));
    }

    if (filters.bedrooms) {
      result = result.filter((p) => p.bedrooms === Number(filters.bedrooms));
    }

    setFilteredProperties(result);
  }, [filters, properties]);

  return {
    filteredProperties,
    filters,
    setFilters,
  };
}
