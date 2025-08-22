import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';

const CompareContext = createContext();
export const useCompare = () => useContext(CompareContext);

export function CompareProvider({ children }) {
  // Store numeric IDs
  const [compareIds, setCompareIds] = useLocalStorage('compare', []);

  // Check if property is in compare list
  const inCompare = (id) => compareIds.includes(Number(id));

  // Toggle compare (max 4 properties)
  const toggleCompare = (id) => {
    const numericId = Number(id);
    setCompareIds((prev) =>
      prev.includes(numericId)
        ? prev.filter((x) => x !== numericId)
        : prev.length >= 4
        ? prev // Do nothing if max reached
        : [...prev, numericId]
    );
  };

  // Clear all compared properties
  const clearCompare = () => setCompareIds([]);

  return (
    <CompareContext.Provider
      value={{ compareIds, inCompare, toggleCompare, clearCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
}
