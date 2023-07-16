import { useEffect, useState } from 'react';

export default function useLocalStorage(initialValue, name) {
  const [data, setData] = useState(
    () => JSON.parse(localStorage.getItem(name)) || initialValue
  );

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(data));
  }, [data, name]);

  return [data, setData];
}
