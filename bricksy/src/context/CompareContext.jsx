// UPDATED: uses numeric compareIds and exposes consistent helpers
import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const CompareContext = createContext();
export const useCompare = () => useContext(CompareContext);

export function CompareProvider({ children }) {
  const [compareIds, setCompareIds] = useLocalStorage('compare', []); // numeric ids

  const inCompare = (id) => {
    const n = Number(id);
    return compareIds.includes(n);
  };

  const toggleCompare = (id) => {
    const n = Number(id);
    setCompareIds((prev) => {
      if (prev.includes(n)) return prev.filter((x) => x !== n);
      if (prev.length >= 4) return prev; // limit 4
      return [...prev, n];
    });
  };

  const clearCompare = () => setCompareIds([]);

  return (
    <CompareContext.Provider value={{ compareIds, inCompare, toggleCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}
