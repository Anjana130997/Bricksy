// UPDATED: robust localStorage hook (same API [val, setVal])
import { useEffect, useState } from 'react';

export default function useLocalStorage(key, initial) {
  const read = () => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : initial;
    } catch {
      return initial;
    }
  };

  const [val, setVal] = useState(read);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error('useLocalStorage write error', e);
    }
  }, [key, val]);

  return [val, setVal];
}
