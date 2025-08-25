// UPDATED: pagination hook returns visible, canLoadMore, loadMore
import { useEffect, useState } from 'react';

export default function usePagination(items, step = 10) {
  const [count, setCount] = useState(step);
  const [slice, setSlice] = useState(items.slice(0, step));

  useEffect(() => {
    setCount(step);
    setSlice(items.slice(0, step));
  }, [items, step]);

  const loadMore = () => {
    const next = Math.min(items.length, count + step);
    setCount(next);
    setSlice(items.slice(0, next));
  };

  return { visible: slice, canLoadMore: count < items.length, loadMore };
}
