// https://github.com/vercel/swr/issues/110
// https://kettanaito.com/blog/debounce-vs-throttle
import { useEffect, useState } from 'react';

export default function useDebounce(value: string, delay: number = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}
